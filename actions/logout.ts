'use server'

import { signOut } from "@/auth"

export default async function logout() {
  return await signOut();
}
