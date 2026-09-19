"use client";

import Link from "next/link";
import MobileHeader from "@/components/layout/MobileHeader";
import {
  ShieldCheck,
  Building2,
  ChevronRight,
  Hand,
  FileText,
  Sparkles,
  Settings,
  Heart,
  Clock,
  Lock,
  RotateCcw,
  Bell,
  HelpCircle,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F6]">
      <MobileHeader title="내 정보" showVerifiedBadge={false} />

      <div className="p-5 flex flex-col gap-3.5 pb-28">
        {/* 1. 내 기본 프로필 요약 카드 */}
        <div className="bg-white rounded-3xl p-5.5 shadow-sm border border-[#E5E8EB] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3182F6] to-[#1B64DA] flex items-center justify-center text-white text-lg font-black shadow-md shadow-blue-500/20">
              민
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[19px] font-black text-[#191F28]">민지</h2>
                <span className="bg-[#E8F3FF] text-[#3182F6] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  ENFP
                </span>
              </div>
              <p className="text-sm text-[#6B7684] mt-0.5 flex items-center gap-1 font-medium truncate">
                <Building2 className="w-4 h-4 text-[#8B95A1] shrink-0" />
                <span className="truncate">카카오 · 서비스 기획자 (29세)</span>
              </p>
            </div>
          </div>

          <Link
            href="/auth/profile-step1"
            className="text-xs font-bold text-[#3182F6] bg-[#E8F3FF] hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors active:scale-95 shrink-0 whitespace-nowrap"
          >
            수정
          </Link>
        </div>

        {/* 2. 직장인증 상태 카드 (기획서 3번: 6개월 주기 재인증) */}
        <div className="bg-gradient-to-br from-[#191F28] to-[#2B3440] rounded-3xl p-5.5 text-white shadow-lg flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00B368]" />
              <h3 className="text-[16px] font-bold">100% 직장인 안심 인증</h3>
            </div>
            <span className="text-xs bg-[#00B368] text-white font-bold px-2.5 py-1 rounded-full shrink-0">
              인증 유지 중
            </span>
          </div>

          <div className="bg-white/10 rounded-2xl p-3.5 flex items-center justify-between text-sm">
            <div>
              <p className="font-bold text-white text-[15px]">카카오 (Kakao)</p>
              <p className="text-[13px] text-slate-300 mt-0.5 font-medium">
                다음 재인증까지 <strong>4개월 12일</strong> 남았어요
              </p>
            </div>
            <Link
              href="/auth/verify-work"
              className="text-xs bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1.5 rounded-xl transition-colors active:scale-95 shrink-0 whitespace-nowrap"
            >
              재인증하기
            </Link>
          </div>
        </div>

        {/* 3. 내 손등 사진 & 자필 글씨 관리 */}
        <div className="bg-white rounded-3xl p-5.5 border border-[#E5E8EB] shadow-sm flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#191F28]">
              내 대표 사진 (손등 & 자필)
            </h3>
            <span className="text-xs text-[#00B368] font-bold">
              Gemini AI 검증 완료
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* 손등 사진 카드 */}
            <Link
              href="/auth/profile-step1"
              className="p-4 rounded-2xl bg-[#FFF5ED] border border-[#FFD2C0] flex flex-col justify-between h-32 hover:border-[#FF6F61] transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#191F28] flex items-center gap-1.5">
                  <Hand className="w-4 h-4 text-[#FF6F61]" /> 손등 사진
                </span>
                <span className="text-xs text-[#8B95A1] font-semibold">변경</span>
              </div>
              <p className="text-xs text-[#6B7684] font-medium leading-relaxed">
                얼굴 대신 손등의 온기가 등록되어 있어요
              </p>
            </Link>

            {/* 자필 글씨 카드 */}
            <Link
              href="/auth/profile-step2"
              className="p-4 rounded-2xl bg-[#FFFBF2] border border-[#F5E8D0] flex flex-col justify-between h-32 hover:border-amber-300 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#191F28] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-600" /> 자필 글씨
                </span>
                <span className="text-xs text-[#8B95A1] font-semibold">변경</span>
              </div>
              <p className="text-xs text-[#6B7684] italic truncate font-serif">
                &ldquo;사소한 일상을 편안하게 나눌...&rdquo;
              </p>
            </Link>
          </div>
        </div>

        {/* 4. 플로우 빠른 이동 체험기 (시뮬레이터용 안내) */}
        <div className="bg-[#E8F3FF] border border-[#3182F6]/30 rounded-3xl p-5 flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#3182F6]" />
            <h4 className="text-sm font-bold text-[#3182F6]">
              서비스 화면 흐름 전체 체험
            </h4>
          </div>
          <p className="text-[13px] text-[#4E5968] leading-relaxed font-medium">
            처음 가입하는 사용자의 흐름(로그인 ➡️ 약관 ➡️ 손등/자필 등록 ➡️ 직장인증)을 언제든 다시 체험해 보세요.
          </p>
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <Link
              href="/auth/login"
              className="text-center py-2.5 bg-white rounded-xl text-sm font-bold text-[#191F28] border border-[#E5E8EB] hover:bg-[#F2F4F6] transition-colors active:scale-95"
            >
              로그인부터 시작
            </Link>
            <Link
              href="/auth/verify-work"
              className="text-center py-2.5 bg-white rounded-xl text-sm font-bold text-[#191F28] border border-[#E5E8EB] hover:bg-[#F2F4F6] transition-colors active:scale-95"
            >
              명함 OCR 인증
            </Link>
          </div>
        </div>

        {/* 5. 메뉴 리스트 (토스 TableRow 기준 text-[15px]) */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E5E8EB] overflow-hidden divide-y divide-[#F2F4F6]">
          {[
            { label: "내가 보낸 호감 내역", href: "/chat", badge: "2건" },
            { label: "이상형 조건 설정 (나이, 지역, 직군)", href: "#", badge: null },
            { label: "안심 설정 (지인 차단, 휴식 모드)", href: "#", badge: null },
            { label: "이용약관 및 개인정보 처리방침", href: "/auth/terms", badge: null },
          ].map((menu, idx) => (
            <Link
              key={idx}
              href={menu.href}
              className="px-5 py-4.5 flex items-center justify-between hover:bg-[#F2F4F6] transition-colors active:bg-[#E5E8EB]"
            >
              <span className="text-[15px] font-bold text-[#191F28]">{menu.label}</span>
              <div className="flex items-center gap-2 text-sm text-[#8B95A1]">
                {menu.badge && (
                  <span className="font-bold text-[#3182F6] text-sm">{menu.badge}</span>
                )}
                <ChevronRight className="w-4.5 h-4.5 text-[#8B95A1]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
