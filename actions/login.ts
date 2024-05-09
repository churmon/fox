"use server"

import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";
import { z } from "zod";
import bcryptjs from "bcryptjs"

export default async function login(values:z.infer<typeof loginSchema>) {
    const validatedFields = loginSchema.safeParse(values);
    if(!validatedFields.success){
        return {error:"Invalide Data"}
    }

    const { email, password} = validatedFields.data;

    try {
        const existingUser = await prisma.user.findUnique({
            where:{email}
        });
        if(!existingUser){
            return {error:"Wrong Credentials"};

        }
        // if(existingUser){

        // }
        const passwordCheck = existingUser.password?.toString() === password;

        if(!passwordCheck){
            return {error:"Wrong Credentials"};
        }
        return {success:"User created successfully!"}
    } catch (error) {
        return {error:"Internal Error"};
    }
  
}
