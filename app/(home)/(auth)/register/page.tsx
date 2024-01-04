import RegisterForm from '@/components/register-form'
import Link from 'next/link'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-semibold'>Register</h1>
      <h2>Already have an account? <Link href={'/login'} className='text-rose-500 hover:text-rose-300 transition-all duration-150'>Login</Link></h2>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
