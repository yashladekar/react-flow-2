import { initTRPC, TRPCError } from "@trpc/server";

export const t = initTRPC.context<{
    session: any;
}>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({
        ctx: {
            ...ctx,
            session: ctx.session,
        },
    });
});