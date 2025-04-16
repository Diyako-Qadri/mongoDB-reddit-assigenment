import { z } from 'zod'

export const signUpSchema = z.object({
  username: z.string().min(2, 'username incorrect'),
  password: z.string().min(6, 'password must be 6 character'),
})

export type SignUpValues = z.infer<typeof signUpSchema>

export const logInSchemas = z.object({
  username: z.string().min(1, 'username is requierd'),
  password: z.string().min(1, 'password is requierd'),
})

export type LogInValues = z.infer<typeof logInSchemas>

export const postActionSchema = z.object({
  title: z.string().min(1, 'title is required'),
  content: z.string().optional(),
})

export type PostValues = z.infer<typeof postActionSchema>

export const profileSchema = z.object({
  username: z.string(),
  id: z.string(),
})

export const postPageSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().optional(),
  comments: z.array(
    z.object({
      author: z.object({
        username: z.string(),
        _id: z.string(),
      }),
      content: z.string(),
      _id: z.string()
    }),
  ),
  author: z.object({
    username: z.string(),
    id: z.string(),
  }),
});

export const homepagePostsSchema = z.object({
  posts: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      author: z.object({
        username: z.string(),
      }),
      comments: z
        .array(
          z.object({
            content: z.string(),
            author: z.string(),
          }),
        )
        .optional(),
      score: z.number(),
      upvotes: z.array(z.string()),
      downvotes: z.array(z.string()),
    }),
  ),
  nextPage: z.number().nullable(),
})

export const commentSchema = z.object({
  content: z.string(),
})

export type PostPageData = z.infer<typeof postPageSchema>
export type ProfileData = z.infer<typeof profileSchema>
export type HomepagePostsData = z.infer<typeof homepagePostsSchema>
export type CommentData = z.infer<typeof commentSchema>