import prisma from "@/lib/prisma";

export async function getVehiclesInspection()
{
    const res = await prisma.vehicleInspection.findMany({
        orderBy:{
            createdAt:"desc"
        },
        include:{
            vehicleInspectionImages:true
        }

    })
    return res;

    // try {

    //     const res = await prisma.vehicleInspection.findMany({
    //         orderBy:{
    //             createdAt:"desc"
    //         },
    //         include:{
    //             vehicleInspectionImages:true
    //         }

    //     })
    //     return res;
    // } catch (error) {
    //     return;
    // }

    
}

export async function getVehiclesInspectionById(id:string)
{
    const res = await prisma.vehicleInspection.findUnique({
        where:{
            id
        },
        include:{
            vehicleInspectionImages:true
        }

    })
    return res;

    // try {

    //     const res = await prisma.vehicleInspection.findMany({
    //         orderBy:{
    //             createdAt:"desc"
    //         },
    //         include:{
    //             vehicleInspectionImages:true
    //         }

    //     })
    //     return res;
    // } catch (error) {
    //     return;
    // }

    
}