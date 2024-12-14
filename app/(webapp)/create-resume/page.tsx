import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ResumeForm from "@/components/ResumeForm";

export default async function CreateResume({
  searchParams,
}: {
  searchParams: { resume_id?: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  let resumeData = null;
  if (searchParams.resume_id) {
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", searchParams.resume_id)
      .single();

    if (error) {
      console.error("Error fetching resume:", error);
    } else {
      resumeData = data;
    }
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Create Your Resume
        </h1>
        <ResumeForm initialData={resumeData} />
      </div>
    </div>
  );
}
