import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "./lib/validations"
import { getUserByEmail } from "./data/user";
 
export default { 
    providers: [
        Credentials({
            async authorize(credentials){
                const validatedFields = loginSchema.safeParse(credentials);
                if(!validatedFields.success){
                    return null;
                }

                const {email,password} = validatedFields.data;
                const existingUser = await getUserByEmail(email);
                if(existingUser){

                const checkPassword = existingUser.password?.toString() === password
                if(!checkPassword){
                    return null;
                }
                return existingUser;
            }
                return null;
            }
        })
    ],
} satisfies NextAuthConfig