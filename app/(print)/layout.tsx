import { GeistSans } from "geist/font/sans";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <style>{`
          @media print {
            @page {
              size: A4;
              margin: 0;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              margin: 0;
              zoom: 100%;
            }
            .min-h-screen {
              min-height: 100vh;
              height: 100vh;
              page-break-after: always;
            }
            /* Remove header and footer */
            @page { 
              margin: 0; 
              size: auto;
            }
            /* Hide browser-generated content */
            @page :first {
              margin-top: 0;
            }
            @page :left {
              margin-left: 0;
            }
            @page :right {
              margin-right: 0;
            }
          }
        `}</style>
      </head>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
