"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, Sparkles, CheckCircle2, Hand, RefreshCw } from "lucide-react";

export default function ProfileStep1Page() {
  const [nickname, setNickname] = useState("");
  const [handPhotoStatus, setHandPhotoStatus] = useState<"empty" | "analyzing" | "success">("empty");

  const simulateCameraCapture = () => {
    setHandPhotoStatus("analyzing");
    // Gemini 1.5/2.0 Flash AI 검증 시뮬레이션 (1.2초)
    setTimeout(() => {
      setHandPhotoStatus("success");
    }, 1200);
  };

  const isFormValid = nickname.trim().length >= 2 && handPhotoStatus === "success";

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6">
      <div>
        {/* 상단 뒤로가기 */}
        <div className="pt-2 pb-6">
          <Link href="/auth/terms" className="text-slate-600 hover:text-slate-900 inline-block">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* 타이틀 */}
        <div>
          <span className="text-xs font-bold text-[#3182F6]">2 / 3 단계</span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1 leading-snug">
            기본 닉네임과<br />손등 사진을 등록해요
          </h1>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            얼굴 노출 걱정 없이, 내 손등의 온기를 담은 사진을 올려주세요.<br />
            AI가 손등 이미지를 실시간으로 확인해요.
          </p>
        </div>

        {/* 1. 닉네임 입력 필드 */}
        <div className="mt-8 flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-700">
            프로필 닉네임
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="상대방에게 보여질 닉네임을 입력해 주세요"
            className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all"
            maxLength={10}
          />
          <span className="text-[11px] text-slate-400 text-right">
            {nickname.length}/10자
          </span>
        </div>

        {/* 2. 손등 사진 등록 & AI 검증 인터랙션 */}
        <div className="mt-6 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">
              내 손등 사진 등록
            </label>
            <span className="text-[11px] text-[#3182F6] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Gemini AI 실시간 판별
            </span>
          </div>

          {handPhotoStatus === "empty" && (
            <button
              onClick={simulateCameraCapture}
              className="w-full h-44 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition-all flex flex-col items-center justify-center gap-2.5 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[#3182F6] transition-colors">
                <Camera className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-700">
                  손등 촬영하기 (터치하여 시뮬레이션)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  손등이 잘 보이도록 촬영해 주세요
                </p>
              </div>
            </button>
          )}

          {handPhotoStatus === "analyzing" && (
            <div className="w-full h-44 rounded-3xl bg-blue-50/50 border border-blue-100 flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-6 h-6 text-[#3182F6] animate-spin" />
              <div className="text-center">
                <p className="text-xs font-bold text-[#3182F6]">
                  Gemini AI가 손등 이미지를 분석하고 있어요
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  손등 이미지 여부 확인 중 (약 0.5초 소요)
                </p>
              </div>
            </div>
          )}

          {handPhotoStatus === "success" && (
            <div className="w-full rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/70 p-4 flex flex-col justify-between h-44 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                  <Hand className="w-3.5 h-3.5 text-[#3182F6]" />
                  <span>손등 사진 등록 완료</span>
                </div>
                <button
                  onClick={simulateCameraCapture}
                  className="text-[11px] text-slate-500 font-semibold bg-white/80 px-2 py-1 rounded-lg hover:bg-white transition-colors"
                >
                  재촬영
                </button>
              </div>

              {/* 하단 검증 통과 뱃지 */}
              <div className="bg-emerald-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center justify-between shadow-sm">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Gemini AI 손등 판별 통과
                </span>
                <span className="text-[10px] opacity-90">인라인 즉시 파기 안전</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 다음 단계 버튼 */}
      <div className="pb-4 pt-6">
        <Link
          href={isFormValid ? "/auth/profile-step2" : "#"}
          className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            isFormValid
              ? "bg-[#3182F6] text-white hover:bg-[#256fd8] shadow-md shadow-blue-500/20 active:scale-[0.98]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          <span>다음: 자필 글씨 등록하기</span>
        </Link>
      </div>
    </div>
  );
}
