import VehicleInspectButton from "@/components/VehicleInspectButton";
import VehicleInspectionList from "@/components/VehicleInspectionList";
import { getVehiclesInspection } from "@/data/vehicle";
import Link from "next/link";

export default async function page() {
  
  const data = await getVehiclesInspection();
  
  return (
    <div className="relation h-full w-full">
      {data?.length === 0 ?"No data":<VehicleInspectionList  data={data} />}
        <Link href="/vehicle-inspection/create" className="fixed z-20 bottom-10 right-5 bg-green-500 p-3 rounded-full">
          <VehicleInspectButton />
        </Link>
        
    </div>
  )
}
