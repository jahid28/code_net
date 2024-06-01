import { z } from "zod";


export const postSchema = z.object({
    codeType: z.string().trim(),
    msg: z
        .string()
        .trim()
        .min(3, { message: "Message must be atleast 3 characters long." })
        .max(200, { message: "Message must be atmost 200 characters long." }),
    code: z.string().trim(),
    lang: z.string().trim(),
});


export const loginSchema = z.object({
    email: z.string().email({ message: "Enter a valid email" }).trim(),
    password: z.string().trim().min(2, { message: "Password must be atleast 2 characters long." })
})

export const resetPassSchema = z.object({
    email: z.string().email({ message: "Enter a valid email" }).trim(),
    pass: z
        .string()
        .trim()
        .min(4, { message: "Password must be atleast 4 characters long." }),
    cpass: z
        .string()
        .trim()
        .min(4, { message: "Password must be atleast 4 characters long." }),
});


export const signupSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name must be atleast 1 character long." }),
    email: z.string().email({ message: "Enter a valid email" }).trim(),
    password: z
      .string()
      .trim()
      .min(4, { message: "Password must be atleast 4 characters long." }),
    userName: z
      .string()
      .trim()
      .min(2, { message: "User Name must be atleast 2 characters long." }),
    profilePic: z
      .string()
      .trim(),
  });

 export const commentSchema = z
  .string()
  .trim()
  .min(3, { message: "Comment must be atleast 3 characters long." })
  .max(200, { message: "Comment must be atmost 200 characters long." });
