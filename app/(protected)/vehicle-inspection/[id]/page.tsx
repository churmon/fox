import VehicleInspectionCardById from '@/components/Cards/VehicleInspectionCardById';
import { getUserById } from '@/data/user';
import { getVehiclesInspectionById } from '@/data/vehicle';
import React from 'react'
type paramsProp = {
    params:{
        id:string,
    }
}
export default async function page({params}:paramsProp) {
    const {id} = params;
    const data = await getVehiclesInspectionById(id);
    if(!data) return;
    const user = await getUserById(data.userId);
    if(!user)return;

  return (
    <div>
        <VehicleInspectionCardById vehicleInspect={data} currentUser={user} />
    </div>
  )
}
