"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { User, ChevronDown, Lock, Sparkles, CheckCircle2 } from "lucide-react";

export default function ProfileStep1Page() {
  const [nickname, setNickname] = useState("민지");
  const [gender, setGender] = useState<"여성" | "남성">("여성");
  const [birthYear, setBirthYear] = useState<number>(1997);

  // 현재 연도(2026) 기준 계산되는 나이 안내 (만 나이 기준)
  const currentYear = 2026;
  const calculatedAge = currentYear - birthYear;

  // 1970년생부터 2007년생(만 19세 이상)까지의 출생년도 옵션
  const birthYearOptions = Array.from({ length: 38 }, (_, i) => 2007 - i);

  const isFormValid = nickname.trim().length >= 2;

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6 sm:p-7 w-full max-w-lg mx-auto">
      <div>
        {/* 상단 프로그레스 바 (토스 스타일 33%, 6단계 중 2단계) */}
        <div className="pt-2 pb-5">
          <div className="h-1 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#3182F6] rounded-full w-2/6 transition-all duration-300"></div>
          </div>
          <div className="flex items-center justify-end mt-3">
            <span className="text-[12.5px] font-bold text-[#3182F6] bg-[#E8F3FF] px-3 py-1 rounded-full">
              2 / 6 단계
            </span>
          </div>
        </div>

        {/* 타이틀 (경쾌하고 깔끔한 기본 프로필 안내) */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F3FF] text-[#3182F6] text-[12.5px] font-bold mb-2.5">
            <User className="w-3.5 h-3.5" />
            <span>기본 프로필</span>
          </div>
          <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
            상대방에게 불릴 이름과<br />
            기본 정보를 알려주세요
          </h1>
          <p className="text-[14px] text-[#6B7684] mt-2 leading-relaxed font-medium">
            3초면 끝나요. 나중에 프로필에서 언제든 수정할 수 있어요.
          </p>
        </div>

        {/* 기본 정보 입력 폼 영역 */}
        <div className="mt-8 flex flex-col gap-5">
          {/* 1. 닉네임 입력 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14.5px] font-bold text-[#333D4B]">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="상대방에게 불릴 닉네임을 입력해 주세요"
              className="w-full px-4 h-14 rounded-2xl bg-[#F2F4F6] border border-transparent text-[16px] font-bold text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all"
              maxLength={10}
            />
            <div className="flex justify-between text-[12.5px] text-[#8B95A1] px-1 font-medium">
              <span>한글/영문 2~10자</span>
              <span>{nickname.length}/10자</span>
            </div>
          </div>

          {/* 2. 성별 선택 (TDS Segmented Control) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14.5px] font-bold text-[#333D4B]">성별</label>
            <div className="flex bg-[#F2F4F6] p-1 rounded-2xl h-14 items-center">
              {(["여성", "남성"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setGender(item)}
                  className={`flex-1 h-full rounded-xl text-[15px] font-bold transition-all cursor-pointer ${
                    gender === item
                      ? "bg-[#3182F6] text-white shadow-xs"
                      : "text-[#6B7684] hover:text-[#333D4B]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 3. 출생년도 선택 (TDS Select Component with calculated age badge) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[14.5px] font-bold text-[#333D4B]">출생년도</label>
              <span className="text-[12.5px] font-bold text-[#3182F6] bg-[#E8F3FF] px-2.5 py-0.5 rounded-full">
                {calculatedAge}세
              </span>
            </div>
            <div className="relative">
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(Number(e.target.value))}
                className="w-full h-14 pl-4 pr-10 rounded-2xl bg-[#F2F4F6] border border-transparent text-[15px] font-bold text-[#191F28] appearance-none focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all cursor-pointer"
              >
                {birthYearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}년생 ({currentYear - year}세)
                  </option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-[#8B95A1] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 안심 보증 안내 카드 */}
        <div className="mt-8 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E8F3FF] flex items-center justify-center text-[#3182F6] shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div className="text-[13px] text-[#6B7684] leading-relaxed font-medium">
            <strong className="text-[#333D4B]">신뢰할 수 있는 만남을 위해</strong> 본인 정보는 암호화되어 안전하게 보호되며, 실명이나 연락처는 상대방에게 절대 공개되지 않아요.
          </div>
        </div>
      </div>

      {/* 하단 CTA (손등 사진 등록 단계로 자연스럽게 연결) */}
      <div className="pb-6 pt-4">
        <Link
          href={isFormValid ? "/auth/profile-hand" : "#"}
          className={`w-full h-14 rounded-2xl font-bold text-[16px] transition-all flex items-center justify-center ${
            isFormValid
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
