"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import path from "path";

export async function createResume(formData: FormData) {
  console.log(formData);

  const supabase = createClient();

  try {
    const resumeData = {
      ...formData,
      title: `${formData.personal_info.fullName}'s Resume`,
      user_id: "f03396ad-2f69-4312-b4fc-b594f06ad958",
    };

    const { data, error } = await supabase.from("resumes").insert(resumeData);

    if (error) throw error;

    console.log("data", data);
  } catch (error) {
    console.log("error", error);
  } finally {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }
}

export async function uploadImage(data: FormData) {
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(process.cwd(), "public/uploads", filename);

  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}
