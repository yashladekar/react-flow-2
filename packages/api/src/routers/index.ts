import { protectedProcedure, publicProcedure, router } from "../index.js";
import { todoRouter } from "./todo.js";
import { adminRouter } from "./admin.js";

export const appRouter = router({
    healthCheck: publicProcedure.query(() => "OK"),
    privateData: protectedProcedure.query(({ ctx }) => ({
        message: "This is private",
        user: ctx.session.user,
    })),
    todo: todoRouter,
    admin: adminRouter,
});

export type AppRouter = typeof appRouter;