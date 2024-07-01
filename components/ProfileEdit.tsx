"use client";

import { updateUser } from "@/lib/actions/user.action";
import { IProfileUpdateSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageChooser from "./shared/ImageChooser";
import { Button } from "./ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

type FieldErrors = {
  profilePicUrl?: string[];
  description?: string[];
  username: string[];
};

type UpdateResult = {
  status: "failed" | "success";
  message: {
    type: string;
    fieldErrors: FieldErrors;
  };
};

const ProfileEdit = ({
  username,
  description,
  profilePic,
}: {
  username: string;
  description: string | undefined;
  profilePic: string | undefined;
}) => {
  const form = useForm<z.infer<typeof IProfileUpdateSchema>>({
    resolver: zodResolver(IProfileUpdateSchema),
    mode: "onBlur",
    defaultValues: {
      username: username || "",
      description: description || "",
      profilePicUrl: profilePic || "",
    },
  });

  async function onSubmit(value: z.infer<typeof IProfileUpdateSchema>) {
    const { description, username } = value;
    let profilePicUrl = "";
    console.log("value");

    if (value.profilePic?.file) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: value.profilePic.file.name,
            imageId: value.profilePicUrl,
            contentType: value.profilePic.file.type,
          }),
        }
      );

      if (response.ok) {
        const { url, fields } = await response.json();

        const formData = new FormData();

        Object.entries(fields).forEach(([key, value]) => {
          if (
            typeof value === "string" ||
            value instanceof Blob ||
            value instanceof File
          ) {
            formData.append(key, value);
          }
        });

        formData.append("file", value.profilePic.file);

        const uploadResponse = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (uploadResponse.ok) {
          const value = formData.get("key") as string;
          profilePicUrl = value.split("/")[1];
          profilePicUrl = `${profilePicUrl}?${Date.now().toString()}`;
        } else {
          console.error("S3 Upload Error:", uploadResponse);
          alert("Upload Failed");
        }
      } else {
        alert("Upload failed");
      }
    }

    try {
      const result = (await updateUser({
        profilePicUrl,
        description,
        username,
      })) as UpdateResult;

      if (result?.status === "failed") {
        Object.keys(result?.message.fieldErrors).map((key) =>
          form.setError(key as keyof FieldErrors, {
            type: "manual-input",
            // @ts-ignore
            message: result?.message.fieldErrors[key]?.[0],
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleProfilePic(file: File, altText: string) {
    form.setValue("profilePic", {
      file,
      altText,
    });

    console.log(form.formState.errors);
  }

  return (
    <div className="min-h-screen bg-primary-500 pt-28">
      <div className="mx-auto max-w-screen-2xl px-7 pb-16 md:px-16">
        <h1 className="primary-text-gradient mb-8 text-[42px] font-extrabold">
          Edit Profile
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            method="post"
            encType="multipart/form-data"
            className="flex flex-wrap gap-5 max-sm:flex-col sm:justify-between"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="sm:basis-[48%]">
                  <FormLabel className="text-[16px] font-medium text-white">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[50px] bg-[#D9D9D9] focus-visible:ring-[#798A65] focus-visible:ring-offset-0"
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="sm:basis-[48%]">
                  <FormLabel className="text-[16px] font-medium text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[50px] bg-[#D9D9D9] focus-visible:ring-[#798A65] focus-visible:ring-offset-0"
                      placeholder="Email"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="basis-full">
                  <FormLabel className="text-[16px] font-medium text-white">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[150px] bg-[#D9D9D9] focus-visible:ring-[#798A65] focus-visible:ring-offset-0"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex basis-full flex-col gap-2">
              <h2 className="text-[16px] font-medium text-white">
                Profile Picture
              </h2>
              <FormField
                control={form.control}
                name="profilePic"
                render={({ field }) => (
                  <FormItem>
                    <ImageChooser
                      handleProfilePic={handleProfilePic}
                      profilePicUrl={profilePic}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex basis-full justify-end">
              <Button
                type="submit"
                className="primary-bg-gradient   w-fit !text-white"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileEdit;
