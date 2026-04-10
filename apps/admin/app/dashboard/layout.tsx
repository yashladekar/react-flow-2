import { Sidebar } from "@/components/sidebar";
import { AdminGuard } from "@/components/admin-guard";
import { Topbar } from "@/components/topbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminGuard>
            <div className="flex h-screen bg-black text-white">
                <Sidebar />

                <div className="flex flex-1 flex-col">
                    <Topbar />
                    <div className="flex-1 overflow-auto">{children}</div>
                </div>
            </div>
        </AdminGuard>
    );
}