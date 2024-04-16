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
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [showTwoAuth, setTwoAuth] = useState(false);
  const [isPending, transitionStartFcn] = useTransition();

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already in use with different provider!"
      : "";

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  console.log(form.formState.errors)

  const onsubmit = (data: LoginInput) => {
    console.log("Submitting", data);

    setError("");
    setSuccess("");
    transitionStartFcn(() => {
      login(data)
        .then((data) => {
          console.log(data);
          
          if (data.error) {
            // form.reset();
            setError(data.error);
          }

          if (data.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data.twoAuth) {
            setTwoAuth(true);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
        {showTwoAuth ? (
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="code">Code</FormLabel>
                <FormControl>
                  <Input
                    id="code"
                    {...field}
                    placeholder="123456"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="m@example.com"
                      type="email"
                    />
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
                      href="/reset"
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
          </>
        )}

        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        <LoadingButton className="w-full" loading={isPending}>
          {showTwoAuth ? "Confirm" : "Login"}
        </LoadingButton>
      </form>
    </Form>
  );
}
