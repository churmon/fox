import StoreCardById from '@/components/Cards/StoreCardById';
import VehicleInspectionCardById from '@/components/Cards/VehicleInspectionCardById';
import { getStoreById } from '@/data/store';
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

    const data = await getStoreById(id);
    if(!data) return;
    // console.log(data.vehicleInspectionImages[0].url);
    const user = await getUserById(data.userId);
    if(!user)return;

  return (
    <div>
        <StoreCardById store={data} user={user} />
    </div>
  )
}
