'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { ResetPasswordSchema } from '@/schemas'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import CardWrapper from './card-wrapper'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import FormError from './form-error'
import FormSuccess from './form-success'
import { Input } from '../ui/input'
import { resetPassword } from '@/actions/reset'

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    }
  })

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      resetPassword(values)
        .then((data) => {
          setError(data?.error)
          setSuccess(data?.success)
        })
    })

  }

  return (
    <CardWrapper
      headerLabel='Forgot your password?'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      {...field}
                      type="email" 
                      placeholder="Enter email address"
                      disabled={isPending}
                      className="h-12 bg-gray-100 rounded-2xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-2xl"
            size={'lg'}
          >
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default ResetPasswordForm
