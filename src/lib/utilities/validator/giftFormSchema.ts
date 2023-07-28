import { z } from 'zod';

const giftFormSchema = z.object({
    name: z.string().min(2).optional(),
    quantity: z.number().optional(),
    isVisible: z.boolean().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    url: z.string().optional(),
    price: z.number().optional(),
    wishlistId: z.string().optional(),
    id: z.string().optional(),
});

export default giftFormSchema;
