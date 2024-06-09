import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "二舍退宿預約系統",
  description: "臺灣科技大學第二學生宿舍退宿預約系統",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
