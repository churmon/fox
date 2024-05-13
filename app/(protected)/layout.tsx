import { DrawerNav } from "@/components/DrawerNav";
import TopNavbar from "@/components/TopNavbar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Fox-Transport App",
  description: "A transport Company",
};


export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <TopNavbar />
        {children}
    </>
  );
}
