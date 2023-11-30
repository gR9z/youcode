import { prisma } from '@/lib/prisma';

import { getRequiredAuthSession } from '@/lib/auth';
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { getCourse } from './course.query';
import { CoursePaginationButton } from '@/features/pagination/PaginationButton';
import { buttonVariants } from '@/components/ui/button';

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 1);
  const session = await getRequiredAuthSession();

  const course = await getCourse({
    courseId: params.courseId,
    userId: session.user.id,
    userPage: page,
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex- flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
              </TableHeader>
              <TableBody>
                {course.users?.map((user) => (
                  <TableRow>
                    <TableCell>
                      <Avatar className="rounded">
                        <AvatarFallback>
                          {user.email?.[0].toUpperCase()}
                        </AvatarFallback>
                        <AvatarImage src={user.image!} alt={user.email ?? ''} />
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography
                        as={Link}
                        href={`/admin/users/${user.id}`}
                        variant={'large'}
                      >
                        {user.email}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CoursePaginationButton
              page={page}
              totalPage={course._count?.users ?? 0 / 2}
              baseUrl={`/admin/courses/${course.id}`}
            />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
            <Avatar className="rounded">
              <AvatarFallback>{course.name?.[0].toUpperCase()}</AvatarFallback>
              <AvatarImage
                className="object-cover"
                src={course.image}
                alt={course.name}
              />
            </Avatar>
            <CardTitle>{course.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Typography>{course._count?.users} users</Typography>
            <Typography>{course._count?.lessons} lessons</Typography>

            <Link
              className={buttonVariants({
                variant: 'outline',
              })}
              href={`/admin/courses/${course.id}/edit`}
            >
              Edit
            </Link>

            <Link
              className={buttonVariants({
                variant: 'outline',
              })}
              href={`/admin/courses/${course.id}/lessons`}
            >
              Edit lessons
            </Link>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
