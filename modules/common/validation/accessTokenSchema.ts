import { z } from "zod";

export const accessTokenSchema = z.object({
  client_id: z.string(),
  client_secret: z.string(),
  grant_type: z.string(),
});

export type AccessTokenSchema = z.infer<typeof accessTokenSchema>;
