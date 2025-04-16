import { notFound } from 'next/navigation'
import Link from 'next/link'

import { auth } from '@/lib/auth'
import { getPost } from '@/lib/queries'
import { DeletePostButton } from '@/components/deletePostButton'
import { CreateCommentForm } from '@/components/comment'
import { DeleteCommentButton } from '@/components/deleteCommentBtn'

export const revalidate = 900

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const post = await getPost(id)

  if (!post) {
    return notFound()
  }

  const user = await auth.getUser()
  const isAuthor = user && user.id === post.author.id

  return (
    <main className='main'>
      <article className='space-y-4'>
        <header className='flex items-start justify-between'>
          <div>
            <span>{post.author.username}</span>
            <h1>{post.title}</h1>
          </div>
          {isAuthor && (
            <div className='flex gap-3'>
              <Link href={`/post/${post.id}/edit`} className='button-secondary'>
                edit
              </Link>
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </header>
        <p>{post.content}</p>
      </article>
      {user && <CreateCommentForm postId={post.id} />}
      {post.comments &&
        post.comments.length > 0 &&
        post.comments?.map((comment, index) => (
          <div className='relative m-2 flex justify-between rounded bg-white p-4' key={index}>
            <div>
              <h2 className='flex items-center gap-2'>
                {comment.author.username}
              </h2>
              <p>{comment.content}</p>
            </div>
            {(isAuthor || user?.id === comment.author._id) && (
              <DeleteCommentButton postId={post.id} commentId={comment._id} />
            )}
          </div>
        ))}
    </main>
  )
}
