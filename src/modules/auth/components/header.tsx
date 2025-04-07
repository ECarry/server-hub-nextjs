import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-8 items-center justify-center">
      <Link href={"/"}>
        <Image src="/logo.png" alt="Logo" width={128} height={64} />
      </Link>

      <p className="text-3xl font-bold">{label}</p>
    </div>
  );
};

export default Header;
