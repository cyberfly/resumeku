import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ResumeForm from "@/components/ResumeForm";
import { cookies } from "next/headers";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full">
      <ResumeForm cookies2={cookies().toString()} />
    </div>
  );
}