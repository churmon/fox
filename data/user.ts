
// import { auth } from "@/auth";
import prisma from "@/lib/prisma"

export async function getUserByEmail(email:string) {
    const user = await prisma.user.findUnique({
        where:{email}
    })
  return user;
}

export async function getUserById(id:string | null | undefined) {
  if(!id) return;
    const user = await prisma.user.findUnique({
        where:{id}
    })
    if(!user) return;
  return user;
}

// export async function getCurrentUser() {
//   const session = await auth();
//   const id = session?.user.id!;
//   const user = await prisma.user.findUnique({
//       where:{id}
//   })
// return user;
// }

