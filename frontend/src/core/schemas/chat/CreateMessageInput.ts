import z from 'zod';

export const createMessageData = z.object({
  content: z.string().trim().min(1),
});

export type CreateMessageInput = z.infer<typeof createMessageData>;
