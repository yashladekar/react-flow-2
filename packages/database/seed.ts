import path from "node:path";
import dotenv from "dotenv";
import { randomUUID } from "node:crypto";

// Load env FIRST before any imports that use it
dotenv.config({
    path: "/Users/yashladekar/yash/rnd/react-flow/react-flow-2/apps/server/.env",
});

import { createPrismaClient } from "./src/index";

async function seed() {
    const prisma = createPrismaClient();

    // Check if admin user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email: "admin@gmail.com" },
    });

    if (existingUser) {
        console.log("✓ Admin user already exists");
        return;
    }

    const userId = randomUUID();

    // Create admin user with hashed password
    // Password: admin@password (using bcrypt hash)
    const adminUser = await prisma.user.create({
        data: {
            id: userId,
            email: "admin@gmail.com",
            name: "Admin User",
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    // Create account for email/password auth
    // Note: Better Auth expects password to be hashed. For development, we'll use a placeholder.
    // In production, use proper bcrypt hashing.
    await prisma.account.create({
        data: {
            id: randomUUID(),
            userId: adminUser.id,
            accountId: "admin@gmail.com",
            providerId: "credential",
            password: "$2b$10$9Brnydllyw6F7HJT4C4HSOcNg1hkdJWa4nv3qTnXJA8/tRmAEKGZe", // bcrypt hash of "admin@password"
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    // Create organization for the admin
    const org = await prisma.organization.create({
        data: {
            id: randomUUID(),
            name: "Admin Organization",
            slug: "admin-org",
            planId: (await prisma.plan.findFirst())?.id || (await prisma.plan.create({
                data: {
                    id: randomUUID(),
                    name: "FREE",
                    price: 0,
                    maxUsers: 5,
                    maxProjects: 5,
                },
                select: { id: true },
            })).id,
        },
    });

    // Create role for the organization
    const role = await prisma.role.create({
        data: {
            id: randomUUID(),
            name: "ADMIN",
            organizationId: org.id,
        },
    });

    // Create membership
    await prisma.membership.create({
        data: {
            id: randomUUID(),
            userId: adminUser.id,
            organizationId: org.id,
            roleId: role.id,
            status: "active",
        },
    });

    console.log("✓ Admin user created successfully");
    console.log("📧 Email: admin@gmail.com");
    console.log("🔐 Password: admin@password");
    console.log("🏢 Organization: Admin Organization");
}

seed()
    .then(() => {
        console.log("\n✓ Seed completed");
        process.exit(0);
    })
    .catch((e) => {
        console.error("✗ Seed failed:", e);
        process.exit(1);
    });
