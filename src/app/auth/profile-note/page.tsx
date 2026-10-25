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
  Lock,
  Edit3,
  PenTool,
  Heart,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

export default function ProfileNotePage() {
  // 엽서 모드 ('text' 직접 타이핑 | 'photo' 종이 자필 사진)
  const [postcardMode, setPostcardMode] = useState<"text" | "photo">("text");
  const [postcardText, setPostcardText] = useState("사소한 일상을 편안하게 나누고, 서로의 성장을 응원해요.");
  const [noteStatus, setNoteStatus] = useState<"empty" | "analyzing" | "success">("empty");

  // 빠른 추천 문구 칩
  const quickPresets = [
    "사소한 일상을 편안하게 나누고 싶어요",
    "퇴근 후 맛있는 저녁 함께 먹어요",
    "서로의 하루를 따뜻하게 응원해요",
    "주말엔 분위기 좋은 카페 가요",
    "대화가 잘 통하는 친구 같은 인연을 찾아요",
  ];

  // 종이 자필 엽서 촬영 시뮬레이션
  const simulateCameraCapture = () => {
    setNoteStatus("analyzing");
    setTimeout(() => {
      setNoteStatus("success");
    }, 1200);
  };

  const isFormValid =
    postcardMode === "text"
      ? postcardText.trim().length >= 2
      : noteStatus === "success";

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6 sm:p-7 w-full max-w-lg mx-auto">
      <div>
        {/* 상단 프로그레스 바 (토스 스타일 83%, 6단계 중 5단계) */}
        <div className="pt-2 pb-5">
          <div className="h-1 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#3182F6] rounded-full w-5/6 transition-all duration-300"></div>
          </div>
          <div className="flex items-center justify-end mt-3">
            <span className="text-[12.5px] font-bold text-[#3182F6] bg-[#E8F3FF] px-3 py-1 rounded-full">
              5 / 6 단계
            </span>
          </div>
        </div>

        {/* 타이틀 (자필 엽서 단독 전용 헤드라인) */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5ED] text-[#FF6F61] text-[12.5px] font-bold mb-2.5 border border-[#FFE2D6]">
            <PenTool className="w-3.5 h-3.5" />
            <span>샐러리만의 아날로그 감성</span>
          </div>
          <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
            소중한 인연에게 건넬<br />
            첫인사 엽서를 적어주세요
          </h1>
          <p className="text-[14px] text-[#6B7684] mt-2 leading-relaxed font-medium">
            진솔하고 정갈한 한 줄이 상대방의 마음에 가장 깊은 호감을 남겨요.
          </p>
        </div>

        {/* 작성 방식 듀얼 토글 */}
        <div className="mt-7 flex bg-[#F2F4F6] p-1.5 rounded-2xl h-13 items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPostcardMode("text")}
            className={`flex-1 h-full rounded-xl text-[13.5px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              postcardMode === "text"
                ? "bg-white text-[#191F28] shadow-xs"
                : "text-[#6B7684] hover:text-[#191F28]"
            }`}
          >
            <Edit3 className="w-4 h-4 text-[#3182F6]" />
            <span>직접 입력 (3초 컷)</span>
          </button>
          <button
            type="button"
            onClick={() => setPostcardMode("photo")}
            className={`flex-1 h-full rounded-xl text-[13.5px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              postcardMode === "photo"
                ? "bg-white text-[#191F28] shadow-xs"
                : "text-[#6B7684] hover:text-[#191F28]"
            }`}
          >
            <PenTool className="w-4 h-4 text-amber-600" />
            <span>종이 자필 촬영</span>
          </button>
        </div>

        {/* 모드 1: 직접 입력 (감성 아날로그 엽서 프리뷰 & 추천 칩) */}
        {postcardMode === "text" && (
          <div className="mt-5 flex flex-col gap-3">
            {/* 정갈한 대형 아날로그 엽서 프리뷰 카드 */}
            <div className="w-full rounded-3xl bg-gradient-to-b from-[#FFFDF8] to-[#FFF9EE] border-2 border-[#F5E8D0] p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[170px] relative">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#8F6B00] bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/50">
                  <Heart className="w-3.5 h-3.5 text-[#FF6F61] fill-[#FF6F61]" />
                  <span>To. 나의 인연에게</span>
                </span>
                <span className="text-[12px] text-[#8B95A1] font-mono font-medium">
                  {postcardText.length} / 60자
                </span>
              </div>

              <p className="text-[16px] sm:text-[17px] text-[#191F28] font-serif italic text-left leading-relaxed my-2 px-1">
                &ldquo;{postcardText || "상대방에게 전하고 싶은 한 줄 인사를 적어주세요."}&rdquo;
              </p>

              <div className="flex items-center justify-between text-[12px] text-[#8B95A1] pt-3 border-t border-[#F5E8D0]/80">
                <span className="flex items-center gap-1.5 text-[#00B368] font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>정갈한 감성 손글씨체 자동 적용</span>
                </span>
                <span className="text-[#3182F6] font-bold">프로필 카드 표출</span>
              </div>
            </div>

            {/* 한 줄 입력 인풋창 */}
            <div className="flex flex-col gap-1.5 mt-1">
              <label className="text-[14px] font-bold text-[#333D4B]">엽서 문구 수정</label>
              <input
                type="text"
                value={postcardText}
                onChange={(e) => setPostcardText(e.target.value)}
                placeholder="인연에게 전하고 싶은 마음을 한 줄로 적어주세요"
                className="w-full px-4 h-14 rounded-2xl bg-[#F2F4F6] border border-transparent text-[15px] font-bold text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all shadow-2xs"
                maxLength={60}
              />
            </div>

            {/* 빠른 추천 문구 칩 */}
            <div className="flex flex-col gap-2 pt-1">
              <span className="text-[12.5px] font-bold text-[#6B7684]">💡 고민될 때 누르는 추천 문구</span>
              <div className="flex flex-wrap gap-1.5">
                {quickPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setPostcardText(preset)}
                    className="px-3 py-1.5 rounded-full bg-[#F2F4F6] hover:bg-[#E5E8EB] text-[#4E5968] text-[12.5px] font-bold transition-all cursor-pointer active:scale-95"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 모드 2: 종이 자필 사진 촬영 */}
        {postcardMode === "photo" && (
          <div className="mt-5 flex flex-col gap-3">
            <div className="w-full rounded-3xl bg-gradient-to-b from-[#FBFDFF] to-[#F2F6FC] p-6 border border-[#E2ECF8] shadow-xs flex flex-col items-center text-center">
              {noteStatus === "empty" && (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-amber-600 mb-3 border border-[#E8F0FE]">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#191F28]">
                    종이에 적은 자필 엽서 촬영하기
                  </h3>
                  <p className="text-[13.5px] text-[#6B7684] mt-1 font-medium leading-relaxed">
                    좋아하는 문구나 첫인사를 종이에 적어 촬영해 주세요
                  </p>
                  <button
                    type="button"
                    onClick={simulateCameraCapture}
                    className="mt-5 w-full h-13 rounded-2xl bg-[#3182F6] hover:bg-[#1B64DA] text-white font-bold text-[15px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <Camera className="w-5 h-5" />
                    <span>자필 메모 촬영하기</span>
                  </button>
                  <div className="mt-3 flex items-center gap-1.5 text-[12px] text-[#8B95A1] font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#00B368]" />
                    <span>Gemini AI가 비속어 필터링 및 자필 손글씨를 검증해요</span>
                  </div>
                </>
              )}

              {noteStatus === "analyzing" && (
                <div className="py-6 flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center border border-blue-200">
                    <RefreshCw className="w-7 h-7 text-[#3182F6] animate-spin" />
                  </div>
                  <div>
                    <p className="text-[16px] font-bold text-[#191F28]">
                      Gemini AI가 필체와 문구를 분석하고 있어요
                    </p>
                    <p className="text-[13px] text-[#6B7684] mt-1 font-medium">
                      비속어 필터링 및 자필 손글씨 감지 중...
                    </p>
                  </div>
                </div>
              )}

              {noteStatus === "success" && (
                <div className="w-full flex flex-col gap-3 text-left">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#FF6F61] bg-[#FFF5ED] px-2.5 py-1 rounded-md">
                      <FileText className="w-4 h-4 text-[#FF6F61]" />
                      <span>자필 엽서 등록 완료</span>
                    </span>
                    <button
                      type="button"
                      onClick={simulateCameraCapture}
                      className="text-[12.5px] text-[#8B95A1] hover:text-[#191F28] font-bold flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>다시 찍기</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0]">
                    <p className="text-[15px] text-[#191F28] font-serif italic leading-relaxed">
                      &ldquo;사소한 일상을 편안하게 나누고, 서로의 성장을 응원해요.&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[12px] pt-1">
                    <span className="text-[#00B368] font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> 비속어 없음 통과
                    </span>
                    <span className="text-[#3182F6] font-bold">자필 판정 완료</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 안심 보증 노트 */}
        <div className="mt-6 flex items-start gap-2.5 text-[13px] text-[#6B7684] font-medium px-1">
          <Lock className="w-4 h-4 text-[#00B368] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            모든 엽서 문구는 <strong className="text-[#333D4B]">AI 클린 필터링</strong>을 거쳐 상대방에게 안전하고 정갈하게 전달돼요.
          </p>
        </div>
      </div>

      {/* 하단 CTA & 나중에 작성하기 옵션 */}
      <div className="pb-6 pt-5 flex flex-col gap-2.5">
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

        {/* 공공장소/이동 중인 직장인을 위한 건너뛰기 옵션 */}
        <div className="text-center pt-1">
          <Link
            href="/auth/verify-work"
            className="text-[13px] text-[#8B95A1] hover:text-[#6B7684] font-semibold underline underline-offset-4 cursor-pointer transition-colors"
          >
            지금 작성이 어렵다면? 나중에 작성하기
          </Link>
        </div>
      </div>
    </div>
  );
}
