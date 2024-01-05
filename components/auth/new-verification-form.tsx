'use client'

import { useSearchParams } from 'next/navigation'
import CardWrapper from './card-wrapper'
import { useCallback, useEffect, useState } from 'react'
import { newVerification } from '@/actions/new-verification'
import FormError from './form-error'
import FormSuccess from './form-success'

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const onSumbit = useCallback(() => {
    if (success || error) return

    if (!token) {
      setError('Missing token!')
      return
    }

    newVerification(token)
      .then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
      .catch(() => {
        setError('Something went wron!')
      })
  }, [token, error, success])

  useEffect(() => {
    onSumbit()
  }, [onSumbit])
  
  return (
    <CardWrapper
      headerLabel='Confirming your verification'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <div className='flex items-center justify-center w-full'>
        {!error && !success && (
          <p>Loading...</p>
        )}

        {!success && (
          <FormError message={error} />
        )}

        <FormSuccess message={success} />
      </div>
      
    </CardWrapper>
  )
}

export default NewVerificationForm
