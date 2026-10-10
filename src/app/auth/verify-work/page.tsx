"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Send,
  Edit2,
  PartyPopper,
  AlertCircle,
} from "lucide-react";

type VerifyStep = "scan" | "scanning" | "confirm" | "otp" | "success";

export default function VerifyWorkPage() {
  const router = useRouter();
  const [step, setStep] = useState<VerifyStep>("scan");

  // 추출된 정보 상태
  const [companyInfo, setCompanyInfo] = useState({
    name: "카카오 (Kakao)",
    dept: "서비스 기획팀",
    email: "worker@kakaocorp.com",
  });

  // 이메일 직접 수정 토글
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editableEmail, setEditableEmail] = useState("worker@kakaocorp.com");

  // OTP 6자리 입력 및 타이머 상태
  const [otpInput, setOtpInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5분
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // OTP 타이머 동작
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timeLeft]);

  // 토스트 메시지 자동 소멸
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // 1. 명함 촬영 및 Gemini AI OCR 시뮬레이션
  const handleCardCapture = () => {
    setStep("scanning");
    setTimeout(() => {
      setStep("confirm");
    }, 1500);
  };

  // 2. 이메일 수정 저장
  const handleSaveEmail = () => {
    if (editableEmail.includes("@") && editableEmail.includes(".")) {
      setCompanyInfo((prev) => ({ ...prev, email: editableEmail }));
      setIsEditingEmail(false);
      setToastMessage("사내 메일 주소가 수정되었어요.");
    } else {
      setToastMessage("올바른 이메일 주소를 입력해 주세요.");
    }
  };

  // 3. 인증번호 발송 & OTP 화면 전환
  const handleSendOtp = () => {
    setStep("otp");
    setTimeLeft(300);
    setToastMessage(`${companyInfo.email}로 인증번호가 발송되었어요.`);
  };

  // 인증번호 재발송
  const handleResendOtp = () => {
    setTimeLeft(300);
    setOtpInput("");
    setToastMessage("인증번호 6자리를 다시 보내드렸어요.");
  };

  // 4. 인증번호 확인
  const handleVerifyOtp = () => {
    if (otpInput.length === 6) {
      setToastMessage(null);
      setStep("success");
    } else {
      setToastMessage("인증번호 6자리를 정확히 입력해 주세요.");
    }
  };

  // 상단 뒤로가기 핸들러
  const handleBack = () => {
    if (step === "scan") {
      router.push("/auth/profile-step2");
    } else if (step === "confirm") {
      setStep("scan");
    } else if (step === "otp") {
      setStep("confirm");
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6 sm:p-7 w-full relative">
      {/* 플로팅 토스트 알림 */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#191F28]/95 text-white px-4 py-2.5 rounded-2xl shadow-xl text-[14px] font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4.5 h-4.5 text-[#00B368] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        {/* 상단 프로그레스 바 */}
        <div className="pt-2 pb-5">
          <div className="h-1 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                step === "success" ? "bg-[#00B368] w-full" : "bg-[#3182F6] w-full"
              }`}
            ></div>
          </div>
          <div className="flex items-center justify-between mt-3">
            {step !== "success" ? (
              <button
                type="button"
                onClick={handleBack}
                className="text-[#4E5968] hover:text-[#191F28] inline-flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <div className="w-5 h-5" />
            )}
            <span
              className={`text-[12.5px] font-bold px-3 py-1 rounded-full ${
                step === "success"
                  ? "text-[#00B368] bg-[#E6F7F0]"
                  : "text-[#3182F6] bg-[#E8F3FF]"
              }`}
            >
              {step === "success" ? "인증 완료" : "4 / 4 마지막 단계"}
            </span>
          </div>
        </div>

        {/* ================= STEP 1: 명함 촬영 ================= */}
        {(step === "scan" || step === "scanning") && (
          <div className="animate-in fade-in duration-200">
            <div>
              <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
                마지막 단계예요<br />
                회사 명함을 비춰주세요
              </h1>
              <p className="text-[14px] text-[#6B7684] mt-2 leading-relaxed font-medium">
                Gemini AI가 명함 속 사내 이메일과 회사명을 인식해요.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {step === "scan" && (
                <button
                  type="button"
                  onClick={handleCardCapture}
                  className="w-full h-48 rounded-2xl bg-[#F9FAFB] hover:bg-[#F2F4F6] transition-all flex flex-col items-center justify-center gap-3 group cursor-pointer active:scale-[0.99] border border-[#F2F4F6]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#00B368] group-hover:scale-105 transition-transform">
                    <Camera className="w-7 h-7" />
                  </div>
                  <div className="text-center">
                    <p className="text-[15px] font-bold text-[#191F28]">
                      명함 촬영하기 (터치 시뮬레이션)
                    </p>
                    <p className="text-[13px] text-[#6B7684] mt-0.5 font-medium">
                      회사명과 사내 이메일이 잘 보이도록 비춰주세요
                    </p>
                  </div>
                </button>
              )}

              {step === "scanning" && (
                <div className="w-full h-48 rounded-2xl bg-[#E8F3FF]/70 flex flex-col items-center justify-center gap-3 border border-[#3182F6]/20">
                  <RefreshCw className="w-7 h-7 text-[#3182F6] animate-spin" />
                  <div className="text-center">
                    <p className="text-[16px] font-bold text-[#3182F6]">
                      Gemini AI가 명함 정보를 분석하고 있어요
                    </p>
                    <p className="text-[13px] text-[#6B7684] mt-0.5 font-medium">
                      회사명, 소속 부서, 공식 사내 이메일 정밀 판별 중
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 프라이버시 안심 노트 */}
            <div className="mt-8 flex items-start gap-2.5 text-[13px] text-[#6B7684] font-medium px-1">
              <Lock className="w-4 h-4 text-[#00B368] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                명함 이미지는 인증 판독 즉시 파기되며, <strong className="text-[#333D4B]">회사 동료 및 지인에게는 절대 프로필이 노출되지 않아요.</strong>
              </p>
            </div>
          </div>
        )}

        {/* ================= STEP 2: 정보 확인 & 메일 발송 의사 확인 ================= */}
        {step === "confirm" && (
          <div className="animate-in fade-in duration-200">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00B368] bg-[#E6F7F0] px-2.5 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI 명함 판독 완료</span>
              </div>
              <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
                인식된 정보가 맞나요?<br />
                인증 메일을 보내드릴게요
              </h1>
              <p className="text-[14px] text-[#6B7684] mt-2 leading-relaxed font-medium">
                사내 메일 수신함을 통해 1회만 인증하면 6개월 동안 재직이 보증돼요.
              </p>
            </div>

            {/* 추출 정보 팩트시트 카드 */}
            <div className="mt-6 bg-[#F9FAFB] rounded-2xl p-5 border border-[#F2F4F6] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#8B95A1] font-bold">인증 회사</span>
                <span className="text-[16px] text-[#191F28] font-black">{companyInfo.name}</span>
              </div>

              <div className="h-px bg-[#E5E8EB]/60 w-full" />

              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#8B95A1] font-bold">소속 부서</span>
                <span className="text-[15px] text-[#191F28] font-bold">{companyInfo.dept}</span>
              </div>

              <div className="h-px bg-[#E5E8EB]/60 w-full" />

              {/* 사내 메일 주소 (직접 수정 가능) */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#8B95A1] font-bold">인증받을 사내 메일</span>
                  {!isEditingEmail ? (
                    <button
                      type="button"
                      onClick={() => {
                        setEditableEmail(companyInfo.email);
                        setIsEditingEmail(true);
                      }}
                      className="text-[13px] font-bold text-[#3182F6] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      직접 수정
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSaveEmail}
                      className="text-[13px] font-bold text-[#00B368] hover:underline cursor-pointer"
                    >
                      완료
                    </button>
                  )}
                </div>

                {!isEditingEmail ? (
                  <p className="text-[16px] text-[#3182F6] font-bold bg-[#E8F3FF] px-3.5 py-2.5 rounded-xl break-all">
                    {companyInfo.email}
                  </p>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={editableEmail}
                      onChange={(e) => setEditableEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-[#3182F6] text-[15px] font-bold text-[#191F28] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSaveEmail}
                      className="px-4 py-2.5 rounded-xl bg-[#3182F6] text-white text-[14px] font-bold active:scale-95 transition-all cursor-pointer"
                    >
                      저장
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 재인증 주기 & 프라이버시 안심 노트 */}
            <div className="mt-5 flex items-start gap-2.5 text-[13px] text-[#6B7684] font-medium px-1">
              <Lock className="w-4 h-4 text-[#00B368] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                사내 메일은 재직 확인에만 안전하게 사용되며, <strong className="text-[#333D4B]">다른 회원이나 회사 동료에게는 절대 노출되지 않아요.</strong>
              </p>
            </div>
          </div>
        )}

        {/* ================= STEP 3: 사내 메일 6자리 인증번호 입력 ================= */}
        {step === "otp" && (
          <div className="animate-in fade-in duration-200">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3182F6] bg-[#E8F3FF] px-2.5 py-1 rounded-full mb-2">
                <Send className="w-3.5 h-3.5" />
                <span>메일 발송 완료</span>
              </div>
              <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
                사내 메일로 보내드린<br />
                인증번호 6자리를 적어주세요
              </h1>
              <p className="text-[14px] text-[#6B7684] mt-2 leading-relaxed font-medium">
                <strong className="text-[#3182F6]">{companyInfo.email}</strong>의 받은 편지함을 확인해 주세요.
              </p>
            </div>

            {/* 6자리 입력창 */}
            <div className="mt-8 flex flex-col gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={otpInput}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
                    setOtpInput(val);
                  }}
                  placeholder="인증번호 6자리"
                  maxLength={6}
                  autoFocus
                  className="w-full h-16 rounded-2xl bg-[#F2F4F6] border border-transparent text-[22px] font-black tracking-[0.25em] text-center text-[#191F28] placeholder:text-[#8B95A1] placeholder:tracking-normal placeholder:text-[16px] placeholder:font-bold focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-[#F04452]">
                  {formatTimer(timeLeft)}
                </span>
              </div>

              {/* 힌트 및 재발송 옵션 */}
              <div className="flex items-center justify-between text-[13px] px-1 pt-1">
                <span className="text-[#8B95A1] font-medium">
                  테스트 힌트: 아무 6자리 (예: 123456)
                </span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="font-bold text-[#3182F6] hover:underline cursor-pointer"
                >
                  인증번호 다시 받기
                </button>
              </div>
            </div>

            {/* 메일 수신 팁 노트 */}
            <div className="mt-8 bg-[#F9FAFB] rounded-2xl p-4 border border-[#F2F4F6] flex items-start gap-2.5 text-[13px] text-[#6B7684]">
              <AlertCircle className="w-4 h-4 text-[#8B95A1] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                메일이 오지 않는다면 <strong>스팸 메일함</strong>을 확인해 주시거나, 이메일 주소가 올바른지 확인해 주세요.
              </p>
            </div>
          </div>
        )}

        {/* ================= STEP 4: 직장인증 성공 축하 화면 ================= */}
        {step === "success" && (
          <div className="animate-in fade-in zoom-in-95 duration-300 py-6 text-center flex flex-col items-center">
            {/* 대형 축하 뱃지 */}
            <div className="w-20 h-20 rounded-full bg-[#E6F7F0] flex items-center justify-center text-[#00B368] mb-5 shadow-lg shadow-emerald-500/10">
              <ShieldCheck className="w-11 h-11" />
            </div>

            <h1 className="text-[26px] font-black text-[#191F28] tracking-tight leading-snug">
              100% 직장인 인증 완료!<br />
              <span className="text-[#00B368]">{companyInfo.name}</span> 크루로<br />
              안전하게 등록되었어요 🎉
            </h1>

            <p className="text-[14.5px] text-[#6B7684] mt-3 leading-relaxed font-medium">
              이제 얼굴 노출 없이, 믿을 수 있는 직장인들과<br />
              따뜻한 대화를 시작해 보세요.
            </p>

            {/* 안심 보증 팩트 카드 */}
            <div className="w-full mt-7 bg-[#F9FAFB] rounded-2xl p-4.5 border border-[#F2F4F6] flex flex-col gap-3 text-left">
              <div className="flex items-center gap-2.5 text-[14px]">
                <Clock className="w-4.5 h-4.5 text-[#00B368] shrink-0" />
                <span className="font-bold text-[#191F28]">
                  오늘부터 <strong>6개월간</strong> 안심 인증이 보증돼요
                </span>
              </div>
              <div className="h-px bg-[#E5E8EB]/60 w-full" />
              <div className="flex items-center gap-2.5 text-[14px]">
                <Lock className="w-4.5 h-4.5 text-[#3182F6] shrink-0" />
                <span className="font-bold text-[#191F28]">
                  <strong>{companyInfo.name} 동료</strong>에게는 내 프로필이 절대 노출되지 않아요
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= 하단 고정 CTA 버튼 (TDS FixedBottomCTA) ================= */}
      <div className="pb-6 pt-4 flex flex-col gap-2.5">
        {step === "confirm" && (
          <>
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full h-14 rounded-2xl font-bold text-[16px] bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>이 메일로 인증번호 받기</span>
            </button>
            <button
              type="button"
              onClick={() => setStep("scan")}
              className="w-full h-12 rounded-xl font-bold text-[14px] text-[#8B95A1] hover:text-[#191F28] transition-colors cursor-pointer"
            >
              명함 다시 찍기
            </button>
          </>
        )}

        {step === "otp" && (
          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={otpInput.length !== 6}
            className={`w-full h-14 rounded-2xl font-bold text-[16px] transition-all flex items-center justify-center cursor-pointer ${
              otpInput.length === 6
                ? "bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-lg shadow-blue-500/25 active:scale-[0.98]"
                : "bg-[#E5E8EB] text-[#8B95A1] cursor-not-allowed pointer-events-none"
            }`}
          >
            인증 완료하기
          </button>
        )}

        {step === "success" && (
          <Link
            href="/"
            className="w-full h-14 rounded-2xl font-bold text-[16px] bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer"
          >
            샐러리 시작하기
          </Link>
        )}
      </div>
    </div>
  );
}
