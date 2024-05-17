"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema, vehicleInspectionSchema } from "@/lib/validations";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import { z } from "zod";

export default async function vehicleInspection(values:z.infer<typeof vehicleInspectionSchema>, images:string[]) {
    const validatedFields = vehicleInspectionSchema.safeParse(values);
    if(!validatedFields.success){
        return {error:"Invalide Data"}
    }
    // const userId="clvy6zrle0000yf0bwftoxf1j";
    
    try {

        const session = await auth();
        const userId = session?.user.id;
        if(!userId){
            return {error:"You must be Authenthicated"};
        }

        await prisma.vehicleInspection.create({
            data:{
               ...validatedFields.data,
               userId,
               vehicleInspectionImages:{
                create: images.map((img) => ({
                  url: img,
                })),
              },

            }
        });
        
        // return {success:"Post Added Successfully"}
    } catch (error) {
        console.log(error)
        return {error:"Internal Error"};

    }

    revalidatePath('/(protected)/vehicle-inspection');
    redirect('/vehicle-inspection');
  
}


