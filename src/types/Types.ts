import { z } from 'zod';

export enum Category {
  EBOOK = 'Ebook',
  COURSE = 'Course',
  TOOL = 'Tool',
  CONFERENCE = 'Conference',
  MISC = 'Misc',
  BOOTCAMP = 'Bootcamp',
  'OFFICE EQUIPMENT' = 'Office Equipment',
}

export const FORM_DEAL_SCHEMA = z.object({
  name: z.string().max(40),
  link: z.string().url(),
  description: z.string().max(240),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  coupon: z.string().optional().optional(),
  couponPercent: z.number().optional(),
  email: z.string().email().optional(),
  category: z.nativeEnum(Category),
});
