"use client";

import { useState, useTransition } from "react";
import FormError from "../common/FormError";
import FormSuccess from "../common/FormSuccess";
import LoadingButton from "../common/LoadingButton";
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
import { RegisterInput, registerSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/actions/auth.action";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GENDERS } from "@/lib/constant";

export default function RegisterForm() {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, transitionStartFcn] = useTransition();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onsubmit = (data: RegisterInput) => {
    setError("");
    setSuccess("");
    transitionStartFcn(() => {
      register(data).then((data) => {
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
        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-2">
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="firstName"
                    placeholder="John"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-2">
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="lastName"
                    placeholder="Cena"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full items-center gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-3">
                <FormLabel>Select a gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-3"
                  >
                    {GENDERS.map((gender) => (
                      <FormItem
                        key={gender.id}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={gender.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {gender.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="m@example.com" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} type="password" />
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
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  id="confirmPassword"
                  placeholder="******"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <LoadingButton className="w-full" loading={isPending}>
          Create an account
        </LoadingButton>
      </form>
    </Form>
  );
}