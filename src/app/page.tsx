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
      {/* 토스 스타일: 컴팩트한 타이틀 영역 */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-[20px] font-black text-[#191F28] tracking-tight">
            오늘의 인연
          </h1>
          <span className="text-xs bg-[#E8F3FF] text-[#3182F6] font-bold px-2 py-0.5 rounded-full">
            {currentIndex + 1} / {TODAY_RECOMMENDATIONS.length}
          </span>
        </div>
        <span className="text-[12px] text-[#8B95A1] font-medium">
          매일 밤 10시 도착
        </span>
      </div>

      {/* 메인 콘텐츠 영역 (한 화면에 모든 가치가 쏙 들어오는 카드 1장) */}
      <div className="flex-1 px-4 pb-20 flex flex-col justify-start">
        {currentProfile ? (
          <div className="bg-white rounded-[28px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E5E8EB]/60 flex flex-col gap-3.5">
            
            {/* 1. 손등 사진 ↔ 자필 글씨 토글 (초미니멀 세그먼트) */}
            <div className="flex bg-[#F2F4F6] p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("hand")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "hand"
                    ? "bg-white text-[#191F28] shadow-sm"
                    : "text-[#8B95A1]"
                }`}
              >
                손등 사진
              </button>
              <button
                onClick={() => setActiveTab("note")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "note"
                    ? "bg-white text-[#191F28] shadow-sm"
                    : "text-[#8B95A1]"
                }`}
              >
                자필 글씨
              </button>
            </div>

            {/* 2. 비주얼 영역 (높이 최적화로 한 화면 완벽 맞춤) */}
            {activeTab === "hand" ? (
              <div
                className={`h-48 sm:h-52 rounded-[20px] bg-gradient-to-br ${currentProfile.handGradient} flex flex-col justify-between p-4 relative overflow-hidden`}
              >
                <span className="self-start bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-[#333D4B]">
                  얼굴 대신 손등의 온기
                </span>
                <span className="self-end text-[10px] font-bold text-[#4E5968] bg-white/70 backdrop-blur-md px-2 py-0.5 rounded-lg">
                  Gemini AI 검증 완료
                </span>
              </div>
            ) : (
              <div className="h-48 sm:h-52 rounded-[20px] bg-[#FFFBF2] p-5 flex flex-col justify-between border border-[#F5E8D0]">
                <span className="self-start bg-white px-2.5 py-1 rounded-full text-[11px] font-bold text-[#8F6B00]">
                  직접 쓴 정갈한 손글씨
                </span>
                <p className="text-sm text-[#333D4B] leading-relaxed font-serif italic my-auto text-center px-2">
                  &ldquo;{currentProfile.quote}&rdquo;
                </p>
                <span className="self-end text-[10px] font-bold text-[#8F6B00]/70">
                  클린 문구 검증 완료
                </span>
              </div>
            )}

            {/* 3. 인적사항 (크고 시원한 토스 볼드 타이포) */}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[22px] font-black text-[#191F28] tracking-tight">
                  {currentProfile.name}
                </h2>
                <span className="text-base font-bold text-[#8B95A1]">
                  {currentProfile.age}세
                </span>
                <span className="ml-auto text-xs text-[#00B368] font-bold bg-[#E6F7F0] px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00B368]" />
                  {currentProfile.company}
                </span>
              </div>
              
              <p className="text-xs text-[#6B7684] mt-1 font-medium">
                {currentProfile.job} · {currentProfile.location}
              </p>
            </div>

            {/* 4. 라이프스타일 핵심 정보 (불필요한 아코디언 제거, 3대 가치 배지 노출) */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#F2F4F6]">
              <span className="bg-[#F2F4F6] text-[#4E5968] text-xs font-semibold px-2.5 py-1 rounded-lg">
                {currentProfile.mbti}
              </span>
              <span className="bg-[#F2F4F6] text-[#4E5968] text-xs font-semibold px-2.5 py-1 rounded-lg">
                {currentProfile.commute}
              </span>
              <span className="bg-[#F2F4F6] text-[#4E5968] text-xs font-semibold px-2.5 py-1 rounded-lg">
                {currentProfile.lifestyle}
              </span>
            </div>

            {/* 5. 하단 CTA 버튼 2개 (엄지손가락으로 바로 터치) */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={handlePass}
                className="w-1/3 h-13 rounded-2xl bg-[#F2F4F6] text-[#4E5968] font-extrabold text-sm hover:bg-[#E5E8EB] toss-press-effect"
              >
                다음에
              </button>
              <button
                onClick={handleLike}
                className="w-2/3 h-13 rounded-2xl bg-[#3182F6] text-white font-extrabold text-sm hover:bg-[#1B64DA] toss-press-effect flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>호감 보내기</span>
              </button>
            </div>

          </div>
        ) : (
          /* 추천 완료 화면 (토스 스타일 미니멀) */
          <div className="bg-white rounded-[28px] p-8 text-center flex flex-col items-center justify-center gap-4 my-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F3FF] flex items-center justify-center text-[#3182F6]">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#191F28]">
                오늘의 추천이 끝났어요
              </h3>
              <p className="text-xs text-[#8B95A1] mt-1.5 leading-relaxed">
                매일 밤 10시에 새로운 추천 2명이 도착해요.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="w-full h-12 rounded-2xl bg-[#F2F4F6] text-[#333D4B] font-bold text-sm hover:bg-[#E5E8EB] toss-press-effect mt-2"
            >
              추천 다시 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
