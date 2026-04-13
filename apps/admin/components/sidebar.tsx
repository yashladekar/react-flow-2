// apps/admin/components/sidebar.tsx

import Link from "next/link";
import { cn } from "@workspace/ui/lib/utils";

type NavItem = {
    name: string;
    href: string;
    external?: boolean;
};

const navItems: NavItem[] = [
    { name: "Overview", href: "/dashboard" },
    { name: "Users", href: "/users" },
    { name: "Organizations", href: "/orgs" },
    { name: "Events", href: "/events" },
    { name: "Sentinel", href: "/sentinel" },
    { name: "Settings", href: "/settings" },
    { name: "Studio (Local)", href: "http://localhost:3003", external: true },
    { name: "Studio (Cloud)", href: "https://better-auth.build/", external: true },
];

export function Sidebar() {
    return (
        <div className="w-64 border-r border-zinc-800 p-4 flex flex-col justify-between">
            <div>
                <h1 className="text-lg font-semibold mb-6">BETTER-AUTH.</h1>

                <nav className="space-y-2">
                    {navItems.map((item) => (
                        item.external ? (
                            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
                                <span className="block px-3 py-2 rounded-md text-sm hover:bg-zinc-900">
                                    {item.name}
                                </span>
                            </a>
                        ) : (
                            <Link key={item.href} href={item.href}>
                                <span className="block px-3 py-2 rounded-md text-sm hover:bg-zinc-900">
                                    {item.name}
                                </span>
                            </Link>
                        )
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