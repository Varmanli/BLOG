import HeroSection from "./-component/HeroSection";
import BlogUi from "./-component/BlogSection";

export default function Home() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all">
      <HeroSection />
      <BlogUi />
    </main>
  );
}
