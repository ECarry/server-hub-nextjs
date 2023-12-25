import Logo from '@/public/logo.png'
import Image from 'next/image'
import { Search } from './serach'
import { Separator } from '@/components/ui/separator'
import { UserNav } from './user-nav'
import LikeListButon from './like-list-button'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { NavigationBar } from './navigation-bar'

const Header = () => {
  return (
    <header className='flex flex-col w-full'>
      <div className='container px-4 py-[6px] flex items-center'>
        <div className='flex items-center gap-4'>
          <Link href="/about" className='text-[13px] text-gray-500 hover:text-gray-700 transition-colors duration-150'>About Us</Link>
          <Separator orientation='vertical' className='h-4' />
          <Link href="#" className='text-[13px] text-gray-500'>My Account</Link>
          <Separator orientation='vertical' className='h-4' />
          <Link href="#" className='text-[13px] text-gray-500'>Likelist</Link>
        </div>

        <div className='ml-auto flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <span className='text-[13px] text-gray-500'>English</span>
            <ChevronDown size={13} className='text-gray-500' />
          </div>
        </div>
      </div>

      <Separator className="w-full" />
      
      <div className='container px-4 py-8 flex items-center'>
        <div className='flex items-center gap-8'>
          <Link href={'/'}>
            <Image 
              src={Logo}
              alt='logo'
              width={250}
              height={150}
              priority
              className='object-contain'
            />
          </Link>


          <div className='hidden lg:block'>
            <Search />
          </div>
        </div>

        <div className='ml-auto flex items-center gap-4'>
          <LikeListButon />
          <UserNav />
        </div>
      </div>

      <Separator className="w-full" />

    </header>
  )
}

export default Header
