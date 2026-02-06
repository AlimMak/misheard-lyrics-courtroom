import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Misheard Lyrics Courtroom",
  description: "Submit your misheard lyrics and face trial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-stone-950 text-amber-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
