import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { FiLogOut } from 'react-icons/fi';

export default async function Logout() {
    const session = await auth();
  const id = session?.user.id;
  return (
    <form action={async()=>{
        "use server";
        await signOut();
      }} className={`${session?.user ? "":'hidden'} flex justify-center items-center`}>
        <Button type="submit"><FiLogOut size={26} />Log Out</Button>
      </form>
  )
}
