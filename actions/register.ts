"use server"

import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/validations"
import { z } from "zod"
import { getUserByEmail } from "@/data/user";

export default async function register(values:z.infer<typeof registerSchema>) {

    const validatedFields = registerSchema.safeParse(values);

    if(!validatedFields.success) return {error:"Invalid Data"}

    const {name,surname,email,password} = validatedFields.data;

    try {
        // const hashPassword = await bcryptjs.hash(password,10);
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return {error:"Email already in use"}
        }

        await prisma.user.create({
            data:{
                name,surname,email,password
            }
        });
            return {success:"Account created"}
    } catch (error) {
        return {error:"Failed to register user."}
    }
  
}
