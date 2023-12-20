import Logo from '@/public/logo.png'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="container w-full space-y-4">
      <div className='w-full flex justify-center'>
        <Image 
          src={Logo}
          alt='logo'
          width={250}
          height={150}
          priority
          className='object-contain'
        />
      </div>

      <div className='text-center'>
        <p>© 2024, Server Hub</p>
        <p>All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
