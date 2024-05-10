import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  console.log({session});
  return (
    <main>
      hello world {JSON.stringify(session)} 
      <form action={async()=>{
        "use server";
        await signOut();
      }}>
        <Button type="submit">Log Out</Button>
      </form>
    </main>
  );
}
