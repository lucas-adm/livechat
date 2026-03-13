import z from 'zod';

export const updateMessageData = z.object({
  content: z.string().trim().min(1),
});

export type UpdateMessageInput = z.infer<typeof updateMessageData>;
