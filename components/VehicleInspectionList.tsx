import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { Prisma } from "@prisma/client";
import VehicleInspectionCard from "./Cards/VehicleInspectionCard";

type VehicleInspectionCardProps={
    data: Prisma.VehicleInspectionGetPayload<{
        include:{
            vehicleInspectionImages:true
        },
    }>[];
}


export default async function VehicleInspectionList({data}:VehicleInspectionCardProps) {
const session = await auth();
  const currentUser = await getUserById(session?.user.id);
  if(!currentUser)return;
  return (
    <>
      {data.map((vehicleInspect)=><VehicleInspectionCard vehicleInspect={vehicleInspect} currentUser={currentUser} key={vehicleInspect.id} />)}
    </>
  )
}
