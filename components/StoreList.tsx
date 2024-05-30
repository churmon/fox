import { getUserById } from "@/data/user";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import StoreCard from "./Cards/StoreCard";

type StoreListProps={
    data: Prisma.StoreGetPayload<{
        include:{
            images:true
        },
    }>[];
}


export default async function StoreList({data}:StoreListProps) {
// const session = await auth();
  // const currentUser = await getUserById(session?.user.id);
  // const currentUser = await getUserById(data.userId);
  //   if(!currentUser)return;

  return (
    <>
      {data.map(async (store)=>{
        const user = await getUserById(store.userId);
        if(!user)return;
    return <Link href={`/store/${store.id}`} key={store.id}><StoreCard store={store} user={user}  /></Link>})}
    </>
  )
}
