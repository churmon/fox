import VehicleInspectButton from "@/components/VehicleInspectButton";
import StoreList from "@/components/StoreList";
import Link from "next/link";
import { getStore } from "@/data/store";

export default async function page() {
  
  const data = await getStore() || [];
  
  return (
    <div className="relation h-full w-full">
      {data?.length === 0 ?"No data":<StoreList  data={data} />}
        <Link href="/store/create" className="fixed z-20 bottom-10 right-5 bg-green-500 p-3 rounded-full">
          <VehicleInspectButton />
        </Link>
        
    </div>
  )
}
