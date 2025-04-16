'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { cn } from '@/utils/classnames'
import { handleServerActionError, toastServerError } from '@/lib/error-handling'
import { vote } from '@/actions/vote'

export const Votes = ({
  postId,
  userId,
  score,
  upvotes,
  downvotes,
}: {
  postId: string
  userId: string | null
  score: number
  upvotes: string[]
  downvotes: string[]
}) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: async (type: 'upvote' | 'downvote') => {
      handleServerActionError(await vote({ type, postId }))
    },
    onError: toastServerError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return (
    <div className='mt-4 flex items-center gap-1'>
      <button
        onClick={(event) => {
          event.stopPropagation()
          mutate('upvote')
        }}
        className={cn(
          'button-tertiary',
          userId && upvotes.includes(userId) && 'text-primary',
        )}
      >
        ⬆︎
      </button>
      <span className='min-w-8 text-center'>{score}</span>
      <button
        onClick={(event) => {
          event.stopPropagation()
          mutate('downvote')
        }}
        className={cn(
          'button-tertiary',
          userId && downvotes.includes(userId) && 'text-primary',
        )}
      >
        ⬇︎
      </button>
    </div>
  )
}