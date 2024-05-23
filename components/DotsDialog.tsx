'use client'
import {
    Users,
  } from "lucide-react"
  import { BsTrash3 } from "react-icons/bs";
  import { MdOutlineEdit } from "react-icons/md";
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { BsThreeDotsVertical } from "react-icons/bs";
import { tracingChannel } from "diagnostics_channel";
import { toast } from "react-toastify";
import deleteVehicleInspect from "@/actions/deleteVehicleInspect";
  export function DotsDialog({id}:{id:string}) {

    const handleDelete = async ()=> {
      try {
        const res = await deleteVehicleInspect(id);
        if(res?.error){
          toast.error(res?.error);
          return;
        }
        toast.success('Deleted Successfully');
      } catch (error) {
        toast.error('Something went wrong');
      }
        
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        
        <Button variant="ghost"><BsThreeDotsVertical size={18} /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <div className="flex">
              <MdOutlineEdit className="mr-2 h-4 w-4" />
              <span>Edit</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div onClick={handleDelete} className="flex cursor-pointer">
              <BsTrash3 className="mr-2 h-4 w-4" />
              <span>Delete</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  