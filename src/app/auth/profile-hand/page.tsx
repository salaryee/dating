"use client";

export const dynamic = "force-dynamic";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Camera,
  Sparkles,
  Hand,
  RefreshCw,
  Lock,
  Check,
  CheckCircle2,
  AlertCircle,
  Heart,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

export default function ProfileHandPage() {
  // 손등 사진 상태: 'empty' | 'analyzing' | 'error' | 'success'
  const [handPhotoStatus, setHandPhotoStatus] = useState<"empty" | "analyzing" | "error" | "success">("empty");
  const [photoUrl, setPhotoUrl] = useState<string>("/sample-hand.svg");
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [handDescription, setHandDescription] = useState<string>("단정하고 정갈한 손등");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 클라이언트 단 스마트 이미지 리사이징 (모바일 고화질 사진을 웹/AI 최적화 1024px JPEG로 압축하여 Vercel 페이로드 제한 방지)
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 1024;

          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          resolve(compressedDataUrl);
        };
        img.onerror = () => resolve(event.target?.result as string);
        img.src = event.target?.result as string;
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  };

  // 실제 카메라 촬영 또는 앨범 파일 선택 처리
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const optimizedBase64 = await compressImage(file);
      setPhotoUrl(optimizedBase64);
      await startHandAnalysis(optimizedBase64, undefined);
    } catch {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        setPhotoUrl(base64);
        await startHandAnalysis(base64, undefined);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  // Google AI 손등 분석 프로세스 실행 (실시간 진행상태 추적)
  const startHandAnalysis = async (imageBase64?: string, testType?: "hand" | "not-hand") => {
    setHandPhotoStatus("analyzing");
    setAnalysisProgress(10);

    // 사용자가 대기 시간을 시각적으로 체감할 수 있도록 매끄럽게 진행률을 올려주는 타이머
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev < 35) return prev + 3; // 1단계: 이미지 윤곽 스캔 (0~35%)
        if (prev < 75) return prev + 2; // 2단계: AI 손등 피사체 분석 (35~75%)
        if (prev < 92) return prev + 0.6; // 3단계: 얼굴 미노출 안심 검증 (75~92%)
        return prev;
      });
    }, 45);

    try {
      const res = await fetch("/api/verify-hand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, testType }),
        signal: AbortSignal.timeout(12000),
      });

      if (!res.ok) {
        throw new Error(`서버 응답 오류 (${res.status})`);
      }

      const data = await res.json();
      clearInterval(progressInterval);

      // 분석 완료 시 100% 도달 후 결과 화면 전환
      setAnalysisProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 200));

      if (data.isHand) {
        setHandDescription(data.handDescription || "단정하고 정갈한 손등");
        setHandPhotoStatus("success");
      } else {
        setErrorMessage(
          data.reason || "손등 사진이 확인되지 않았어요. 손등이나 손가락이 잘 보이도록 다시 촬영해 주세요."
        );
        setHandPhotoStatus("error");
      }
    } catch (err: unknown) {
      clearInterval(progressInterval);
      const error = err as Error;
      if (error.name === "AbortError" || error.name === "TimeoutError") {
        setErrorMessage("AI 분석 응답 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.");
      } else {
        setErrorMessage(error.message || "이미지 분석 중 일시적인 오류가 발생했어요. 다시 촬영해 주세요.");
      }
      setHandPhotoStatus("error");
    }
  };

  const isFormValid = handPhotoStatus === "success";

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6 sm:p-7 w-full max-w-lg mx-auto">
      <div>
        {/* 상단 프로그레스 바 (토스 스타일 50%, 6단계 중 3단계) */}
        <div className="pt-2 pb-5">
          <div className="h-1 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#3182F6] rounded-full w-3/6 transition-all duration-300"></div>
          </div>
          <div className="flex items-center justify-end mt-3">
            <span className="text-[12.5px] font-bold text-[#3182F6] bg-[#E8F3FF] px-3 py-1 rounded-full">
              3 / 6 단계
            </span>
          </div>
        </div>

        {/* 타이틀 (단독 손등 프로필 등록 헤드라인) */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F3FF] text-[#3182F6] text-[12.5px] font-bold mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>샐러리만의 안심 프로필</span>
          </div>
          <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
            얼굴 대신, 당신의 첫인상을 전할<br />
            손등 사진을 올려주세요
          </h1>
          <p className="text-[14px] text-[#6B7684] mt-2 leading-relaxed font-medium">
            프라이버시 보호를 위해 얼굴은 철저히 가리고, 단정한 손등 사진으로 나와 통하는 직장인 인연을 찾아요.
          </p>
        </div>

        {/* 손등 사진 등록 & Google AI 비전 분석 메인 영역 */}
        <div className="mt-7 flex flex-col gap-2">
          {/* 숨겨진 실제 카메라/파일 인풋 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* 상태 1: 기본 촬영 전 (empty) */}
          {handPhotoStatus === "empty" && (
            <div className="w-full rounded-3xl bg-gradient-to-b from-[#FBFDFF] to-[#F2F6FC] p-6 border border-[#E2ECF8] shadow-xs flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#3182F6] mb-3 animate-flutter-pulse border border-[#E8F0FE]">
                <Hand className="w-8 h-8" />
              </div>
              <h3 className="text-[17px] font-bold text-[#191F28]">
                단정하고 정갈한 내 손등 촬영하기
              </h3>
              <p className="text-[13.5px] text-[#6B7684] mt-1 font-medium leading-relaxed">
                손등의 선과 정갈한 분위기로 나만의 첫인상을 전해보세요
              </p>

              {/* 실제 촬영 버튼 */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-5 w-full h-13 rounded-2xl bg-[#3182F6] hover:bg-[#1B64DA] text-white font-bold text-[15px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Camera className="w-5 h-5" />
                <span>손등 사진 촬영 / 앨범 선택</span>
              </button>

              <div className="mt-4 flex items-center gap-1.5 text-[12px] text-[#8B95A1] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#00B368]" />
                <span>시계, 반지, 책상 배경이 함께 나와도 정상 인식돼요</span>
              </div>
            </div>
          )}

          {/* 상태 2: Google AI 실시간 분석 중 (analyzing) - 실시간 진행상태 피드백 UX */}
          {handPhotoStatus === "analyzing" && (
            <div className="w-full rounded-3xl bg-[#0F172A] p-5 text-white relative overflow-hidden shadow-lg border border-blue-500/30">
              {/* 상단 실시간 프로그레스 헤더 */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#3182F6] animate-ping" />
                  <span className="text-[13px] font-bold text-blue-200">
                    Google AI 비전 정밀 분석
                  </span>
                </div>
                <span className="text-[14px] font-mono font-black text-[#60A5FA]">
                  {Math.min(100, Math.round(analysisProgress))}%
                </span>
              </div>

              {/* 진행률 게이지 바 */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-4 border border-slate-700/50">
                <div
                  className="h-full bg-gradient-to-r from-[#3182F6] via-[#60A5FA] to-[#00D084] transition-all duration-100 ease-out rounded-full shadow-[0_0_10px_#3B82F6]"
                  style={{ width: `${Math.min(100, analysisProgress)}%` }}
                />
              </div>

              {/* 사진 프리뷰 + 레이저 스캔 뷰파인더 */}
              <div className="relative w-full h-[200px] rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center border border-slate-800">
                <img
                  src={photoUrl}
                  alt="분석 중인 손등 사진"
                  className="w-full h-full object-cover opacity-60 filter blur-[0.3px]"
                />

                {/* 레이저 스캔 라인 */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent shadow-[0_0_16px_#3B82F6] animate-laser-scan pointer-events-none" />

                {/* 뷰파인더 브라켓 */}
                <div className="absolute inset-4 border border-blue-400/40 rounded-xl pointer-events-none flex flex-col justify-between p-2.5">
                  <div className="flex justify-between text-[10px] text-blue-300 font-mono">
                    <span>SCAN: ACTIVE</span>
                    <span>AI: GEMINI FLASH</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-blue-300 font-mono">
                    <span>GESTURE: TRACKING</span>
                    <span>FACE: PROTECTED</span>
                  </div>
                </div>

                {/* 센터 스피너 & 실시간 단계 안내 문구 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[1px]">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 backdrop-blur-md flex items-center justify-center border border-blue-400/40 mb-2 shadow-xs">
                    <RefreshCw className="w-5 h-5 text-[#60A5FA] animate-spin" />
                  </div>
                  <p className="text-[14.5px] font-bold text-white tracking-tight drop-shadow-sm">
                    {analysisProgress < 35
                      ? "이미지 윤곽 스캔 중..."
                      : analysisProgress < 75
                      ? "Google AI 손등 판별 중..."
                      : "얼굴 미노출 안심 검증 중..."}
                  </p>
                  <span className="text-[11.5px] text-blue-300/90 mt-0.5 font-medium">
                    약 1~2초 내에 분석이 완료돼요
                  </span>
                </div>
              </div>

              {/* 3단계 진행 상태 리스트 (실시간 체크 아이콘 및 뱃지) */}
              <div className="mt-4 space-y-2.5 px-1">
                {/* 1단계 */}
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-2 text-slate-200 font-medium">
                    {analysisProgress >= 35 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-blue-400 flex items-center justify-center text-[10px] text-blue-300 font-bold shrink-0">
                        1
                      </span>
                    )}
                    <span>손등 윤곽 및 피부결 감지</span>
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      analysisProgress >= 35
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                        : "bg-blue-950/60 text-blue-300 border border-blue-500/30 animate-pulse"
                    }`}
                  >
                    {analysisProgress >= 35 ? "완료" : "스캔 중"}
                  </span>
                </div>

                {/* 2단계 */}
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-2 text-slate-200 font-medium">
                    {analysisProgress >= 75 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : analysisProgress >= 35 ? (
                      <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 animate-pulse">
                        2
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-600 text-slate-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                        2
                      </span>
                    )}
                    <span>Google AI 손등 피사체 분석</span>
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      analysisProgress >= 75
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                        : analysisProgress >= 35
                        ? "bg-blue-950/60 text-blue-300 border border-blue-500/30 animate-pulse"
                        : "text-slate-500"
                    }`}
                  >
                    {analysisProgress >= 75
                      ? "완료"
                      : analysisProgress >= 35
                      ? "분석 중"
                      : "대기"}
                  </span>
                </div>

                {/* 3단계 */}
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-2 text-slate-200 font-medium">
                    {analysisProgress >= 100 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : analysisProgress >= 75 ? (
                      <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 animate-pulse">
                        3
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-600 text-slate-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                        3
                      </span>
                    )}
                    <span>얼굴 비노출 및 프라이버시 안심 확인</span>
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      analysisProgress >= 100
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                        : analysisProgress >= 75
                        ? "bg-blue-950/60 text-blue-300 border border-blue-500/30 animate-pulse"
                        : "text-slate-500"
                    }`}
                  >
                    {analysisProgress >= 100
                      ? "완료"
                      : analysisProgress >= 75
                      ? "확인 중"
                      : "대기"}
                  </span>
                </div>
              </div>

              <p className="text-center text-[12.5px] text-blue-300 font-medium mt-4 pt-2.5 border-t border-slate-800">
                소중한 인연에게 전달될 당신만의 손등 첫인상을 확인하고 있어요 ✨
              </p>
            </div>
          )}

          {/* 상태 3: 손등 사진이 아닌 경우 (error) - 재촬영 유도 */}
          {handPhotoStatus === "error" && (
            <div className="w-full rounded-3xl bg-[#FFF8F8] border border-[#FFD0D4] p-5 shadow-xs flex flex-col gap-3.5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFE8E8] flex items-center justify-center text-[#F04452] shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[15.5px] font-bold text-[#D62828]">
                    손등 사진이 확인되지 않았어요
                  </h3>
                  <p className="text-[13px] text-[#4E5968] mt-1 leading-relaxed font-medium">
                    {errorMessage}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#FFD0D4] shrink-0 bg-white">
                  <img src={photoUrl} alt="등록 시도된 사진" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="bg-white/80 rounded-2xl p-3 border border-[#FFE0E3] text-[12px] text-[#6B7684] space-y-1">
                <p className="font-bold text-[#333D4B]">💡 이렇게 촬영해 보세요</p>
                <p>• 손등이 화면 중앙에 정면으로 오도록 담아주세요</p>
                <p>• 얼굴, 반려동물, 책상 사물 사진은 등록할 수 없어요</p>
              </div>

              {/* 재촬영 액션 버튼 */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-12 rounded-xl bg-[#3182F6] hover:bg-[#1B64DA] text-white font-bold text-[14.5px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Camera className="w-4.5 h-4.5" />
                <span>손등 다시 촬영하기</span>
              </button>
            </div>
          )}

          {/* 상태 4: 손등 사진 확인 완료 (success) - 프로필 이미지 표시 */}
          {handPhotoStatus === "success" && (
            <div className="w-full rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] p-5 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#3182F6] bg-[#E8F3FF] px-2.5 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" /> Google AI 손등 검증 완료
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[12.5px] text-[#8B95A1] hover:text-[#191F28] font-bold flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>사진 변경</span>
                </button>
              </div>

              {/* 프로필 이미지 사이즈 (Profile Avatar Size) 렌더링 영역 */}
              <div className="flex items-center gap-4 py-1">
                {/* 프로필 원형 아바타 (88px) */}
                <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-md ring-2 ring-blue-500/25 shrink-0 bg-[#FFF0EE]">
                  <img
                    src={photoUrl}
                    alt="프로필 손등 이미지"
                    className="w-full h-full object-cover"
                  />
                  {/* 우측 하단 인증 뱃지 */}
                  <div className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full bg-[#3182F6] border-2 border-white flex items-center justify-center text-white shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                {/* 프로필 정보 및 손등 설명 */}
                <div className="flex flex-col justify-center gap-1 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[16px] font-black text-[#191F28] tracking-tight">
                      내 손등 프로필
                    </span>
                    <Heart className="w-4 h-4 text-[#FF6F61] fill-[#FF6F61]" />
                  </div>
                  <p className="text-[13.5px] font-bold text-[#3182F6]">
                    {handDescription}
                  </p>
                  <p className="text-[12px] text-[#6B7684] leading-snug font-medium">
                    단정한 손등 이미지로 상대방에게 신뢰와 호감을 전해요.
                  </p>
                </div>
              </div>

              {/* 하단 안심 보증 바 */}
              <div className="flex items-center justify-between text-[12px] pt-2.5 border-t border-[#E2E8F0]">
                <span className="text-[#00B368] font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 얼굴 미노출 안심 검증
                </span>
                <span className="text-[#3182F6] font-bold">프로필 등록 준비 완료</span>
              </div>
            </div>
          )}
        </div>

        {/* 프라이버시 안심 노트 */}
        <div className="mt-6 flex items-start gap-2.5 text-[13px] text-[#6B7684] font-medium px-1">
          <Lock className="w-4 h-4 text-[#00B368] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            얼굴이나 배경은 자동으로 가려지며, <strong className="text-[#333D4B]">지인에게는 절대 프로필이 노출되지 않아요.</strong>
          </p>
        </div>
      </div>

      {/* 하단 CTA & 나중에 등록하기 옵션 */}
      <div className="pb-6 pt-4 flex flex-col gap-2.5">
        <Link
          href={isFormValid ? "/auth/profile-step2" : "#"}
          className={`w-full h-14 rounded-2xl font-bold text-[16px] transition-all flex items-center justify-center ${
            isFormValid
              ? "bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-lg shadow-blue-500/25 active:scale-[0.98]"
              : "bg-[#E5E8EB] text-[#8B95A1] cursor-not-allowed pointer-events-none"
          }`}
        >
          다음
        </Link>

        {/* 공공장소 등 지금 촬영이 어려운 직장인을 위한 건너뛰기 버튼 */}
        <div className="text-center pt-1">
          <Link
            href="/auth/profile-step2"
            className="text-[13px] text-[#8B95A1] hover:text-[#6B7684] font-semibold underline underline-offset-4 cursor-pointer transition-colors"
          >
            지금 촬영하기 어렵다면? 나중에 등록하기
          </Link>
        </div>
      </div>
    </div>
  );
}
