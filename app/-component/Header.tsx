import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between items-center flex-row-reverse px-5 py-3 m-4 border-b-2 shadow-sm rounded-lg bg-white">
      {/* لوگو */}
      <Link href="/" className="flex items-center">
        <Image src={logo} alt="logo" width={80} height={40} />
      </Link>

      {/* منوی ناوبری */}
      <ul className="flex items-center gap-6 md:gap-10 font-medium text-gray-700">
        <li>
          <Link
            href="/"
            className="hover:text-blue-600 relative group transition-all"
          >
            صفحه اصلی
            <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-blue-600 transition-all duration-300"></span>
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-blue-600 relative group transition-all"
          >
            درباره من
            <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-blue-600 transition-all duration-300"></span>
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-blue-600 relative group transition-all"
          >
            تماس با من
            <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-blue-600 transition-all duration-300"></span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
