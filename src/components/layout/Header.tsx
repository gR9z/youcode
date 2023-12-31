import Link from 'next/link';
import Image from 'next/image';

import { Typography } from '@/components/ui/typography';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { SiteConfig } from '@/lib/site-config';
import AuthButton from '@/features/auth/AuthButton';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2 md:gap-4">
          <Image src="/images/youcode.png" width={40} height={32} alt="logo" />
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <AuthButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
