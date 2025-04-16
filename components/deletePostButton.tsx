'use client'

import { handleServerActionError, toastServerError } from '@/lib/error-handling'
import { useMutation } from '@tanstack/react-query'
import { deletePost } from '@/actions/delete-post'

type ButtonProps = {
  postId: string
}

export const DeletePostButton = ({ postId }: ButtonProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      handleServerActionError(await deletePost(postId))
    },
    onError: toastServerError,
  })

  return (
    <button onClick={() => mutate()} className='button-secondary'>
      {isPending ? 'deleting post...' : 'delete'}
    </button>
  )
}
