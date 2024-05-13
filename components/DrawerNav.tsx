import * as React from "react"
import { Minus, Plus } from "lucide-react"

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


export function DrawerNav() {

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline"><IoMdMenu size={26} /></Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent className="w-[250px] md:max-w-sm">
          <div className="w-full">
            <div className="">
            <LeftSidebar />
            </div>
          </div>
          
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}
