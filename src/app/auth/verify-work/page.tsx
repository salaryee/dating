"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Sparkles,
  CheckCircle2,
  Building2,
  Mail,
  ShieldCheck,
  RefreshCw,
  Clock,
} from "lucide-react";

export default function VerifyWorkPage() {
  const [ocrStatus, setOcrStatus] = useState<"empty" | "scanning" | "extracted">("empty");
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    address: "",
    email: "",
  });
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Gemini AI 명함 OCR 시뮬레이션
  const handleCardCapture = () => {
    setOcrStatus("scanning");
    setTimeout(() => {
      setCompanyInfo({
        name: "카카오 (Kakao)",
        address: "경기도 성남시 분당구 판교역로 166",
        email: "worker@kakaocorp.com",
      });
      setOcrStatus("extracted");
    }, 1500);
  };

  const handleSendEmailCode = () => {
    setEmailCodeSent(true);
  };

  const handleVerifyCode = () => {
    if (authCode.trim() === "123456" || authCode.trim().length === 6) {
      setIsVerified(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6">
      <div>
        {/* 상단 뒤로가기 */}
        <div className="pt-2 pb-6">
          <Link href="/auth/profile-step2" className="text-[#4E5968] hover:text-[#191F28] inline-block active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* 타이틀 (토스 UX) */}
        <div>
          <span className="text-xs font-bold text-[#00B368] bg-[#E6F7F0] px-2.5 py-1 rounded-full">
            마지막 직장 인증
          </span>
          <h1 className="text-[22px] font-black text-[#191F28] tracking-tight mt-2 leading-snug">
            명함을 촬영해 주시면<br />AI가 회사 정보를 읽어요
          </h1>
          <p className="text-xs text-[#8B95A1] mt-2 leading-relaxed font-medium">
            회사 이메일로 인증 코드를 확인하며, 인증 정보는 <strong>6개월 동안 안전하게 유지</strong>돼요.
          </p>
        </div>

        {/* 1. 명함 촬영 영역 */}
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#333D4B]">명함 촬영</label>
            <span className="text-[11px] text-[#3182F6] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Gemini AI 자동 OCR
            </span>
          </div>

          {ocrStatus === "empty" && (
            <button
              onClick={handleCardCapture}
              className="w-full h-36 rounded-2xl border-2 border-dashed border-[#E5E8EB] bg-[#F9FAFB] hover:bg-[#F2F4F6] transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#00B368]">
                <Camera className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-[#191F28]">
                  명함 촬영하기 (터치 시뮬레이션)
                </p>
                <p className="text-[11px] text-[#8B95A1] mt-0.5 font-medium">
                  회사명과 이메일이 보이도록 촬영해 주세요
                </p>
              </div>
            </button>
          )}

          {ocrStatus === "scanning" && (
            <div className="w-full h-36 rounded-2xl bg-[#E8F3FF]/60 border border-[#3182F6]/30 flex flex-col items-center justify-center gap-2.5">
              <RefreshCw className="w-5 h-5 text-[#3182F6] animate-spin" />
              <div className="text-center">
                <p className="text-xs font-bold text-[#3182F6]">
                  Gemini AI가 명함 정보를 읽고 있어요
                </p>
                <p className="text-[11px] text-[#8B95A1] mt-0.5">
                  회사명 및 이메일 자동 인식 중
                </p>
              </div>
            </div>
          )}

          {ocrStatus === "extracted" && (
            <div className="w-full rounded-2xl bg-[#F9FAFB] border border-[#E5E8EB] p-4 flex flex-col gap-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00B368] bg-[#E6F7F0] px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  명함 정보 추출 성공
                </span>
                <button
                  onClick={handleCardCapture}
                  className="text-[11px] text-[#8B95A1] hover:text-[#191F28]"
                >
                  재촬영
                </button>
              </div>

              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between py-1 border-b border-[#F2F4F6]">
                  <span className="text-[#8B95A1]">회사명</span>
                  <span className="font-bold text-[#191F28]">{companyInfo.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F2F4F6]">
                  <span className="text-[#8B95A1]">회사 주소</span>
                  <span className="font-medium text-[#4E5968] truncate max-w-[200px]">
                    {companyInfo.address}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8B95A1]">인증용 메일</span>
                  <span className="font-bold text-[#3182F6]">{companyInfo.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. 회사 이메일 인증 번호 발송 & 확인 */}
        {ocrStatus === "extracted" && !isVerified && (
          <div className="mt-5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#333D4B]">
                회사 이메일 인증
              </label>
              {!emailCodeSent ? (
                <button
                  onClick={handleSendEmailCode}
                  className="text-xs font-bold text-white bg-[#3182F6] px-3 py-1.5 rounded-xl hover:bg-[#1B64DA] transition-colors active:scale-95"
                >
                  인증 메일 보내기
                </button>
              ) : (
                <span className="text-[11px] text-[#00B368] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  인증 메일을 발송했어요
                </span>
              )}
            </div>

            {emailCodeSent && (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    placeholder="인증번호 6자리 입력 (예: 123456)"
                    className="flex-1 px-4 py-3.5 rounded-2xl bg-[#F2F4F6] border border-[#E5E8EB] text-sm font-semibold placeholder:text-[#8B95A1] focus:outline-none focus:border-[#3182F6] focus:bg-white"
                    maxLength={6}
                  />
                  <button
                    onClick={handleVerifyCode}
                    className="px-4 py-3.5 bg-[#191F28] text-white rounded-2xl text-xs font-extrabold hover:bg-[#333D4B] transition-colors active:scale-95"
                  >
                    확인
                  </button>
                </div>
                <p className="text-[11px] text-[#8B95A1]">
                  체험용으로 <strong>123456</strong>을 입력하시면 바로 인증돼요.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 3. 직장인 인증 완료 알림 카드 */}
        {isVerified && (
          <div className="mt-5 bg-[#E6F7F0] border border-[#00B368]/30 p-4 rounded-2xl flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#00B368] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#191F28]">
                {companyInfo.name} 직장 인증 완료!
              </p>
              <p className="text-[11px] text-[#00B368] mt-0.5 font-medium">
                오늘부터 6개월간 인증 배지가 프로필에 표시돼요.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 하단 오늘의 인연 만나러 가기 버튼 */}
      <div className="pb-4 pt-6">
        <Link
          href={isVerified ? "/" : "#"}
          className={`w-full h-14 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
            isVerified
              ? "bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-md shadow-blue-500/20 active:scale-[0.98]"
              : "bg-[#F2F4F6] text-[#8B95A1] cursor-not-allowed pointer-events-none"
          }`}
        >
          <span>오늘의 인연 만나러 가기</span>
        </Link>
      </div>
    </div>
  );
}
