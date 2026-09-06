import React from "react";

interface MobileContainerProps {
  children: React.ReactNode;
}

export default function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="min-h-screen bg-[#E5E8EB] flex justify-center text-[#191F28] antialiased selection:bg-[#3182F6] selection:text-white">
      {/* 토스 앱 전용 모바일 뷰포트 컨테이너 (최대 가로 450px) */}
      <div className="w-full max-w-[440px] min-h-screen bg-[#F2F4F6] flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.08)] border-x border-[#E5E8EB]">
        {children}
      </div>
    </div>
  );
}
