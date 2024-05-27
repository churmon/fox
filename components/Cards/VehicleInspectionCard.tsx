'use client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import TimeAgo from 'react-timeago';
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
import { getUserById } from '@/data/user'
import { convertTimeToFormat } from '@/lib/TimeFormat';
import { DotsDialog } from '../DotsDialog';

type VehicleInspectionCardProps = {
    vehicleInspect : Prisma.VehicleInspectionGetPayload<{
        include:{
            vehicleInspectionImages:true
        },
    }>;
    currentUser: User;
}


export default function VehicleInspectionCard({vehicleInspect,currentUser}:VehicleInspectionCardProps) {
    
    

  
  return (

    <div className="flex flex-col bg-white shadow-lg rounded-lg mx-4 md:mx-5 max-w-md md:max-w-full mt-5 overflow-y-auto">
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
                            <div className=" text-sm text-gray-900"><TimeAgo date={vehicleInspect.createdAt} /> </div>
                            </div>
                    <p className="text-gray-900 font-semibold text-sm">{convertTimeToFormat(vehicleInspect.createdAt)}</p>
                </div>
        </div>

         <Carousel className="w-full h-full max-w-[300px] md:max-w-[600px] md:max-h-[600px] mx-auto">
                <CarouselContent>
                    {vehicleInspect.vehicleInspectionImages && vehicleInspect.vehicleInspectionImages.map((url:any, index:any) => {
                        // console.log(url);
                        if(!url)return;
                        return (
                            <CarouselItem key={index}>
                        <div className="p-1">
                        {/* <Image src={url.url} alt="image" fill className="w-full h-full overflow-hidden object-cover object-center" /> */}
                        <Card className='w-full h-full relative'>
                            <CardContent className="flex aspect-square items-center justify-center p-6 w-full h-full relative">
                            <Image src={url.url} alt="image" fill className="w-full h-full overflow-hidden object-cover" />
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

         
         <div className="flex flex-col px-4 py-2">
            <div className='flex flex-col md:flex-row md:space-x-5'>
                    <div>Driver: <span className='font-bold'> {vehicleInspect.driverName} {vehicleInspect.driverSurname}</span> </div>
                    <div className=''>Reg No: <span className='font-bold'>{vehicleInspect.regNo}</span></div>
            </div>         
         </div>
         
         
    </div>
  )
}
