'use client'

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from '../ui/button'
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

const Social = () => {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }
  return (
    <>
      <div className="w-full space-y-4 flex-col">
        <Button 
          className="w-full space-x-2 rounded-2xl"
          variant='outline'
          size={'lg'}
          onClick={() => onClick('google')}
        >
          <FcGoogle className='w-5 h-5' />
          <span>Continue with Google</span>
        </Button>

        <Button 
          className="w-full space-x-2 rounded-2xl"
          variant='outline'
          size={'lg'}
          onClick={() => onClick('github')}
        >
          <FaGithub className='w-5 h-5' />
          <span>Continue with Github</span>
        </Button>
      </div>
      <div className="relative flex h-20 items-center justify-center">
        <hr className="h-[2px] grow border-divider-primary" />
        <h3 className="w-44 shrink-0 text-center text-body-small-bold text-fg-secondary">or</h3>
        <hr className="h-[2px] grow border-divider-primary" />
      </div>
    </>

  )
}

export default Social
