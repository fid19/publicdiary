"use client";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteSchema } from "@/lib/validation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthProvider";
import { AlertDestructive } from "@/components/shared/AlertDestructive";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import { revalidatePath } from "next/cache";
import { editNoteById, revalidateUrl } from "@/lib/actions/note.action";

const NoteForm = ({ noteProps }) => {
  const router = useRouter();
  const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  const {
    noteContent,
    noteIsPrivate,
    noteDisableComments,
    noteActionType,
    noteId,
  } = noteProps;

  const { fetchAuthStatus, user } = useAuth();

  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      content: noteContent || "",
      isPrivate: noteIsPrivate || false,
      disableComments: noteDisableComments || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof NoteSchema>) => {
    await fetchAuthStatus();
    if (!user?._id) {
      return form.setError("root.serverError", {
        type: "401",
        message: "User needs to be logged in to perform this action.",
      });
    }

    const cleanContent = DOMPurify.sanitize(values.content);

    try {
      if (noteActionType === "create") {
        const response = await fetch("/api/create", {
          method: "POST",
          body: JSON.stringify({
            values: {
              content: cleanContent,
              isPrivate: values.isPrivate,
              disableComments: values.disableComments,
            },
            author: user._id,
          }),
        });

        const result = await response.json();

        if (result.status === "error") {
          throw new Error(result.error);
        }

        await revalidateUrl({ path: "/notes" });
        router.push("/notes");
      } else if (noteActionType === "edit") {
        editNoteById({
          values: {
            content: cleanContent,
            isPrivate: values.isPrivate,
            disableComments: values.disableComments,
          },
          noteId,
        });
      }
    } catch (err) {
      console.log(err.message);

      return form.setError("root.serverError", {
        type: "401",
        message: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-primary-500/90">
      <div className=" relative  mx-auto max-w-screen-2xl  space-y-8  pt-12 md:px-16">
        <div className="absolute left-0 top-0  z-0 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-lg"></div>
        <div className="absolute right-0 top-0  z-0 size-[480px] -translate-y-1/2 translate-x-1/2 rounded-full bg-white/20 blur-lg"></div>
        <div className="relative z-0 overflow-hidden rounded-lg">
          <div className="rounded-lg p-8 backdrop-blur-md max-sm:border max-sm:border-white/10 max-sm:px-2 ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {form.formState.errors.root?.serverError.type === "401" && (
                  <div className="mb-5">
                    <AlertDestructive
                      message={form.formState.errors.root.serverError.message}
                    />
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="primary-text-gradient text-[42px] font-bold md:text-[48px]">
                        {noteActionType === "create" ? "Create" : "Edit"} Note
                      </FormLabel>
                      <FormControl>
                        <>
                          <div className="!my-4 h-full"></div>
                          <Editor
                            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                            onInit={(_evt, editor) =>
                              (editorRef.current = editor)
                            }
                            onBlur={field.onBlur}
                            onEditorChange={(content) =>
                              field.onChange(content)
                            }
                            value={field.value}
                            init={{
                              height: 500,
                              menubar: false,
                              statusbar: false,
                              plugins: ["hr", "image", "link", "lists"],
                              style_formats: [
                                { title: "Title", block: "h1" },
                                { title: "Heading", block: "h2" },
                                { title: "Sub heading", block: "h3" },
                                { title: "Paragraph", block: "p" },
                                { title: "Code", inline: "code" },
                                { title: "Quote", block: "blockquote" },
                                {
                                  title: "Callout",
                                  block: "div",
                                  classes: "call-out",
                                },
                              ],
                              toolbar:
                                "styleselect styles | bold italic underline strikethrough forecolor backcolor | image link hr | bullist numlist",
                              content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                          />
                          <FormMessage className="text-red-500" />
                        </>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex flex-wrap justify-between max-md:flex-col md:gap-1">
                  <FormField
                    control={form.control}
                    name="isPrivate"
                    render={({ field }) => (
                      <FormItem className="mt-4 flex flex-1 flex-row items-center justify-between  rounded bg-black/30 p-4 md:basis-2/6">
                        <div className="space-y-0.5">
                          <FormLabel className="text-[16spx] text-white">
                            Enable Private View
                          </FormLabel>
                          <FormDescription className="text-[12px] text-white/70">
                            Only the author will be able to view this note if
                            enabled.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-white/50"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="disableComments"
                    render={({ field }) => (
                      <FormItem className="mt-4 flex flex-1 flex-row items-center justify-between rounded  bg-black/30 p-4 md:basis-2/6">
                        <div className="space-y-0.5">
                          <FormLabel className="text-[16spx] text-white">
                            Disable Comments
                          </FormLabel>
                          <FormDescription className="text-[12px] text-white/70">
                            Users will not be able to comment if enabled
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-white/50"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="primary-bg-gradient  mt-10 w-fit !text-white"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* <button onClick={log}>Log editor content</button> */}
      </div>
    </div>
  );
};

export default NoteForm;
