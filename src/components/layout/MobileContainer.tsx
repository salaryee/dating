"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface MobileContainerProps {
  children: React.ReactNode;
}

export default function MobileContainer({ children }: MobileContainerProps) {
  const pathname = usePathname();
  const isAuth = pathname.startsWith("/auth");

  return (
    <div
      className={`min-h-screen ${
        isAuth ? "bg-white" : "bg-[#E5E8EB]"
      } flex justify-center text-[#191F28] antialiased selection:bg-[#3182F6] selection:text-white`}
    >
      {/* 온보딩 퍼널(auth)에서는 순백색 단일 캔버스(border/shadow 제거), 메인/채팅/피드 등 일반 화면에서는 토스 모바일 뷰포트 컨테이너 유지 */}
      <div
        className={`w-full max-w-[440px] min-h-screen ${
          isAuth
            ? "bg-white border-none shadow-none"
            : "bg-[#F2F4F6] border-x border-[#E5E8EB] shadow-[0_0_50px_rgba(0,0,0,0.08)]"
        } flex flex-col relative overflow-x-hidden`}
      >
        {children}
      </div>
    </div>
  );
}
