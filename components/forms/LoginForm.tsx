"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import login from "@/actions/login"
import { toast } from "react-toastify"
import BeatLoader from "react-spinners/BeatLoader";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginSchema } from "@/lib/validations"
import Link from "next/link"



export default function LoginForm() {

    const[loading,setLoading] = useState(false);
    const navigate = useRouter()
 // 1. Define your form.
 const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    
    login(values).then((data)=>{
      // toast.success(data.);
      setLoading(false);
      toast.error(data?.error);
    })

  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{loading ? <BeatLoader size={15} color="#ffffff" /> :'Submit'} </Button>
      </form>
    </Form>
    <Link href="/register">
        <Button variant="default">register</Button>
    </Link>
    <Link href="/">
        <Button variant="default">Home</Button>
    </Link>
    </>
    
  )
}
