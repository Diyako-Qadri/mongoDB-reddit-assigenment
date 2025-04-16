import { isAxiosError } from 'axios'

import { toast } from 'sonner'

export type ServerActionResponse = { error: string } | undefined | void

export const handleServerActionError = (response: ServerActionResponse) => {
  if (response?.error) {
    throw Error(response.error)
  }
}

export const handleAxiosError = (error: unknown): ServerActionResponse => {
  const defaultErrorMessage = 'something went wrong'

  if (!isAxiosError(error)) {
    console.error(error)
    return { error: defaultErrorMessage }
  }

  return { error: error.response?.data.message || defaultErrorMessage }
}

const isRedirectError = (err: unknown): boolean => {
    return typeof err === 'object' && err !== null && 'digest' in err
  }
export const toastServerError = (error: Error) => {
  if (!isRedirectError(error)) {
    toast.error(error.message)
  }
}