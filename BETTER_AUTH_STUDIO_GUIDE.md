# Better Auth Studio Setup Guide

**🔐 TL;DR - Admin Credentials**
- Email: `admin@gmail.com`
- Password: `admin@password`
- User ID: `7222b367-a1c3-4ab2-97d4-e343e1148ddc`

See [ADMIN_CREDENTIALS.md](./ADMIN_CREDENTIALS.md) for full details.

---

Better Auth Studio is now integrated into your project. You can access it via two methods:

## Option 1: Standalone Studio (Recommended for Development)

Run the studio in a separate terminal on port 3003:

```bash
pnpm dlx better-auth-studio@beta start --port 3003 --watch
```

Then access it at: **http://localhost:3003**

### Features:

- ✨ User Management - Create, edit, delete users
- 🏢 Organization Management - Manage organizations with multi-tenancy
- ⚙️ Settings - Configure auth plugins and database
- 📊 Dashboard - View user statistics

## Option 2: Cloud-Hosted Studio

Visit: **https://better-auth.build/**

Configure it to connect to your local Better Auth server.

## Admin Dashboard Links

Navigate to the admin dashboard at **http://localhost:3002/dashboard** and use the sidebar links:

- **Studio (Local)** - Opens local studio on port 3003
- **Studio (Cloud)** - Opens cloud-hosted studio

## Configuration

The studio is configured in your Better Auth setup with:

- ✅ Organization plugin enabled
- ✅ Multi-tenant support
- ✅ Admin email: `admin@gmail.com`

## Environment

- Server: http://localhost:3000
- Web App: http://localhost:3001
- Admin App: http://localhost:3002
- Studio (standalone): http://localhost:3003

## Database

Your multi-tenant Prisma schema includes:

- Users, Sessions, Accounts
- Organizations with Plans
- Roles & Permissions
- Memberships (user-org relationships)
- Projects & ProjectMemberships
- Todos with tenant isolation
- AuditLogs for compliance
