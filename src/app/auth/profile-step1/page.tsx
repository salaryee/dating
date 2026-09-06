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
          <Link href="/auth/terms" className="text-[#4E5968] hover:text-[#191F28] inline-block active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* 타이틀 */}
        <div>
          <span className="text-xs font-bold text-[#3182F6]">2 / 3 단계</span>
          <h1 className="text-[22px] font-black text-[#191F28] tracking-tight mt-1 leading-snug">
            프로필 닉네임과<br />손등 사진을 등록해요
          </h1>
          <p className="text-xs text-[#8B95A1] mt-2 leading-relaxed font-medium">
            얼굴 노출 없이, 상대방에게 따뜻한 온기를 전해줄 손등 사진을 올려주세요.
          </p>
        </div>

        {/* 1. 닉네임 입력 필드 */}
        <div className="mt-6 flex flex-col gap-2">
          <label className="text-xs font-bold text-[#333D4B]">
            프로필 닉네임
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="상대방에게 불릴 닉네임을 입력해 주세요"
            className="w-full px-4 py-3.5 rounded-2xl bg-[#F2F4F6] border border-[#E5E8EB] text-sm font-semibold text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all"
            maxLength={10}
          />
          <span className="text-[11px] text-[#8B95A1] text-right font-medium">
            {nickname.length}/10자
          </span>
        </div>

        {/* 2. 손등 사진 등록 & AI 검증 인터랙션 */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#333D4B]">
              내 손등 사진
            </label>
            <span className="text-[11px] text-[#3182F6] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Gemini AI 실시간 검증
            </span>
          </div>

          {handPhotoStatus === "empty" && (
            <button
              onClick={simulateCameraCapture}
              className="w-full h-36 rounded-2xl border-2 border-dashed border-[#E5E8EB] bg-[#F9FAFB] hover:bg-[#F2F4F6] transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#8B95A1] group-hover:text-[#3182F6] transition-colors">
                <Camera className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-[#333D4B]">
                  손등 촬영하기 (터치 시뮬레이션)
                </p>
                <p className="text-[11px] text-[#8B95A1] mt-0.5 font-medium">
                  얼굴 대신 손등의 온기를 담아주세요
                </p>
              </div>
            </button>
          )}

          {handPhotoStatus === "analyzing" && (
            <div className="w-full h-36 rounded-2xl bg-[#E8F3FF]/60 border border-[#3182F6]/30 flex flex-col items-center justify-center gap-2.5">
              <RefreshCw className="w-5 h-5 text-[#3182F6] animate-spin" />
              <div className="text-center">
                <p className="text-xs font-bold text-[#3182F6]">
                  Gemini AI가 손등 이미지를 확인하고 있어요
                </p>
                <p className="text-[11px] text-[#8B95A1] mt-0.5">
                  얼굴 비노출 및 손등 여부 판별 중
                </p>
              </div>
            </div>
          )}

          {handPhotoStatus === "success" && (
            <div className="w-full rounded-2xl bg-gradient-to-br from-[#FFF5ED] to-[#FFEBE0] border border-[#FFD2C0] p-4 flex flex-col justify-between h-36 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-full text-xs font-bold text-[#191F28] shadow-sm">
                  <Hand className="w-3.5 h-3.5 text-[#FF6F61]" />
                  <span>손등 사진 등록 완료</span>
                </div>
                <button
                  onClick={simulateCameraCapture}
                  className="text-[11px] text-[#6B7684] font-semibold bg-white/80 px-2 py-0.5 rounded-lg hover:bg-white transition-colors"
                >
                  재촬영
                </button>
              </div>

              {/* 하단 검증 통과 뱃지 */}
              <div className="bg-[#00B368] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center justify-between shadow-sm">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Gemini AI 손등 판별 통과
                </span>
                <span className="text-[10px] opacity-90">개인정보 안심 보호</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 다음 단계 버튼 */}
      <div className="pb-4 pt-6">
        <Link
          href={isFormValid ? "/auth/profile-step2" : "#"}
          className={`w-full h-14 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
            isFormValid
              ? "bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-md shadow-blue-500/20 active:scale-[0.98]"
              : "bg-[#F2F4F6] text-[#8B95A1] cursor-not-allowed pointer-events-none"
          }`}
        >
          <span>다음: 자필 글씨 등록하기</span>
        </Link>
      </div>
    </div>
  );
}
