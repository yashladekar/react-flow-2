// apps/admin/components/sidebar.tsx

import { cn } from "@workspace/ui/lib/utils";

const navItems = [
    { name: "Overview", href: "/dashboard" },
    { name: "Users", href: "/users" },
    { name: "Organizations", href: "/orgs" },
    { name: "Events", href: "/events" },
    { name: "Sentinel", href: "/sentinel" },
    { name: "Settings", href: "/settings" },
];
import Link from "next/link";

export function Sidebar() {
    return (
        <div className="w-64 border-r border-zinc-800 p-4 flex flex-col justify-between">
            <div>
                <h1 className="text-lg font-semibold mb-6">BETTER-AUTH.</h1>

                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <span className="block px-3 py-2 rounded-md text-sm hover:bg-zinc-900">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="text-xs text-zinc-500">
                <p>My Account</p>
                <p className="text-white">yash ladekar</p>
            </div>
        </div>
    );
}