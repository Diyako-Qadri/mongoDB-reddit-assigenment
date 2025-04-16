"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { handleServerActionError, toastServerError } from '@/lib/error-handling'

import { createPost } from '@/actions/create-post'
import { postActionSchema, PostValues } from '@/lib/schemas'

export const CreateForm = () => {

  const {mutate, isPending} = useMutation({
    mutationFn: async (values: PostValues) => {
      handleServerActionError(await createPost(values))
    },
    onError: toastServerError,
  })
  const { register, handleSubmit } = useForm<PostValues>({
    resolver: zodResolver(postActionSchema),
  })

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className='flex w-full max-w-md flex-col gap-4'
    >
      <input {...register("title")} type='text' placeholder='title' className='input' />
      <textarea
      {...register("content")}
        name='content'
        placeholder='content'
        className='input min-h-96 rounded-3xl'
        id=''
      ></textarea>
      <button type='submit' className='button-primary'>
        {isPending ? "updating post..." : "Post"}
      </button>
    </form>
  )
}
