import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/dashboard");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 w-full py-12 px-8 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
            Welcome to ResumeKu
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your professional journey starts here. Create, manage, and share
            your resume with confidence.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <form className="flex-1 flex flex-col w-full gap-2 text-foreground">
          {/* demo info */}
          <div className="bg-yellow-50 rounded-lg px-6 py-2 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Try Demo Account</h2>
            <div className="space-y-2 text-base">
              <p>
                Email: <span className="font-mono">cyberflyx+4@gmail.com</span>
              </p>
              <p>
                Password: <span className="font-mono">asdf1234</span>
              </p>
            </div>
          </div>

          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            value="cyberflyx+4@gmail.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            value="asdf1234"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="bg-green-700 rounded-md px-4 py-2 text-green-50 mb-2"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          {/* <SubmitButton
            formAction={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton> */}
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
