"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Hand, Lock, ArrowLeft, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6 sm:p-7 w-full">
      <div>
        {/* 상단 프로그레스 바 (TDS Onboarding Funnel 규격 일치: 시작 단계) */}
        <div className="pt-2 pb-5">
          <div className="h-1 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#3182F6] rounded-full w-[12%] transition-all duration-300"></div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <Link
              href="/"
              className="text-[#4E5968] hover:text-[#191F28] inline-flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="text-[12.5px] font-bold text-[#3182F6] bg-[#E8F3FF] px-3 py-1 rounded-full">
              시작 단계
            </span>
          </div>
        </div>

        {/* 타이틀 및 브랜드 소개 (TDS Mobile 서열: 24px Black 타이틀 + 14px Medium 설명) */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3182F6] bg-[#E8F3FF] px-2.5 py-1 rounded-full mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>직장인 전용 100% 안심 소개팅</span>
          </div>
          <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
            얼굴 노출 없이 안심하고,<br />
            샐러리에서 인연을 만나요
          </h1>
          <p className="text-[14px] text-[#6B7684] mt-2 font-medium leading-relaxed">
            손등의 온기와 정갈한 자필 엽서로 가치관이 통하는 직장인을 찾아요.
          </p>
        </div>

        {/* 토스 3대 안심 가치 (순백색 캔버스 일체형 오픈 리스트) */}
        <div className="mt-8 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F3FF] flex items-center justify-center text-[#3182F6] shrink-0">
              <Hand className="w-6 h-6" />
            </div>
            <div className="pt-0.5">
              <h3 className="text-[16px] font-bold text-[#191F28]">얼굴 비노출 안심</h3>
              <p className="text-[13.5px] text-[#6B7684] mt-1 font-medium leading-relaxed">
                얼굴 사진 대신 손등의 온기와 자필 엽서로 첫인상을 전해요
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F0] flex items-center justify-center text-[#00B368] shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#00B368]" />
            </div>
            <div className="pt-0.5">
              <h3 className="text-[16px] font-bold text-[#191F28]">100% 직장인 안심 인증</h3>
              <p className="text-[13.5px] text-[#6B7684] mt-1 font-medium leading-relaxed">
                사내메일과 명함 재직 인증을 통과한 직장인만 활동해요
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F2F4F6] flex items-center justify-center text-[#4E5968] shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div className="pt-0.5">
              <h3 className="text-[16px] font-bold text-[#191F28]">회사 지인 완벽 차단</h3>
              <p className="text-[13.5px] text-[#6B7684] mt-1 font-medium leading-relaxed">
                같은 회사 동료에게는 내 프로필이 절대 노출되지 않아요
              </p>
            </div>
          </div>
        </div>

        {/* 프라이버시 안심 노트 (verify-work와 동일한 레이아웃) */}
        <div className="mt-7 flex items-start gap-2.5 text-[13px] text-[#6B7684] font-medium px-1">
          <Lock className="w-4 h-4 text-[#00B368] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            인증 정보는 직장인 확인 목적으로만 안전하게 사용되며, <strong className="text-[#333D4B]">회사 동료 및 지인에게는 절대 프로필이 노출되지 않아요.</strong>
          </p>
        </div>
      </div>

      {/* 하단 카카오 버튼 (56px 토스 표준 풀 너비 버튼) */}
      <div className="pb-6 pt-6 flex flex-col gap-3">
        <Link
          href="/auth/terms"
          className="w-full h-14 rounded-2xl bg-[#FEE500] text-[#191919] font-bold text-[16px] hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.836 1.847 5.334 4.672 6.729l-1.188 4.398c-.104.385.313.689.646.467l5.223-3.482c.212.019.429.029.647.029 5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
          </svg>
          <span>카카오로 1초 만에 시작하기</span>
        </Link>
        <p className="text-[12.5px] text-[#8B95A1] text-center font-medium">
          시작 시 서비스 이용약관 및 개인정보 처리에 동의하게 돼요
        </p>
      </div>
    </div>
  );
}
