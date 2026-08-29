"use client";

import { useState, useEffect } from "react";
import MobileHeader from "@/components/layout/MobileHeader";
import {
  Heart,
  X,
  Sparkles,
  Building2,
  MapPin,
  Briefcase,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// 직장인 소개팅 샘플 추천 프로필 데이터
const SAMPLE_PROFILES = [
  {
    id: "1",
    name: "지민",
    age: 29,
    company: "네이버 (IT/개발)",
    job: "프로덕트 디자이너",
    location: "판교 / 분당",
    height: "167cm",
    mbti: "ENFP",
    verified: true,
    bio: "주말에는 카페 투어와 전시회 보는 걸 좋아해요 ☕ 같이 맛있는 브런치 먹으러 가실 분!",
    tags: ["운동 좋아함", "비흡연", "반려견 집사", "와인 한잔"],
    gradient: "from-rose-400 via-pink-400 to-amber-300",
  },
  {
    id: "2",
    name: "준호",
    age: 31,
    company: "삼성전자 (대기업)",
    job: "반도체 연구원",
    location: "수원 / 강남",
    height: "180cm",
    mbti: "ISTJ",
    verified: true,
    bio: "평일엔 열심히 일하고 주말엔 러닝이나 등산 다닙니다 🏃 편안하고 대화 잘 통하는 인연을 찾아요.",
    tags: ["러닝 크루", "자기계발", "깔끔한 성격", "드라이브"],
    gradient: "from-blue-500 via-indigo-400 to-sky-300",
  },
  {
    id: "3",
    name: "수아",
    age: 28,
    company: "쿠팡 (이커머스)",
    job: "마케팅 PM",
    location: "송파 / 잠실",
    height: "164cm",
    mbti: "ESFJ",
    verified: true,
    bio: "긍정적인 에너지 가득한 성격이에요! 일상 속 소소한 행복을 함께 나눌 분 찾아요 ✨",
    tags: ["맛집 탐방", "뮤지컬 관람", "필라테스", "솔직한 대화"],
    gradient: "from-purple-400 via-pink-500 to-rose-300",
  },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [supabaseStatus, setSupabaseStatus] = useState<"checking" | "connected" | "error">("checking");
  const [statusMessage, setStatusMessage] = useState("");

  const currentProfile = SAMPLE_PROFILES[currentIndex];

  useEffect(() => {
    // Supabase 연결 상태 테스트
    async function checkSupabaseConnection() {
      try {
        const supabase = createClient();
        const { error } = await supabase.auth.getSession();
        if (error) {
          setSupabaseStatus("error");
          setStatusMessage(error.message);
        } else {
          setSupabaseStatus("connected");
          setStatusMessage("Supabase DB & Auth 정상 연결됨");
        }
      } catch (err: unknown) {
        setSupabaseStatus("error");
        setStatusMessage(err instanceof Error ? err.message : "연결 확인 실패");
      }
    }
    checkSupabaseConnection();
  }, []);

  const handleAction = (action: "pass" | "like" | "superlike") => {
    setLastAction(action);
    if (currentIndex < SAMPLE_PROFILES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(SAMPLE_PROFILES.length); // 모두 확인 완료
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setLastAction(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MobileHeader />

      {/* Supabase 연결 상태 알림 배너 */}
      <div className="px-4 pt-3 pb-1">
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border ${
            supabaseStatus === "connected"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : supabaseStatus === "checking"
              ? "bg-slate-100 text-slate-700 border-slate-200"
              : "bg-amber-50 text-amber-800 border-amber-200"
          }`}
        >
          {supabaseStatus === "connected" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          )}
          <span className="truncate">
            <strong>Supabase 상태:</strong> {statusMessage || "연결 확인 중..."}
          </span>
        </div>
      </div>

      {/* 메인 소개팅 카드 영역 */}
      <div className="flex-1 px-4 py-3 flex flex-col justify-center">
        {currentProfile ? (
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col transition-all duration-300">
            {/* 프로필 이미지/비주얼 영역 */}
            <div
              className={`h-72 bg-gradient-to-br ${currentProfile.gradient} relative flex flex-col justify-between p-4 text-white shadow-inner`}
            >
              {/* 상단 뱃지 */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{currentProfile.company}</span>
                </div>
                {currentProfile.verified && (
                  <div className="inline-flex items-center gap-1 bg-emerald-500/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>직장 인증</span>
                  </div>
                )}
              </div>

              {/* 하단 기본 인적사항 오버레이 */}
              <div className="drop-shadow-md">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-2xl font-extrabold">{currentProfile.name}</h2>
                  <span className="text-xl font-bold opacity-90">{currentProfile.age}세</span>
                  <span className="text-xs bg-white/30 backdrop-blur-sm px-2 py-0.5 rounded-md font-semibold">
                    {currentProfile.mbti}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs mt-1 text-white/90">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> {currentProfile.job}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {currentProfile.location}
                  </span>
                </div>
              </div>
            </div>

            {/* 프로필 상세 정보 영역 */}
            <div className="p-4 flex flex-col gap-3">
              {/* 자기소개 문구 */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-sm text-slate-700 leading-relaxed">
                "{currentProfile.bio}"
              </div>

              {/* 키워드 태그들 */}
              <div className="flex flex-wrap gap-1.5">
                {currentProfile.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-rose-50 text-rose-700 px-2.5 py-1 rounded-lg font-medium border border-rose-100/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 액션 버튼 (패스 / 슈퍼라이크 / 좋아요) */}
            <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-around">
              {/* 패스 버튼 */}
              <button
                onClick={() => handleAction("pass")}
                className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 hover:scale-105 active:scale-95 transition-all"
                title="다음 프로필 (Pass)"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>

              {/* 슈퍼라이크 / 하트 버튼 */}
              <button
                onClick={() => handleAction("superlike")}
                className="w-11 h-11 rounded-full bg-amber-50 border border-amber-200 shadow-sm flex items-center justify-center text-amber-500 hover:bg-amber-100 hover:scale-105 active:scale-95 transition-all"
                title="슈퍼 라이크"
              >
                <Sparkles className="w-5 h-5 fill-amber-400" />
              </button>

              {/* 좋아요 버튼 */}
              <button
                onClick={() => handleAction("like")}
                className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 shadow-lg shadow-rose-500/30 flex items-center justify-center text-white hover:brightness-110 hover:scale-105 active:scale-95 transition-all"
                title="좋아요 (Like)"
              >
                <Heart className="w-7 h-7 fill-white stroke-[2]" />
              </button>
            </div>
          </div>
        ) : (
          /* 모든 카드를 다 봤을 때 */
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">오늘의 추천이 끝났습니다!</h3>
              <p className="text-xs text-slate-500 mt-1">
                직장인 라운지에서 새로운 인연을 찾아보거나, 내일 새로운 매칭을 기다려보세요.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow hover:bg-slate-800 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>추천 프로필 다시 보기</span>
            </button>
          </div>
        )}
      </div>

      {/* 직장인 안심 인증 가이드 바 */}
      <div className="px-4 pb-2">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-rose-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold">100% 직장 인증제 운영 중</p>
              <p className="text-[10px] text-slate-300">회사 이메일 & 명함 심사로 안전한 만남</p>
            </div>
          </div>
          <span className="text-[11px] bg-rose-500 text-white font-semibold px-2.5 py-1 rounded-full">
            인증하기
          </span>
        </div>
      </div>
    </div>
  );
}
