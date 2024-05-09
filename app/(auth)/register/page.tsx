import RegisterForm from "@/components/forms/RegisterForm";

export default function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div className="px-3">
            <RegisterForm />
        </div>
        <div className="hidden md:block">
            hi
        </div>
    </div>
  )
}