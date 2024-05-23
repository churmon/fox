'use server'

import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteVehicleInspect(id:string) {

try {
const session = await auth();
const currentUser = session?.user;
if(!currentUser) return;

const res = await prisma.vehicleInspection.findUnique({
    where:{
        id
    },
    include:{
        vehicleInspectionImages: true,
    }
})

if(res?.userId !== currentUser.id) return {error:"Not Allowed"};

await prisma.vehicleInspection.delete({
    where:{
        id
    }
})


} catch (error) {
    return {error:"Something went wrong!"}
}

revalidatePath('/(protected)/vehicle-inspection');
redirect('/vehicle-inspection');

}
