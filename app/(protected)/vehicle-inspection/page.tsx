import { getVehiclesInspection } from "@/actions/vehicleInspection";
import VehicleInspectionCard from "@/components/Cards/VehicleInspectionCard";
import VehicleInspectButton from "@/components/VehicleInspectButton";
import VehicleInspectionForm from "@/components/forms/VehicleInspectionForm";
import Link from "next/link";
import { MdOutlineCreate } from "react-icons/md";

export default async function page() {
  const data = await getVehiclesInspection();
  if(data.length === 0){ 
    return(
    <div className="bg-red-500">No data yet</div>
  )
  
  };
  console.log(data);

  return (
    <div className="relation h-full w-full">
        {data.map((item:any) => <VehicleInspectionCard key={item.id} info = {item} />
      )}
        {/* <VehicleInspectionCard />
        <VehicleInspectionCard />
        <VehicleInspectionCard />
        <VehicleInspectionCard />
        <VehicleInspectionCard /> */}
        <Link href="/vehicle-inspection/create" className="fixed z-20 bottom-10 right-5">
          <VehicleInspectButton />
        </Link>
        
    </div>
  )
}
