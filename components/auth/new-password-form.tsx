'use client'

import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { PasswordSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { newPassword } from "@/actions/new-password"

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FormError from "@/components/auth/form-error"
import FormSuccess from "@/components/auth/form-success"
import CardWrapper from "./card-wrapper"


const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const token = searchParams.get('token')

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof PasswordSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          setError(data?.error)
          setSuccess(data?.success)
        })
      })
  }

  return (
    <CardWrapper
      headerLabel="Reset your password!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      type="password" 
                      placeholder="******"
                      disabled={isPending}
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
            className="w-full"
          >
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default NewPasswordForm
