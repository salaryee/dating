"use client";

import Link from "next/link";
import { Bell, ShieldCheck } from "lucide-react";

interface MobileHeaderProps {
  title?: string;
  showVerifiedBadge?: boolean;
}

export default function MobileHeader({
  title,
  showVerifiedBadge = true,
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#F2F4F6]/95 backdrop-blur-md px-5 h-14 flex items-center justify-between transition-colors">
      {/* 토스 스타일 볼드 로고 / 타이틀 */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#3182F6] flex items-center justify-center text-white shadow-sm font-black text-xs tracking-tighter">
          S
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-extrabold text-[17px] text-[#191F28] tracking-tight">
            {title || "샐러리"}
          </span>
          <span className="text-[10px] text-[#3182F6] font-bold bg-[#E8F3FF] px-1.5 py-0.5 rounded-md">
            직장인 소개팅
          </span>
        </div>
      </Link>

      {/* 우측 상단 액션 (인증 상태 & 토스 벨 아이콘) */}
      <div className="flex items-center gap-2">
        {showVerifiedBadge && (
          <Link
            href="/profile"
            className="flex items-center gap-1 bg-[#E6F7F0] text-[#00B368] px-2.5 py-1 rounded-full text-[11px] font-bold hover:bg-[#d0f2e3] transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#00B368]" />
            <span>인증 완료</span>
          </Link>
        )}
        <button
          aria-label="알림"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-200/60 text-[#4E5968] relative transition-colors"
        >
          <Bell className="w-5 h-5 stroke-[2.2]" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#3182F6] rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
