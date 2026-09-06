"use client";

import Link from "next/link";
import { Sparkles, ShieldCheck, Hand, FileText, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6">
      {/* 상단 브랜딩 영역 */}
      <div className="pt-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#3182F6] flex items-center justify-center text-white shadow-xl shadow-blue-500/20 font-black text-2xl tracking-tighter mb-4">
          S
        </div>
        
        <span className="text-xs font-bold text-[#3182F6] bg-blue-50 px-3 py-1 rounded-full mb-3">
          직장인 안심 소개팅 · salaryee
        </span>

        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
          일하는 우리들의<br />진심 어린 만남, 샐러리
        </h1>

        <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
          얼굴 사진 부담 없이,<br />
          손등의 온기와 자필 손글씨로 인연을 찾아요
        </p>

        {/* 3대 핵심 안심 포인트 */}
        <div className="w-full mt-8 flex flex-col gap-2.5 text-left">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">100% 명함 & 직장인 인증</p>
              <p className="text-[11px] text-slate-500">AI가 명함을 확인하고 회사 메일로 인증해요</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#3182F6] flex items-center justify-center shrink-0">
              <Hand className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">얼굴 노출 없는 손등 프로필</p>
              <p className="text-[11px] text-slate-500">지인에게 얼굴이 노출될 걱정이 없어요</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">정성 가득한 자필 손글씨 쪽지</p>
              <p className="text-[11px] text-slate-500">AI가 필체와 클린 문구를 꼼꼼히 검증해요</p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 카카오 로그인 CTA 버튼 */}
      <div className="pb-4 pt-6 flex flex-col gap-3">
        <Link
          href="/auth/terms"
          className="w-full py-4 rounded-2xl bg-[#FEE500] text-[#191919] font-bold text-sm hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.836 1.847 5.334 4.672 6.729l-1.188 4.398c-.104.385.313.689.646.467l5.223-3.482c.212.019.429.029.647.029 5.523 0 10-3.582 10-8s-4.477-8-10-8z"/>
          </svg>
          <span>카카오로 3초 만에 시작하기</span>
        </Link>

        <p className="text-[11px] text-slate-400 text-center">
          시작하시면 서비스 이용약관 및 개인정보 처리에 동의하게 돼요
        </p>
      </div>
    </div>
  );
}
