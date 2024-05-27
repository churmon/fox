// var rest = str.substring(0, str.lastIndexOf("/") + 1);
// var last = str.substring(str.lastIndexOf("/") + 1, str.length);
// https://vwluzevqbgdoxiypuoag.supabase.co/storage/v1/object/public/files/vehicleInspection/IMG_20240517_201457.jpg_1715970197242

// var vars = "var1/var2/var3";
// var arrVars = vars.split("/");
// var lastVar = arrVars.pop();
// var restVar = arrVars.join("/");

// console.log("Rest: " + restVar); // Outputs: "var1/var2/"
// console.log("Last: " + lastVar); // Outputs: "var3"


import { createClient } from "@supabase/supabase-js";
import prisma from "./prisma";

export async function deleteImageFromStorage(url:any){

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
    const supabase = createClient(supabaseUrl, supabaseKey);
    try {
        console.log(url);
        const path = url.split('https://vwluzevqbgdoxiypuoag.supabase.co/storage/v1/object/public/files/vehicleInspection/')[1];
        const {error} = await supabase.storage.from("files").remove([`vehicleInspection/${path}`]);
        console.log(path);
        if(error){
            console.log("Error deleting image from storage: ",error);
        }
        
    } catch (error:any) {
        console.error("Error deleting image from storage: ",error.message);
        return {error:"Error deleting image from storage: "}
    }

}

export async function DeleteImages(urls:any[]) {


    try {

        await Promise.all(urls.map(async (url)=>{
            
            await deleteImageFromStorage(url.url);
        }));
        
    } catch (error:any) {
        console.error("Error deleting image from storage: ",error.message);
        return {error:"Error deleting image from storage: "}
    }
  }
