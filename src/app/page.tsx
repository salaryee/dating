"use client";

import { useState } from "react";
import Link from "next/link";
import MobileHeader from "@/components/layout/MobileHeader";
import {
  Heart,
  X,
  Sparkles,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Hand,
  FileText,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

// 토스 철학: 불필요한 군더더기를 걷어낸 정갈한 2인 추천 데이터
const TODAY_RECOMMENDATIONS = [
  {
    id: "rec-1",
    name: "지민",
    age: 29,
    company: "네이버",
    job: "기획자",
    location: "판교",
    mbti: "ENFP",
    commute: "09:30 출근 · 지하철",
    lifestyle: "비흡연 · 가끔 한잔",
    handGradient: "from-[#F7EFE8] to-[#EFE2D6]",
    quote: "퇴근 후 좋아하는 음악 들으며 밤 산책하는 시간을 가장 아껴요.",
  },
  {
    id: "rec-2",
    name: "준호",
    age: 31,
    company: "토스",
    job: "데이터 엔지니어",
    location: "강남",
    mbti: "INTJ",
    commute: "10:00 출근 · 자차",
    lifestyle: "비흡연 · 안 마심",
    handGradient: "from-[#E8F0F8] to-[#D6E4F2]",
    quote: "주말엔 러닝을 하거나 서점에서 서로의 가치관을 나누고 싶어요.",
  },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"hand" | "note">("hand");
  const [showDetail, setShowDetail] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentProfile = TODAY_RECOMMENDATIONS[currentIndex];
  const remainingCount = Math.max(0, TODAY_RECOMMENDATIONS.length - currentIndex);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handlePass = () => {
    showToast("다음 추천으로 넘어갔어요");
    setActiveTab("hand");
    setShowDetail(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleLike = () => {
    if (currentProfile) {
      showToast(`${currentProfile.name}님에게 호감을 보냈어요`);
    }
    setActiveTab("hand");
    setShowDetail(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setActiveTab("hand");
    setShowDetail(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F6]">
      <MobileHeader />

      {/* 토스 상단 토스트 */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="bg-[#191F28] text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3182F6] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 토스 특유의 시원한 상단 타이틀 (복잡한 뱃지 제거) */}
      <div className="px-6 pt-5 pb-4">
        <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-tight">
          오늘의 추천
        </h1>
        <p className="text-[13px] text-[#8B95A1] mt-1 font-medium">
          매일 밤 10시 도착 · 남은 인연 {remainingCount}명
        </p>
      </div>

      {/* 메인 콘텐츠 영역 (토스식 극도의 여백과 카드 1장 중심) */}
      <div className="flex-1 px-5 pb-28">
        {currentProfile ? (
          <div className="bg-white rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-6">
            
            {/* 1. 손등 사진 ↔ 자필 글씨 토글 (초미니멀 토스 세그먼트) */}
            <div className="flex bg-[#F2F4F6] p-1 rounded-2xl">
              <button
                onClick={() => setActiveTab("hand")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "hand"
                    ? "bg-white text-[#191F28] shadow-sm"
                    : "text-[#8B95A1]"
                }`}
              >
                손등 사진
              </button>
              <button
                onClick={() => setActiveTab("note")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "note"
                    ? "bg-white text-[#191F28] shadow-sm"
                    : "text-[#8B95A1]"
                }`}
              >
                자필 글씨
              </button>
            </div>

            {/* 2. 시원하고 큰 비주얼 영역 (자잘한 장식 제거) */}
            {activeTab === "hand" ? (
              <div
                className={`h-72 rounded-[24px] bg-gradient-to-br ${currentProfile.handGradient} flex flex-col justify-between p-5 relative overflow-hidden`}
              >
                <span className="self-start bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#333D4B]">
                  얼굴 대신 손등의 온기
                </span>
                <span className="self-end text-[11px] font-bold text-[#4E5968] bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  Gemini AI 검증 완료
                </span>
              </div>
            ) : (
              <div className="h-72 rounded-[24px] bg-[#FFFBF2] p-6 flex flex-col justify-between border border-[#F5E8D0]">
                <span className="self-start bg-white px-3 py-1 rounded-full text-xs font-bold text-[#8F6B00]">
                  직접 쓴 정갈한 손글씨
                </span>
                <p className="text-sm text-[#333D4B] leading-relaxed font-serif italic my-auto text-center px-2">
                  "{currentProfile.quote}"
                </p>
                <span className="self-end text-[11px] font-bold text-[#8F6B00]/70">
                  클린 문구 검증 완료
                </span>
              </div>
            )}

            {/* 3. 인적사항 (토스 스타일: 크고 시원한 텍스트 2줄) */}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[26px] font-black text-[#191F28] tracking-tight">
                  {currentProfile.name}
                </h2>
                <span className="text-lg font-bold text-[#8B95A1]">
                  {currentProfile.age}세
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-[#4E5968] mt-1 font-semibold">
                <span className="text-[#00B368] font-extrabold flex items-center gap-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#00B368]" />
                  {currentProfile.company}
                </span>
                <span>·</span>
                <span>{currentProfile.job}</span>
                <span>·</span>
                <span>{currentProfile.location}</span>
              </div>
            </div>

            {/* 4. 더 알아보기 (토스식 Progressive Disclosure: 기본은 숨김, 누르면 확장) */}
            <div className="border-t border-[#F2F4F6] pt-4">
              <button
                onClick={() => setShowDetail(!showDetail)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#8B95A1] hover:text-[#4E5968]"
              >
                <span>직장인 라이프스타일 정보</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showDetail ? "rotate-180 text-[#191F28]" : ""
                  }`}
                />
              </button>

              {showDetail && (
                <div className="mt-3 flex flex-col gap-2 animate-in fade-in duration-200">
                  <div className="flex justify-between py-2 text-xs border-b border-[#F2F4F6]">
                    <span className="text-[#8B95A1]">MBTI</span>
                    <span className="font-bold text-[#191F28]">{currentProfile.mbti}</span>
                  </div>
                  <div className="flex justify-between py-2 text-xs border-b border-[#F2F4F6]">
                    <span className="text-[#8B95A1]">출퇴근 패턴</span>
                    <span className="font-bold text-[#191F28]">{currentProfile.commute}</span>
                  </div>
                  <div className="flex justify-between py-2 text-xs">
                    <span className="text-[#8B95A1]">음주 · 흡연</span>
                    <span className="font-bold text-[#191F28]">{currentProfile.lifestyle}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 5. 토스 시그니처 대형 56px 버튼 2개 */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handlePass}
                className="w-1/3 h-14 rounded-2xl bg-[#F2F4F6] text-[#4E5968] font-extrabold text-base hover:bg-[#E5E8EB] toss-press-effect"
              >
                다음에
              </button>
              <button
                onClick={handleLike}
                className="w-2/3 h-14 rounded-2xl bg-[#3182F6] text-white font-extrabold text-base hover:bg-[#1B64DA] toss-press-effect flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>호감 보내기</span>
              </button>
            </div>

          </div>
        ) : (
          /* 추천 완료 화면 (토스 스타일 미니멀) */
          <div className="bg-white rounded-[32px] p-10 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-[#E8F3FF] flex items-center justify-center text-[#3182F6]">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#191F28]">
                오늘의 추천이 끝났어요
              </h3>
              <p className="text-xs text-[#8B95A1] mt-2 leading-relaxed">
                매일 밤 10시에 새로운 추천 2명이 도착해요.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="w-full h-14 rounded-2xl bg-[#F2F4F6] text-[#333D4B] font-bold text-sm hover:bg-[#E5E8EB] toss-press-effect mt-4"
            >
              추천 다시 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
