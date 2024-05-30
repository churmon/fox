"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { StoreSchema, loginSchema, vehicleInspectionSchema } from "@/lib/validations";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import { z } from "zod";

export default async function store(values:z.infer<typeof StoreSchema>, images:string[]) {
    const validatedFields = StoreSchema.safeParse(values);
    if(!validatedFields.success){
        return {error:"Invalide Data"}
    }
    
    try {

        const session = await auth();
        const userId = session?.user.id;
        if(!userId){
            return {error:"You must be Authenthicated"};
        }

        await prisma.store.create({
            data:{
               ...validatedFields.data,
               userId,
               images:{
                create: images.map((img) => ({
                  url: img,
                })),
              },

            }
        });
        
    } catch (error) {
        console.log(error)
        return {error:"Internal Error"};

    }

    revalidatePath('/(protected)/store');
    redirect('/store');
  
}


