import * as z from "zod";

export const contactApiSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone must be at least 6 digits").max(30),
  product: z.string().min(1, "Product is required").max(120),
  quantity: z.string().min(1, "Quantity is required").max(100),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  company: z.string().max(100).optional(),
  website_hp: z.string().max(0, "Spam detected").optional(),
});

export const quoteApiSchema = z.object({
  fullName: z.string().min(2).max(100),
  companyName: z.string().max(100).optional(),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  productName: z.string().min(1).max(120),
  thickness: z.string().max(50),
  grade: z.string().max(100),
  quantity: z.string().min(1).max(100),
  deliveryType: z.enum(["delivery", "yard_pickup"]),
  deliveryAddress: z.string().max(200).optional(),
  targetDate: z.string().max(50).optional(),
  notes: z.string().max(2000).optional(),
  hp_field: z.string().max(0, "Spam detected").optional(),
});

export const productSchema = z.object({
  name: z.string().min(2).max(150),
  slug: z.string().min(2).max(150),
  short_description: z.string().min(10).max(300),
  description: z.string().min(20).max(5000),
  category_id: z.string().min(1),
  images: z.array(z.string()).default([]),
  specs: z.record(z.string(), z.string()).default({}),
  applications: z.array(z.string()).default([]),
  is_featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("published"),
  pdf_url: z.string().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100),
  description: z.string().min(5).max(500),
  image_url: z.string().default(""),
  order_index: z.number().int().default(0),
  is_active: z.boolean().default(true),
});

export const postSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z.string().min(5).max(200),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(20),
  cover_image: z.string().default(""),
  author: z.string().min(2).max(100),
  author_role: z.string().max(100).optional(),
  read_time: z.string().default("5 min read"),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("published"),
});

