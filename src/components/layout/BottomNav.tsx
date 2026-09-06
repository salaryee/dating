"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, MessageCircleHeart, Users, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "오늘의 추천",
      href: "/",
      icon: Sparkles,
      badge: "2",
    },
    {
      label: "라운지",
      href: "/lounge",
      icon: Users,
      badge: null,
    },
    {
      label: "호감 · 대화",
      href: "/chat",
      icon: MessageCircleHeart,
      badge: "1",
    },
    {
      label: "내 정보",
      href: "/profile",
      icon: User,
      badge: null,
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50 pointer-events-none">
      {/* 토스 가이드라인 준수: 플로팅(Floating) 형태의 탭바 */}
      <nav className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 px-3 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-all ${
                  isActive
                    ? "text-[#3182F6] font-bold"
                    : "text-slate-400 hover:text-slate-600 font-medium"
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? "scale-110 stroke-[2.5]" : "stroke-[1.8]"
                    }`}
                  />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2.5 bg-[#3182F6] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full ring-2 ring-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] mt-1 tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
