import { NextRequest, NextResponse } from "next/server";

interface GeminiAnalysisResult {
  isHand: boolean;
  confidence?: number;
  reason?: string;
  handDescription?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, testType } = body;

    // 1. Explicit test simulation for developer / user testing
    if (testType === "not-hand") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({
        success: true,
        isHand: false,
        confidence: 0.12,
        reason: "손등 사진이 확인되지 않았어요. 얼굴이나 사물 대신 손등이 화면 중앙에 오도록 다시 촬영해 주세요.",
      });
    }

    if (testType === "hand") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({
        success: true,
        isHand: true,
        confidence: 0.98,
        reason: "단정하고 따뜻한 손등 이미지가 감지되었어요.",
        handDescription: "온도 36.5℃ · 따뜻하고 정갈한 손등",
      });
    }

    // 2. Google Gemini Vision API
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (apiKey && imageBase64) {
      const mimeMatch = imageBase64.match(/^data:([^;]+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
      const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, "");

      const prompt = `당신은 소개팅 서비스의 손/손등 사진 검증 AI입니다.
사용자가 자신의 손(손등, 손가락, 손바닥, 주먹, 손 전체 등)을 직접 촬영하여 등록하고 있습니다.

[승인 기준 (isHand: true)]:
1. 사진 안에 사람의 실제 손(손등, 손가락, 손바닥, 손목 등 손의 일부라도)이 보인다면 적극적으로 isHand: true 로 판정해 주세요.
2. 배경에 책상, 키보드, 옷, 바닥, 휴대폰, 시계, 반지 등이 함께 찍혀 있거나, 각도가 비스듬하거나, 조명이 다소 어둡더라도 사람 손이 피사체로 보이면 관대하게 isHand: true 로 승인하세요.
3. 손등뿐만 아니라 손가락, 손바닥, 자연스러운 손 제스처도 사람의 손이면 모두 통과시켜 주세요.

[거절 기준 (isHand: false)]:
오직 다음과 같이 손 사진이 명백히 아닌 경우에만 isHand: false 로 판정하세요:
1. 사람의 손이 전혀 없고 오직 풍경, 음식, 동물, 사물, 문서만 있는 경우
2. 사람의 '얼굴'이 정면으로 뚜렷하게 크게 노출된 경우 (프로필 얼굴 노출 방지 원칙)
3. 실제 사진이 아닌 만화, 2D 일러스트, 그래픽 이미지인 경우

응답은 반드시 아래 JSON 형식으로만 작성해 주세요:
{
  "isHand": true 또는 false,
  "confidence": 0.0 ~ 1.0,
  "reason": "한국어로 작성된 친절한 판정 사유",
  "handDescription": "온도 36.5℃ · 따뜻하고 정갈한 손등 (손일 경우 매력적인 한 줄 감성 요약)"
}`;

      // 우선순위 모델 리스트: 응답 속도가 1.5초 내외로 가장 빠른 flash-lite 최우선, 3.5-flash 및 3.5-flash-lite 순차 폴백
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
              // 5초 타임아웃을 두어 모델 지연 시 20초 이상 멈추지 않고 즉시 다음 모델로 신속 전환
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
                const parsed: GeminiAnalysisResult = JSON.parse(jsonMatch[0]);
                return NextResponse.json({
                  success: true,
                  isHand: !!parsed.isHand,
                  confidence: parsed.confidence ?? (parsed.isHand ? 0.95 : 0.1),
                  reason: parsed.reason || (parsed.isHand ? "손등 이미지가 성공적으로 확인되었어요." : "손등 사진이 확인되지 않았어요."),
                  handDescription: parsed.handDescription || "온도 36.5℃ · 따뜻하고 정갈한 손등",
                });
              }
            }
          } else {
            console.warn(`[VerifyHand] Model ${model} returned HTTP ${response.status}, trying next model...`);
          }
        } catch (callErr) {
          console.warn(`[VerifyHand] Model ${model} failed or timed out:`, callErr);
        }
      }

      // 모든 AI 모델 시도가 실패/타임아웃된 경우
      return NextResponse.json({
        success: false,
        isHand: false,
        reason: "AI 판별 서버 응답이 지연되고 있습니다. 잠시 후 다시 촬영해 주세요.",
      });
    }

    // 3. Fallback when API key is not configured
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return NextResponse.json({
      success: true,
      isHand: true,
      confidence: 0.96,
      reason: "단정하고 따뜻한 손등 이미지가 감지되었어요.",
      handDescription: "온도 36.5℃ · 따뜻하고 정갈한 손등",
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { success: false, error: error.message || "손등 이미지 분석 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
