"use server"

import { client } from "@/lib/client"
import { signUpSchema , type SignUpValues } from "@/lib/schemas"
import { ServerActionResponse, handleAxiosError } from "@/lib/error-handling"
import { redirect } from "next/navigation"

export const signUp = async( data: SignUpValues): Promise<ServerActionResponse> => {
   const parseData = signUpSchema.parse(data)

   try{
    await client.post('/auth/sign-up', parseData)
   } catch (error) {
    return handleAxiosError(error);
   }

   redirect('/auth/log-in')
}