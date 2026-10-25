"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  ChevronDown,
  Sun,
  Moon,
  Wine,
  Cigarette,
  Bus,
  Sparkles,
  Lock,
} from "lucide-react";

export default function ProfileStep2Page() {
  // 1. 직장인 일상 루틴
  const [workStartTime, setWorkStartTime] = useState("09:00");
  const [workEndTime, setWorkEndTime] = useState("18:00");
  const [commuteMethod, setCommuteMethod] = useState<"버스" | "지하철" | "버스+지하철" | "자차">("지하철");

  // 2. 생활 성향 및 취향
  const [drinking, setDrinking] = useState<"전혀 안 마심" | "가끔 마심" | "자주 마심">("가끔 마심");
  const [smoking, setSmoking] = useState<"비흡연" | "전자담배" | "흡연">("비흡연");
  const [mbti, setMbti] = useState("ENFP");

  // MBTI 성향별 한 줄 요약 키워드
  const mbtiDescriptions: Record<string, string> = {
    ENFP: "재기발랄한 활동가 · 따뜻하고 에너지 넘치는",
    ENFJ: "정의로운 주인공 · 배려심 깊고 진정성 있는",
    ENTP: "뜨거운 논쟁가 · 유쾌하고 호기심 많은",
    ENTJ: "대담한 통솔자 · 열정적이고 결단력 있는",
    INFP: "열정적인 중재자 · 사려 깊고 다정한",
    INFJ: "선의의 옹호자 · 통찰력 있고 따뜻한",
    INTP: "논리적인 사색가 · 깊이 있고 지적인",
    INTJ: "용의주도한 전략가 · 목표 지향적이고 독립적인",
    ESFP: "자유로운 연예인 · 밝고 긍정적인 비타민",
    ESFJ: "사교적인 외교관 · 세심하고 친화력 있는",
    ESTP: "모험을 즐기는 사업가 · 즉흥적이고 솔직한",
    ESTJ: "엄격한 관리자 · 책임감 강하고 든든한",
    ISFP: "호기심 많은 예술가 · 편안하고 부드러운",
    ISFJ: "용감한 수호자 · 섬세하고 헌신적인",
    ISTP: "만능 재주꾼 · 쿨하고 담백한 성격",
    ISTJ: "청렴결백한 논리주의자 · 신뢰할 수 있고 성실한",
  };

  const mbtiList = [
    "ENFP", "ENFJ", "ENTP", "ENTJ",
    "INFP", "INFJ", "INTP", "INTJ",
    "ESFP", "ESFJ", "ESTP", "ESTJ",
    "ISFP", "ISFJ", "ISTP", "ISTJ",
  ];

  // 출근 시간 옵션
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

  // 퇴근 시간 옵션
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
    <div className="flex flex-col min-h-screen bg-white justify-between p-6 sm:p-7 w-full max-w-lg mx-auto">
      <div>
        {/* 상단 프로그레스 바 (토스 스타일 67%, 6단계 중 4단계) */}
        <div className="pt-2 pb-5">
          <div className="h-1 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#3182F6] rounded-full w-4/6 transition-all duration-300"></div>
          </div>
          <div className="flex items-center justify-end mt-3">
            <span className="text-[12.5px] font-bold text-[#3182F6] bg-[#E8F3FF] px-3 py-1 rounded-full">
              4 / 6 단계
            </span>
          </div>
        </div>

        {/* 타이틀: 일상 & 성향 */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F3FF] text-[#3182F6] text-[12.5px] font-bold mb-2.5">
            <Clock className="w-3.5 h-3.5" />
            <span>일상 & 라이프스타일</span>
          </div>
          <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
            나의 일상 루틴과<br />
            생활 성향을 알려주세요
          </h1>
          <p className="text-[14px] text-[#6B7684] mt-2 leading-relaxed font-medium">
            생활 패턴과 성향이 잘 맞는 직장인 인연을 찾아드려요.
          </p>
        </div>

        {/* ================= 1. 직장인 일상 루틴 (출퇴근 라이프) ================= */}
        <div className="mt-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-black text-[#191F28] flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>출퇴근 라이프</span>
            </h2>
            <span className="text-[12px] font-bold text-[#3182F6] bg-[#E8F3FF] px-2.5 py-0.5 rounded-full">
              {workStartTime.includes(":") ? `${workStartTime} 출근` : workStartTime} · {workEndTime.includes(":") ? `${workEndTime} 퇴근` : workEndTime}
            </span>
          </div>

          {/* 출근 & 퇴근 시간 2컬럼 셀렉트 */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-[#6B7684] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8B95A1]" />
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

          {/* 출퇴근 수단 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-bold text-[#6B7684] flex items-center gap-1">
                <Bus className="w-3.5 h-3.5 text-[#8B95A1]" />
                <span>출퇴근 수단</span>
              </label>
              <span className="text-[11.5px] text-[#8B95A1] font-medium">{commuteMethod}</span>
            </div>
            <div className="flex bg-[#F2F4F6] p-1 rounded-2xl h-13 items-center gap-1">
              {(["버스", "지하철", "버스+지하철", "자차"] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setCommuteMethod(method)}
                  className={`flex-1 h-full rounded-xl text-[12.5px] sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    commuteMethod === method
                      ? "bg-[#3182F6] text-white shadow-xs"
                      : "text-[#6B7684] hover:text-[#333D4B]"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 얇은 섹션 구분선 */}
        <div className="h-px bg-[#F2F4F6] my-6 w-full" />

        {/* ================= 2. 취향 및 생활 성향 (라이프스타일 케미) ================= */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-black text-[#191F28] flex items-center gap-1.5">
              <Wine className="w-4 h-4 text-purple-500" />
              <span>생활 성향 & MBTI</span>
            </h2>
            <span className="text-[12px] font-bold text-[#3182F6] bg-[#E8F3FF] px-2.5 py-0.5 rounded-full">
              {mbti} · {drinking}
            </span>
          </div>

          {/* 음주 여부 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#6B7684]">음주</label>
            <div className="flex bg-[#F2F4F6] p-1 rounded-2xl h-13 items-center gap-1">
              {(["전혀 안 마심", "가끔 마심", "자주 마심"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setDrinking(item)}
                  className={`flex-1 h-full rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                    drinking === item
                      ? "bg-[#3182F6] text-white shadow-xs"
                      : "text-[#6B7684] hover:text-[#333D4B]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 흡연 여부 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#6B7684]">흡연</label>
            <div className="flex bg-[#F2F4F6] p-1 rounded-2xl h-13 items-center gap-1">
              {(["비흡연", "전자담배", "흡연"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSmoking(item)}
                  className={`flex-1 h-full rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                    smoking === item
                      ? "bg-[#3182F6] text-white shadow-xs"
                      : "text-[#6B7684] hover:text-[#333D4B]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* MBTI 선택 그리드 */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-bold text-[#6B7684]">MBTI 성향</label>
              <span className="text-[12px] font-bold text-[#3182F6]">{mbti}</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {mbtiList.map((type) => {
                const isSelected = mbti === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMbti(type)}
                    className={`h-10 rounded-xl text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? "bg-[#3182F6] text-white shadow-xs scale-[1.02]"
                        : "bg-[#F2F4F6] text-[#6B7684] hover:bg-[#E5E8EB] active:scale-95"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            {mbti && mbtiDescriptions[mbti] && (
              <div className="mt-1 px-3.5 py-2.5 rounded-xl bg-[#F9FAFB] border border-[#F2F4F6] flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#3182F6] shrink-0" />
                <span className="text-[12.5px] font-bold text-[#4E5968] leading-tight">
                  {mbtiDescriptions[mbti]}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 안심 보증 노트 */}
        <div className="mt-7 flex items-start gap-2.5 text-[13px] text-[#6B7684] font-medium px-1">
          <Lock className="w-4 h-4 text-[#00B368] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            생활 패턴 정보는 나와 활동 시간대가 잘 맞는 이성을 추천하는 데에만 활용돼요.
          </p>
        </div>
      </div>

      {/* 하단 CTA: 다음 (첫인사 엽서 작성) */}
      <div className="pb-6 pt-5">
        <Link
          href="/auth/profile-note"
          className="w-full h-14 rounded-2xl font-bold text-[16px] transition-all flex items-center justify-center bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-lg shadow-blue-500/25 active:scale-[0.98]"
        >
          다음 (첫인사 엽서 작성)
        </Link>
      </div>
    </div>
  );
}
