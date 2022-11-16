import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string({
      required_error: 'model is required',
      invalid_type_error: 'model must be a string',
    })
    .min(3, { message: 'model must be 3 or more characters long' }),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/, {
      message: 'model must be alphanumeric',
    }),
});

export type ILoginData = z.infer<typeof loginSchema>;