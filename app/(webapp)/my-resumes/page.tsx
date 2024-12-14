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
    <div className="min-h-screena bg-gradient-to-br from-gray-50 to-gray-100 flex-1 w-full flex flex-col items-center p-8">
      <div className="w-full max-w-5xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          My Resumes
        </h1>

        <div className="mb-8 text-center">
          <Link href="/create-resume">
            <Button
              className="transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl inline-flex items-center justify-center space-x-3"
              variant="default"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Resume
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {resumes.map((resume) => (
            <Card className="hover:shadow-xl transition-shadow" key={resume.id}>
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
      </div>
    </div>
  );
}
