'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


import { signUp } from '@/actions/sign-up'
import { handleServerActionError } from '@/lib/error-handling'
import { logInSchemas, LogInValues } from '@/lib/schemas'
import { FieldError } from '@/components/field-error'
import { logIn } from '@/actions/log-in'

export const LogInForm = () => {
    
  const {mutate, isPending} = useMutation({
    mutationFn: async (values: LogInValues) => {
      handleServerActionError(await logIn(values))
    },
    onError: (error) => toast.error(error.message),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInValues>({
    resolver: zodResolver(logInSchemas),
  })

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className='flex w-full max-w-md flex-col gap-4'
    >
      <input
        {...register('username')}
        type='text'
        placeholder='username'
        className='input'
      />
      <FieldError error={errors.username}/>
     
      <input
        {...register('password')}
        type='password'
        placeholder='password'
        className='input'
      />
      <FieldError error={errors.password}/>
      <button type='submit' className='button-primary' disabled={isPending}>
        {isPending ? 'loging in...' :  'log in'}
      </button>
    </form>
  )
}
