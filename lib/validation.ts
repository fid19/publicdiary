import { z } from "zod";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

export const ReplySchema = z.object({
  answer: z.string().min(20),
});

export const UserSignUpSchema = z.object({
  email: z.string().email({
    message: "Email address must be valid",
  }),
  password: z
    .string()
    .min(8, { message: "password must be atleast 8 characters" })
    .regex(passwordRegex, {
      message:
        "password must contain atleast an uppercase, lowercase, digit and a special character",
    }),
  username: z.string().min(3, {
    message: "Username must contain atleast three (3) character(s)",
  }),
});

export const UserLoginSchema = z.object({
  username: z.string().min(3),
  password: z
    .string()
    .min(8, { message: "password must be atleast 8 characters" }),
  rememberme: z.boolean().default(false).optional(),
});

export const NoteSchema = z.object({
  content: z.string().min(50),
  isPrivate: z.boolean().default(false),
  disableComments: z.boolean().default(false),
});

export const ImageDataSchema = z.object({
  id: z.string().optional(),
  file: z
    .any()
    .refine((file) => {
      return file.size <= 1024 * 1024 * 3;
    }, "Max Image Size 3MB")
    .refine((file) => file.type?.startsWith("image"))
    .optional(),
  altText: z.string().optional(),
});

export const IProfileUpdateSchema = z.object({
  profilePic: ImageDataSchema.optional(),
  email: z
    .string()
    .email({
      message: "Email address must be valid",
    })
    .optional(),
  username: z.string().min(3, {
    message: "Username must contain atleast three (3) character(s)",
  }),
  description: z.string().optional(),
  profilePicUrl: z.string().optional(),
});

export interface noteI {
  note: any[];
}
