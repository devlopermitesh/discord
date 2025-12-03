import { z } from 'zod'

export const createServerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'description is required'), // ← lowercase
  imageUrl: z.string().optional().nullable(), // ← allow null bhi
})
