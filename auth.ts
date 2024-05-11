import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import { userRole } from "@prisma/client"

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: userRole
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}


 
export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks:{
    async signIn({user}){
      const existingUser = await getUserById(user.id!);
      if(!existingUser?.access) return false
      return true;
    },
    async session({ session,token }) {
      if(session.user && token.sub){
        session.user.id = token.sub;
      }
      if(session.user && token.role){
        session.user.role = token.role as userRole;
      }
      return session
    },
    async jwt({ token }) {
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;
      token.role = existingUser.role;
      console.log({token});
      return token
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})