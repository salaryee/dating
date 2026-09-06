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
          <Link href="/auth/login" className="text-[#4E5968] hover:text-[#191F28] inline-block active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* 타이틀 (토스 UX: 정갈한 해요체) */}
        <div>
          <span className="text-xs font-bold text-[#3182F6]">1 / 3 단계</span>
          <h1 className="text-[22px] font-black text-[#191F28] tracking-tight mt-1 leading-snug">
            샐러리 이용을 위해<br />약관에 동의해 주세요
          </h1>
          <p className="text-xs text-[#8B95A1] mt-2 font-medium">
            신뢰할 수 있는 직장인 만남을 위해 꼭 필요한 절차예요.
          </p>
        </div>

        {/* 약관 리스트 */}
        <div className="mt-8 flex flex-col gap-3">
          {/* 전체 동의 버튼 */}
          <button
            onClick={handleAllAgree}
            className={`w-full p-4 rounded-2xl border flex items-center gap-3.5 transition-all text-left ${
              allAgreed
                ? "bg-[#E8F3FF] border-[#3182F6]/40 text-[#3182F6]"
                : "bg-[#F2F4F6] border-[#E5E8EB] text-[#191F28]"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                allAgreed ? "bg-[#3182F6] text-white" : "bg-[#D1D6DB] text-white"
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
                    terms.service ? "bg-[#3182F6] text-white" : "bg-[#E5E8EB] text-[#8B95A1]"
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-[#333D4B]">
                  [필수] 서비스 이용약관 동의
                </span>
              </button>
              <ChevronRight className="w-4 h-4 text-[#8B95A1]" />
            </div>

            {/* 필수 2: 개인정보 수집 및 이용 */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleToggle("privacy")}
                className="flex items-center gap-3 text-left"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    terms.privacy ? "bg-[#3182F6] text-white" : "bg-[#E5E8EB] text-[#8B95A1]"
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-[#333D4B]">
                  [필수] 개인정보 수집 및 이용 동의
                </span>
              </button>
              <ChevronRight className="w-4 h-4 text-[#8B95A1]" />
            </div>

            {/* 선택: 마케팅 알림 */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleToggle("marketing")}
                className="flex items-center gap-3 text-left"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    terms.marketing ? "bg-[#3182F6] text-white" : "bg-[#E5E8EB] text-[#8B95A1]"
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-xs font-medium text-[#6B7684]">
                  [선택] 오늘의 인연 및 호감 알림 받기
                </span>
              </button>
              <ChevronRight className="w-4 h-4 text-[#8B95A1]" />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 동의하고 계속하기 버튼 */}
      <div className="pb-4 pt-6">
        <Link
          href={isRequiredDone ? "/auth/profile-step1" : "#"}
          className={`w-full h-14 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
            isRequiredDone
              ? "bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-md shadow-blue-500/20 active:scale-[0.98]"
              : "bg-[#F2F4F6] text-[#8B95A1] cursor-not-allowed pointer-events-none"
          }`}
        >
          <span>동의하고 프로필 등록하기</span>
        </Link>
      </div>
    </div>
  );
}
