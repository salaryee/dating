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
          <Link href="/auth/profile-step2" className="text-slate-600 hover:text-slate-900 inline-block">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* 타이틀 (토스 UX) */}
        <div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
            마지막 직장 인증
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-2 leading-snug">
            명함을 촬영해 주시면<br />AI가 회사 정보를 읽어요
          </h1>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            명함에서 추출한 회사 이메일로 인증 코드를 보내드려요.<br />
            인증된 직장 정보는 <strong>6개월 동안 안전하게 유지</strong>돼요.
          </p>
        </div>

        {/* 1. 명함 촬영 영역 */}
        <div className="mt-6 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">명함 촬영</label>
            <span className="text-[11px] text-[#3182F6] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Gemini AI 자동 OCR
            </span>
          </div>

          {ocrStatus === "empty" && (
            <button
              onClick={handleCardCapture}
              className="w-full h-40 rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50/70 transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-600">
                <Camera className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-800">
                  명함 촬영하기 (터치하여 시뮬레이션)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  회사명과 회사 이메일이 잘 보이게 찍어주세요
                </p>
              </div>
            </button>
          )}

          {ocrStatus === "scanning" && (
            <div className="w-full h-40 rounded-3xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-6 h-6 text-[#3182F6] animate-spin" />
              <div className="text-center">
                <p className="text-xs font-bold text-[#3182F6]">
                  Gemini AI가 명함 텍스트를 추출하고 있어요
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  회사명, 주소, 이메일 주소 자동 파싱 중
                </p>
              </div>
            </div>
          )}

          {ocrStatus === "extracted" && (
            <div className="w-full rounded-3xl bg-slate-50 border border-slate-200 p-4 flex flex-col gap-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  명함 정보 추출 성공
                </span>
                <button
                  onClick={handleCardCapture}
                  className="text-[11px] text-slate-400 hover:text-slate-600"
                >
                  재촬영
                </button>
              </div>

              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">회사명</span>
                  <span className="font-bold text-slate-900">{companyInfo.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">회사 주소</span>
                  <span className="font-medium text-slate-700 truncate max-w-[200px]">
                    {companyInfo.address}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">인증용 메일</span>
                  <span className="font-bold text-[#3182F6]">{companyInfo.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. 회사 이메일 인증 번호 발송 & 확인 */}
        {ocrStatus === "extracted" && !isVerified && (
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                회사 이메일 인증
              </label>
              {!emailCodeSent ? (
                <button
                  onClick={handleSendEmailCode}
                  className="text-xs font-bold text-white bg-[#3182F6] px-3 py-1.5 rounded-xl hover:bg-[#256fd8] transition-colors"
                >
                  인증 메일 보내기
                </button>
              ) : (
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
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
                    className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#3182F6] focus:bg-white"
                    maxLength={6}
                  />
                  <button
                    onClick={handleVerifyCode}
                    className="px-4 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    인증 확인
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  테스트용으로 <strong>123456</strong>을 입력하시면 바로 통과돼요.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 3. 직장인 인증 완료 알림 카드 */}
        {isVerified && (
          <div className="mt-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-3xl flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                {companyInfo.name} 직장 인증 완료!
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                오늘부터 6개월간 안심 뱃지가 프로필에 표시돼요.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 하단 오늘의 추천 보러가기 버튼 */}
      <div className="pb-4 pt-8">
        <Link
          href={isVerified ? "/" : "#"}
          className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            isVerified
              ? "bg-[#3182F6] text-white hover:bg-[#256fd8] shadow-md shadow-blue-500/20 active:scale-[0.98]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          <span>오늘의 추천 인연 만나러 가기</span>
        </Link>
      </div>
    </div>
  );
}
