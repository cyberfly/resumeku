import { GeistSans } from "geist/font/sans";
import "../globals.css";
import Header from "@/components/Header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Resumeku",
  description: "Resumeku Online Resume Builder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Header></Header>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>

        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>
            Powered by{" "}
            <a
              href="/"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              ResumeKu
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
