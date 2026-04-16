import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: { template: "%s | Pristine Pro Cleaning", default: "Pristine Pro Cleaning — Toronto's Trusted Cleaning Service" },
  description: "Professional, vetted cleaners serving Toronto and the GTA. Book online, pay securely, and come home to spotless.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
