"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Hand, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6 sm:p-7 max-w-[440px] mx-auto">
      <div className="pt-8 flex flex-col">
        {/* 브랜드 로고 */}
        <div className="mb-6 flex items-center">
          <Image
            src="/logo-vertical.png"
            alt="salaryee"
            width={128}
            height={90}
            className="h-16 w-auto object-contain"
            priority
          />
        </div>

        {/* 토스식 헤드라인 */}
        <h1 className="text-[26px] font-black text-[#191F28] tracking-tight leading-[1.35]">
          얼굴 노출 없는<br />
          직장인 안심 소개팅,<br />
          <span className="text-[#FF6F61]">샐러리</span>
        </h1>

        <p className="text-sm text-[#6B7684] mt-2.5 font-medium leading-relaxed">
          손등의 온기와 정성 자필 손글씨로<br />
          가치관이 통하는 인연을 만나요.
        </p>

        {/* 토스 3대 안심 약속 카드 */}
        <div className="mt-8 flex flex-col gap-2.5">
          <div className="bg-[#F9FAFB] p-4 rounded-2xl border border-[#F2F4F6] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#E8F3FF] flex items-center justify-center text-[#3182F6] shrink-0">
              <Hand className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#191F28]">얼굴 비노출 안심</h3>
              <p className="text-[11px] text-[#8B95A1] mt-0.5 font-medium">
                얼굴 대신 손등 사진과 자필 엽서로 만나요
              </p>
            </div>
          </div>

          <div className="bg-[#F9FAFB] p-4 rounded-2xl border border-[#F2F4F6] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#E6F7F0] flex items-center justify-center text-[#00B368] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#00B368]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#191F28]">100% 직장인 안심</h3>
              <p className="text-[11px] text-[#8B95A1] mt-0.5 font-medium">
                명함과 사내메일 재직 인증된 사람만 활동해요
              </p>
            </div>
          </div>

          <div className="bg-[#F9FAFB] p-4 rounded-2xl border border-[#F2F4F6] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F2F4F6] flex items-center justify-center text-[#4E5968] shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#191F28]">회사 지인 완벽 차단</h3>
              <p className="text-[11px] text-[#8B95A1] mt-0.5 font-medium">
                같은 회사 동료에게는 프로필이 노출되지 않아요
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 카카오 버튼 (토스 시그니처 56px 풀 너비 버튼) */}
      <div className="pb-6 pt-6 flex flex-col gap-3">
        <Link
          href="/auth/terms"
          className="w-full h-14 rounded-2xl bg-[#FEE500] text-[#191919] font-bold text-sm hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.836 1.847 5.334 4.672 6.729l-1.188 4.398c-.104.385.313.689.646.467l5.223-3.482c.212.019.429.029.647.029 5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
          </svg>
          <span>카카오로 1초 만에 시작하기</span>
        </Link>
        <p className="text-[11px] text-[#8B95A1] text-center font-medium">
          시작 시 서비스 이용약관 및 개인정보 처리에 동의하게 돼요
        </p>
      </div>
    </div>
  );
}
