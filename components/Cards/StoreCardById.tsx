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
import { DotsDialogStore } from '../DotsDialogStore';

type StoreCardByIdProps={
    store:Prisma.StoreGetPayload<{
        include:{
            images:true;
        };
    }>;
    user:User;
};

export default function StoreCardById({store, user}:StoreCardByIdProps) {
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
                                {user.name}</p>
                            <div className="flex items-center gap-1 text-sm text-gray-900">{formatTime(store.createdAt)}<DotsDialogStore id={store.id} images={store.images} /></div>
                            {/* <div className="flex items-center gap-1 text-sm text-gray-900">{formatTime(vehicleInspect.createdAt)}<Button onClick={handleDelete}>Delete</Button></div> */}
                        </div>
                    <p className="text-gray-900 font-semibold text-sm">{convertTimeToFormat(store.createdAt)}</p>
                </div>
        </div>

         <Carousel className="w-full h-full max-w-[300px] md:max-w-[600px] md:max-h-[600px] mx-auto">
                <CarouselContent>
                    {store.images && store.images.map((url:any, index:any) => {
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
                    <div>Mechanic: <span className='font-bold'> {store.mechanic}</span> </div>
                    <div className=''>Reg No: <span className='font-bold'>{store.regNo}</span></div>
            </div>
            <div className='flex flex-wrap space-x-3'>
                <div className=''>Product Name: <span className='font-bold'>{store.productName}</span>
                </div>
               
            </div>
            <div>{store.comment}</div>
            <Button onClick={()=>router.back()}>Back</Button>
         </div>
         
         
    </div>
  )
}
