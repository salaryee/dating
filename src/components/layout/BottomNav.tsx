"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, MessageCircleHeart, Users, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "추천",
      href: "/",
      icon: Flame,
      badge: null,
    },
    {
      label: "라운지",
      href: "/lounge",
      icon: Users,
      badge: "NEW",
    },
    {
      label: "채팅",
      href: "/chat",
      icon: MessageCircleHeart,
      badge: "2",
    },
    {
      label: "MY",
      href: "/profile",
      icon: User,
      badge: null,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-slate-200 z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative ${
                isActive
                  ? "text-rose-500 font-semibold"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-transform ${
                    isActive ? "scale-110" : ""
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full ring-2 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
