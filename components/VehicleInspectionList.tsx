import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { Prisma } from "@prisma/client";
import VehicleInspectionCard from "./Cards/VehicleInspectionCard";
import Link from "next/link";

type VehicleInspectionCardProps={
    data: Prisma.VehicleInspectionGetPayload<{
        include:{
            vehicleInspectionImages:true
        },
    }>[];
}


export default async function VehicleInspectionList({data}:VehicleInspectionCardProps) {
// const session = await auth();
  // const currentUser = await getUserById(session?.user.id);
  // const currentUser = await getUserById(data.userId);
  //   if(!currentUser)return;

  return (
    <>
      {data.map(async (vehicleInspect)=>{
        const currentUser = await getUserById(vehicleInspect.userId);
        if(!currentUser)return;
    return <Link href={`/vehicle-inspection/${vehicleInspect.id}`} key={vehicleInspect.id}><VehicleInspectionCard vehicleInspect={vehicleInspect} currentUser={currentUser}  /></Link>})}
    </>
  )
}
