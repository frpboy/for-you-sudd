import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getContent } from "@/content/loader";
import { sessionCookieName, isValidSession } from "@/lib/security/session";
import { StoryExperience } from "@/components/story/story-experience";

export default async function StoryPage() {
  const token = (await cookies()).get(sessionCookieName)?.value;
  if (!isValidSession(token)) redirect("/access");
  const content = getContent();
  const safeContent = { ...content, media: content.media.map(({ privatePath: _, ...media }) => media) };
  return <StoryExperience content={safeContent} />;
}
