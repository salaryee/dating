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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-5 h-14 flex items-center justify-between">
      {/* 로고 / 타이틀 (토스 스타일 미니멀 브랜딩) */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#3182F6] flex items-center justify-center text-white shadow-sm font-black text-xs tracking-tighter">
          S
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-base text-slate-900 tracking-tight">
            {title || "샐러리"}
          </span>
          <span className="text-[10px] text-[#3182F6] font-semibold bg-blue-50 px-1.5 py-0.5 rounded">
            salaryee
          </span>
        </div>
      </Link>

      {/* 우측 액션 (직장인증 상태 & 알림) */}
      <div className="flex items-center gap-2">
        {showVerifiedBadge && (
          <Link
            href="/profile"
            className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-semibold hover:bg-emerald-100 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>직장 인증 완료</span>
          </Link>
        )}
        <button
          aria-label="알림"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 relative transition-colors"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#3182F6] rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
