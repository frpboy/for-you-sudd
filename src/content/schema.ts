import { z } from "zod";

const mediaKind = z.enum(["image", "video", "audio"]);
const approval = z.enum(["approved", "pending", "demo"]);

export const mediaSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  kind: mediaKind,
  privatePath: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().min(1),
  approval,
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  rotation: z.number().finite().optional(),
  durationSeconds: z.number().positive().optional(),
  posterId: z.string().optional()
});

export const contentSchema = z.object({
  mode: z.enum(["demo", "private"]),
  project: z.object({ birthday: z.string().date(), timezone: z.literal("Asia/Kolkata"), locale: z.literal("en-IN") }),
  participants: z.object({ recipient: z.string().min(1), nickname: z.string().min(1), sender: z.string().min(1) }),
  greeting: z.string().min(1),
  narrativeAnswer: z.string().min(1),
  chapters: z.array(z.object({ id: z.string(), title: z.string(), date: z.string(), body: z.string(), mediaId: z.string().optional() })).min(4),
  media: z.array(mediaSchema).min(1),
  albums: z.array(z.object({ id: z.string(), title: z.string(), mediaIds: z.array(z.string()).min(1) })).min(1),
  videos: z.array(z.object({ id: z.string(), title: z.string(), mediaId: z.string() })),
  voice: z.object({ title: z.string(), mediaId: z.string().optional(), transcript: z.string().optional() }),
  quiz: z.array(z.object({ id: z.string(), question: z.string(), acceptedAnswers: z.array(z.string()).min(1), hint: z.string().optional() })).min(1).max(5),
  memories: z.array(z.string()), reasons: z.array(z.string()), dreams: z.array(z.string()),
  letter: z.object({ body: z.string().min(1), signature: z.string().min(1), mediaIds: z.array(z.string()).default([]) }),
  secretMediaIds: z.array(z.string()).default([]),
  finale: z.string().min(1),
  musicMediaId: z.string().optional(),
  features: z.object({ memoryJar: z.boolean(), reasons: z.boolean(), dreams: z.boolean(), cake: z.boolean(), confetti: z.boolean(), secretMemories: z.boolean() }),
  privacy: z.object({ approvedForProduction: z.boolean(), retentionDate: z.string().date().optional() })
});

export type StoryContent = z.infer<typeof contentSchema>;
