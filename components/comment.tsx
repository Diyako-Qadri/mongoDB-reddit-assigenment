'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { commentSchema, type CommentData } from '@/lib/schemas'
import { handleServerActionError, toastServerError } from '@/lib/error-handling'
import { FieldError } from '@/components/field-error'
import { createComment } from '@/actions/create-comment'

export const CreateCommentForm = ({ postId }: { postId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CommentData) => {
      handleServerActionError(await createComment(values, postId))
    },
    onError: toastServerError,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentData>({
    resolver: zodResolver(commentSchema),
  })

  const onSubmit = (values: CommentData) => {
    mutate(values)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full py-8 flex-col gap-4'
    >
      <textarea
        {...register('content')}
        placeholder='comment...'
        className='input min-h-20 rounded-sm'
      />
      <button type='submit' className='button-primary'>
        {isPending ? 'uploading comment...' : 'comment'}
      </button>
      <FieldError error={errors.content} />
    </form>
  )
}
