"use client";
import { getSession, registerUser } from "@/lib/actions/user.action";
import { UserSignUpSchema } from "@/lib/validation";
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
import Link from "next/link";
import { useRouter } from "next/navigation";

type Field = "username" | "password" | "email";

const SignUpForm = () => {
  // const [lastResult, action] = useFormState(loginUser, undefined);

  // const [error, setErrors] = useState({});

  const router = useRouter();

  useEffect(() => {
    async function verifySessionToken() {
      const checkSession = await getSession();

      console.log(checkSession);
      if (checkSession.user) {
        router.push("/");
      }
    }

    verifySessionToken();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserSignUpSchema>>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(value: z.infer<typeof UserSignUpSchema>) {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await registerUser(value);

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
                <FormLabel className="text-gray-100">Username</FormLabel>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-100">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
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

          <button
            type="submit"
            className={`!mt-8 h-[50px] rounded-md bg-[#798A65] text-[15px] font-medium text-white disabled:bg-[#4F5B41]`}
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      </Form>

      <div className="mt-8">
        <p className="text-center text-[14px] text-gray-100">
          Have an account?{" "}
          <Link href="/sign-in">
            <span className="font-medium text-[#798A65]">Sign In</span>{" "}
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
