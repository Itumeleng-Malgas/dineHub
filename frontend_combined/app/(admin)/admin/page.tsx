import { redirect } from "next/navigation";

export default function AdminHome() {
  return (
    redirect('/admin/dashboard')
  );
}
