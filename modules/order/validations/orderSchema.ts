import { z } from "zod";

export const orderSchema = z.object({
  OrderId: z.number().nullable().optional(),
  Label: z.string().nullable().optional(),
  Reference: z.string().nullable().optional(),
  Description: z.string().nullable().optional(),
  Remarks: z.string().nullable().optional(),
  DeliveryDate: z.string().nullable().optional(),
  LastChangedDateTime: z.string().nullable().optional(),
  CreateDate: z.date(),
  OrderType: z.object({
    OrderTypeId: z.number(),
  }),
});
export type OrderSchema = z.infer<typeof orderSchema>;
