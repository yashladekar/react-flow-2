// app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        await authClient.signIn.email(
            {
                email,
                password,
            },
            {
                onSuccess: () => {
                    router.push("/dashboard");
                },
                onError: () => {
                    alert("Invalid credentials");
                },
            }
        );
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="w-full max-w-sm space-y-4 p-6 border border-zinc-800 rounded-lg">
                <h1 className="text-xl font-semibold">Admin Login</h1>

                <input
                    className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full p-2 bg-white text-black rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}