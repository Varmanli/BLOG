interface LessonNavigationProps {
  goToNextLesson: () => void;
  goToPrevLesson: () => void;
  disableNext: boolean;
  disablePrev: boolean;
}

export default function LessonNavigation({
  goToNextLesson,
  goToPrevLesson,
  disableNext,
  disablePrev,
}: LessonNavigationProps) {
  return (
    <div className="flex justify-between mb-4">
      <button
        onClick={goToPrevLesson}
        disabled={disablePrev}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          disablePrev
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-purple-500 text-white hover:bg-purple-600"
        }`}
      >
        درس قبلی
      </button>
      <button
        onClick={goToNextLesson}
        disabled={disableNext}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          disableNext
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-purple-500 text-white hover:bg-purple-600"
        }`}
      >
        درس بعدی
      </button>
    </div>
  );
}
