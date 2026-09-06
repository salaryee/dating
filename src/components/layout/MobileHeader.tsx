"use client";

import Link from "next/link";
import Image from "next/image";
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
      {/* 토스 스타일: 홈에서는 브랜드 로고, 서브페이지에서는 페이지 타이틀 */}
      {title ? (
        <h1 className="text-[19px] font-bold text-[#191F28] tracking-tight">{title}</h1>
      ) : (
        <Link href="/" className="flex items-center active:opacity-80 transition-opacity">
          <Image
            src="/logo-horizontal.png"
            alt="salaryee"
            width={105}
            height={35}
            className="h-[34px] w-auto object-contain"
            priority
          />
        </Link>
      )}

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
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#FF6F61] rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
