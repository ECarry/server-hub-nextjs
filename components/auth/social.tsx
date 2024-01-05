'use client'

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from '../ui/button'

const Social = () => {
  return (
    <div className="w-full space-y-2">
      <Button 
        className="w-full"
        variant='outline'
        onClick={() =>{}}
      >
        <FcGoogle className='w-5 h-5' />
      </Button>

      <Button 
        className="w-full"
        variant='outline'
        onClick={() =>{}}
      >
        <FaGithub className='w-5 h-5' />
      </Button>
    </div>
  )
}

export default Social
