import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Prisma, User, VehicleInspection } from '@prisma/client'
import Image from "next/image"
import { convertTimeToFormat, formatTimeAgo } from '@/lib/TimeFormat'

type VehicleInspectionCardProps = {
    vehicleInspect : Prisma.VehicleInspectionGetPayload<{
        include:{
            vehicleInspectionImages:true
        },
    }>;
    currentUser : User
}



export default async function VehicleInspectionCard({vehicleInspect,currentUser}:VehicleInspectionCardProps) {

    if(!currentUser)return;

    // const user = await getCurrentUser();
    // if(!user) return;
  
  return (

    <div className="flex flex-col bg-white shadow-lg rounded-lg mx-4 md:mx-auto max-w-md md:max-w-2xl mt-5 overflow-y-auto">
        <div className="flex items-start px-4 py-2">
            {/* <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src="/images/IMG_($#*.webp" alt="avatar" /> */}
                <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className='h-14 w-14' />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="w-full">
                        <div className="flex items-center w-full justify-between">
                            <p className="text-lg font-semibold text-gray-900 -mt-1 ml-1">
                                {currentUser.name}</p>
                            <div className="text-sm text-gray-700">{formatTimeAgo(vehicleInspect.createdAt)}</div>
                        </div>
                    <p className="text-gray-700 font-bold text-sm">{convertTimeToFormat(vehicleInspect.createdAt)}</p>
                </div>
        </div>

         <Carousel className="w-full max-w-[300px] mx-auto">
                <CarouselContent>
                    {vehicleInspect.vehicleInspectionImages && vehicleInspect.vehicleInspectionImages.map((url:any, index:any) => {
                        console.log(url);
                        if(!url)return;
                        return (
                            <CarouselItem key={index}>
                        <div className="p-1">
                        <Card className='w-full h-full relative'>
                            <CardContent className="flex aspect-square items-center justify-center p-6 w-full h-full relative">
                            <Image src={url.url} alt="image" fill className=" object-cover object-center" />
                            {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                        )
                    })}
                </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </Carousel> 

         
         <div className="flex items-start px-4 py-2">
            <p className=" text-gray-700 text-sm">
                Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit amet!
            </p>
         </div>
         
         
    </div>
  )
}
