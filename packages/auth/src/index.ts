import { createPrismaClient } from "@workspace/database";
import { env } from "@workspace/env/server";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization } from "better-auth/plugins/organization";

const trustedOrigins = Array.from(new Set([env.CORS_ORIGIN, "http://localhost:3002"]));

export function createAuth() {
    const prisma = createPrismaClient();

    return betterAuth({
        database: prismaAdapter(prisma, {
            provider: "postgresql",
        }),
        trustedOrigins,
        emailAndPassword: {
            enabled: true,
            minPasswordLength: 5,
        },
        secret: env.BETTER_AUTH_SECRET,
        baseURL: env.BETTER_AUTH_URL,
        cookies: {
            secure: false,
        },
        plugins: [
            organization(),
        ],
    });
}

export const auth = createAuth();