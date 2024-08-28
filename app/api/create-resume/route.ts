import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const resumeData = {
      ...formData,
      user_id: "f03396ad-2f69-4312-b4fc-b594f06ad958",
    };

    console.log('resumeData', resumeData);

    const { data, error } = await supabase.from("resumes").insert(resumeData);

    if (error) throw error;

    return NextResponse.json({
      message: "Resume submitted successfully",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error submitting resume", error },
      { status: 500 }
    );
  }
}
