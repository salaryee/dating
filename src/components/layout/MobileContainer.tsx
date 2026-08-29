import React from "react";

interface MobileContainerProps {
  children: React.ReactNode;
}

export default function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="min-h-screen bg-neutral-900 flex justify-center text-neutral-900 antialiased selection:bg-rose-500 selection:text-white">
      {/* 스마트폰 비율 컨테이너 (최대 가로 480px, 중앙 정렬) */}
      <div className="w-full max-w-md min-h-screen bg-slate-50 flex flex-col relative shadow-2xl border-x border-slate-200/80">
        {children}
      </div>
    </div>
  );
}
