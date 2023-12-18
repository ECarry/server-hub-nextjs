import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Logo from '@/public/logo.png'

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <Image 
        src={Logo}
        alt="logo"
        width={200}
        height={50}
      />
    </div>
  )
}
