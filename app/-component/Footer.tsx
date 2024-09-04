import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="flex items-center justify-center gap-2 py-10 md:p-10 text-lg bg-[#400068] text-white/80 ">
      <FaGithub
        className="mb-1 text-2xl cursor-pointer "
        href="https://github.com/Varmanli/BLOG?tab=readme-ov-file#readme"
      />
      <h1>Development By Amirhosein Varmanli</h1>
    </div>
  );
}

export default Footer;
