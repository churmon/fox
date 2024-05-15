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
    
    // login(values).then((data)=>{
    //   // toast.success(data.);
    //   setLoading(false);
    //   toast.error(data?.error);
    // })

    const res = await login(values);
    if(res?.error){
      setLoading(false);
      toast.error(res?.error);
    }
    if(res?.data){
      setLoading(false);
      toast.success("login successfully");
      navigate.push('/')
    }

  }

  return (
    <div className="flex justify-center items-center h-full">
      <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[300px] sm:w-[350px] lg:w-[450px]" >
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your Email" {...field} />
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
                <Input type="password" placeholder="Enter your Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">{loading ? <BeatLoader size={15} color="#ffffff" /> :'Submit'} </Button>
      </form>
    </Form>
    <div className="flex justify-end">
            Do not have an account?
          <Link href="/register" className="pl-2 font-bold">register</Link>
          </div>
    </div>
    </div>
    
  )
}
