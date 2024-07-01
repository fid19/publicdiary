"use client";
import { loginUser } from "@/lib/actions/user.action";
import { UserLoginSchema } from "@/lib/validation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

type Field = "username" | "password";

const LoginForm = () => {
  const router = useRouter();
  const { fetchAuthStatus, user } = useAuth();

  useEffect(() => {
    if (user?._id) router.push("/notes");

    const verifySessionToken = async () => {
      await fetchAuthStatus();
    };

    verifySessionToken();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserLoginSchema>>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberme: false,
    },
    mode: "onBlur",
  });

  async function onSubmit(value: z.infer<typeof UserLoginSchema>) {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await loginUser(value);

      if (result?.status === "failed") {
        const fieldErrors = result.message.fieldErrors;
        Object.keys(fieldErrors).map((errorValue) => {
          const field = errorValue as Field;
          return form.setError(field, {
            type: "manual-input",
            // @ts-expect-error
            message: fieldErrors[field]?.[0] || undefined,
          });
        });
      }
      fetchAuthStatus();
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 max-sm:space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-100">
                  Username/Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    className="h-[50px] bg-[#D9D9D9] focus-visible:ring-[#798A65] focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>Email Address/Username</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-100">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    className="h-[50px] bg-[rgb(217,217,217)] focus-visible:ring-[#798A65] focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>Email Address/Username</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberme"
            render={({ field }) => (
              <FormItem className="!mt-4 flex items-start justify-between gap-1 space-y-0">
                <div className="flex gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-[rgb(121,138,101)] outline outline-2   data-[state=checked]:bg-[#D9D9D9] data-[state=checked]:text-[rgb(121,138,101)]"
                    />
                  </FormControl>
                  <div className="leading-none">
                    <FormLabel className="text-[12px] font-light text-gray-100">
                      Remember me
                    </FormLabel>
                  </div>
                </div>
                <div className="cursor-pointer space-y-0 text-[12px] font-medium text-[#798A65]">
                  Forgot password?
                </div>
              </FormItem>
            )}
          />

          <button
            type="submit"
            className={`h-[50px] rounded-md bg-[#798A65] text-[15px] font-medium text-white disabled:bg-[#4F5B41]`}
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      </Form>

      <div className="mt-8">
        <p className="text-center text-[12px] text-gray-100">
          Don&apos;t have an account?{" "}
          <span className="font-medium text-[#798A65]">Sign up for now</span>{" "}
        </p>
      </div>
    </>
  );
};

export default LoginForm;
