"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  const [allAgreed, setAllAgreed] = useState(false);
  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });

  const handleAllAgree = () => {
    const nextVal = !allAgreed;
    setAllAgreed(nextVal);
    setTerms({
      service: nextVal,
      privacy: nextVal,
      marketing: nextVal,
    });
  };

  const handleToggle = (key: keyof typeof terms) => {
    const nextTerms = { ...terms, [key]: !terms[key] };
    setTerms(nextTerms);
    setAllAgreed(nextTerms.service && nextTerms.privacy && nextTerms.marketing);
  };

  const isRequiredDone = terms.service && terms.privacy;

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6">
      <div>
        {/* 상단 뒤로가기 */}
        <div className="pt-2 pb-6">
          <Link href="/auth/login" className="text-slate-600 hover:text-slate-900 inline-block">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* 타이틀 (토스 UX: 정갈한 해요체) */}
        <div>
          <span className="text-xs font-bold text-[#3182F6]">1 / 3 단계</span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1 leading-snug">
            샐러리 이용을 위해<br />약관에 동의해 주세요
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            신뢰할 수 있는 만남을 위해 꼭 필요한 절차예요.
          </p>
        </div>

        {/* 약관 리스트 */}
        <div className="mt-8 flex flex-col gap-3">
          {/* 전체 동의 버튼 */}
          <button
            onClick={handleAllAgree}
            className={`w-full p-4 rounded-2xl border flex items-center gap-3.5 transition-all text-left ${
              allAgreed
                ? "bg-blue-50/60 border-blue-200 text-[#3182F6]"
                : "bg-slate-50 border-slate-200 text-slate-700"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                allAgreed ? "bg-[#3182F6] text-white" : "bg-slate-200 text-slate-400"
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="text-sm font-extrabold">약관 전체 동의하기</span>
          </button>

          <div className="px-2 py-3 flex flex-col gap-4">
            {/* 필수 1: 서비스 이용약관 */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleToggle("service")}
                className="flex items-center gap-3 text-left"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    terms.service ? "bg-[#3182F6] text-white" : "bg-slate-100 text-slate-300"
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  [필수] 서비스 이용약관 동의
                </span>
              </button>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>

            {/* 필수 2: 개인정보 수집 및 이용 */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleToggle("privacy")}
                className="flex items-center gap-3 text-left"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    terms.privacy ? "bg-[#3182F6] text-white" : "bg-slate-100 text-slate-300"
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  [필수] 개인정보 수집 및 이용 동의
                </span>
              </button>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>

            {/* 선택: 마케팅 알림 */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleToggle("marketing")}
                className="flex items-center gap-3 text-left"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    terms.marketing ? "bg-[#3182F6] text-white" : "bg-slate-100 text-slate-300"
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-xs font-medium text-slate-600">
                  [선택] 오늘의 추천 및 호감 알림 받기
                </span>
              </button>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 동의하고 계속하기 버튼 */}
      <div className="pb-4 pt-6">
        <Link
          href={isRequiredDone ? "/auth/profile-step1" : "#"}
          className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            isRequiredDone
              ? "bg-[#3182F6] text-white hover:bg-[#256fd8] shadow-md shadow-blue-500/20 active:scale-[0.98]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          <span>동의하고 프로필 등록하기</span>
        </Link>
      </div>
    </div>
  );
}
