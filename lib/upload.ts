import { createClient } from "@supabase/supabase-js";
import { storage } from "./firebase";
import { UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


export async function uploadImages(images: File[]) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const data = await Promise.all(
    Array.from(images).map((file) =>
      supabase.storage.from("files").upload(`vehicleInspection/${file.name}_${Date.now()}`, file)
    )
  );

  const urls = data.map(
    (item) =>
      supabase.storage.from("files").getPublicUrl(item.data?.path ?? "").data.publicUrl
  );

  return urls;
}





export async function uploadAvatar(image: File) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const data = await supabase.storage.from("avatars").upload(`${image.name}_${Date.now()}`, image);

  console.log({ data });

  const urlData = await supabase.storage.from("avatars").getPublicUrl(data.data?.path!);

  return urlData.data.publicUrl;
}

export async function uploadImageFirebase(image: File, folder:string) {

  // const imageUrl:string[] =[];
  return new Promise((resolve,reject)=>{

    const storageRef = ref(storage, `${folder}/${image.name}_${Date.now()}`);
  const uploadTask = uploadBytesResumable(storageRef, image);
  uploadTask.on(
    "state_changed",
    (snapshot:UploadTaskSnapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // Update progress if needed
      console.log('Upload is ' + progress + '% done');

    },
    (error) => {
      // Handle errors
      console.log("upload error:", error);
      reject(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        // Get the download URL of the uploaded image
        resolve(url)
        console.log("Download URL:", url);
      });
    }
  );
  // console.log("Download URL before return:", imageUrl[0]);
  // return imageUrl[0];


  })

}


export async function uploadImagesFirebase(images: File[],folder:string) {
  
  
  const imagesUrls:string[] = [];
  const data = await Promise.all(
    Array.from(images).map(async (file) =>{
      const urls:any = await uploadImageFirebase(file,folder);
      imagesUrls.push(urls);
    }
      
    )
  );


  return imagesUrls;
}