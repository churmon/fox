import prisma from "@/lib/prisma";

export async function getVehiclesInspection(){

    try {

        const res = await prisma.vehicleInspection.findMany({
            orderBy:{
                createdAt:"desc"
            },
            include:{
                vehicleInspectionImages:true
            }

        })
        return res;
        
    } catch (error) {
        return [{error:"Failed to"}]
    }

    
}