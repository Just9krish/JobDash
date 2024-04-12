"use client";

import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, loginSchema } from "@/schema/auth.schema";
import FormError from "../common/FormError";
import FormSuccess from "../common/FormSuccess";
import LoadingButton from "../common/LoadingButton";
import { useState, useTransition } from "react";
import { login } from "@/actions/auth.action";

export default function LoginForm() {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, transitionStartFcn] = useTransition();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onsubmit = (data: LoginInput) => {
    setError("");
    setSuccess("");
    transitionStartFcn(() => {
      login(data).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="space-y-4"
        action=""
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="m@example.com" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className="flex items-center">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  className="ml-auto inline-block text-sm underline"
                  href="#"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input placeholder="******" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <LoadingButton className="w-full" loading={isPending}>
          Login
        </LoadingButton>
      </form>
    </Form>
  );
}
