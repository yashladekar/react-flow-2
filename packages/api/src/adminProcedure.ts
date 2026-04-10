import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "./index.js";

function getAdminEmails() {
    return (process.env.ADMIN_EMAILS ?? "")
        .split(",")
        .map((email: string) => email.trim().toLowerCase())
        .filter(Boolean);
}

function hasAdminAccess(email: string | undefined) {
    if (!email) {
        return false;
    }

    const adminEmails = getAdminEmails();

    if (adminEmails.length === 0) {
        return process.env.NODE_ENV === "development";
    }

    return adminEmails.includes(email.toLowerCase());
}

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
    if (!hasAdminAccess(ctx.session.user.email)) {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "Admin access required",
        });
    }

    return next({
        ctx: {
            ...ctx,
            session: ctx.session,
        },
    });
});