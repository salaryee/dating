"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, Sparkles, Hand, RefreshCw, Lock, Check } from "lucide-react";

export default function ProfileStep1Page() {
  const [nickname, setNickname] = useState("민지");
  const [gender, setGender] = useState<"여성" | "남성">("여성");
  const [age, setAge] = useState<number>(29);
  const [handPhotoStatus, setHandPhotoStatus] = useState<"empty" | "analyzing" | "success">("empty");

  const simulateCameraCapture = () => {
    setHandPhotoStatus("analyzing");
    setTimeout(() => {
      setHandPhotoStatus("success");
    }, 1200);
  };

  const isFormValid = nickname.trim().length >= 2 && handPhotoStatus === "success";

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6 sm:p-7 max-w-[440px] mx-auto">
      <div>
        {/* 상단 프로그레스 바 (토스 스타일 66%) */}
        <div className="pt-2 pb-5">
          <div className="h-1 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#3182F6] rounded-full w-2/3 transition-all duration-300"></div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <Link
              href="/auth/terms"
              className="text-[#4E5968] hover:text-[#191F28] inline-flex items-center gap-1 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="text-xs font-extrabold text-[#3182F6]">2 / 3 단계</span>
          </div>
        </div>

        {/* 타이틀 */}
        <div>
          <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
            상대방에게 불릴 이름과<br />
            손등 사진을 올려주세요
          </h1>
          <p className="text-xs text-[#8B95A1] mt-2 leading-relaxed font-medium">
            얼굴 대신 손등의 체온으로 편안하게 나를 표현해요.
          </p>
        </div>

        {/* 1. 닉네임 & 기본 정보 */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold text-[#333D4B]">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="상대방에게 불릴 닉네임을 입력해 주세요"
              className="w-full px-4 py-3.5 rounded-2xl bg-[#F2F4F6] border border-[#E5E8EB] text-sm font-bold text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all"
              maxLength={10}
            />
            <div className="flex justify-between text-[11px] text-[#8B95A1] px-1 font-medium">
              <span>한글/영문 2~10자</span>
              <span>{nickname.length}/10자</span>
            </div>
          </div>

          {/* 성별 및 나이 선택 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-extrabold text-[#333D4B]">성별</label>
              <div className="flex bg-[#F2F4F6] p-1 rounded-xl">
                {(["여성", "남성"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setGender(item)}
                    className={`flex-1 py-2 rounded-lg text-xs font-extrabold transition-all ${
                      gender === item
                        ? "bg-white text-[#191F28] shadow-sm"
                        : "text-[#8B95A1]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-extrabold text-[#333D4B]">나이</label>
              <select
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full py-2.5 px-3 rounded-xl bg-[#F2F4F6] border border-[#E5E8EB] text-xs font-extrabold text-[#191F28] focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all"
              >
                {Array.from({ length: 15 }, (_, i) => 24 + i).map((num) => (
                  <option key={num} value={num}>
                    {num}세
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. 손등 사진 등록 & Gemini AI 실시간 검증 */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-[#333D4B]">
                내 손등 사진 등록
              </label>
              <span className="text-[11px] text-[#3182F6] font-extrabold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Gemini AI 검증
              </span>
            </div>

            {handPhotoStatus === "empty" && (
              <button
                type="button"
                onClick={simulateCameraCapture}
                className="w-full h-36 rounded-2xl border-2 border-dashed border-[#E5E8EB] bg-[#F9FAFB] hover:bg-[#F2F4F6] transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#8B95A1] group-hover:text-[#3182F6] transition-colors">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-extrabold text-[#191F28]">
                    손등 촬영하기 (터치 시뮬레이션)
                  </p>
                  <p className="text-[11px] text-[#8B95A1] mt-0.5 font-medium">
                    얼굴 대신 손등의 온기를 담아주세요
                  </p>
                </div>
              </button>
            )}

            {handPhotoStatus === "analyzing" && (
              <div className="w-full h-36 rounded-2xl bg-[#E8F3FF]/70 border border-[#3182F6]/30 flex flex-col items-center justify-center gap-2.5">
                <RefreshCw className="w-5 h-5 text-[#3182F6] animate-spin" />
                <div className="text-center">
                  <p className="text-xs font-bold text-[#3182F6]">
                    Gemini AI가 손등 이미지를 확인하고 있어요
                  </p>
                  <p className="text-[11px] text-[#8B95A1] mt-0.5">
                    얼굴 비노출 및 손등 피부톤 적합도 분석 중
                  </p>
                </div>
              </div>
            )}

            {handPhotoStatus === "success" && (
              <div className="w-full rounded-2xl bg-gradient-to-br from-[#FFF5ED] via-[#FDF0E7] to-[#F7E6D9] border border-[#FFD2C0] p-4 flex flex-col justify-between h-36 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-full text-xs font-bold text-[#191F28] shadow-sm">
                    <Hand className="w-3.5 h-3.5 text-[#FF6F61]" />
                    <span>손등 사진 등록 완료</span>
                  </span>
                  <button
                    type="button"
                    onClick={simulateCameraCapture}
                    className="text-[11px] text-[#6B7684] font-semibold bg-white/90 px-2.5 py-1 rounded-lg hover:bg-white active:scale-95 transition-all"
                  >
                    다시 찍기
                  </button>
                </div>

                <div className="flex items-center justify-center opacity-70">
                  <Hand className="w-9 h-9 text-[#C98B6D]" />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#00B368] font-black flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> AI 검증 통과
                  </span>
                  <span className="text-[#8B95A1] font-medium">
                    얼굴 비노출 확인됨
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-[11px] text-[#8B95A1] font-medium pt-1 px-1">
              <Lock className="w-3 h-3 text-[#00B368] shrink-0" />
              <span>얼굴이나 배경은 자동으로 블러 처리되니 안심하세요</span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 CTA (56px 토스 표준 버튼) */}
      <div className="pb-6 pt-4">
        <Link
          href={isFormValid ? "/auth/profile-step2" : "#"}
          className={`w-full h-14 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center ${
            isFormValid
              ? "bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-md shadow-blue-500/20 active:scale-[0.98]"
              : "bg-[#E5E8EB] text-[#8B95A1] cursor-not-allowed pointer-events-none"
          }`}
        >
          다음
        </Link>
      </div>
    </div>
  );
}
