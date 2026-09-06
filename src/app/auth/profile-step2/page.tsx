"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Sparkles,
  FileText,
  RefreshCw,
  Check,
  Train,
  Coffee,
  Clock,
  Lock,
} from "lucide-react";

export default function ProfileStep2Page() {
  const [noteStatus, setNoteStatus] = useState<"empty" | "analyzing" | "success">("empty");
  const [commuteTime, setCommuteTime] = useState("09:30 출근");
  const [commuteMethod, setCommuteMethod] = useState("지하철");
  const [lifestyle, setLifestyle] = useState("비흡연 · 가끔 한잔");

  const simulateCameraCapture = () => {
    setNoteStatus("analyzing");
    setTimeout(() => {
      setNoteStatus("success");
    }, 1200);
  };

  const isFormValid = noteStatus === "success";

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6 sm:p-7 max-w-[440px] mx-auto">
      <div>
        {/* 상단 프로그레스 바 (토스 스타일 75%) */}
        <div className="pt-2 pb-5">
          <div className="h-1 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#3182F6] rounded-full w-3/4 transition-all duration-300"></div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <Link
              href="/auth/profile-step1"
              className="text-[#4E5968] hover:text-[#191F28] inline-flex items-center gap-1 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="text-xs font-extrabold text-[#3182F6] bg-[#E8F3FF] px-2.5 py-0.5 rounded-full">
              3 / 4 단계
            </span>
          </div>
        </div>

        {/* 타이틀 */}
        <div>
          <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
            정갈한 자필 한 줄과<br />
            나의 일상을 알려주세요
          </h1>
          <p className="text-xs text-[#8B95A1] mt-2 leading-relaxed font-medium">
            종이에 적은 따뜻한 글씨와 생활 루틴으로 가치관을 맞춰보아요.
          </p>
        </div>

        {/* 1. 자필 글씨 촬영 & AI 검증 (verify-work와 동일한 레이아웃 구조) */}
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-[#333D4B]">
              자필 손글씨 엽서
            </label>
            <span className="text-[11px] text-[#3182F6] font-extrabold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Gemini AI 클린 검증
            </span>
          </div>

          {noteStatus === "empty" && (
            <button
              type="button"
              onClick={simulateCameraCapture}
              className="w-full h-40 rounded-2xl bg-[#F9FAFB] hover:bg-[#F2F4F6] transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
                <Camera className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-xs font-extrabold text-[#191F28]">
                  자필 엽서 촬영하기 (터치 시뮬레이션)
                </p>
                <p className="text-[11px] text-[#8B95A1] mt-0.5 font-medium">
                  좋아하는 문구나 인사를 종이에 적어주세요
                </p>
              </div>
            </button>
          )}

          {noteStatus === "analyzing" && (
            <div className="w-full h-40 rounded-2xl bg-[#E8F3FF]/70 flex flex-col items-center justify-center gap-2.5">
              <RefreshCw className="w-5 h-5 text-[#3182F6] animate-spin" />
              <div className="text-center">
                <p className="text-xs font-bold text-[#3182F6]">
                  Gemini AI가 필체와 문구를 분석하고 있어요
                </p>
                <p className="text-[11px] text-[#8B95A1] mt-0.5">
                  비속어 필터링 및 자필 손글씨 감지 중
                </p>
              </div>
            </div>
          )}

          {noteStatus === "success" && (
            <div className="flex flex-col gap-3 pt-1">
              {/* 상단 인증 통과 상태 (verify-work와 동일한 레이아웃) */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-[#FFF2E8] text-[#FF6F61] px-3 py-1 rounded-full text-xs font-black">
                  <FileText className="w-4 h-4 text-[#FF6F61]" />
                  <span>자필 엽서 등록 완료</span>
                </span>
                <button
                  type="button"
                  onClick={simulateCameraCapture}
                  className="text-xs text-[#8B95A1] hover:text-[#191F28] font-bold active:scale-95 transition-all"
                >
                  다시 찍기
                </button>
              </div>

              {/* 오픈형 정보 리스트 (순백색 캔버스 일체형, 박스 테두리 제거) */}
              <div className="flex flex-col divide-y divide-[#F2F4F6] pt-1">
                <div className="py-2.5 flex items-start justify-between text-xs gap-3">
                  <span className="text-[#8B95A1] font-bold shrink-0">등록 문구</span>
                  <span className="text-[#191F28] font-serif italic text-right leading-relaxed">
                    &ldquo;사소한 일상을 편안하게 나누고, 서로의 성장을 조용히 응원해 줄 인연을 찾고 있어요.&rdquo;
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between text-xs">
                  <span className="text-[#8B95A1] font-bold">클린 검증</span>
                  <span className="text-[#00B368] font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 비속어 없음 판정 통과
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between text-xs">
                  <span className="text-[#8B95A1] font-bold">필체 감지</span>
                  <span className="text-[#3182F6] font-bold">자필 손글씨 인식 완료</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. 직장인 라이프스타일 원터치 칩 */}
        <div className="mt-5 flex flex-col gap-3.5">
          {/* 출퇴근 시간 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#333D4B]">
              <Clock className="w-3.5 h-3.5 text-[#8B95A1]" />
              <span>출근 시간대</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {["08:30 출근", "09:00 출근", "09:30 출근", "10:00 출근"].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setCommuteTime(time)}
                  className={`py-2 rounded-xl text-xs font-extrabold transition-all ${
                    commuteTime === time
                      ? "bg-[#3182F6] text-white shadow-sm"
                      : "bg-[#F2F4F6] text-[#6B7684] hover:bg-[#E5E8EB]"
                  }`}
                >
                  {time.replace(" 출근", "")}
                </button>
              ))}
            </div>
          </div>

          {/* 출퇴근 수단 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#333D4B]">
              <Train className="w-3.5 h-3.5 text-[#8B95A1]" />
              <span>주요 출퇴근 수단</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {["지하철", "버스", "자차", "도보/재택"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setCommuteMethod(method)}
                  className={`py-2 rounded-xl text-xs font-extrabold transition-all ${
                    commuteMethod === method
                      ? "bg-[#3182F6] text-white shadow-sm"
                      : "bg-[#F2F4F6] text-[#6B7684] hover:bg-[#E5E8EB]"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* 음주 및 라이프 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#333D4B]">
              <Coffee className="w-3.5 h-3.5 text-[#8B95A1]" />
              <span>성향 및 라이프스타일</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {["비흡연 · 가끔 한잔", "비흡연 · 술 안 마심", "흡연 · 가끔 한잔"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLifestyle(item)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-extrabold transition-all text-center ${
                    lifestyle === item
                      ? "bg-[#3182F6] text-white shadow-sm"
                      : "bg-[#F2F4F6] text-[#6B7684] hover:bg-[#E5E8EB]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 프라이버시 안심 노트 (verify-work와 동일한 레이아웃) */}
        <div className="mt-6 flex items-start gap-2 text-[11px] text-[#8B95A1] font-medium px-1">
          <Lock className="w-3.5 h-3.5 text-[#00B368] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            자필 엽서는 AI 비속어 검증 후 상대방에게 안전하게 전달돼요.
          </p>
        </div>
      </div>

      {/* 하단 CTA (56px 토스 표준 버튼) */}
      <div className="pb-6 pt-4">
        <Link
          href={isFormValid ? "/auth/verify-work" : "#"}
          className={`w-full h-14 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center ${
            isFormValid
              ? "bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-lg shadow-blue-500/25 active:scale-[0.98]"
              : "bg-[#E5E8EB] text-[#8B95A1] cursor-not-allowed pointer-events-none"
          }`}
        >
          다음 (마지막 회사 인증)
        </Link>
      </div>
    </div>
  );
}
