import Image from "next/image";
import Logo from "/public/images/logo.png";
import Link from "next/link";

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-8 items-center justify-center">
      <Link href={"/"}>
        <Image src={Logo} alt="logo" className="scale-50" />
      </Link>

      <p className="text-3xl font-bold">{label}</p>
    </div>
  );
};

export default Header;
