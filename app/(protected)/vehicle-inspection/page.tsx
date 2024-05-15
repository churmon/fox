import VehicleInspectButton from "@/components/VehicleInspectButton";
import VehicleInspectionForm from "@/components/forms/VehicleInspectionForm";
import Link from "next/link";
import { MdOutlineCreate } from "react-icons/md";

export default function page() {
  return (
    <div className="relation h-full w-full">

        
        <Link href="/vehicle-inspection/create" className="fixed z-20 bottom-10 right-5">
          <VehicleInspectButton />
        </Link>
        
    </div>
  )
}
