import prisma from "@workspace/database";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, tenantProcedure } from "../index.js";

export const todoRouter = router({
    getAll: tenantProcedure.query(async ({ ctx }) => {
        return prisma.todo.findMany({
            where: {
                organizationId: ctx.organizationId,
                deletedAt: null,
            },
            orderBy: {
                id: "asc",
            },
        });
    }),
    create: tenantProcedure.input(z.object({ text: z.string().min(1) })).mutation(async ({ ctx, input }) => {
        return prisma.todo.create({
            data: {
                text: input.text,
                organizationId: ctx.organizationId,
                createdById: ctx.session.user.id,
            },
        });
    }),
    toggle: tenantProcedure
        .input(z.object({ id: z.number(), completed: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            const result = await prisma.todo.updateMany({
                where: {
                    id: input.id,
                    organizationId: ctx.organizationId,
                    deletedAt: null,
                },
                data: {
                    completed: input.completed,
                },
            });

            if (result.count === 0) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Todo not found",
                });
            }

            return prisma.todo.findFirstOrThrow({
                where: {
                    id: input.id,
                    organizationId: ctx.organizationId,
                },
            });
        }),
    delete: tenantProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {
        const result = await prisma.todo.updateMany({
            where: {
                id: input.id,
                organizationId: ctx.organizationId,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date(),
            },
        });

        if (result.count === 0) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Todo not found",
            });
        }

        return {
            success: true,
        };
    }),
});