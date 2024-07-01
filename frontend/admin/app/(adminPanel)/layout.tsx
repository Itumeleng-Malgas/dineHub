import dynamic from "next/dynamic";

const DynamicLayout = dynamic(() => import("@/components/adminPanel/AdminLayout"),
  { ssr: false, loading: () => <div className='initial__loading'/>}
);

export default function SuspendedDashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
      <DynamicLayout>{children}</DynamicLayout>
  );
}