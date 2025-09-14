import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#1E3A5F] dark:bg-dark text-gray-200 py-8 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-right gap-6">
        <p className="text-xs md:text-base text-gray-300 dark:text-gray-200">
          به یادگیری و پیشرفت ادامه بده، آینده از آنِ تلاشگران است!
        </p>

        <div className="flex gap-6 justify-center">
          <a
            href="https://github.com/Varmanli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-accent transition-transform transform hover:scale-110"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/amirhosein-varmanli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-accent transition-transform transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:varmanliamirhosein@gmail.com"
            className="text-2xl text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-accent transition-transform transform hover:scale-110"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-700 dark:border-gray-600 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} تمامی حقوق محفوظ است |
        <a
          href="https://varmanli.ir"
          className="text-accent hover:underline hover:text-accent transition"
        >
          {" "}
          varmanli.ir
        </a>
      </div>
    </footer>
  );
}

export default Footer;
