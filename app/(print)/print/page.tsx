import { createClient } from "@/utils/supabase/server";
import ModernLayout from "@/components/resume_layouts/ModernLayout";
import PrintTrigger from "@/components/PrintTrigger";

export default async function Print({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const { id } = searchParams;
  const supabase = createClient();

  if (!id) {
    return <div>No resume ID provided</div>;
  }

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return <div>Error fetching resume</div>;
  }

  if (!data) {
    return <div>No resume found</div>;
  }

  return (
    <>
      <PrintTrigger />
      <ModernLayout formData={data} />
    </>
  );
}