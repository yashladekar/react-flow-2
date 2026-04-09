"use client";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, LogOut, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

export default function TodosPage() {
  const router = useRouter();
  const [newTodoText, setNewTodoText] = useState("");
  const session = authClient.useSession();

  const todos = useQuery(trpc.todo.getAll.queryOptions());
  const createMutation = useMutation(
    trpc.todo.create.mutationOptions({
      onSuccess: () => {
        void todos.refetch();
        setNewTodoText("");
      },
    }),
  );
  const toggleMutation = useMutation(
    trpc.todo.toggle.mutationOptions({
      onSuccess: () => {
        void todos.refetch();
      },
    }),
  );
  const deleteMutation = useMutation(
    trpc.todo.delete.mutationOptions({
      onSuccess: () => {
        void todos.refetch();
      },
    }),
  );

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTodoText.trim()) {
      createMutation.mutate({ text: newTodoText });
    }
  };

  const handleToggleTodo = (id: number, completed: boolean) => {
    toggleMutation.mutate({ id, completed: !completed });
  };

  const handleDeleteTodo = (id: number) => {
    deleteMutation.mutate({ id });
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out");
          router.push("/login");
        },
      },
    });
  };

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl flex-col gap-6 px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-muted-foreground text-sm">Signed in as</p>
          <h1 className="text-2xl font-semibold">
            {session.data?.user.name || session.data?.user.email || "Guest"}
          </h1>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/login">Auth</Link>
          </Button>
          <Button variant="outline" onClick={() => void handleSignOut()}>
            <LogOut className="mr-2 size-4" />
            Sign out
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Todo list</CardTitle>
          <CardDescription>
            This page exercises tRPC mutations against the Express server and Prisma database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="mb-6 flex items-center gap-2" onSubmit={handleAddTodo}>
            <Input
              disabled={createMutation.isPending}
              onChange={(event) => setNewTodoText(event.target.value)}
              placeholder="Add a new task..."
              value={newTodoText}
            />
            <Button disabled={createMutation.isPending || !newTodoText.trim()} type="submit">
              {createMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : "Add"}
            </Button>
          </form>
          {todos.isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="size-6 animate-spin" />
            </div>
          ) : todos.data?.length === 0 ? (
            <p className="py-4 text-center">No todos yet. Add one above.</p>
          ) : (
            <ul className="space-y-2">
              {todos.data?.map((todo) => (
                <li key={todo.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={todo.completed}
                      id={`todo-${todo.id}`}
                      onCheckedChange={() => handleToggleTodo(todo.id, todo.completed)}
                    />
                    <label
                      className={todo.completed ? "text-muted-foreground line-through" : ""}
                      htmlFor={`todo-${todo.id}`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <Button aria-label="Delete todo" size="icon" variant="ghost" onClick={() => handleDeleteTodo(todo.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  );
}