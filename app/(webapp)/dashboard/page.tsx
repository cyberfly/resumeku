import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, Copy, Download, Palette, Database, Wand2 } from "lucide-react";
import FlashMessage from "@/components/FlashMessage";

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex-1 w-full flex flex-col items-center p-8">
      <div className="w-full max-w-5xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Welcome to Your Dashboard
        </h1>

        <FlashMessage />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/create-resume"
            className="transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Create Resume</span>
          </Link>
          <Link
            href="/my-resumes"
            className="transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>My Resumes</span>
          </Link>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recent Resumes
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  Software Developer Resume
                </h3>
                <div className="flex space-x-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                    </svg>
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                      <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                    </svg>
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="text-gray-600">
                <p>Last modified: 2 days ago</p>
                <p>Sections: Personal Info, Experience, Skills, Education</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  Product Manager Resume
                </h3>
                <div className="flex space-x-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                    </svg>
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                      <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                    </svg>
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="text-gray-600">
                <p>Last modified: 5 days ago</p>
                <p>
                  Sections: Personal Info, Work History, Leadership, Projects
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Awesome Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <CardTitle>Quick Preview</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Preview your resume in real-time as you edit, ensuring perfect
                  formatting before downloading.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Copy className="w-5 h-5 text-green-500" />
                  <CardTitle>Duplicate Resume</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create variations of your resume by duplicating existing ones
                  with a single click.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Download className="w-5 h-5 text-purple-500" />
                  <CardTitle>Export Options</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Download your resume in multiple formats including PDF, Word,
                  and plain text.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-orange-500" />
                  <CardTitle>Multiple Themes</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Choose from a variety of professional themes to make your
                  resume stand out.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-red-500" />
                  <CardTitle>Sample Templates</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Jump-start your resume with pre-built templates and sample
                  content for various industries.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Wand2 className="w-5 h-5 text-yellow-500" />
                  <CardTitle>AI Suggestions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get smart content suggestions and formatting recommendations
                  as you build your resume.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
