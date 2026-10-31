import { NextRequest, NextResponse } from "next/server";

interface GeminiNoteAnalysisResult {
  isHandwrittenNote: boolean;
  isAppropriate: boolean;
  extractedText?: string;
  reason?: string;
  noteDescription?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, testType } = body;

    // 1. 개발 및 테스트용 모의 응답 시뮬레이션
    if (testType === "invalid-note") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({
        success: true,
        isValid: false,
        reason: "종이 위에 작성된 손글씨가 확인되지 않았어요. 작은 종이에 펜으로 한 줄을 적어 다시 촬영해 주세요.",
      });
    }

    if (testType === "inappropriate") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({
        success: true,
        isValid: false,
        reason: "상대방에게 거부감을 줄 수 있는 표현이 감지되었어요. 따뜻하고 진솔한 첫인사로 다시 작성해 주세요.",
      });
    }

    if (testType === "valid-note") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({
        success: true,
        isValid: true,
        extractedText: "퇴근 후 소소한 하루를 편안하게 나누고 싶어요.",
        noteDescription: "정갈하고 따뜻한 손글씨 엽서",
      });
    }

    // 2. Google Gemini Vision API 호출
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (apiKey && imageBase64) {
      const mimeMatch = imageBase64.match(/^data:([^;]+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
      const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, "");

      const prompt = `당신은 프리미엄 직장인 소개팅 서비스의 '자필 손글씨 첫인사 엽서' 검증 AI입니다.
사용자가 질문("제가 퇴근 후 마주 앉아 커피 한잔하고 싶은 분은...")에 대해 작은 종이나 메모지에 직접 손으로 쓴 한 줄 손글씨 사진을 등록하고 있습니다.

[승인 기준 (isValid: true)]:
1. 종이(노트, 메모지, 엽서, 다이어리, 영수증 뒷면 등) 위에 펜이나 연필로 사람이 직접 쓴 '손글씨(한글 등)'가 시각적으로 인식되는 경우.
2. 글씨가 약간 삐뚤빼뚤하거나, 배경에 책상, 손가락, 펜이 함께 찍혀 있어도 종이 위 손글씨가 읽히면 관대하게 승인하세요.
3. 내용이 일상적이거나, 퇴근 후 커피, 가치관, 첫인사, 대화 등 긍정적이고 건전한 내용인 경우.

[거절 기준 (isValid: false)]:
다음 중 하나라도 해당하면 반드시 isValid: false 로 판정하세요:
1. [손글씨 부재]: 종이나 손글씨가 전혀 없고 풍경, 사람 얼굴, 사물, 음식, 빈 종이, 컴퓨터 모니터 폰트 인쇄물인 경우.
   - reason 예시: "종이 위에 작성된 손글씨가 확인되지 않았어요. 좋아하는 펜으로 종이에 한 줄을 적어 다시 촬영해 주세요."
2. [부적절한 내용 / 거부감 유발]: 작성된 문구에 욕설, 비속어, 성희롱 및 성적인 뉘앙스, 폭력적 표현, 금전 요구, 연락처(전화번호/카톡ID 등 직거래 유도), 상대방에게 불쾌감/혐오감을 주는 문구가 포함된 경우.
   - reason 예시: "상대방에게 거부감을 줄 수 있는 문구가 포함되어 있어요. 진솔하고 따뜻한 첫인사로 다시 적어볼까요?"

응답은 반드시 아래 JSON 형식으로만 작성해 주세요:
{
  "isHandwrittenNote": boolean,
  "isAppropriate": boolean,
  "isValid": boolean (isHandwrittenNote와 isAppropriate가 둘 다 true일 때만 true),
  "extractedText": "인식된 손글씨 문구 (최대한 원문 그대로 한국어로 복원)",
  "reason": "거절 시 사용자에게 부드럽고 친절하게 재작성을 유도하는 한국어 문장 (승인 시 빈 문자열 또는 격려 문구)",
  "noteDescription": "정갈하고 따뜻한 손글씨 엽서 (승인 시 매력적인 한 줄 요약)"
}`;

      const candidateModels = [
        "models/gemini-flash-lite-latest",
        "models/gemini-3.5-flash",
        "models/gemini-3.5-flash-lite",
        "models/gemini-flash-latest",
      ];

      for (const model of candidateModels) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      { text: prompt },
                      {
                        inlineData: {
                          mimeType,
                          data: cleanBase64,
                        },
                      },
                    ],
                  },
                ],
                generationConfig: {
                  temperature: 0.1,
                  maxOutputTokens: 250,
                },
              }),
              signal: AbortSignal.timeout(5000),
            }
          );

          if (response.ok) {
            const result = await response.json();
            const parts = result?.candidates?.[0]?.content?.parts;
            const textPart = Array.isArray(parts) ? parts.find((p: { text?: string }) => p.text) : null;
            const text = textPart?.text;
            if (text) {
              const jsonMatch = text.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                const isValid = Boolean(
                  parsed.isValid ?? (parsed.isHandwrittenNote && parsed.isAppropriate)
                );
                return NextResponse.json({
                  success: true,
                  isValid,
                  isHandwrittenNote: !!parsed.isHandwrittenNote,
                  isAppropriate: !!parsed.isAppropriate,
                  extractedText: parsed.extractedText || "",
                  reason:
                    parsed.reason ||
                    (isValid
                      ? "정성스러운 손글씨가 성공적으로 확인되었어요."
                      : "종이 위에 작성된 정갈한 손글씨로 다시 촬영해 주세요."),
                  noteDescription: parsed.noteDescription || "정갈하고 따뜻한 손글씨 엽서",
                });
              }
            }
          } else {
            console.warn(`[VerifyNote] Model ${model} returned HTTP ${response.status}, trying next model...`);
          }
        } catch (callErr) {
          console.warn(`[VerifyNote] Model ${model} failed or timed out:`, callErr);
        }
      }

      // 모든 모델 시도 실패/타임아웃 시
      return NextResponse.json({
        success: false,
        isValid: false,
        reason: "AI 분석 서버 응답이 지연되고 있습니다. 잠시 후 다시 촬영해 주세요.",
      });
    }

    // 3. API 키 미설정 시 Fallback
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({
      success: true,
      isValid: true,
      extractedText: "퇴근 후 맛있는 커피와 함께 소소한 일상을 나누고 싶어요.",
      noteDescription: "정갈하고 따뜻한 손글씨 엽서",
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { success: false, error: error.message || "손글씨 엽서 분석 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
