"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { StoreSchema, registerSchema, vehicleInspectionSchema } from "@/lib/validations"
import register from "@/actions/register"
import { toast } from "react-toastify"
import BeatLoader from "react-spinners/BeatLoader";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Checkbox } from "../ui/checkbox"
import FileUploader from "../FileUploader"
import { uploadImages, uploadImagesFirebase } from "@/lib/upload"
import vehicleInspection from "@/actions/vehicleInspection"
import Link from "next/link"
import store from "@/actions/store"



export default function StoreForm() {

    const[loading,setLoading] = useState(false);
    const [file, setFile] = useState<File[]>([]);
    const navigate = useRouter()
 // 1. Define your form.
 const form = useForm<z.infer<typeof StoreSchema>>({
    resolver: zodResolver(StoreSchema),
    defaultValues: {
          mechanic: "",
          productName: "",
          regNo: "",
        //   vehicleInspectionImages: [],
          comment: "",
         
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof StoreSchema>) {
    // console.log(values,file);
    setLoading(true);
    // const vehicleInspectionImages = await uploadImages(file);
    const images = await uploadImagesFirebase(file,"StoreImages");
    // uploadImagesFirebase
    // console.log(vehicleInspectionImages);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    try{

    
    await store(values,images);
    toast.success("Data saved Successfully");
    // navigate.push('/vehicle-inspection');
    } catch (error) {
      toast.error("Failed to save Data");
    }finally{
      setLoading(false);
    }
    
    
    // if(res.error){
    //   setLoading(false);
    //   toast.error(res.error);
    //   return;
    // }
  }
  

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mx-4 mb-5">
        <FormField
          control={form.control}
          name="mechanic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mechanic Name</FormLabel>
              <FormControl>
                <Input placeholder="Mechanic Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Product Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration No</FormLabel>
              <FormControl>
                <Input placeholder="Reg No" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input placeholder="Comment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Input type="file" onChange={(e:any)=> setFile(e.target.files)}  multiple/>
        <div className="flex gap-2 flex-wrap">
      <div className="grid grid-cols-2 gap-2">
        
        
        </div>
        </div>
        {/* <FormField
          control={form.control}
          name="vehicleInspectionImages"
          render={({ field }) => (
            <FormItem>
              <FormControl> */}
                {/* <Input type='file' placeholder="Driver Surname" {...field.onChange()} multiple/> */}
                {/* <FileUploader
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <div className="bg-red-300"> */}
        <Button type="submit" className="w-full mx-auto">{loading ? <BeatLoader size={15} color="#ffffff" /> :'Submit'} </Button>
        {/* </div> */}
      </form>
    </Form>
    </>
    
  )
}

