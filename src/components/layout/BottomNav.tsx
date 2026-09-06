"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, MessageCircleHeart, Users, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // 로그인/온보딩 및 1:1 채팅방 내부에서는 하단 탭바 숨기기
  if (pathname.startsWith("/auth") || pathname.startsWith("/chat/")) {
    return null;
  }

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
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50 bg-white border-t border-[#E5E8EB]">
      {/* 토스 앱 표준 하단 탭바 (하단 컨텐츠 비침 방지 솔리드 디자인) */}
      <nav className="px-3 pt-1.5 pb-[max(env(safe-area-inset-bottom),10px)]">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
                  isActive
                    ? "text-[#3182F6] font-extrabold"
                    : "text-[#8B95A1] hover:text-[#4E5968] font-medium"
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-[22px] h-[22px] transition-transform ${
                      isActive ? "scale-105 stroke-[2.5]" : "stroke-[1.8]"
                    }`}
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-2.5 bg-[#3182F6] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full ring-2 ring-white">
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
