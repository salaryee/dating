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
  ChevronDown,
  AlertCircle,
  Heart,
  RotateCcw,
} from "lucide-react";

export default function ProfileStep1Page() {
  const [nickname, setNickname] = useState("민지");
  const [gender, setGender] = useState<"여성" | "남성">("여성");
  const [birthYear, setBirthYear] = useState<number>(1997);

  // 손등 사진 상태: 'empty' | 'analyzing' | 'error' | 'success'
  const [handPhotoStatus, setHandPhotoStatus] = useState<"empty" | "analyzing" | "error" | "success">("empty");
  const [photoUrl, setPhotoUrl] = useState<string>("/sample-hand.svg");
  const [analysisStep, setAnalysisStep] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [handDescription, setHandDescription] = useState<string>("온도 36.5℃ · 따뜻하고 정갈한 손등");

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

  // Google AI 손등 분석 프로세스 실행
  const startHandAnalysis = async (imageBase64?: string, testType?: "hand" | "not-hand") => {
    setHandPhotoStatus("analyzing");
    setAnalysisStep(1);

    const stepTimer1 = setTimeout(() => setAnalysisStep(2), 650);
    const stepTimer2 = setTimeout(() => setAnalysisStep(3), 1300);

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

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      if (data.isHand) {
        setHandDescription(data.handDescription || "온도 36.5℃ · 따뜻하고 정갈한 손등");
        setHandPhotoStatus("success");
      } else {
        setErrorMessage(
          data.reason || "손등 사진이 확인되지 않았어요. 손등이나 손가락이 잘 보이도록 다시 촬영해 주세요."
        );
        setHandPhotoStatus("error");
      }
    } catch (err: unknown) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      const error = err as Error;
      if (error.name === "AbortError" || error.name === "TimeoutError") {
        setErrorMessage("AI 분석 응답 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.");
      } else {
        setErrorMessage(error.message || "이미지 분석 중 일시적인 오류가 발생했어요. 다시 촬영해 주세요.");
      }
      setHandPhotoStatus("error");
    }
  };

  const isFormValid = nickname.trim().length >= 2 && handPhotoStatus === "success";

  // 현재 연도(2026) 기준 계산되는 나이 안내 (만 나이 기준)
  const currentYear = 2026;
  const calculatedAge = currentYear - birthYear;

  // 1970년생부터 2007년생(만 19세 이상)까지의 출생년도 옵션
  const birthYearOptions = Array.from({ length: 38 }, (_, i) => 2007 - i);

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between p-6 sm:p-7 w-full max-w-lg mx-auto">
      <div>
        {/* 상단 프로그레스 바 (토스 스타일 50%) */}
        <div className="pt-2 pb-5">
          <div className="h-1 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#3182F6] rounded-full w-1/2 transition-all duration-300"></div>
          </div>
          <div className="flex items-center justify-end mt-3">
            <span className="text-[12.5px] font-bold text-[#3182F6] bg-[#E8F3FF] px-3 py-1 rounded-full">
              2 / 4 단계
            </span>
          </div>
        </div>

        {/* 타이틀 (설레임과 온기를 전하는 문구) */}
        <div>
          <h1 className="text-[24px] font-black text-[#191F28] tracking-tight leading-snug">
            상대방에게 불릴 이름과<br />
            설레는 손등 사진을 올려주세요
          </h1>
          <p className="text-[14px] text-[#6B7684] mt-2 leading-relaxed font-medium">
            얼굴 대신 손등의 따뜻한 온기로 나와 꼭 맞는 인연을 찾아요.
          </p>
        </div>

        {/* 1. 닉네임 & 기본 정보 */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[14.5px] font-bold text-[#333D4B]">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="상대방에게 불릴 닉네임을 입력해 주세요"
              className="w-full px-4 h-14 rounded-2xl bg-[#F2F4F6] border border-transparent text-[16px] font-bold text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all"
              maxLength={10}
            />
            <div className="flex justify-between text-[12.5px] text-[#8B95A1] px-1 font-medium">
              <span>한글/영문 2~10자</span>
              <span>{nickname.length}/10자</span>
            </div>
          </div>

          {/* 성별 및 출생년도 선택 (TDS Segmented Control & TDS Select Component) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[14.5px] font-bold text-[#333D4B]">성별</label>
              <div className="flex bg-[#F2F4F6] p-1 rounded-2xl h-14 items-center">
                {(["여성", "남성"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setGender(item)}
                    className={`flex-1 h-full rounded-xl text-[14.5px] font-bold transition-all cursor-pointer ${
                      gender === item
                        ? "bg-[#3182F6] text-white shadow-xs"
                        : "text-[#6B7684] hover:text-[#333D4B]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[14.5px] font-bold text-[#333D4B]">출생년도</label>
                <span className="text-[12px] font-bold text-[#3182F6] bg-[#E8F3FF] px-2 py-0.5 rounded-full">
                  {calculatedAge}세
                </span>
              </div>
              <div className="relative">
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value))}
                  className="w-full h-14 pl-4 pr-10 rounded-2xl bg-[#F2F4F6] border border-transparent text-[15px] font-bold text-[#191F28] appearance-none focus:outline-none focus:border-[#3182F6] focus:bg-white transition-all cursor-pointer"
                >
                  {birthYearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}년생 ({currentYear - year}세)
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-[#8B95A1] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 2. 손등 사진 등록 & Google AI 실시간 분석 영역 */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-[14.5px] font-bold text-[#333D4B] flex items-center gap-1.5">
                <Hand className="w-4 h-4 text-[#3182F6]" />
                <span>내 손등 사진 등록</span>
              </label>
              <span className="text-[12px] text-[#3182F6] font-bold flex items-center gap-1 bg-[#E8F3FF] px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Google AI 검증
              </span>
            </div>

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
              <div className="w-full rounded-3xl bg-gradient-to-b from-[#FBFDFF] to-[#F2F6FC] p-5 border border-[#E2ECF8] shadow-xs flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#3182F6] mb-2.5 animate-flutter-pulse border border-[#E8F0FE]">
                  <Camera className="w-7 h-7" />
                </div>
                <h3 className="text-[16px] font-bold text-[#191F28]">
                  두근거리는 첫인상, 손등 촬영하기
                </h3>
                <p className="text-[13px] text-[#6B7684] mt-1 font-medium leading-relaxed">
                  손등의 선과 따뜻한 온도로 나만의 감성을 전해보세요
                </p>

                {/* 실제 촬영 버튼 */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 w-full h-12 rounded-xl bg-[#3182F6] hover:bg-[#1B64DA] text-white font-bold text-[14.5px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <Camera className="w-4.5 h-4.5" />
                  <span>손등 사진 촬영 / 앨범 선택</span>
                </button>
              </div>
            )}

            {/* 상태 2: Google AI 실시간 분석 중 (analyzing) */}
            {handPhotoStatus === "analyzing" && (
              <div className="w-full rounded-3xl bg-[#0F172A] p-4 text-white relative overflow-hidden shadow-md border border-blue-500/30">
                {/* 사진 프리뷰 + 레이저 스캔 빔 */}
                <div className="relative w-full h-[180px] rounded-2xl overflow-hidden bg-black/50 flex items-center justify-center">
                  <img
                    src={photoUrl}
                    alt="분석 중인 손등 사진"
                    className="w-full h-full object-cover opacity-60 filter blur-[0.3px]"
                  />

                  {/* 레이저 스캔 라인 */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent shadow-[0_0_16px_#3B82F6] animate-laser-scan pointer-events-none" />

                  {/* 프레임 브라켓 */}
                  <div className="absolute inset-5 border border-blue-400/40 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                    <div className="flex justify-between text-[10px] text-blue-300 font-mono">
                      <span>SCAN: ACTIVE</span>
                      <span>AI: GEMINI</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-blue-300 font-mono">
                      <span>WARMTH: DETECTING</span>
                      <span>FACE: FILTERED</span>
                    </div>
                  </div>

                  {/* 센터 스피너 & 문구 */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 backdrop-blur-[1px]">
                    <div className="w-11 h-11 rounded-full bg-blue-500/20 backdrop-blur-md flex items-center justify-center border border-blue-400/40 mb-2">
                      <RefreshCw className="w-5 h-5 text-[#60A5FA] animate-spin" />
                    </div>
                    <p className="text-[14px] font-bold text-white tracking-tight drop-shadow-sm">
                      Google AI 실시간 온기 분석 중
                    </p>
                  </div>
                </div>

                {/* 3단계 진행 상태 인디케이터 */}
                <div className="mt-3.5 space-y-1.5 px-1">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-1.5 text-blue-200 font-medium">
                      <span className={`w-1.5 h-1.5 rounded-full ${analysisStep >= 1 ? "bg-blue-400" : "bg-slate-600"}`} />
                      손등 윤곽 및 피부결 감지
                    </span>
                    <span className="text-[11px] text-blue-300 font-mono">{analysisStep >= 1 ? "OK" : "READY"}</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-1.5 text-blue-200 font-medium">
                      <span className={`w-1.5 h-1.5 rounded-full ${analysisStep >= 2 ? "bg-blue-400 animate-ping" : "bg-slate-600"}`} />
                      Google AI 손등 판별 분석
                    </span>
                    <span className="text-[11px] text-blue-300 font-mono">{analysisStep >= 2 ? "ANALYZING" : "WAIT"}</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-1.5 text-blue-200 font-medium">
                      <span className={`w-1.5 h-1.5 rounded-full ${analysisStep >= 3 ? "bg-emerald-400" : "bg-slate-600"}`} />
                      얼굴 비노출 및 프라이버시 안심 확인
                    </span>
                    <span className="text-[11px] text-blue-300 font-mono">{analysisStep >= 3 ? "PASS" : "WAIT"}</span>
                  </div>
                </div>

                <p className="text-center text-[12.5px] text-blue-300 font-medium mt-3 pt-2.5 border-t border-slate-800">
                  인연에게 닿을 당신만의 손등 온도를 확인하고 있어요 ✨
                </p>
              </div>
            )}

            {/* 상태 3: 손등 사진이 아닌 경우 (error) - 재촬영 유도 */}
            {handPhotoStatus === "error" && (
              <div className="w-full rounded-3xl bg-[#FFF8F8] border border-[#FFD0D4] p-5 shadow-xs flex flex-col gap-3">
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

            {/* 상태 4: 손등 사진 확인 완료 (success) - 프로필 이미지 사이즈 표시 */}
            {handPhotoStatus === "success" && (
              <div className="w-full rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] p-4.5 sm:p-5 shadow-xs flex flex-col gap-3.5">
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

                  {/* 프로필 정보 및 온기 설명 */}
                  <div className="flex flex-col justify-center gap-1 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[16px] font-black text-[#191F28] tracking-tight">
                        {nickname} 님의 손등
                      </span>
                      <Heart className="w-4 h-4 text-[#FF6F61] fill-[#FF6F61]" />
                    </div>
                    <p className="text-[13px] font-bold text-[#3182F6]">
                      {handDescription}
                    </p>
                    <p className="text-[12px] text-[#6B7684] leading-snug font-medium">
                      따뜻한 온기로 상대방에게 매력적인 첫인상으로 전달돼요.
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
        </div>

        {/* 프라이버시 안심 노트 */}
        <div className="mt-6 flex items-start gap-2.5 text-[13px] text-[#6B7684] font-medium px-1">
          <Lock className="w-4 h-4 text-[#00B368] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            얼굴이나 배경은 자동으로 가려지며, <strong className="text-[#333D4B]">지인에게는 절대 프로필이 노출되지 않아요.</strong>
          </p>
        </div>
      </div>

      {/* 하단 CTA (56px 토스 표준 버튼) */}
      <div className="pb-6 pt-4">
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
      </div>
    </div>
  );
}
