"use client";

import { DashboardCard } from "@/components/dashboard-card";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";

type Stats = {
    totalUsers: number;
    newUsers: number;
    activeUsers: number;
};

export default function OverviewPage() {
    const { data, isLoading } = useQuery(trpc.admin.getStats.queryOptions());

    const stats = data as Stats | undefined;

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-xl font-semibold tracking-tight">Welcome back, yash ladekar</h1>

            <div className="grid grid-cols-3 gap-4">
                <DashboardCard title="Active Users">
                    <p className="text-2xl font-bold">{isLoading ? "..." : stats?.activeUsers ?? 0}</p>
                </DashboardCard>

                <DashboardCard title="New Users">
                    <p className="text-2xl font-bold">{isLoading ? "..." : stats?.newUsers ?? 0}</p>
                </DashboardCard>

                <DashboardCard title="Total Users">
                    <p className="text-2xl font-bold">{isLoading ? "..." : stats?.totalUsers ?? 0}</p>
                </DashboardCard>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <DashboardCard title="User Growth">
                    <div className="h-40 rounded-md bg-zinc-900" />
                </DashboardCard>

                <DashboardCard title="Recent Users">
                    <div>No users yet</div>
                </DashboardCard>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <DashboardCard title="Global Users">
                    <div className="h-48 rounded-md bg-zinc-900" />
                </DashboardCard>

                <DashboardCard title="Insights">
                    <div className="text-red-500">Unreachable</div>
                </DashboardCard>
            </div>
        </div>
    );
}