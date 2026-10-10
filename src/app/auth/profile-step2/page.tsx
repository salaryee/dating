"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import {
  Camera,
  Sparkles,
  FileText,
  RefreshCw,
  Check,
  Clock,
  Lock,
  ChevronDown,
  Sun,
  Moon,
  Wine,
  Cigarette,
} from "lucide-react";

export default function ProfileStep2Page() {
  const [noteStatus, setNoteStatus] = useState<"empty" | "analyzing" | "success">("empty");
  const [workStartTime, setWorkStartTime] = useState("09:00");
  const [workEndTime, setWorkEndTime] = useState("18:00");
  const [drinking, setDrinking] = useState<"가끔 마심" | "자주 마심" | "전혀 안 마심">("가끔 마심");
  const [smoking, setSmoking] = useState<"비흡연" | "전자담배" | "흡연">("비흡연");

  const simulateCameraCapture = () => {
    setNoteStatus("analyzing");
    setTimeout(() => {
      setNoteStatus("success");
    }, 1200);
  };

  const isFormValid = noteStatus === "success";

  // 06:00부터 14:00까지 30분 단위 출근 시간 옵션 (유연근무, 자율출퇴근, 교대근무 포함)
  const startTimeOptions = [
    "자율/유연근무",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "교대/스케줄",
  ];

  // 15:00부터 23:00까지 30분 단위 퇴근 시간 옵션
  const endTimeOptions = [
    "자율/유연근무",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "야근/탄력",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6 sm:p-7 w-full">
      <div>
        {/* 상단 프로그레스 바 (토스 스타일 75%, 1/4단계와 완벽 일치) */}
        <div className="pt-2 pb-5">
          <div className="h-1 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#3182F6] rounded-full w-3/4 transition-all duration-300"></div>
          </div>
          <div className="flex items-center justify-end mt-3">
            <span className="text-[12.5px] font-bold text-[#3182F6] bg-[#E8F3FF] px-3 py-1 rounded-full">
              3 / 4 단계
            </span>
          </div>
        </div>

        {/* 타이틀 (1/4단계와 동일한 헤드라인 및 mt 여백 체계) */}
        <div>
          <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
            정갈한 자필 한 줄과<br />
            나의 일상을 알려주세요
          </h1>
          <p className="text-[14px] text-[#6B7684] mt-2 leading-relaxed font-medium">
            종이에 적은 따뜻한 글씨와 생활 루틴으로 가치관을 맞춰보아요.
          </p>
        </div>

        {/* 1. 자필 손글씨 엽서 등록 (1/4단계와 동일한 mt-8 여백 적용) */}
        <div className="mt-8 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[14.5px] font-bold text-[#333D4B]">
              자필 손글씨 엽서
            </label>
            <span className="text-xs text-[#3182F6] font-bold flex items-center gap-1 bg-[#E8F3FF] px-2.5 py-0.5 rounded-md">
              <Sparkles className="w-3.5 h-3.5" />
              Gemini AI 클린 검증
            </span>
          </div>

          {/* 클릭 전/후 높이를 h-[96px]로 완전 고정하여 여백 조정/레이아웃 시프트 원천 차단 */}
          <div className="w-full h-[96px] relative">
            {noteStatus === "empty" && (
              <button
                type="button"
                onClick={simulateCameraCapture}
                className="w-full h-full rounded-2xl bg-[#F9FAFB] hover:bg-[#F2F4F6] transition-all flex items-center px-4 gap-3.5 group cursor-pointer active:scale-[0.99] border border-[#F2F4F6]"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-105 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-bold text-[#191F28]">
                    자필 엽서 촬영하기
                  </p>
                  <p className="text-[13px] text-[#6B7684] mt-0.5 font-medium">
                    좋아하는 문구나 인사를 종이에 적어주세요
                  </p>
                </div>
              </button>
            )}

            {noteStatus === "analyzing" && (
              <div className="w-full h-full rounded-2xl bg-[#E8F3FF]/70 flex items-center px-4 gap-3.5 border border-[#3182F6]/20">
                <div className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-6 h-6 text-[#3182F6] animate-spin" />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-bold text-[#3182F6]">
                    Gemini AI가 필체와 문구를 분석하고 있어요
                  </p>
                  <p className="text-[13px] text-[#6B7684] mt-0.5 font-medium">
                    비속어 필터링 및 자필 손글씨 감지 중
                  </p>
                </div>
              </div>
            )}

            {noteStatus === "success" && (
              <div className="w-full h-full rounded-2xl bg-[#F9FAFB] px-4 py-2.5 flex flex-col justify-between border border-[#F2F4F6]">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#FF6F61]">
                    <FileText className="w-4 h-4 text-[#FF6F61]" />
                    <span>자필 엽서 등록 완료</span>
                  </span>
                  <button
                    type="button"
                    onClick={simulateCameraCapture}
                    className="text-[13px] text-[#8B95A1] hover:text-[#191F28] font-bold active:scale-95 transition-all cursor-pointer"
                  >
                    다시 찍기
                  </button>
                </div>

                <p className="text-[14px] text-[#191F28] font-serif italic text-left truncate leading-relaxed">
                  &ldquo;사소한 일상을 편안하게 나누고, 서로의 성장을 응원해요.&rdquo;
                </p>

                <div className="flex items-center justify-between text-[12.5px] pt-1 border-t border-[#E5E8EB]/60">
                  <span className="text-[#00B368] font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 비속어 없음 통과
                  </span>
                  <span className="text-[#3182F6] font-bold">자필 판정 완료</span>
                </div>
              </div>
            )}
          </div>

          {/* 1/4단계 약관과 동일한 구분선 여백 (my-3.5) */}
          <div className="h-px bg-[#F2F4F6] my-3.5 w-full" />

          {/* 2. 직장인 일상 루틴 (TDS 출퇴근 시간대 선택 시스템) */}
          <div className="flex flex-col gap-3.5">
            {/* 출퇴근 시간대 선택 (출근 & 퇴근 2컬럼 그리드) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[14.5px] font-bold text-[#333D4B] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#8B95A1]" />
                  <span>출퇴근 시간대</span>
                </span>
                <span className="text-[12.5px] font-bold text-[#3182F6]">
                  {workStartTime.includes(":") ? `${workStartTime} 출근` : workStartTime} · {workEndTime.includes(":") ? `${workEndTime} 퇴근` : workEndTime}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* 출근 시간 선택 셀렉트 */}
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#6B7684] flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>출근 시간</span>
                  </label>
                  <div className="relative">
                    <select
                      value={workStartTime}
                      onChange={(e) => setWorkStartTime(e.target.value)}
                      className="w-full h-13 pl-3.5 pr-8 rounded-2xl bg-[#F2F4F6] border border-transparent text-[14.5px] font-bold text-[#191F28] appearance-none focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all cursor-pointer"
                    >
                      {startTimeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time.includes(":") ? `${time} 출근` : time}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8B95A1] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 퇴근 시간 선택 셀렉트 */}
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#6B7684] flex items-center gap-1">
                    <Moon className="w-3.5 h-3.5 text-indigo-500" />
                    <span>퇴근 시간</span>
                  </label>
                  <div className="relative">
                    <select
                      value={workEndTime}
                      onChange={(e) => setWorkEndTime(e.target.value)}
                      className="w-full h-13 pl-3.5 pr-8 rounded-2xl bg-[#F2F4F6] border border-transparent text-[14.5px] font-bold text-[#191F28] appearance-none focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all cursor-pointer"
                    >
                      {endTimeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time.includes(":") ? `${time} 퇴근` : time}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8B95A1] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* 음주 여부 (TDS Segmented Control) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[14.5px] font-bold text-[#333D4B] flex items-center gap-1.5">
                  <Wine className="w-4 h-4 text-[#8B95A1]" />
                  <span>음주</span>
                </span>
                <span className="text-[12.5px] font-bold text-[#3182F6]">{drinking}</span>
              </div>
              <div className="flex bg-[#F2F4F6] p-1 rounded-2xl h-13 items-center gap-1">
                {(["전혀 안 마심", "가끔 마심", "자주 마심"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDrinking(item)}
                    className={`flex-1 h-full rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                      drinking === item
                        ? "bg-white text-[#191F28] shadow-xs"
                        : "text-[#8B95A1] hover:text-[#4E5968]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 흡연 여부 (TDS Segmented Control) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[14.5px] font-bold text-[#333D4B] flex items-center gap-1.5">
                  <Cigarette className="w-4 h-4 text-[#8B95A1]" />
                  <span>흡연</span>
                </span>
                <span className="text-[12.5px] font-bold text-[#3182F6]">{smoking}</span>
              </div>
              <div className="flex bg-[#F2F4F6] p-1 rounded-2xl h-13 items-center gap-1">
                {(["비흡연", "전자담배", "흡연"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSmoking(item)}
                    className={`flex-1 h-full rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                      smoking === item
                        ? "bg-white text-[#191F28] shadow-xs"
                        : "text-[#8B95A1] hover:text-[#4E5968]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 프라이버시 안심 노트 (1/4단계와 동일한 mt-6 여백) */}
        <div className="mt-6 flex items-start gap-2.5 text-[13px] text-[#6B7684] font-medium px-1">
          <Lock className="w-4 h-4 text-[#00B368] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            자필 엽서는 <strong className="text-[#333D4B]">AI 비속어 검증 후 상대방에게 안전하게 전달돼요.</strong>
          </p>
        </div>
      </div>

      {/* 하단 CTA (56px 토스 표준 버튼, 1/4단계와 동일한 pb-6 pt-4 여백) */}
      <div className="pb-6 pt-4">
        <Link
          href={isFormValid ? "/auth/verify-work" : "#"}
          className={`w-full h-14 rounded-2xl font-bold text-[16px] transition-all flex items-center justify-center ${
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
