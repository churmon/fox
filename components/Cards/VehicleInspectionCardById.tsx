'use client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {convertTimeToFormat, formatTime } from '@/lib/TimeFormat';
import { Card, CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../ui/carousel';
import { Prisma, User } from '@prisma/client';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import deleteVehicleInspect from '@/actions/deleteVehicleInspect';
import { toast } from 'react-toastify';
import { DotsDialog } from '../DotsDialog';

type VehicleInspectionCardByIdProps={
    vehicleInspect:Prisma.VehicleInspectionGetPayload<{
        include:{
            vehicleInspectionImages:true;
        };
    }>;
    currentUser:User;
};

export default function VehicleInspectionCardById({vehicleInspect, currentUser}:VehicleInspectionCardByIdProps) {
    const router = useRouter();
    // const handleDelete = async ()=> {
    //           try {
    //             await deleteVehicleInspect(vehicleInspect.id);
    //             toast.success('Deleted Successfully');
    //           } catch (error) {
    //             toast.error('Something went wrong');
    //           }
                
    //         };

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
                            <div className="flex items-center gap-1 text-sm text-gray-900">{formatTime(vehicleInspect.createdAt)}<DotsDialog id={vehicleInspect.id} images={vehicleInspect.vehicleInspectionImages} /></div>
                            {/* <div className="flex items-center gap-1 text-sm text-gray-900">{formatTime(vehicleInspect.createdAt)}<Button onClick={handleDelete}>Delete</Button></div> */}
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
            <div className='flex flex-wrap space-x-3'>
                <div className=''>Fire Extinguish: <span className='font-bold'>{vehicleInspect.fireExt ? 'Yes' : 'No'}</span>
                </div>
                <div className=''>Jack: <span className='font-bold'>{vehicleInspect.jack ? 'Yes' : 'No'}</span>
                </div>
                <div className=''>Wheel Brace: <span className='font-bold'>{vehicleInspect.wheelBrace ? 'Yes' : 'No'}</span>
                </div>
                <div className=''>Triangle: <span className='font-bold'>{vehicleInspect.triangle ? 'Yes' : 'No'}</span>
                </div>
                <div className=''>First Aid: <span className='font-bold'>{vehicleInspect.firstAid ? 'Yes' : 'No'}</span>
                </div>
                <div className=''>Spare Wheel: <span className='font-bold'>{vehicleInspect.spareWheel ? 'Yes' : 'No'}</span>
                </div>
                <div className=''>Heads Lights: <span className='font-bold'>{vehicleInspect.headLights ? 'Working' : 'Not Working'}</span>
                </div>
                <div className=''>Indicator L: <span className='font-bold'>{vehicleInspect.indicatorL ? 'Working' : 'Not Working'}</span>
                </div>
                <div className=''>Indicator R: <span className='font-bold'>{vehicleInspect.indicatorR ? 'Working' : 'Not Working'}</span>
                </div>
                <div className=''>Brake Light L: <span className='font-bold'>{vehicleInspect.brakeLightL ? 'Working' : 'Not Working'}</span>
                </div>
                <div className=''>Brake Light R: <span className='font-bold'>{vehicleInspect.brakeLightR ? 'Working' : 'Not Working'}</span>
                </div>
                <div className=''>Hooter: <span className='font-bold'>{vehicleInspect.hooter ? 'Working' : 'Not Working'}</span>
                </div>
                <div className=''>Door Locks: <span className='font-bold'>{vehicleInspect.doorLock ? 'Working' : 'Not Working'}</span>
                </div>
                <div className=''>Two Way Radio: <span className='font-bold'>{vehicleInspect.wayRadio ? 'Working' : 'Not Working'}</span>
                </div>
                <div className=''>Water: <span className='font-bold'>{vehicleInspect.water ? 'Yes' : 'No'}</span>
                </div>
                <div className=''>Oil: <span className='font-bold'>{vehicleInspect.oil ? 'Yes' : 'No'}</span>
                </div>
                <div className=''>Brake Fluid: <span className='font-bold'>{vehicleInspect.brakeFluid ? 'Yes' : 'No'}</span>
                </div>
                <div className=''>Power Steering Oil: <span className='font-bold'>{vehicleInspect.steeringOil ? 'Yes' : 'No'}</span>
                </div>
            </div>
            <div>{vehicleInspect.comment}</div>
            <Button onClick={()=>router.back()}>Back</Button>
         </div>
         
         
    </div>
  )
}
