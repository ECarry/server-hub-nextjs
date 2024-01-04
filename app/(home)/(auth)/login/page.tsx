import LoginForm from '@/components/login-form'
import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-semibold'>Login</h1>
      <h2>Don&apos;t have an account? <Link href={'/register'} className='text-rose-500 hover:text-rose-300 transition-all duration-150'>Create here</Link></h2>
      <LoginForm />
    </div>
  )
}

export default LoginPage
