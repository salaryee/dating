"use client";

import { useState } from "react";
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
} from "lucide-react";

// 기획서 100% 반영: 얼굴 사진 대신 '손등 사진' & '자필 글씨' 중심 프로필 데이터
const TODAY_RECOMMENDATIONS = [
  {
    id: "rec-1",
    name: "지민",
    birthYear: 1996, // 29세
    gender: "여성",
    company: "네이버",
    job: "프로덕트 기획자",
    location: "판교 · 분당",
    mbti: "ENFP",
    commuteTime: "09:30 출근 · 18:30 퇴근",
    commuteMethod: "지하철(신분당선)",
    drinking: "가끔 한잔",
    smoking: "비흡연",
    matchScore: 95, // 가치관 유사도 스코어
    // AI 검증 상태 (Gemini 1.5 / 2.0 Flash 검증 통과)
    aiVerified: {
      hand: true,
      handwriting: true,
      cleanContent: true,
    },
    // 손등 이미지 카드 비주얼
    handImageDescription: "정갈하고 깔끔한 손등 사진",
    handGradient: "from-amber-100 via-rose-50 to-orange-100",
    // 자필 글씨 내용
    handwritingText: "퇴근 후 좋아하는 음악 들으며 산책하는 시간을 가장 아껴요. 사소한 일상을 편안하게 나눌 수 있는 분을 만나고 싶어요.",
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
    drinking: "거의 안 마심",
    smoking: "비흡연",
    matchScore: 91,
    aiVerified: {
      hand: true,
      handwriting: true,
      cleanContent: true,
    },
    handImageDescription: "시계를 찬 단정한 손등 사진",
    handGradient: "from-blue-50 via-slate-100 to-indigo-100",
    handwritingText: "주말에는 러닝을 하거나 서점에서 시간을 보내요. 서로의 일과 가치관을 존중하며 함께 성장하는 관계를 지향해요.",
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
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <MobileHeader />

      {/* 토스트 안내 메시지 */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3182F6] shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 상단 안내 바 (토스 UX 라이팅: 해요체 & 명확한 정보 제공) */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              오늘의 추천
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              매일 밤 10시, 진심을 담은 직장인 2명을 추천해요
            </p>
          </div>
          <div className="bg-blue-50 text-[#3182F6] px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>오늘 남은 추천 {remainingCount}명</span>
          </div>
        </div>
      </div>

      {/* 메인 추천 카드 영역 */}
      <div className="flex-1 px-4 py-2 flex flex-col justify-center">
        {currentProfile ? (
          <div className="bg-white rounded-3xl shadow-[0_4px_25px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col">
            
            {/* 카드 상단: 회사 인증 & 매칭 스코어 */}
            <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-50">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-200/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {currentProfile.company} 재직 인증
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {currentProfile.workVerifiedMonth}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 font-medium">가치관 유사도</span>
                <p className="text-sm font-extrabold text-[#3182F6]">
                  {currentProfile.matchScore}점
                </p>
              </div>
            </div>

            {/* 사진 탭 전환 (손등 사진 vs 자필 글씨) */}
            <div className="px-5 pt-3 pb-1 flex gap-2">
              <button
                onClick={() => setActivePhotoTab("hand")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activePhotoTab === "hand"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                <Hand className="w-3.5 h-3.5" />
                <span>손등 사진 보기</span>
              </button>
              <button
                onClick={() => setActivePhotoTab("note")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activePhotoTab === "note"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>자필 글씨 보기</span>
              </button>
            </div>

            {/* 이미지 / 비주얼 뷰어 영역 */}
            <div className="px-5 py-2">
              {activePhotoTab === "hand" ? (
                /* 손등 사진 영역 */
                <div
                  className={`h-56 rounded-2xl bg-gradient-to-br ${currentProfile.handGradient} border border-slate-100 flex flex-col justify-between p-4 relative overflow-hidden`}
                >
                  <div className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-700 shadow-sm self-start">
                    <Hand className="w-3 h-3 text-[#3182F6]" />
                    <span>얼굴 대신 손등의 온기</span>
                  </div>

                  {/* Gemini AI 검증 안내 뱃지 */}
                  <div className="self-end bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Gemini AI 손등 판별 통과</span>
                  </div>
                </div>
              ) : (
                /* 자필 글씨 카드 영역 */
                <div className="h-56 rounded-2xl bg-amber-50/60 border border-amber-200/60 p-4 flex flex-col justify-between relative shadow-inner">
                  <div className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full text-[11px] font-semibold text-amber-800 shadow-sm self-start border border-amber-100">
                    <FileText className="w-3 h-3 text-amber-600" />
                    <span>직접 쓴 정갈한 자필 쪽지</span>
                  </div>

                  <div className="bg-white/95 p-3.5 rounded-xl border border-amber-100 shadow-sm my-auto">
                    <p className="text-xs text-slate-800 leading-relaxed font-serif italic">
                      "{currentProfile.handwritingText}"
                    </p>
                  </div>

                  <div className="self-end text-[10px] text-slate-500 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>AI 자필 및 클린 문구 검증 완료</span>
                  </div>
                </div>
              )}
            </div>

            {/* 프로필 인적사항 정보 */}
            <div className="px-5 py-3 flex flex-col gap-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    {currentProfile.name}
                  </h2>
                  <span className="text-sm font-semibold text-slate-500">
                    {2026 - currentProfile.birthYear + 1}세 · {currentProfile.gender}
                  </span>
                  <span className="text-xs bg-blue-50 text-[#3182F6] font-bold px-2 py-0.5 rounded-md">
                    {currentProfile.mbti}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600 mt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    {currentProfile.job}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {currentProfile.location}
                  </span>
                </div>
              </div>

              {/* 직장인 맞춤 라이프스타일 뱃지 */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{currentProfile.commuteTime}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl">
                  <Car className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{currentProfile.commuteMethod}</span>
                </div>
              </div>
            </div>

            {/* 하단 행동 버튼 (토스 UX: 예측 가능한 명확한 동사형 CTA) */}
            <div className="px-5 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={handlePass}
                className="flex-1 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span>다음에 보기</span>
              </button>

              <button
                onClick={handleLike}
                className="flex-2 py-3.5 rounded-2xl bg-[#3182F6] text-white font-bold text-xs hover:bg-[#2868c7] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>호감 보내기</span>
              </button>
            </div>
          </div>
        ) : (
          /* 오늘의 추천 2명을 모두 확인했을 때 */
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#3182F6]">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                오늘의 추천 2명을 모두 확인했어요
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                매일 밤 10시에 새로운 직장인 추천이 도착해요.<br />
                직장인 라운지에서 새로운 이야기를 나눠보세요.
              </p>
            </div>
            <div className="flex flex-col w-full gap-2 pt-2">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>추천 카드 다시 보기</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 안심 직장인 가이드 바 */}
      <div className="px-5 pb-6">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#3182F6]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">100% 명함 인증제 운영 중</p>
              <p className="text-[10px] text-slate-500">얼굴 노출 없이 손글씨와 가치관으로 만나요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
