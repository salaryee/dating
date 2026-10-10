"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, Lock } from "lucide-react";

export default function TermsPage() {
  const [allAgreed, setAllAgreed] = useState(false);
  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
  });

  const handleAllAgree = () => {
    const nextVal = !allAgreed;
    setAllAgreed(nextVal);
    setTerms({
      service: nextVal,
      privacy: nextVal,
    });
  };

  const handleToggle = (key: keyof typeof terms) => {
    const nextTerms = { ...terms, [key]: !terms[key] };
    setTerms(nextTerms);
    setAllAgreed(nextTerms.service && nextTerms.privacy);
  };

  const isRequiredDone = terms.service && terms.privacy;

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6 sm:p-7 w-full">
      <div>
        {/* 상단 프로그레스 바 (토스 스타일 25%) */}
        <div className="pt-2 pb-5">
          <div className="h-1 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#3182F6] rounded-full w-1/4 transition-all duration-300"></div>
          </div>
          <div className="flex items-center justify-end mt-3">
            <span className="text-[12.5px] font-bold text-[#3182F6] bg-[#E8F3FF] px-3 py-1 rounded-full">
              1 / 4 단계
            </span>
          </div>
        </div>

        {/* 타이틀 (토스 UX: 정갈한 해요체) */}
        <div>
          <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
            샐러리 이용을 위해<br />
            약관에 동의해 주세요
          </h1>
          <p className="text-[14px] text-[#6B7684] mt-2 font-medium">
            안전하고 깨끗한 직장인 만남을 위해 꼭 필요해요.
          </p>
        </div>

        {/* 약관 리스트 (화면 일체형 오픈 레이아웃) */}
        <div className="mt-8 flex flex-col">
          {/* 전체 동의 오픈 헤더 */}
          <button
            type="button"
            onClick={handleAllAgree}
            className="flex items-center gap-3.5 text-left py-2 active:opacity-75 transition-opacity cursor-pointer"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                allAgreed ? "bg-[#3182F6] text-white" : "bg-[#E5E8EB] text-[#8B95A1]"
              }`}
            >
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <span className="text-[17px] font-bold text-[#191F28]">약관 전체 동의하기</span>
              <p className="text-[13px] text-[#8B95A1] mt-0.5 font-medium">서비스 이용에 필요한 필수 항목이에요</p>
            </div>
          </button>

          {/* 구분선 */}
          <div className="h-px bg-[#F2F4F6] my-4 w-full" />

          {/* 개별 항목들 */}
          <div className="flex flex-col gap-4">
            {/* 필수 1: 서비스 이용약관 */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggle("service")}
                className="flex items-center gap-3 text-left flex-1 cursor-pointer"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                    terms.service ? "bg-[#3182F6] text-white" : "bg-[#E5E8EB] text-[#8B95A1]"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-[15px] font-semibold text-[#191F28]">
                  [필수] 서비스 이용약관 동의
                </span>
              </button>
              <ChevronRight className="w-5 h-5 text-[#8B95A1]" />
            </div>

            {/* 필수 2: 개인정보 수집 및 이용 */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggle("privacy")}
                className="flex items-center gap-3 text-left flex-1 cursor-pointer"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                    terms.privacy ? "bg-[#3182F6] text-white" : "bg-[#E5E8EB] text-[#8B95A1]"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-[15px] font-semibold text-[#191F28]">
                  [필수] 개인정보 수집 및 이용 동의
                </span>
              </button>
              <ChevronRight className="w-5 h-5 text-[#8B95A1]" />
            </div>
          </div>
        </div>

        {/* 프라이버시 안심 노트 (verify-work와 동일한 레이아웃) */}
        <div className="mt-6 flex items-start gap-2.5 text-[13px] text-[#6B7684] font-medium px-1">
          <Lock className="w-4 h-4 text-[#00B368] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            동의하신 정보는 안전하게 암호화되며, <strong className="text-[#333D4B]">지인에게는 절대 프로필이 노출되지 않아요.</strong>
          </p>
        </div>
      </div>

      {/* 하단 CTA (56px 토스 표준 버튼) */}
      <div className="pb-6 pt-4">
        <Link
          href={isRequiredDone ? "/auth/profile-step1" : "#"}
          className={`w-full h-14 rounded-2xl font-bold text-[16px] transition-all flex items-center justify-center ${
            isRequiredDone
              ? "bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-lg shadow-blue-500/25 active:scale-[0.98]"
              : "bg-[#E5E8EB] text-[#8B95A1] cursor-not-allowed pointer-events-none"
          }`}
        >
          다음
        </Link>
      </div>
    </div>
  );
}
