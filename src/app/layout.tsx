import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/chat-widget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdul Nawfal — UI/UX & Product Designer",
  description:
    "Product design and front-end for early product and redesigns. Based in Chennai, open to relocating to Dubai and Helsinki.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}