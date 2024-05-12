import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";

export default function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 h-screen">
            <RegisterForm />
        <div className="hidden md:block h-screen relative">
            <Image src="/images/IMG_9438.webp" alt="" fill className="w-full h-full object-cover"/>
        </div>
    </div>
  )
}