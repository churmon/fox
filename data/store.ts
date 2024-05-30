import prisma from "@/lib/prisma";

export async function getStore()
{
    const res = await prisma.store.findMany({
        orderBy:{
            createdAt:"desc"
        },
        include:{
            images:true
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

export async function getStoreById(id:string)
{
    const res = await prisma.store.findUnique({
        where:{
            id
        },
        include:{
            images:true
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