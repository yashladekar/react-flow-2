// apps/admin/components/dashboard-card.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";

export function DashboardCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <Card className="bg-zinc-950 border border-zinc-800">
            <CardHeader>
                <CardTitle className="text-sm text-zinc-400">{title}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}