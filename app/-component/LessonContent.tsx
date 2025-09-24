interface LessonContentProps {
  lesson: { id: string; title: string; content?: string };
}

export default function LessonContent({ lesson }: LessonContentProps) {
  return (
    <div className=" p-6 text-black dark:text-white min-h-[300px]">
      <h3 className="text-2xl font-bold mb-4">{lesson.title}</h3>
      {lesson.content ? (
        <div
          className="prose prose-zinc max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
      ) : (
        <p>اینجا محتوای درس {lesson.title} نمایش داده می‌شود.</p>
      )}
    </div>
  );
}
