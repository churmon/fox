import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const user = session?.user.id;
  console.log({session});
  return (
    <main>
      hello world {JSON.stringify(session)} 
      <form action={async()=>{
        "use server";
        await signOut();``
      }} className={`${session?.user ? "":'hidden'}`}>
        <Button type="submit">Log Out</Button>
      </form>
      <Link  href="/login" className={`${session?.user ? "hidden":'bg-gray-500 p-2'}`}>
        Log In
        </Link>
        <Link href="/vehicle-inspection" className={`${session?.user ? "bg-gray-500 p-2":'hidden'}`}>
        vehicle-inspection
    </Link>
    </main>
  );
}
