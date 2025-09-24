import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-background z-70 dark:bg-dark text-gray-300 py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-right">
        {/* منو */}
        <nav className="flex md:mr-40 justify-center md:justify-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="hover:text-accent transition-colors duration-200"
          >
            صفحه اصلی
          </Link>
          <Link
            href="/#blog"
            className="hover:text-accent transition-colors duration-200"
          >
            مقالات
          </Link>
          <Link
            href="/about"
            className="hover:text-accent transition-colors duration-200"
          >
            درباره من
          </Link>
          <Link
            href="/contact"
            className="hover:text-accent transition-colors duration-200"
          >
            تماس با من
          </Link>
        </nav>

        {/* شبکه‌های اجتماعی */}
        <div className="flex justify-center  md:mr-[700px] gap-6">
          <a
            href="https://github.com/Varmanli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-accent transition-transform transform hover:scale-110"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/amirhosein-varmanli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-accent transition-transform transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:varmanliamirhosein@gmail.com"
            className="text-2xl text-gray-400 hover:text-accent transition-transform transform hover:scale-110"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className="mt-8 border-t border-gray-700 dark:border-gray-600 pt-4 text-center text-xs md:text-sm text-gray-500">
        © {new Date().getFullYear()} تمامی حقوق محفوظ است |{" "}
        <a
          href="https://varmanli.ir"
          className="text-accent hover:underline hover:text-accent transition"
        >
          varmanli.ir
        </a>
      </div>
    </footer>
  );
}

export default Footer;
