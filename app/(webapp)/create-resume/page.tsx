import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ResumeForm from "@/components/ResumeForm";

export default async function CreateResume() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return <ResumeForm />;
}
