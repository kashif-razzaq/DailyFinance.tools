import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// A stripped-down layout specifically for iframes
export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-transparent p-4">
        {children}
      </body>
    </html>
  );
}
