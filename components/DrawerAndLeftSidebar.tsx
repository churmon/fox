"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FcInspection } from "react-icons/fc";
import { CiUser } from "react-icons/ci";
import { MdCarRepair } from "react-icons/md";


import { sidebarLinks, sidebarLinksIcon } from "@/constants";
import logout from "@/actions/logout";
import Lougout from "./Lougout";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout= ()=>{
    // await logout();
    router.push("/logout");
  }

  const sidebarLinksIcon = [
    {
      icon: 'CiUser',
      route: "/",
      label: "MyHome",
    },
    {
      imgURL: 'MdCarRepair',
      route: "/search",
      label: "MySearch",
    },
  ];

//   const { userId } = useAuth();
    const userId = 'tyhgjtyghjg';

  return (
    <section className=' ticky left-0 top-0 flex h-screen flex-col justify-between overflow-auto  pb-5 pt-18'>
      <div className='flex w-full flex-1 flex-col gap-3 px-1'>
        {sidebarLinks.map((link:any) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          // if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex justify-start gap-4 rounded-lg p-4 ${isActive && "bg-primary-500 "}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className='text-light-1 '>{link.label}</p>
            </Link>
          );
        })}


              <Link
              href="/vehicle-inspection"
              className={`relative flex justify-start gap-4 rounded-lg p-4 ${pathname==="/vehicle-inspection"? "bg-blue-500 " : ""}`}
            >
              <FcInspection size={24} />

              <p className='text-light-1 '>Inspection</p>
            </Link>
      </div>

      <div className='mt-10 px-6'>
          <div onClick={handleLogout}>
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
          {/* <Lougout /> */}
      </div>
    </section>
  );
};

export default LeftSidebar;