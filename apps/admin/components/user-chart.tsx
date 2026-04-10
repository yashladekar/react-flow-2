// components/user-chart.tsx

"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = [
    { value: 0 },
    { value: 2 },
    { value: 1 },
    { value: 4 },
];

export function UserChart() {
    return (
        <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}