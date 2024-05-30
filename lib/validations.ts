import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, {
      message: "name must be at least 3 characters.",
    }).regex(new RegExp("^(?!\\d)[a-zA-Z0-9]+(?:\\s[a-zA-Z0-9]+)*$"),"No special character or empty spaces allowed and must not start with a number!" ),
    surname: z.string().min(3, {
        message: "surname must be at least 3 characters.",
      }).regex(new RegExp("^(?!\\d)[a-zA-Z0-9]+(?:\\s[a-zA-Z0-9]+)*$"),"No special character or empty spaces allowed and must not start with a number!" ),
    email: z.string().email(),
    password: z.string().min(6,{
        message: "password must be at least 6 characters.",
    }),
    ConfirmPassword: z.string().min(6,{
      message: "password must be at least 6 characters.",
  }).optional()

  }).refine(data=>data.password===data.ConfirmPassword,{
    message:"Password and Confirm Password does not match!",
    path:["ConfirmPassword"]
  })

  export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6,{
        message: "password must be at least 6 characters.",
    })

  })

  export const StoreSchema = z.object({
    mechanic: z.string().min(3, {
      message: "Mechanic Name must be at least 3 characters.",
    }).regex(new RegExp("^[a-zA-Z0-9]+$"),"No special character!" ),

    productName: z.string().min(3, {
      message: "Product Name must be at least 3 characters.",
    }).regex(new RegExp("^[a-zA-Z0-9]+$"),"No special character!" ),

    comment: z.string().optional(),
    regNo: z.string().optional(),

  })



  export const vehicleInspectionSchema = z.object({
    driverName: z.string().min(3, {
      message: "Driver name must be at least 3 characters.",
    }).regex(new RegExp("^(?!\\d)[a-zA-Z0-9]+(?:\\s[a-zA-Z0-9]+)*$"),"No special character or empty spaces allowed and must not start with a number!" ),
    driverSurname: z.string().min(3, {
      message: "Driver surname must be at least 3 characters.",
    }).regex(new RegExp("^(?!\\d)[a-zA-Z0-9]+(?:\\s[a-zA-Z0-9]+)*$"),"No special character or empty spaces allowed and must not start with a number!" ),
    regNo: z.string().min(3, {
      message: "Register Number must be at least 3 characters.",
    }),
    // vehicleInspectionImages: z.custom<File[]>().optional(),
    comment: z.string().optional(),
    fireExt:z.boolean().optional(),
    jack:z.boolean().optional(),
    wheelBrace:z.boolean().optional(),
    triangle:z.boolean().optional(),
    firstAid:z.boolean().optional(),
    spareWheel:z.boolean().optional(),
    headLights:z.boolean().optional(),
    indicatorL:z.boolean().optional(),
    indicatorR:z.boolean().optional(),
    brakeLightL:z.boolean().optional(),
    brakeLightR:z.boolean().optional(),
    hooter:z.boolean().optional(),
    doorLock:z.boolean().optional(),
    wayRadio:z.boolean().optional(),
    water:z.boolean().optional(),
    oil:z.boolean().optional(),
    brakeFluid:z.boolean().optional(),
    steeringOil:z.boolean().optional(),

  })