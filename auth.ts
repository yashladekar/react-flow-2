import dotenv from "dotenv";
import { existsSync } from "node:fs";
import path from "node:path";

const envPath = path.join(__dirname, "apps/server/.env");

if (!existsSync(envPath)) {
    throw new Error(
        `Better Auth Studio could not load ${envPath}. Copy apps/server/.env.example to apps/server/.env before starting the studio.`,
    );
}

dotenv.config({ path: envPath });

const authModule = require("./packages/auth/src/index.ts");

export const auth = authModule.auth;
export const createAuth = authModule.createAuth;
