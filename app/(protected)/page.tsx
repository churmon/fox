import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/data/user";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const id = session?.user.id;
  const current = await getUserById(id);
  console.log({session});
  return (
    <main>
      <div>{current?.name} {current?.surname}</div>
      
      <Link  href="/login" className={`${session?.user ? "hidden":'bg-gray-500 p-2'}`}>
        Log In
        </Link>
        {/* <Link href="/vehicle-inspection" className={`${session?.user ? " bg-gray-500 p-2":'hidden'}`}>
        vehicle-inspection
    </Link> */}
    </main>
  );
}
