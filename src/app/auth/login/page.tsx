"use client";

import Link from "next/link";
import { ShieldCheck, Hand, FileText } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-7">
      {/* 상단 브랜딩 및 큰 타이틀 (토스 스타일 여백) */}
      <div className="pt-12">
        <div className="w-12 h-12 rounded-2xl bg-[#3182F6] flex items-center justify-center text-white font-black text-xl mb-6 shadow-md shadow-blue-500/20">
          S
        </div>

        <h1 className="text-[28px] font-black text-[#191F28] tracking-tight leading-[1.3]">
          얼굴 노출 없는<br />직장인 소개팅,<br />샐러리
        </h1>

        <p className="text-[15px] text-[#4E5968] mt-3 font-medium leading-relaxed">
          손등의 온기와 자필 손글씨로<br />
          신뢰할 수 있는 인연을 만나요
        </p>

        {/* 3대 핵심 포인트 (심플 리스트) */}
        <div className="mt-12 flex flex-col gap-5">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#E6F7F0] flex items-center justify-center text-[#00B368] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#191F28]">100% 명함 & 직장 인증</p>
              <p className="text-xs text-[#8B95A1] mt-0.5">AI가 명함을 확인하고 회사 메일로 검증해요</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#E8F3FF] flex items-center justify-center text-[#3182F6] shrink-0">
              <Hand className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#191F28]">얼굴 사진 없는 안심 프로필</p>
              <p className="text-xs text-[#8B95A1] mt-0.5">지인에게 얼굴이 노출될 걱정이 없어요</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF8E6] flex items-center justify-center text-[#D97706] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#191F28]">정성 가득한 자필 손글씨</p>
              <p className="text-xs text-[#8B95A1] mt-0.5">AI가 손글씨와 클린 문구를 확인해요</p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 카카오 버튼 (토스 시그니처 56px 풀 너비 버튼) */}
      <div className="pb-6 pt-8 flex flex-col gap-3">
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
