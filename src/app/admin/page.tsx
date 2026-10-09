import { cmsConfigured } from "@/lib/cms-server";
import { AdminPanel } from "@/components/admin/AdminPanel";
export const metadata = { title: "Lumo Yönetim", robots: { index:false,follow:false } };
export const dynamic = "force-dynamic";
export default function AdminPage() { return <AdminPanel configured={cmsConfigured()} />; }
