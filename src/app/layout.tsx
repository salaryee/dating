import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileContainer from "@/components/layout/MobileContainer";
import BottomNav from "@/components/layout/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "직소 | 검증된 직장인을 위한 소개팅 모바일 웹",
  description: "인증된 직장인들과의 신뢰할 수 있는 1:1 매칭 & 소개팅",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MobileContainer>
          <main className="flex-1 flex flex-col">{children}</main>
          <BottomNav />
        </MobileContainer>
      </body>
    </html>
  );
}
