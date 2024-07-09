"use client"
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import dynamic from "next/dynamic";
const DynamicLayout = dynamic(() => import("@/components/admin/AdminLayout"),
  { ssr: false, loading: () => <div className='initial__loading'/>}
);

export default function SuspendedDashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <SessionProviderWrapper>
      <DynamicLayout>{children}</DynamicLayout>
    </SessionProviderWrapper>
  );
}