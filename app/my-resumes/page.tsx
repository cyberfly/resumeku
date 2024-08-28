import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default async function MyResumes() {
  const supabase = createClient();

  const fetchResumes = async () => {
    const { data, error } = await supabase.from("resumes").select("id, title");
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
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <Card key={resume.id}>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{resume.title}</h3>
                  <Button variant="outline" className="mt-2">
                    View Resume
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Link href="/create-resume">
            <Button className="mt-6" variant="default">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Resume
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
