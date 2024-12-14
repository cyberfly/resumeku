"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

const supabase = createClient();

export async function createResume(formData: FormData) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const resumeData = {
      ...formData,
      title: `${formData.personal_info.fullName}'s Resume`,
      user_id: user.id,
    };

    const { data, error } = await supabase.from("resumes").insert(resumeData);

    if (error) throw error;

    console.log("data", data);
  } catch (error) {
    console.log("error", error);

    cookies().set(
      "flash",
      JSON.stringify({
        type: "error",
        message: "Failed to create resume",
      })
    );
  } finally {
    cookies().set(
      "flash",
      JSON.stringify({
        type: "success",
        message: "Resume created successfully!",
      })
    );

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

export async function duplicateResume(resumeId: string) {
  if (!isAuthenticated()) {
    return {
      error: "Unauthorize",
    };
  }

  const { data: originalResume, error: fetchError } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", resumeId)
    .single();

  if (fetchError) {
    console.error("Error fetching original resume:", fetchError);
    return;
  }

  const { data: newResume, error: insertError } = await supabase
    .from("resumes")
    .insert({
      ...originalResume,
      id: undefined,
      title: `${originalResume.title} (Copy)`,
    })
    .select()
    .single();

  if (insertError) {
    console.error("Error duplicating resume:", insertError);
    return;
  }

  // Refresh the page to show the new resume
  revalidatePath("/my-resumes");
  redirect("/my-resumes");
}

export async function updateResume(resumeId: string, formData: FormData) {
  if (!isAuthenticated()) {
    return {
      error: "Unauthorized",
    };
  }

  console.log("formData", formData);

  const updatedData = formData;

  const { data, error } = await supabase
    .from("resumes")
    .update(updatedData)
    .eq("id", resumeId)
    .select()
    .single();

  if (error) {
    console.error("Error updating resume:", error);
    return { error: "Failed to update resume" };
  }

  revalidatePath("/my-resumes");
  return { success: true, data };
}

export async function deleteResume(resumeId: string) {
  if (!isAuthenticated()) {
    return {
      error: "Unauthorized",
    };
  }

  const { error } = await supabase.from("resumes").delete().eq("id", resumeId);

  if (error) {
    console.error("Error deleting resume:", error);
    return { error: "Failed to delete resume" };
  }

  revalidatePath("/my-resumes");
  return { success: true };
}

export async function clearFlash() {
  cookies().delete("flash");
}

async function isAuthenticated() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  return user;
}
