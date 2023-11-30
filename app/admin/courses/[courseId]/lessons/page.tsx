import { getRequiredAuthSession } from '@/lib/auth';
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCourseLessons } from './lessons.query';
import { notFound } from 'next/navigation';
import { LessonItem } from './LessonItem';

export default async function CourseLessonsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getRequiredAuthSession();

  const course = await getCourseLessons({
    courseId: params.courseId,
    userId: session.user.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Lessons • {course.name} </LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex- flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {course.lessons.map((lesson) => {
              return <LessonItem key={lesson.id} lesson={lesson} />;
            })}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
