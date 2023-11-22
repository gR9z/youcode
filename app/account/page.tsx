import { getAuthSession } from '@/lib/auth';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import LogoutButton from '@/features/auth/LogoutButton';

export default async function AccountPage() {
  const session = await getAuthSession();

  if (!session) {
    throw new Error('No session found');
  }

  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader className="flex flex-row gap-4 space-y-0">
        <Avatar>
          <AvatarFallback>
            {session.user.email?.[0].toUpperCase()}
          </AvatarFallback>
          {session.user.image && (
            <AvatarImage
              src={session.user.image}
              alt={session.user.name ?? "User's avatar"}
            />
          )}
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle>{session.user.email}</CardTitle>
          <CardDescription>{session.user.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Link
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
          href="/account/settings"
        >
          Settings
        </Link>

        <Link
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
          href="/admin"
        >
          Admin
        </Link>
      </CardContent>
      <CardFooter className="flex flex-row-reverse">
        <LogoutButton />
      </CardFooter>
    </Card>
  );
}
