"use client";

export const dynamic = "force-dynamic";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Camera,
  Sparkles,
  RefreshCw,
  Check,
  CheckCircle2,
  Lock,
  PenTool,
  Heart,
  AlertCircle,
  RotateCcw,
  Coffee,
  ShieldCheck,
} from "lucide-react";

export default function ProfileNotePage() {
  const [noteStatus, setNoteStatus] = useState<"empty" | "analyzing" | "error" | "success">("empty");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 모바일 고화질 사진을 웹/AI 최적화 1024px JPEG로 압축 (Vercel 4.5MB 제한 및 속도 저하 방지)
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
      await startNoteAnalysis(optimizedBase64);
    } catch {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        setPhotoUrl(base64);
        await startNoteAnalysis(base64);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  // Google Gemini Flash AI 손글씨 엽서 분석 프로세스
  const startNoteAnalysis = async (imageBase64: string) => {
    setNoteStatus("analyzing");
    setAnalysisProgress(12);

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev < 40) return prev + 3; // 1단계: 종이 및 필체 감지 (0~40%)
        if (prev < 80) return prev + 2; // 2단계: AI 문구 인식 & 클린 검증 (40~80%)
        if (prev < 94) return prev + 0.6; // 3단계: 첫인사 엽서 완성 (80~94%)
        return prev;
      });
    }, 45);

    try {
      const res = await fetch("/api/verify-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64 }),
        signal: AbortSignal.timeout(12000),
      });

      if (!res.ok) {
        throw new Error(`서버 응답 오류 (${res.status})`);
      }

      const data = await res.json();
      clearInterval(progressInterval);

      setAnalysisProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 200));

      if (data.isValid) {
        setExtractedText(
          data.extractedText || "퇴근 후 따뜻한 차 한잔과 함께 소소한 이야기를 나누고 싶어요."
        );
        setNoteStatus("success");
      } else {
        setErrorMessage(
          data.reason ||
            "종이 위에 작성된 정갈한 손글씨가 확인되지 않았어요. 좋아하는 펜으로 종이에 한 줄을 적어 다시 촬영해 주세요."
        );
        setNoteStatus("error");
      }
    } catch (err: unknown) {
      clearInterval(progressInterval);
      const error = err as Error;
      if (error.name === "AbortError" || error.name === "TimeoutError") {
        setErrorMessage("AI 분석 응답 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.");
      } else {
        setErrorMessage(error.message || "이미지 분석 중 일시적인 오류가 발생했어요. 다시 촬영해 주세요.");
      }
      setNoteStatus("error");
    }
  };

  const isFormValid = noteStatus === "success";

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

        {/* 메인 질문 (시선 집중) & 서브 텍스트 */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5ED] text-[#FF6F61] text-[12.5px] font-bold mb-3 border border-[#FFE2D6]">
            <Coffee className="w-3.5 h-3.5" />
            <span>첫인사 손글씨 엽서</span>
          </div>

          {/* 메인 질문 (화면 상단에 가장 크고 또렷한 타이포그래피) */}
          <h1 className="text-[23px] sm:text-[25px] font-black text-[#191F28] tracking-tight leading-[1.35] break-keep">
            &ldquo;제가 퇴근 후 마주 앉아<br />
            커피 한잔하고 싶은 분은...&rdquo;
          </h1>

          {/* 서브 텍스트 (부드러운 톤) */}
          <p className="text-[14px] text-[#6B7684] mt-3 leading-relaxed font-medium break-keep">
            정성스러운 손글씨 한 줄이 누군가에게는 가장 설레는 첫인사가 됩니다. 좋아하는 펜과 작은 종이를 꺼내볼까요?
          </p>
        </div>

        {/* 손글씨 촬영 및 AI 검증 메인 영역 */}
        <div className="mt-7 flex flex-col gap-3">
          {/* 숨겨진 실제 카메라/파일 인풋 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* ================= 상태 1: 촬영 전 (empty) ================= */}
          {noteStatus === "empty" && (
            <div className="w-full rounded-3xl bg-gradient-to-b from-[#FFFDF8] via-[#FFFBF2] to-[#FFF6E9] p-6 border-2 border-[#F5E8D0] shadow-sm flex flex-col items-center text-center relative overflow-hidden">
              {/* 장식용 종이 라인 패턴 */}
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center text-amber-600 mb-3.5 border border-[#F5E8D0] animate-flutter-pulse">
                <PenTool className="w-7 h-7" />
              </div>

              <h3 className="text-[17px] font-black text-[#191F28] tracking-tight">
                종이에 적은 손글씨 한 줄 담기
              </h3>
              <p className="text-[13.5px] text-[#7C6A46] mt-1.5 font-medium leading-relaxed break-keep px-2">
                포스트잇, 메모지, 다이어리 어디든 좋아요.<br />
                질문에 이어질 나의 생각을 직접 손으로 적어주세요.
              </p>

              {/* 예시 문구 힌트 박스 */}
              <div className="mt-4 w-full bg-white/80 rounded-2xl p-3.5 border border-[#EEDBBA] text-left text-[12.5px] text-[#6B7684] space-y-1">
                <p className="font-bold text-[#8F6B00] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>이런 마음을 적어보면 좋아요</span>
                </p>
                <p className="text-[#333D4B] font-serif italic">
                  • &ldquo;사소한 이야기에도 잘 웃어주는 다정한 사람&rdquo;
                </p>
                <p className="text-[#333D4B] font-serif italic">
                  • &ldquo;오늘 하루도 수고했다고 서로 토닥여줄 수 있는 분&rdquo;
                </p>
              </div>

              {/* 실제 촬영 버튼 */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-5 w-full h-13 rounded-2xl bg-[#3182F6] hover:bg-[#1B64DA] text-white font-bold text-[15px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Camera className="w-5 h-5" />
                <span>손글씨 사진 촬영</span>
              </button>

              <div className="mt-3.5 flex items-center gap-1.5 text-[12px] text-[#8B95A1] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#00B368]" />
                <span>Gemini AI가 손글씨 인식 및 비속어 클린 검증을 수행해요</span>
              </div>
            </div>
          )}

          {/* ================= 상태 2: Google AI 분석 중 (analyzing) ================= */}
          {noteStatus === "analyzing" && (
            <div className="w-full rounded-3xl bg-[#0F172A] p-5 text-white relative overflow-hidden shadow-lg border border-blue-500/30">
              {/* 상단 실시간 프로그레스 헤더 */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#3182F6] animate-ping" />
                  <span className="text-[13px] font-bold text-blue-200">
                    Google AI 손글씨 엽서 분석
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
                  alt="분석 중인 손글씨 사진"
                  className="w-full h-full object-cover opacity-60 filter blur-[0.3px]"
                />

                {/* 레이저 스캔 라인 */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent shadow-[0_0_16px_#3B82F6] animate-laser-scan pointer-events-none" />

                {/* 뷰파인더 브라켓 */}
                <div className="absolute inset-4 border border-blue-400/40 rounded-xl pointer-events-none flex flex-col justify-between p-2.5">
                  <div className="flex justify-between text-[10px] text-blue-300 font-mono">
                    <span>SCAN: HANDWRITING</span>
                    <span>AI: GEMINI FLASH</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-blue-300 font-mono">
                    <span>CLEAN: VERIFYING</span>
                    <span>SAFE: ACTIVE</span>
                  </div>
                </div>

                {/* 센터 스피너 & 실시간 단계 안내 문구 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px]">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 backdrop-blur-md flex items-center justify-center border border-blue-400/40 mb-2 shadow-xs">
                    <RefreshCw className="w-5 h-5 text-[#60A5FA] animate-spin" />
                  </div>
                  <p className="text-[14.5px] font-bold text-white tracking-tight drop-shadow-sm">
                    {analysisProgress < 40
                      ? "종이 및 손글씨 필체 스캔 중..."
                      : analysisProgress < 80
                      ? "Gemini AI 문구 판독 및 안심 검증 중..."
                      : "소중한 첫인사 엽서 등록 준비 중..."}
                  </p>
                  <span className="text-[11.5px] text-blue-300/90 mt-0.5 font-medium">
                    약 1~2초 내에 분석이 완료돼요
                  </span>
                </div>
              </div>

              {/* 3단계 진행 상태 리스트 */}
              <div className="mt-4 space-y-2.5 px-1">
                {/* 1단계 */}
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-2 text-slate-200 font-medium">
                    {analysisProgress >= 40 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-blue-400 flex items-center justify-center text-[10px] text-blue-300 font-bold shrink-0">
                        1
                      </span>
                    )}
                    <span>종이 질감 및 손글씨 필체 감지</span>
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      analysisProgress >= 40
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                        : "bg-blue-950/60 text-blue-300 border border-blue-500/30 animate-pulse"
                    }`}
                  >
                    {analysisProgress >= 40 ? "완료" : "스캔 중"}
                  </span>
                </div>

                {/* 2단계 */}
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-2 text-slate-200 font-medium">
                    {analysisProgress >= 80 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : analysisProgress >= 40 ? (
                      <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 animate-pulse">
                        2
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-600 text-slate-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                        2
                      </span>
                    )}
                    <span>비속어·거부감 유발 표현 필터링</span>
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      analysisProgress >= 80
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                        : analysisProgress >= 40
                        ? "bg-blue-950/60 text-blue-300 border border-blue-500/30 animate-pulse"
                        : "text-slate-500"
                    }`}
                  >
                    {analysisProgress >= 80 ? "완료" : analysisProgress >= 40 ? "검증 중" : "대기"}
                  </span>
                </div>

                {/* 3단계 */}
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-2 text-slate-200 font-medium">
                    {analysisProgress >= 100 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : analysisProgress >= 80 ? (
                      <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 animate-pulse">
                        3
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-600 text-slate-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                        3
                      </span>
                    )}
                    <span>설레는 첫인사 엽서 등록 준비</span>
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      analysisProgress >= 100
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                        : analysisProgress >= 80
                        ? "bg-blue-950/60 text-blue-300 border border-blue-500/30 animate-pulse"
                        : "text-slate-500"
                    }`}
                  >
                    {analysisProgress >= 100 ? "완료" : analysisProgress >= 80 ? "준비 중" : "대기"}
                  </span>
                </div>
              </div>

              <p className="text-center text-[12.5px] text-blue-300 font-medium mt-4 pt-2.5 border-t border-slate-800">
                인연에게 닿을 당신만의 온기 어린 필체를 담고 있어요 ✨
              </p>
            </div>
          )}

          {/* ================= 상태 3: 재촬영 유도 (error) ================= */}
          {noteStatus === "error" && (
            <div className="w-full rounded-3xl bg-[#FFF8F8] border border-[#FFD0D4] p-5 shadow-xs flex flex-col gap-3.5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFE8E8] flex items-center justify-center text-[#F04452] shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[15.5px] font-bold text-[#D62828]">
                    손글씨 엽서가 확인되지 않았어요
                  </h3>
                  <p className="text-[13px] text-[#4E5968] mt-1 leading-relaxed font-medium break-keep">
                    {errorMessage}
                  </p>
                </div>
                {photoUrl && (
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#FFD0D4] shrink-0 bg-white">
                    <img src={photoUrl} alt="등록 시도된 사진" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="bg-white/90 rounded-2xl p-3.5 border border-[#FFE0E3] text-[12.5px] text-[#6B7684] space-y-1.5">
                <p className="font-bold text-[#333D4B] flex items-center gap-1">
                  <span>💡 이렇게 작성하고 촬영해 보세요</span>
                </p>
                <p>• 작은 종이나 메모지에 직접 펜으로 한 줄을 적어주세요</p>
                <p>• 비속어, 성적인 표현, 연락처 대신 따뜻한 인사를 남겨주세요</p>
                <p>• 글씨가 또렷하게 보이도록 밝은 곳에서 촬영해 주세요</p>
              </div>

              {/* 재촬영 액션 버튼 */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-12 rounded-xl bg-[#3182F6] hover:bg-[#1B64DA] text-white font-bold text-[14.5px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Camera className="w-4.5 h-4.5" />
                <span>손글씨 다시 촬영하기</span>
              </button>
            </div>
          )}

          {/* ================= 상태 4: 손글씨 승인 완료 (success) ================= */}
          {noteStatus === "success" && (
            <div className="w-full rounded-3xl bg-gradient-to-b from-[#FFFDF8] via-[#FFFBF2] to-[#FFF7EC] border-2 border-[#F5E8D0] p-5 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#8F6B00] bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/50">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Gemini AI 클린 손글씨 승인</span>
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[12.5px] text-[#8B95A1] hover:text-[#191F28] font-bold flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>다시 찍기</span>
                </button>
              </div>

              {/* 촬영된 실제 손글씨 사진 렌더링 */}
              <div className="relative w-full h-[170px] rounded-2xl overflow-hidden bg-white border border-[#EEDBBA] shadow-xs flex items-center justify-center">
                <img
                  src={photoUrl}
                  alt="등록된 자필 손글씨 엽서"
                  className="w-full h-full object-cover"
                />
                {/* 우측 하단 인증 뱃지 */}
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-emerald-400 flex items-center gap-1 text-[11.5px] text-[#00B368] font-bold shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>자필 손글씨 인증</span>
                </div>
              </div>

              {/* AI가 읽어낸 손글씨 문구 인용 */}
              {extractedText && (
                <div className="p-3.5 rounded-2xl bg-white/80 border border-[#F5E8D0] text-center">
                  <p className="text-[11.5px] text-[#8B95A1] font-medium mb-1">인식된 첫인사 문구</p>
                  <p className="text-[15px] font-serif italic text-[#191F28] leading-relaxed">
                    &ldquo;{extractedText}&rdquo;
                  </p>
                </div>
              )}

              {/* 하단 안심 보증 바 */}
              <div className="flex items-center justify-between text-[12px] pt-1 border-t border-[#F5E8D0]/80">
                <span className="text-[#00B368] font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 비속어 없는 정갈한 문구
                </span>
                <span className="text-[#3182F6] font-bold">엽서 등록 완료</span>
              </div>
            </div>
          )}
        </div>

        {/* 안심 보증 노트 */}
        <div className="mt-6 flex items-start gap-2.5 text-[13px] text-[#6B7684] font-medium px-1">
          <Lock className="w-4 h-4 text-[#00B368] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            등록하신 손글씨 엽서는 <strong className="text-[#333D4B]">상대방과의 1:1 매칭 카드</strong>에 따뜻한 첫인상으로 전달돼요.
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

        {/* 종이와 펜이 지금 당장 없는 직장인을 위한 건너뛰기 배려 */}
        <div className="text-center pt-1">
          <Link
            href="/auth/verify-work"
            className="text-[13px] text-[#8B95A1] hover:text-[#6B7684] font-semibold underline underline-offset-4 cursor-pointer transition-colors"
          >
            지금 펜과 종이가 없다면? 나중에 등록하기
          </Link>
        </div>
      </div>
    </div>
  );
}
