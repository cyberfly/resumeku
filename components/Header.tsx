import AuthButton from "@/components/AuthButton";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full container flex justify-between items-center px-8 py-3 text-sm">
          <Link
            href="/dashboard"
            className="text-lg font-bold text-blue-600 hover:text-blue-700"
          >
            ResumeKu
          </Link>
          <AuthButton />
        </div>
      </nav>
    </div>
  );
}
