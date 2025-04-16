'use client'

import { useMutation } from '@tanstack/react-query'
import { handleServerActionError, toastServerError } from '@/lib/error-handling'
import { deleteComment } from '@/actions/delete-comment'

export const DeleteCommentButton = ({
  postId,
  commentId,
}: {
  postId: string
  commentId: string
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      handleServerActionError(await deleteComment(postId, commentId))
    },
    onError: toastServerError,
  })

  return (
    <button
      onClick={() => mutate()}
      className=' rounded-full bg-zinc-800 px-4 py-2 text-white transition hover:bg-slate-700'
    >
      {isPending ? 'Deleting comment...' : 'Delete'}
    </button>
  )
}
