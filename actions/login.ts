"use server"

import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export default async function login(values:z.infer<typeof loginSchema>) {
    const validatedFields = loginSchema.safeParse(values);
    if(!validatedFields.success){
        return {error:"Invalide Data"}
    }

    const { email, password } = validatedFields.data;
    console.log(validatedFields.data)

    try {
        
        await signIn("credentials",{email,password, redirectTo:DEFAULT_LOGIN_REDIRECT})
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error: "Invalid credentials!"}
                default:
                    return {error:"Something went wrong!"}
            }
        }

        throw error;
    }

  
}
