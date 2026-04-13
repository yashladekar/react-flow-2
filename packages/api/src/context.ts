import { auth } from "@workspace/auth";
import prisma from "@workspace/database";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { TRPCError } from "@trpc/server";
import { fromNodeHeaders } from "better-auth/node";

async function ensurePersonalMembership(userId: string, email: string | undefined) {
    const existingMembership = await prisma.membership.findFirst({
        where: {
            userId,
            status: "active",
        },
        orderBy: {
            createdAt: "asc",
        },
        select: {
            organizationId: true,
        },
    });

    if (existingMembership) {
        return existingMembership.organizationId;
    }

    const plan = (await prisma.plan.findFirst({ select: { id: true }, orderBy: { price: "asc" } }))
        ?? (await prisma.plan.create({
            data: {
                name: "FREE",
                price: 0,
                maxUsers: 5,
                maxProjects: 5,
            },
            select: {
                id: true,
            },
        }));

    const seed = (email ?? userId).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const slugBase = `workspace-${seed || "user"}`;

    for (let attempt = 0; attempt < 100; attempt++) {
        const candidateSlug = attempt === 0 ? slugBase : `${slugBase}-${attempt + 1}`;

        try {
            const created = await prisma.$transaction(async (tx) => {
                const organization = await tx.organization.create({
                    data: {
                        name: "Personal Workspace",
                        slug: candidateSlug,
                        planId: plan.id,
                    },
                    select: {
                        id: true,
                    },
                });

                const role = await tx.role.create({
                    data: {
                        name: "OWNER",
                        organizationId: organization.id,
                    },
                    select: {
                        id: true,
                    },
                });

                await tx.membership.create({
                    data: {
                        userId,
                        organizationId: organization.id,
                        roleId: role.id,
                        status: "active",
                    },
                });

                return organization.id;
            });

            return created;
        } catch {
            continue;
        }
    }

    throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to create personal workspace",
    });
}

export async function createContext(opts: CreateExpressContextOptions) {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(opts.req.headers),
    });

    let organizationId: string | null = null;

    if (session?.user?.id) {
        const requestedOrganizationIdHeader = opts.req.headers["x-organization-id"];
        const requestedOrganizationId =
            typeof requestedOrganizationIdHeader === "string" ? requestedOrganizationIdHeader : undefined;

        const activeMembership = requestedOrganizationId
            ? await prisma.membership.findFirst({
                where: {
                    userId: session.user.id,
                    organizationId: requestedOrganizationId,
                    status: "active",
                },
                select: {
                    organizationId: true,
                },
            })
            : await prisma.membership.findFirst({
                where: {
                    userId: session.user.id,
                    status: "active",
                },
                orderBy: {
                    createdAt: "asc",
                },
                select: {
                    organizationId: true,
                },
            });

        if (requestedOrganizationId && !activeMembership) {
            throw new TRPCError({
                code: "FORBIDDEN",
                message: "No active membership for requested organization",
            });
        }

        organizationId =
            activeMembership?.organizationId
            ?? (await ensurePersonalMembership(session.user.id, session.user.email));
    }

    return {
        session,
        organizationId,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;