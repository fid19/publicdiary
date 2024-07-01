"use client";
import { ReplySchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { createReply } from "@/lib/actions/reply.action";

const ReplyForm = ({
  noteId,
  className: classNameProps,
}: {
  noteId: string;
  className: string;
}) => {
  const editorRef = useRef(null);
  const pathname = usePathname();

  const form = useForm<z.infer<typeof ReplySchema>>({
    resolver: zodResolver(ReplySchema),
    defaultValues: {
      answer: "",
    },
  });

  const handleReply = async (values: z.infer<typeof ReplySchema>) => {
    try {
      await createReply({
        content: values.answer,
        noteId: JSON.parse(noteId),
        path: pathname,
      });

      form.reset();

      if (editorRef.current) {
        // @ts-ignore

        editorRef.current.setContent("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("done");
    }
  };

  return (
    <div className={`mt-4 ${classNameProps}`}>
      {/* <h1 className="primary-text-gradient mb-5 text-[25px] font-bold">
        Write your reply here
      </h1> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleReply)}>
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    // @ts-ignore
                    onInit={(_evt, editor) => (editorRef.current = editor)}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
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
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="mt-5 flex justify-end">
            <Button
              type="submit"
              className="primary-bg-gradient text-[16px] font-bold text-black/70"
            >
              Reply
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReplyForm;
