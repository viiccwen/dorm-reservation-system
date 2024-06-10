import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "二舍退宿預約系統 | 登入",
  description: "臺灣科技大學第二學生宿舍退宿預約系統 | 登入頁面",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          <div className="w-full h-screen flex justify-center items-center">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
