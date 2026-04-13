# Admin Credentials

**Default Admin Account for Development**

| Field | Value |
|-------|-------|
| **Email** | `admin@gmail.com` |
| **Password** | `admin@password` |
| **User ID** | `7222b367-a1c3-4ab2-97d4-e343e1148ddc` |

## Access Points

### Admin Dashboard
- URL: http://localhost:3002
- Login with credentials above
- Features: User management, organization settings, studio access

### Web App  
- URL: http://localhost:3001
- Can login with admin credentials
- Access user features and todos

### Better Auth Server
- URL: http://localhost:3000
- Backend API endpoints

### Better Auth Studio
**Standalone (Recommended):**
```bash
pnpm dlx better-auth-studio@beta start --port 3003 --watch
```
Then open http://localhost:3003

**Or use cloud version:** https://better-auth.build/

## Query Admin User from Database

```bash
docker exec react-flow-2-db psql -U postgres -d react_flow_2 -c "SELECT id, email FROM \"user\" WHERE email='admin@gmail.com';"
```

**Output:**
```
                  id                  |      email      
--------------------------------------+-----------------
 7222b367-a1c3-4ab2-97d4-e343e1148ddc | admin@gmail.com
(1 row)
```

## Reset Admin Password

If needed, you can re-seed the admin user with the seed script:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:55432/react_flow_2" \
BETTER_AUTH_SECRET="tcUpuv0hsYEy9VwE25sJlIbpNz8AVllXQWJ42pG6fIc=" \
BETTER_AUTH_URL="http://localhost:3000/api/auth" \
CORS_ORIGIN="http://localhost:3001" \
pnpm --dir packages/database db:seed
```

## Security Note

These are **development credentials only**. For production:
1. Change passwords immediately
2. Use strong, unique passwords
3. Implement proper password hashing (bcrypt recommended)
4. Use environment variables for sensitive data
5. Never commit credentials to version control
