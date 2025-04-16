import { client } from './client'
import { homepagePostsSchema, postPageSchema } from './schemas'

export const getPost = async (id: string) => {
  try {
    const response = await client.get(`/posts/${id}`)

    const { data, error } = postPageSchema.safeParse(response.data)
    console.log(error);
    if (error) {
      return null
    }

    return data
  } catch (error) {
    console.log(error);
    return null
  }
}

export const getPosts = async (limit: number, page: number) => {
  try {
    const response = await client.get('/posts', {
      params: { limit, page },
    })

    const { data, error } = homepagePostsSchema.safeParse(response.data)
    if (error) {
      return null
    }

    return data
  } catch {
    return null
  }
}
