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
        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerContent className="bg-white flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
          <div className="p-4 bg-white flex-1 h-full">
            <div className="max-w-sm lg:max-w-md mx-auto">
            <LeftSidebar />
            </div>
          </div>
          <DrawerClose >
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}
