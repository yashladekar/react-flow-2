import { env } from "@workspace/env/web";
import { createAuthClient } from "better-auth/react";

export const authClient: ReturnType<typeof createAuthClient> = createAuthClient({
    baseURL: `${env.NEXT_PUBLIC_SERVER_URL}/api/auth`,
});