// components/admin-guard.tsx

"use client";

import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const { data, isPending } = authClient.useSession();
    const router = useRouter();

    const accessQuery = useQuery({
        ...trpc.admin.checkAccess.queryOptions(),
        enabled: Boolean(data?.user) && !isPending,
        retry: false,
    });

    useEffect(() => {
        if (!isPending && !data?.user) {
            router.replace("/login");
        }

        if (!isPending && data?.user && accessQuery.isError) {
            router.replace("/login");
        }
    }, [accessQuery.isError, data, isPending, router]);

    if (isPending || (data?.user && accessQuery.isPending)) {
        return <div className="p-6">Loading...</div>;
    }

    if (!data?.user || accessQuery.isError) {
        return null;
    }

    return children;
}