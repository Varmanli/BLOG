import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between items-center rounded-xl shadow-md border px-3 m-3">
      {/* NAV */}
      <ul className="flex justify-center items-center gap-4 md:gap-7 text-[#400068] font-bold  ">
        <Link href={"/"}>
          <li className="hover:text-blue-800 cursor-pointer ">صفحه اصلی</li>
        </Link>
        <Link href={"about"}>
          <li className="hover:text-blue-800 cursor-pointer ">درباره من</li>
        </Link>
        <Link href={"contact"}>
          <li className="hover:text-blue-800 cursor-pointer ">تماس با من</li>
        </Link>
      </ul>{" "}
      {/* logo */}
      <Link href={"/"}>
        <div className="w-[90px] md:w-[100px] cursor-pointer">
          <Image src={logo} alt="logo" />
        </div>
      </Link>
    </div>
  );
}

export default Header;
