"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Hand, FileText } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-7">
      <div className="pt-8 flex flex-col">
        <div className="mb-6 flex items-center">
          <Image
            src="/logo-vertical.png"
            alt="salaryee"
            width={128}
            height={100}
            className="h-20 w-auto object-contain"
            priority
          />
        </div>

        <h1 className="text-[28px] font-black text-[#102A43] tracking-tight leading-[1.3]">
          얼굴 노출 없는<br />직장인 소개팅,<br />
          <span className="text-[#FF6F61]">샐러리</span>
        </h1>

        <p className="text-[15px] text-[#4E5968] mt-3 font-medium leading-relaxed">
          손등의 온기와 자필 손글씨로<br />
          신뢰할 수 있는 인연을 만나요
        </p>

        {/* 토스 스타일: 심플하고 강력한 3대 신뢰 칩 */}
        <div className="mt-8 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#E6F7F0] text-[#00B368] text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% 직장 인증
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#EBF3FC] text-[#3182F6] text-xs font-bold">
            <Hand className="w-3.5 h-3.5" />
            얼굴 비노출 안심
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FFF2F0] text-[#FF6F61] text-xs font-bold">
            <FileText className="w-3.5 h-3.5" />
            정성 자필 손글씨
          </span>
        </div>
      </div>

      {/* 하단 카카오 버튼 (토스 시그니처 56px 풀 너비 버튼) */}
      <div className="pb-6 pt-6 flex flex-col gap-3">
        <Link
          href="/auth/terms"
          className="w-full h-14 rounded-2xl bg-[#FEE500] text-[#191919] font-bold text-base hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.836 1.847 5.334 4.672 6.729l-1.188 4.398c-.104.385.313.689.646.467l5.223-3.482c.212.019.429.029.647.029 5.523 0 10-3.582 10-8s-4.477-8-10-8z"/>
          </svg>
          <span>카카오로 시작하기</span>
        </Link>
        <p className="text-xs text-[#8B95A1] text-center font-medium">
          시작하면 이용약관 및 개인정보 처리에 동의하게 돼요
        </p>
      </div>
    </div>
  );
}
