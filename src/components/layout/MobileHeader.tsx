"use client";

import Link from "next/link";
import { Bell, Flame, Sparkles } from "lucide-react";

interface MobileHeaderProps {
  title?: string;
  showPoints?: boolean;
}

export default function MobileHeader({ title, showPoints = true }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 h-14 flex items-center justify-between">
      {/* 로고 / 타이틀 */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 fill-white" />
        </div>
        <div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            {title || "직장인소개팅"}
          </span>
        </div>
      </Link>

      {/* 우측 아이콘 영역 (하트 포인트 & 알림) */}
      <div className="flex items-center gap-2">
        {showPoints && (
          <div className="flex items-center gap-1 bg-rose-50 border border-rose-100 text-rose-600 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>50 H</span>
          </div>
        )}
        <button
          aria-label="알림"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 relative transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
}
