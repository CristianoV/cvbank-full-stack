import { z } from 'zod';

export const registerAcountSchema = z.object({
  balance: z.number().positive(),
});

export type IRegisterAccountData = z.infer<typeof registerAcountSchema>;
