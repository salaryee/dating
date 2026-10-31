"use client";

export const dynamic = "force-dynamic";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Camera,
  Sparkles,
  RefreshCw,
  Check,
  PenTool,
  AlertCircle,
  RotateCcw,
  Coffee,
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
    <div className="flex flex-col h-[100dvh] max-h-[100dvh] bg-white justify-between px-5 py-3.5 sm:px-7 sm:py-5 w-full max-w-lg mx-auto overflow-hidden select-none">
      {/* ================= 상단 헤더 & 타이포그래피 ================= */}
      <div className="shrink-0">
        {/* 프로그레스 바 & 단계 표시 */}
        <div>
          <div className="h-1 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#3182F6] rounded-full w-5/6 transition-all duration-300"></div>
          </div>
          <div className="flex items-center justify-between mt-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF5ED] text-[#FF6F61] text-[11.5px] font-bold border border-[#FFE2D6]">
              <Coffee className="w-3 h-3" />
              <span>첫인사 손글씨 엽서</span>
            </div>
            <span className="text-[11.5px] font-bold text-[#3182F6] bg-[#E8F3FF] px-2.5 py-0.5 rounded-full">
              5 / 6 단계
            </span>
          </div>
        </div>

        {/* 메인 질문 & 서브 텍스트 */}
        <div className="mt-3">
          <h1 className="text-[20px] sm:text-[22px] font-black text-[#191F28] tracking-tight leading-[1.3] break-keep">
            &ldquo;제가 퇴근 후 마주 앉아<br />
            커피 한잔하고 싶은 분은...&rdquo;
          </h1>
          <p className="text-[13px] text-[#6B7684] mt-1.5 leading-relaxed font-medium break-keep">
            정성스러운 손글씨 한 줄이 누군가에게는 가장 설레는 첫인사가 됩니다. 좋아하는 펜과 작은 종이를 꺼내볼까요?
          </p>
        </div>
      </div>

      {/* ================= 중앙 메인 엽서 카드 영역 ================= */}
      <div className="flex-1 flex flex-col justify-center my-auto py-2">
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
          <div className="w-full rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FFFBF4] to-[#FFF7EC] p-5 border border-[#EEDBBA] shadow-[0_4px_24px_rgba(238,219,186,0.3)] flex flex-col justify-between relative overflow-hidden">
            {/* 상단 엽서 장식 헤더 */}
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-[#E5D7BF]">
              <div className="flex items-center gap-1.5 text-amber-900 text-[12.5px] font-serif font-semibold">
                <PenTool className="w-3.5 h-3.5 text-amber-600" />
                <span>나만의 첫인사 엽서</span>
              </div>
              <span className="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded border border-dashed border-[#D4C3A3] text-[#9E8256] bg-amber-50/60 font-bold">
                POSTCARD ☕
              </span>
            </div>

            {/* 감성 손글씨 메모 영역 */}
            <div className="my-4 py-3 px-3.5 rounded-2xl bg-white/80 border border-[#F3E7D3] shadow-xs flex flex-col gap-1.5">
              <p className="text-[11px] font-bold text-[#A08040] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>이런 마음을 적어보면 좋아요</span>
              </p>
              <p className="text-[14px] sm:text-[14.5px] text-[#2C2416] font-serif italic leading-relaxed">
                &ldquo;사소한 이야기에도 잘 웃어주는 다정한 사람&rdquo;
              </p>
            </div>

            {/* 촬영 안내 & 버튼 */}
            <p className="text-center text-[12.5px] text-[#8C7654] font-medium mb-3">
              종이에 적은 글씨를 카메라로 담아주세요
            </p>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-12 rounded-2xl bg-[#3182F6] hover:bg-[#1B64DA] text-white font-bold text-[14.5px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Camera className="w-4.5 h-4.5" />
              <span>손글씨 사진 촬영</span>
            </button>
          </div>
        )}

        {/* ================= 상태 2: Google AI 분석 중 (analyzing) ================= */}
        {noteStatus === "analyzing" && (
          <div className="w-full rounded-3xl bg-[#0F172A] p-4 text-white relative overflow-hidden shadow-lg border border-blue-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3182F6] animate-ping" />
                <span className="text-[12.5px] font-bold text-blue-200">
                  Google AI 손글씨 확인 중
                </span>
              </div>
              <span className="text-[13px] font-mono font-black text-[#60A5FA]">
                {Math.min(100, Math.round(analysisProgress))}%
              </span>
            </div>

            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-[#3182F6] via-[#60A5FA] to-[#00D084] transition-all duration-100 ease-out rounded-full shadow-[0_0_8px_#3B82F6]"
                style={{ width: `${Math.min(100, analysisProgress)}%` }}
              />
            </div>

            {/* 뷰파인더 스캔 영역 */}
            <div className="relative w-full h-[140px] rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center border border-slate-800">
              <img
                src={photoUrl}
                alt="분석 중인 손글씨 사진"
                className="w-full h-full object-cover opacity-60 filter blur-[0.3px]"
              />
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent shadow-[0_0_16px_#3B82F6] animate-laser-scan pointer-events-none" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px]">
                <RefreshCw className="w-5 h-5 text-[#60A5FA] animate-spin mb-1.5" />
                <p className="text-[13.5px] font-bold text-white tracking-tight drop-shadow-sm">
                  {analysisProgress < 50
                    ? "종이 위 손글씨를 스캔하고 있어요..."
                    : "소중한 첫인사 엽서를 담고 있어요..."}
                </p>
              </div>
            </div>

            <p className="text-center text-[11.5px] text-blue-300 font-medium mt-2.5">
              인연에게 닿을 당신만의 온기 어린 필체를 담고 있어요 ✨
            </p>
          </div>
        )}

        {/* ================= 상태 3: 재촬영 유도 (error) ================= */}
        {noteStatus === "error" && (
          <div className="w-full rounded-3xl bg-[#FFF8F8] border border-[#FFD0D4] p-4 shadow-xs flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFE8E8] flex items-center justify-center text-[#F04452] shrink-0 mt-0.5">
                <AlertCircle className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1">
                <h3 className="text-[14.5px] font-bold text-[#D62828]">
                  손글씨가 확인되지 않았어요
                </h3>
                <p className="text-[12px] text-[#4E5968] mt-0.5 leading-relaxed font-medium break-keep">
                  {errorMessage}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-11 rounded-xl bg-[#3182F6] hover:bg-[#1B64DA] text-white font-bold text-[14px] shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
            >
              <Camera className="w-4 h-4" />
              <span>손글씨 다시 촬영하기</span>
            </button>
          </div>
        )}

        {/* ================= 상태 4: 손글씨 승인 완료 (success) ================= */}
        {noteStatus === "success" && (
          <div className="w-full rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FFF8EE] border border-[#EEDBBA] p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#8F6B00] bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/50">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>첫인사 엽서 등록 완료</span>
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[12px] text-[#8B95A1] hover:text-[#191F28] font-bold flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>다시 찍기</span>
              </button>
            </div>

            <div className="relative w-full h-[140px] rounded-2xl overflow-hidden bg-white border border-[#EEDBBA] shadow-xs flex items-center justify-center">
              <img
                src={photoUrl}
                alt="등록된 자필 손글씨 엽서"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm border border-emerald-400 flex items-center gap-1 text-[11px] text-[#00B368] font-bold shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>자필 인증 완료</span>
              </div>
            </div>

            {extractedText && (
              <div className="p-2.5 rounded-xl bg-white/80 border border-[#F5E8D0] text-center">
                <p className="text-[13.5px] font-serif italic text-[#191F28] leading-snug">
                  &ldquo;{extractedText}&rdquo;
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= 하단 CTA 버튼 ================= */}
      <div className="shrink-0 pt-2 pb-3 sm:pb-4">
        <Link
          href={isFormValid ? "/auth/verify-work" : "#"}
          className={`w-full h-13 rounded-2xl font-bold text-[15.5px] transition-all flex items-center justify-center ${
            isFormValid
              ? "bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-lg shadow-blue-500/25 active:scale-[0.98]"
              : "bg-[#E5E8EB] text-[#8B95A1] cursor-not-allowed pointer-events-none"
          }`}
        >
          다음 (회사 인증)
        </Link>
      </div>
    </div>
  );
}
