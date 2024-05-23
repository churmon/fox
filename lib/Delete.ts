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

export async function DeleteImages(id:string) {

    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {

        const imageUrls = await prisma.vehicleInspection.findUnique({
            where:{
                id,
            },
            include:{
                vehicleInspectionImages:true,
            }
    
        })
        if(!imageUrls)return;
        if(imageUrls?.vehicleInspectionImages.length === 0) return;
        console.log(imageUrls.vehicleInspectionImages);
        await Promise.all(
         Array.from(imageUrls.vehicleInspectionImages).map((file) =>{
            const url = file.url;
            if(!url)return;
             const res = url.substring(url.lastIndexOf("/") + 1, url.length);
             console.log(res);
            return supabase.storage.from("files").remove([`vehicleInspection/${res}`])
        }
          )
        );
    
        
    } catch (error) {
        return {error:"Something went wrong"}
    }  
    // const urls = data.map(
    //   (item) =>
    //     supabase.storage.from("files").getPublicUrl(item.data?.path ?? "").data.publicUrl
    // );
  
    // return urls;
  }
