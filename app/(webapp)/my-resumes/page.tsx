import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ResumeActions from "@/components/ResumeActions";

export default async function MyResumes() {
  const supabase = createClient();

  const fetchResumes = async () => {
    const { data, error } = await supabase
      .from("resumes")
      .select("id, title, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      return [];
    }
    return data || [];
  };

  const resumes = await fetchResumes();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">My Resumes</CardTitle>
          <Link href="/create-resume">
            <Button className="mt-6" variant="default">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Resume
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <Card key={resume.id}>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{resume.title}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(resume.created_at).toLocaleString("en-CA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </p>
                  <ResumeActions resumeId={resume.id} />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
