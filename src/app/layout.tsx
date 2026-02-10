import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE PEOPLE vs. YOUR EARS | Misheard Lyrics Courtroom",
  description: "Submit your misheard lyrics and face trial in the courtroom of auditory crimes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-amber-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
