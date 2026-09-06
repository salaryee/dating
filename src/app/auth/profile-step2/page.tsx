"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Sparkles,
  CheckCircle2,
  FileText,
  RefreshCw,
  Clock,
  Car,
  Wine,
  Cigarette,
} from "lucide-react";

export default function ProfileStep2Page() {
  const [noteStatus, setNoteStatus] = useState<"empty" | "analyzing" | "success">("empty");
  const [mbti, setMbti] = useState("ENFP");
  const [commuteStart, setCommuteStart] = useState("09:00");
  const [commuteEnd, setCommuteEnd] = useState("18:00");
  const [commuteMethod, setCommuteMethod] = useState("지하철");
  const [drinking, setDrinking] = useState("가끔 한잔");
  const [smoking, setSmoking] = useState("비흡연");

  const simulateCameraCapture = () => {
    setNoteStatus("analyzing");
    // Gemini 1.5/2.0 Flash AI 필체 및 욕설 필터링 시뮬레이션 (1.2초)
    setTimeout(() => {
      setNoteStatus("success");
    }, 1200);
  };

  const isFormValid = noteStatus === "success";

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6">
      <div>
        {/* 상단 뒤로가기 */}
        <div className="pt-2 pb-6">
          <Link href="/auth/profile-step1" className="text-slate-600 hover:text-slate-900 inline-block">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* 타이틀 */}
        <div>
          <span className="text-xs font-bold text-[#3182F6]">3 / 3 단계</span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1 leading-snug">
            자필 손글씨와<br />나의 성향을 알려주세요
          </h1>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            종이에 쓴 짧은 한 문장을 촬영해 주세요.<br />
            AI가 손글씨 인식과 불쾌한 표현 여부를 꼼꼼하게 검증해요.
          </p>
        </div>

        {/* 1. 자필 글씨 촬영 & AI 검증 */}
        <div className="mt-6 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">
              자필 손글씨 촬영
            </label>
            <span className="text-[11px] text-[#3182F6] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Gemini 필체 · 클린 검증
            </span>
          </div>

          {noteStatus === "empty" && (
            <button
              onClick={simulateCameraCapture}
              className="w-full h-40 rounded-3xl border-2 border-dashed border-amber-200 bg-amber-50/40 hover:bg-amber-50 transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-amber-600">
                <Camera className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-800">
                  자필 쪽지 촬영하기 (터치하여 시뮬레이션)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  좋아하는 문구나 인사를 종이에 적어 찍어주세요
                </p>
              </div>
            </button>
          )}

          {noteStatus === "analyzing" && (
            <div className="w-full h-40 rounded-3xl bg-amber-50/70 border border-amber-200 flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-6 h-6 text-amber-600 animate-spin" />
              <div className="text-center">
                <p className="text-xs font-bold text-amber-800">
                  Gemini AI가 필체와 문구를 분석하고 있어요
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  손글씨 진위 및 유해 표현 필터링 중
                </p>
              </div>
            </div>
          )}

          {noteStatus === "success" && (
            <div className="w-full rounded-3xl bg-amber-50/80 border border-amber-200 p-4 flex flex-col justify-between h-40 shadow-sm relative">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full text-xs font-bold text-amber-800 shadow-sm">
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>자필 글씨 등록 완료</span>
                </div>
                <button
                  onClick={simulateCameraCapture}
                  className="text-[11px] text-slate-500 font-semibold bg-white px-2 py-1 rounded-lg"
                >
                  재촬영
                </button>
              </div>

              <p className="text-xs text-slate-800 italic bg-white/90 p-2.5 rounded-xl border border-amber-100 my-auto font-serif">
                "사소한 일상을 편안하게 나눌 수 있는 인연을 찾고 있어요 ✨"
              </p>

              <div className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  클린 문구 및 자필 검증 완료
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 2. MBTI 선택 */}
        <div className="mt-6 flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-700">MBTI 성향</label>
          <div className="grid grid-cols-4 gap-2">
            {["ENFP", "INTJ", "INFJ", "ISTJ", "ESFP", "ENTP", "ISFP", "기타"].map((item) => (
              <button
                key={item}
                onClick={() => setMbti(item)}
                className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                  mbti === item
                    ? "bg-[#3182F6] text-white border-[#3182F6] shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* 3. 출퇴근 시간 & 수단 */}
        <div className="mt-6 flex flex-col gap-3">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            출퇴근 패턴 & 교통수단
          </label>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-400">출근 시간</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{commuteStart}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-400">퇴근 시간</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{commuteEnd}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {["지하철/버스", "자차 출퇴근", "도보/자전거"].map((method) => (
              <button
                key={method}
                onClick={() => setCommuteMethod(method)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                  commuteMethod === method
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* 4. 음주 & 흡연 */}
        <div className="mt-6 flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-700">음주 · 흡연</label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {["비흡연", "흡연"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSmoking(s)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    smoking === s ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl">
              {["가끔 한잔", "안 마심"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDrinking(d)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    drinking === d ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 직장인증으로 이동 버튼 */}
      <div className="pb-4 pt-8">
        <Link
          href={isFormValid ? "/auth/verify-work" : "#"}
          className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            isFormValid
              ? "bg-[#3182F6] text-white hover:bg-[#256fd8] shadow-md shadow-blue-500/20 active:scale-[0.98]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          <span>다음: 마지막 직장인증 하기</span>
        </Link>
      </div>
    </div>
  );
}
