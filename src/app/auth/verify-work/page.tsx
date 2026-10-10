"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Sparkles,
  Building2,
  Mail,
  ShieldCheck,
  RefreshCw,
  Clock,
  Lock,
  CheckCircle2,
  Check,
} from "lucide-react";

export default function VerifyWorkPage() {
  const [method, setMethod] = useState<"card" | "email">("card");
  const [ocrStatus, setOcrStatus] = useState<"empty" | "scanning" | "verified">("empty");
  const [companyInfo, setCompanyInfo] = useState({
    name: "카카오 (Kakao)",
    dept: "서비스 기획팀",
    email: "worker@kakaocorp.com",
  });
  const [emailInput, setEmailInput] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  // Gemini AI 명함 OCR 시뮬레이션
  const handleCardCapture = () => {
    setOcrStatus("scanning");
    setTimeout(() => {
      setOcrStatus("verified");
    }, 1400);
  };

  const handleSendCode = () => {
    if (emailInput.includes("@")) {
      setCodeSent(true);
    }
  };

  const handleVerifyCode = () => {
    if (codeInput.length >= 4) {
      setEmailVerified(true);
    }
  };

  const isCompleted = (method === "card" && ocrStatus === "verified") || (method === "email" && emailVerified);

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6 sm:p-7 w-full">
      <div>
        {/* 상단 프로그레스 바 (토스 스타일 100%) */}
        <div className="pt-2 pb-5">
          <div className="h-1 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#00B368] rounded-full w-full transition-all duration-300"></div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <Link
              href="/auth/profile-step2"
              className="text-[#4E5968] hover:text-[#191F28] inline-flex items-center gap-1 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="text-[12.5px] font-bold text-[#00B368] bg-[#E6F7F0] px-3 py-1 rounded-full">
              4 / 4 마지막 단계
            </span>
          </div>
        </div>

        {/* 타이틀 */}
        <div>
          <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
            마지막 단계예요<br />
            회사 명함을 비춰주세요
          </h1>
          <p className="text-[14px] text-[#6B7684] mt-2 leading-relaxed font-medium">
            AI가 회사 정보를 안전하게 읽고, <strong className="text-[#333D4B]">6개월 동안 재직이 보증</strong>돼요.
          </p>
        </div>

        {/* 인증 수단 세그먼트 (명함 OCR vs 회사 이메일) */}
        <div className="mt-6 flex bg-[#F2F4F6] p-1 rounded-2xl h-12 items-center">
          <button
            type="button"
            onClick={() => setMethod("card")}
            className={`flex-1 h-full text-[14.5px] font-bold rounded-xl transition-all cursor-pointer ${
              method === "card"
                ? "bg-white text-[#191F28] shadow-sm"
                : "text-[#8B95A1]"
            }`}
          >
            명함 OCR 촬영 (추천)
          </button>
          <button
            type="button"
            onClick={() => setMethod("email")}
            className={`flex-1 h-full text-[14.5px] font-bold rounded-xl transition-all cursor-pointer ${
              method === "email"
                ? "bg-white text-[#191F28] shadow-sm"
                : "text-[#8B95A1]"
            }`}
          >
            회사 이메일 인증
          </button>
        </div>

        {/* 1. 명함 OCR 방식 (화면 일체형 오픈 레이아웃) */}
        {method === "card" && (
          <div className="mt-5 flex flex-col gap-3">
            {ocrStatus === "empty" && (
              <button
                type="button"
                onClick={handleCardCapture}
                className="w-full h-44 rounded-2xl bg-[#F9FAFB] hover:bg-[#F2F4F6] transition-all flex flex-col items-center justify-center gap-2.5 group cursor-pointer active:scale-[0.99] border border-[#F2F4F6]"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#00B368] group-hover:scale-105 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-[15px] font-bold text-[#191F28]">
                    명함 촬영하기 (터치 시뮬레이션)
                  </p>
                  <p className="text-[13px] text-[#6B7684] mt-0.5 font-medium">
                    회사명과 소속 부서가 잘 보이도록 촬영해 주세요
                  </p>
                </div>
              </button>
            )}

            {ocrStatus === "scanning" && (
              <div className="w-full h-44 rounded-2xl bg-[#E8F3FF]/70 flex flex-col items-center justify-center gap-2.5 border border-[#3182F6]/20">
                <RefreshCw className="w-6 h-6 text-[#3182F6] animate-spin" />
                <div className="text-center">
                  <p className="text-[15px] font-bold text-[#3182F6]">
                    Gemini AI가 명함 정보를 분석하고 있어요
                  </p>
                  <p className="text-[13px] text-[#6B7684] mt-0.5 font-medium">
                    회사명, 소속 부서, 공식 재직 상태 판별 중
                  </p>
                </div>
              </div>
            )}

            {ocrStatus === "verified" && (
              <div className="flex flex-col gap-3 pt-1">
                {/* 상단 인증 통과 상태 */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-[#E6F7F0] text-[#00B368] px-3 py-1 rounded-full text-[12.5px] font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#00B368]" />
                    <span>100% 직장인 인증 완료</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCardCapture}
                    className="text-[13px] text-[#8B95A1] hover:text-[#191F28] font-bold active:scale-95 transition-all cursor-pointer"
                  >
                    다시 찍기
                  </button>
                </div>

                {/* 오픈형 정보 리스트 */}
                <div className="flex flex-col divide-y divide-[#F2F4F6] pt-1">
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-[#8B95A1] font-bold text-[14px]">인증 회사</span>
                    <span className="text-[#191F28] font-black text-[16px]">{companyInfo.name}</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-[#8B95A1] font-bold text-[14px]">소속 부서</span>
                    <span className="text-[#191F28] font-bold text-[15px]">{companyInfo.dept}</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-[#8B95A1] font-bold text-[14px]">사내 메일</span>
                    <span className="text-[#191F28] font-medium text-[15px]">{companyInfo.email}</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-[#8B95A1] font-bold text-[14px]">재인증 주기</span>
                    <span className="text-[#00B368] font-bold flex items-center gap-1 text-[13.5px]">
                      <Clock className="w-4 h-4" /> 6개월간 안전 유지
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. 회사 이메일 방식 */}
        {method === "email" && (
          <div className="mt-5 flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[14.5px] font-bold text-[#333D4B]">회사 이메일 주소</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@company.com"
                  className="flex-1 px-4 h-14 rounded-2xl bg-[#F2F4F6] border border-transparent text-[16px] font-bold text-[#191F28] focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="h-14 px-4 rounded-2xl bg-[#3182F6] text-white text-[14.5px] font-bold hover:bg-[#1B64DA] active:scale-95 transition-all shrink-0 cursor-pointer"
                >
                  인증번호 발송
                </button>
              </div>
            </div>

            {codeSent && (
              <div className="flex flex-col gap-1.5 animate-in fade-in duration-200">
                <label className="text-[14.5px] font-bold text-[#333D4B]">인증번호 6자리</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    placeholder="인증번호 입력"
                    maxLength={6}
                    className="flex-1 px-4 h-14 rounded-2xl bg-[#F2F4F6] border border-transparent text-[16px] font-bold text-[#191F28] focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    className="h-14 px-5 rounded-2xl bg-[#00B368] text-white text-[14.5px] font-bold hover:bg-emerald-700 active:scale-95 transition-all shrink-0 cursor-pointer"
                  >
                    확인
                  </button>
                </div>
              </div>
            )}

            {emailVerified && (
              <div className="p-3.5 bg-[#F0FDF4] rounded-2xl flex items-center gap-2 text-[14px] text-[#00B368] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>회사 이메일 인증이 완료되었어요!</span>
              </div>
            )}
          </div>
        )}

        {/* 프라이버시 안심 노트 */}
        <div className="mt-6 flex items-start gap-2.5 text-[13px] text-[#6B7684] font-medium px-1">
          <Lock className="w-4 h-4 text-[#00B368] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            인증 정보는 직장인 확인 목적으로만 안전하게 사용되며, <strong className="text-[#333D4B]">회사 동료 및 지인에게는 절대 프로필이 노출되지 않아요.</strong>
          </p>
        </div>
      </div>

      {/* 하단 CTA (56px 토스 표준 버튼) */}
      <div className="pb-6 pt-4">
        <Link
          href={isCompleted ? "/" : "#"}
          className={`w-full h-14 rounded-2xl font-bold text-[16px] transition-all flex items-center justify-center ${
            isCompleted
              ? "bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-lg shadow-blue-500/25 active:scale-[0.98]"
              : "bg-[#E5E8EB] text-[#8B95A1] cursor-not-allowed pointer-events-none"
          }`}
        >
          샐러리 시작하기
        </Link>
      </div>
    </div>
  );
}
