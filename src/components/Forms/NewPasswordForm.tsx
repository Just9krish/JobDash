"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordInput, newPasswordSchema } from "@/schema/auth.schema";
import FormError from "../common/FormError";
import FormSuccess from "../common/FormSuccess";
import LoadingButton from "../common/LoadingButton";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/auth.action";

export default function NewPasswordForm() {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, transitionStartFcn] = useTransition();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const form = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onsubmit = (data: NewPasswordInput) => {
    setError("");
    setSuccess("");
    transitionStartFcn(() => {
      newPassword({ data, token }).then((data) => {
        setSuccess(data.success);
        setError(data.error);
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
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="pasword">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="********"
                  type="password"
                  id="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="confirmPassword">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="********"
                  type="password"
                  id="confirmPassword"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />
        <LoadingButton className="w-full" loading={isPending}>
          Reset password
        </LoadingButton>
      </form>
    </Form>
  );
}
