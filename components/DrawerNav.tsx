'use client'
import * as React from "react"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FcInspection } from "react-icons/fc";
import { CiUser } from "react-icons/ci";
import { MdCarRepair } from "react-icons/md";


import { sidebarLinks, sidebarLinksIcon } from "@/constants";

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { IoMdMenu } from "react-icons/io";
import LeftSidebar from "./DrawerAndLeftSidebar";
import { useState } from "react";
import logout from "@/actions/logout";


export function DrawerNav() {

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout= async ()=>{
    await logout();
    router.push("/login");
  }

 

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline"><IoMdMenu size={26} /></Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent className="w-[250px] md:max-w-sm">
          <div className="w-full">
          

          <section className=' ticky left-0 top-0 flex h-screen flex-col justify-between overflow-auto  pb-5 pt-18'>
      <div className='flex w-full flex-1 flex-col gap-1 px-1'>

      <Link href="/">
        <DrawerFooter>
            <DrawerClose className={`relative flex justify-start gap-4 rounded-lg p-4 ${pathname==="/"? "bg-blue-500 " : ""}`}>
            <Image
                src="/assets/home.svg"
                alt="home"
                width={24}
                height={24}
              />
              <p className='text-light-1 '>Home</p>
              </DrawerClose>
          </DrawerFooter>
      </Link>

      <Link href="/vehicle-inspection">
        <DrawerFooter>
            <DrawerClose className={`relative flex justify-start gap-4 rounded-lg p-4 ${pathname==="/vehicle-inspection"? "bg-blue-500 " : ""}`}>
              <FcInspection size={24} />
              <p className='text-light-1 '>Inspection</p>
              </DrawerClose>
          </DrawerFooter>
      </Link>

      <Link href="/repair">
        <DrawerFooter>
            <DrawerClose className={`relative flex justify-start gap-4 rounded-lg p-4 ${pathname==="/repair"? "bg-blue-500 " : ""}`}>
              <MdCarRepair size={24} />
              <p className='text-light-1 '>Repair</p>
              </DrawerClose>
          </DrawerFooter>
      </Link>

      <div onClick={handleLogout}>
        <DrawerFooter>
            <DrawerClose className={`relative flex justify-start gap-4 rounded-lg p-4`}>
            <Image
                src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}
              />

              <p className='text-light-2 '>Logout</p>
              </DrawerClose>
          </DrawerFooter>
      </div>

      
        {/* {sidebarLinks.map((link:any) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          // if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <DrawerFooter>
              
            <Link
              href={link.route}
              key={link.label}
              
            ><DrawerClose className={`relative flex justify-start gap-4 rounded-lg p-1 ${isActive && "bg-primary-500 "}`}>
              
            
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className='text-light-1 '>{link.label}</p>
              
              </DrawerClose>
            </Link>
            
            </DrawerFooter>
            
          );
        })} */}

              
            
            
      </div>

      {/* <div className='mt-10 px-6'>
          <div onClick={() => router.push("/sign-in")}>
            <div className='flex cursor-pointer gap-4 p-4'>
              <Image
                src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}
              />

              <p className='text-light-2 '>Logout</p>
            </div>
          </div>
      </div> */}
    </section>
           {/* <Button>Submit</Button>
          <DrawerClose>
          <LeftSidebar />
          </DrawerClose> */}
          
            <div className="">
            {/* <LeftSidebar /> */}
            </div>
          </div>
          
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}
