import Image from 'next/image';
import Logo from '/public/logo.png'

interface HeaderProps {
  label: string;
}

const Header = ({
  label
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-8 items-center justify-center">
      <Image 
        src={Logo}
        alt='logo'
        className='scale-50'
      />
      <p className="text-black text-3xl font-bold">
        {label}
      </p>
    </div>
  )
}

export default Header
