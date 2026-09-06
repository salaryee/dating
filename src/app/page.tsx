"use client";

import { useState } from "react";
import Link from "next/link";
import MobileHeader from "@/components/layout/MobileHeader";
import {
  Heart,
  X,
  Sparkles,
  Building2,
  MapPin,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Car,
  FileText,
  Hand,
  RotateCcw,
  ChevronRight,
} from "lucide-react";

// 기획서 100% 반영: 토스 스타일의 정갈한 프로필 카드 데이터
const TODAY_RECOMMENDATIONS = [
  {
    id: "rec-1",
    name: "지민",
    birthYear: 1996, // 29세
    gender: "여성",
    company: "네이버 (NAVER)",
    job: "프로덕트 기획자",
    location: "판교 · 분당",
    mbti: "ENFP",
    commuteTime: "09:30 출근 · 18:30 퇴근",
    commuteMethod: "지하철(신분당선)",
    drinking: "가끔 한잔",
    smoking: "비흡연",
    matchScore: 95, // 가치관 유사도 점수
    handImageDescription: "시계를 찬 단정하고 맑은 손등",
    handGradient: "from-[#FBF2EC] via-[#FDF7F2] to-[#F5EBE1]",
    handwritingText: "퇴근 후 좋아하는 음악 들으며 밤 산책하는 시간을 가장 아껴요. 사소한 일상도 편안하게 나눌 수 있는 분을 만나고 싶어요.",
    workVerifiedMonth: "2026.08 인증 완료",
  },
  {
    id: "rec-2",
    name: "준호",
    birthYear: 1994, // 31세
    gender: "남성",
    company: "토스 (비바리퍼블리카)",
    job: "데이터 엔지니어",
    location: "강남 · 서초",
    mbti: "INTJ",
    commuteTime: "10:00 출근 · 19:00 퇴근",
    commuteMethod: "자차 출퇴근",
    drinking: "안 마심",
    smoking: "비흡연",
    matchScore: 91,
    handImageDescription: "손가락이 길고 깔끔한 손등",
    handGradient: "from-[#EBF3FC] via-[#F2F7FD] to-[#E2EDF9]",
    handwritingText: "주말에는 가볍게 러닝을 하거나 서점에서 시간을 보내요. 서로의 일과 가치관을 존중하며 함께 성장하는 인연을 찾고 있어요.",
    workVerifiedMonth: "2026.07 인증 완료",
  },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activePhotoTab, setActivePhotoTab] = useState<"hand" | "note">("hand");
  const [likedList, setLikedList] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentProfile = TODAY_RECOMMENDATIONS[currentIndex];
  const remainingCount = Math.max(0, TODAY_RECOMMENDATIONS.length - currentIndex);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePass = () => {
    showToast("다음 추천으로 넘어갔어요.");
    setActivePhotoTab("hand");
    setCurrentIndex((prev) => prev + 1);
  };

  const handleLike = () => {
    if (currentProfile) {
      setLikedList((prev) => [...prev, currentProfile.id]);
      showToast(`${currentProfile.name}님에게 호감을 보냈어요! 상대방이 수락하면 대화가 시작돼요.`);
    }
    setActivePhotoTab("hand");
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setActivePhotoTab("hand");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F6]">
      <MobileHeader />

      {/* 토스트 안내 팝업 (토스 스타일 상단 토스트) */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="bg-[#191F28]/95 backdrop-blur-md text-white px-4 py-3.5 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#3182F6] shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 토스 스타일 메인 타이틀 영역 */}
      <div className="px-5 pt-3 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-extrabold text-[#191F28] tracking-tight leading-snug">
              오늘 도착한<br />2명의 인연이에요
            </h1>
            <p className="text-xs text-[#8B95A1] mt-1 font-medium">
              매일 밤 10시, 직장 인증을 마친 인연을 추천해요
            </p>
          </div>
          <div className="bg-[#E8F3FF] text-[#1B64DA] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 self-start">
            <Sparkles className="w-3.5 h-3.5" />
            <span>남은 인연 {remainingCount}명</span>
          </div>
        </div>
      </div>

      {/* 메인 추천 카드 영역 (토스 스타일 화이트 카드) */}
      <div className="flex-1 px-5 py-2 flex flex-col justify-center">
        {currentProfile ? (
          <div className="bg-white rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#E5E8EB] overflow-hidden flex flex-col">
            
            {/* 카드 헤더: 회사 뱃지 & 가치관 점수 */}
            <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-[#F2F4F6]">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-[#E6F7F0] text-[#00B368] text-xs font-bold px-2.5 py-1 rounded-xl">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00B368]" />
                  {currentProfile.company}
                </span>
                <span className="text-[11px] text-[#8B95A1] font-medium">
                  {currentProfile.workVerifiedMonth}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#8B95A1] font-medium block">가치관 유사도</span>
                <span className="text-sm font-black text-[#3182F6]">
                  {currentProfile.matchScore}점
                </span>
              </div>
            </div>

            {/* 토스 스타일 탭 전환 세그먼트 (손등 사진 ↔ 자필 손글씨) */}
            <div className="px-5 pt-4 pb-2">
              <div className="flex bg-[#F2F4F6] p-1 rounded-2xl">
                <button
                  onClick={() => setActivePhotoTab("hand")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                    activePhotoTab === "hand"
                      ? "bg-white text-[#191F28] shadow-sm"
                      : "text-[#8B95A1] hover:text-[#4E5968]"
                  }`}
                >
                  <Hand className="w-4 h-4 text-[#3182F6]" />
                  <span>손등 사진</span>
                </button>
                <button
                  onClick={() => setActivePhotoTab("note")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                    activePhotoTab === "note"
                      ? "bg-white text-[#191F28] shadow-sm"
                      : "text-[#8B95A1] hover:text-[#4E5968]"
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#3182F6]" />
                  <span>자필 손글씨</span>
                </button>
              </div>
            </div>

            {/* 비주얼 뷰어 영역 */}
            <div className="px-5 py-2">
              {activePhotoTab === "hand" ? (
                /* 손등 사진 카드 */
                <div
                  className={`h-60 rounded-[22px] bg-gradient-to-br ${currentProfile.handGradient} border border-[#E5E8EB] flex flex-col justify-between p-4 relative overflow-hidden`}
                >
                  <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#333D4B] shadow-sm self-start">
                    <Hand className="w-3.5 h-3.5 text-[#3182F6]" />
                    <span>얼굴 대신 손등의 온기</span>
                  </div>

                  {/* Gemini AI 검증 뱃지 */}
                  <div className="self-end bg-[#191F28]/85 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow">
                    <Sparkles className="w-3.5 h-3.5 text-[#FEE500]" />
                    <span>Gemini AI 손등 판별 통과</span>
                  </div>
                </div>
              ) : (
                /* 자필 손글씨 카드 */
                <div className="h-60 rounded-[22px] bg-[#FFFBF0] border border-[#FEE500]/40 p-5 flex flex-col justify-between relative shadow-inner">
                  <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full text-xs font-bold text-[#8F6B00] shadow-sm self-start border border-[#FEE500]/30">
                    <FileText className="w-3.5 h-3.5 text-[#C48C00]" />
                    <span>직접 쓴 정갈한 손글씨</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#FEE500]/20 shadow-sm my-auto">
                    <p className="text-xs text-[#333D4B] leading-relaxed font-serif italic">
                      "{currentProfile.handwritingText}"
                    </p>
                  </div>

                  <div className="self-end text-[11px] text-[#4E5968] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00B368]" />
                    <span>AI 자필 및 클린 문구 검증 완료</span>
                  </div>
                </div>
              )}
            </div>

            {/* 인적사항 및 직장인 라이프스타일 칩 */}
            <div className="px-5 py-3 flex flex-col gap-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-[22px] font-black text-[#191F28]">
                    {currentProfile.name}
                  </h2>
                  <span className="text-sm font-bold text-[#4E5968]">
                    {2026 - currentProfile.birthYear + 1}세 · {currentProfile.gender}
                  </span>
                  <span className="text-xs bg-[#E8F3FF] text-[#1B64DA] font-extrabold px-2.5 py-0.5 rounded-lg">
                    {currentProfile.mbti}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#4E5968] mt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#8B95A1]" />
                    {currentProfile.job}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8B95A1]" />
                    {currentProfile.location}
                  </span>
                </div>
              </div>

              {/* 토스 스타일 칩 그리드 */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#F2F4F6] text-xs text-[#333D4B]">
                <div className="flex items-center gap-2 bg-[#F2F4F6] px-3 py-2.5 rounded-xl">
                  <Clock className="w-4 h-4 text-[#8B95A1] shrink-0" />
                  <span className="truncate font-semibold text-[11px]">{currentProfile.commuteTime}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#F2F4F6] px-3 py-2.5 rounded-xl">
                  <Car className="w-4 h-4 text-[#8B95A1] shrink-0" />
                  <span className="truncate font-semibold text-[11px]">{currentProfile.commuteMethod}</span>
                </div>
              </div>
            </div>

            {/* 하단 토스 스타일 CTA 버튼 (시원한 56px 버튼) */}
            <div className="p-5 bg-white border-t border-[#F2F4F6] flex items-center gap-2.5">
              <button
                onClick={handlePass}
                className="w-1/3 h-14 rounded-2xl bg-[#F2F4F6] text-[#4E5968] font-extrabold text-sm hover:bg-[#E5E8EB] toss-press-effect flex items-center justify-center gap-1"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span>다음에</span>
              </button>

              <button
                onClick={handleLike}
                className="w-2/3 h-14 rounded-2xl bg-[#3182F6] text-white font-extrabold text-base hover:bg-[#1B64DA] toss-press-effect flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>호감 보내기</span>
              </button>
            </div>
          </div>
        ) : (
          /* 추천 2명 모두 완료 화면 */
          <div className="bg-white rounded-[28px] p-8 shadow-sm border border-[#E5E8EB] text-center flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-[#E8F3FF] flex items-center justify-center text-[#3182F6]">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#191F28]">
                오늘의 추천 2명을 모두 확인했어요
              </h3>
              <p className="text-xs text-[#4E5968] mt-1.5 leading-relaxed font-medium">
                매일 밤 10시에 새로운 직장인 추천이 도착해요.<br />
                직장인 라운지에서 새로운 이야기를 나눠보세요.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="w-full h-12 rounded-2xl bg-[#F2F4F6] text-[#333D4B] font-bold text-xs hover:bg-[#E5E8EB] toss-press-effect flex items-center justify-center gap-1.5 mt-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>추천 카드 다시 보기</span>
            </button>
          </div>
        )}
      </div>

      {/* 안심 인증 가이드 배너 (토스 스타일 카드) */}
      <div className="px-5 pb-28 pt-2">
        <Link
          href="/auth/verify-work"
          className="bg-white p-4 rounded-2xl border border-[#E5E8EB] flex items-center justify-between hover:border-blue-200 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E8F3FF] flex items-center justify-center text-[#3182F6]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#191F28]">100% 명함 인증 시스템</p>
              <p className="text-[11px] text-[#8B95A1]">얼굴 노출 없이 손글씨와 가치관으로 만나요</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8B95A1]" />
        </Link>
      </div>
    </div>
  );
}
