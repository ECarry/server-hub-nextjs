import LoginForm from '@/components/login-form'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='container space-y-8'>
      <h1 className='text-3xl font-semibold'>Login</h1>
      <h2>Don&apos;t have an account? Create here</h2>
      <LoginForm />
    </div>
  )
}

export default LoginPage
