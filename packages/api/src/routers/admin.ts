// packages/api/src/routers/admin.ts

import prisma from "@workspace/database";
import { router } from "../index.js";
import { adminProcedure } from "../adminProcedure.js"; // create this if not

export const adminRouter = router({
    checkAccess: adminProcedure.query(({ ctx }) => ({
        ok: true,
        email: ctx.session.user.email,
    })),
    getStats: adminProcedure.query(async () => {
        const totalUsers = await prisma.user.count();

        const last24h = new Date(Date.now() - 86400000);

        const newUsers = await prisma.user.count({
            where: { createdAt: { gte: last24h } },
        });

        return {
            totalUsers,
            newUsers,
            activeUsers: newUsers,
        };
    }),
});