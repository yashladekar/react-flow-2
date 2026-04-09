"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";

import Loader from "./loader";

export default function SignUpForm({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
    const router = useRouter();
    const { isPending } = authClient.useSession();

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            await authClient.signUp.email(
                {
                    name: value.name,
                    email: value.email,
                    password: value.password,
                },
                {
                    onSuccess: () => {
                        router.push("/todos");
                        toast.success("Sign up successful");
                    },
                    onError: (error) => {
                        toast.error(error.error.message || error.error.statusText);
                    },
                },
            );
        },
        validators: {
            onSubmit: z.object({
                name: z.string().min(2, "Name must be at least 2 characters"),
                email: z.string().email("Invalid email address"),
                password: z.string().min(8, "Password must be at least 8 characters"),
            }),
        },
    });

    if (isPending) {
        return <Loader />;
    }

    return (
        <div className="mx-auto mt-10 w-full max-w-md p-6">
            <h1 className="mb-6 text-center text-3xl font-bold">Create account</h1>
            <form
                className="space-y-4"
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    void form.handleSubmit();
                }}
            >
                <form.Field name="name">
                    {(field) => (
                        <div className="space-y-2">
                            <Label htmlFor={field.name}>Name</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(event) => field.handleChange(event.target.value)}
                            />
                            {field.state.meta.errors.map((error) => (
                                <p key={error?.message} className="text-sm text-red-500">
                                    {error?.message}
                                </p>
                            ))}
                        </div>
                    )}
                </form.Field>
                <form.Field name="email">
                    {(field) => (
                        <div className="space-y-2">
                            <Label htmlFor={field.name}>Email</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="email"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(event) => field.handleChange(event.target.value)}
                            />
                            {field.state.meta.errors.map((error) => (
                                <p key={error?.message} className="text-sm text-red-500">
                                    {error?.message}
                                </p>
                            ))}
                        </div>
                    )}
                </form.Field>
                <form.Field name="password">
                    {(field) => (
                        <div className="space-y-2">
                            <Label htmlFor={field.name}>Password</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="password"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(event) => field.handleChange(event.target.value)}
                            />
                            {field.state.meta.errors.map((error) => (
                                <p key={error?.message} className="text-sm text-red-500">
                                    {error?.message}
                                </p>
                            ))}
                        </div>
                    )}
                </form.Field>
                <form.Subscribe
                    selector={(state) => ({ canSubmit: state.canSubmit, isSubmitting: state.isSubmitting })}
                >
                    {({ canSubmit, isSubmitting }) => (
                        <Button className="w-full" disabled={!canSubmit || isSubmitting} type="submit">
                            {isSubmitting ? "Submitting..." : "Sign up"}
                        </Button>
                    )}
                </form.Subscribe>
            </form>
            <div className="mt-4 text-center">
                <Button className="px-0" variant="link" onClick={onSwitchToSignIn}>
                    Already have an account? Sign in
                </Button>
            </div>
        </div>
    );
}