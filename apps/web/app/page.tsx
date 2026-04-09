import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";

export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>React Flow 2 backend stack</CardTitle>
          <CardDescription>
            Prisma, Better Auth, Express, and tRPC are wired into the workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-sm leading-6">
          <p>
            Use the login flow to create a user, then hit the todo page to verify database access
            through the Express API.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/login">Open login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/todos">Open todos</Link>
            </Button>
          </div>
          <p className="text-muted-foreground font-mono text-xs">
            Press <kbd>d</kbd> to toggle the theme.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
