"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import MobileHeader from "@/components/layout/MobileHeader";
import {
  ArrowLeft,
  Heart,
  X,
  Sparkles,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Hand,
  FileText,
  ChevronRight,
  Clock,
  RotateCcw,
  MessageCircleHeart,
  Check,
  Train,
  Coffee,
  Briefcase,
  Lock,
  MessageSquareQuote,
  Flame,
} from "lucide-react";

// 토스 PO & 디자이너 관점: 풍부한 맥락과 라이프스타일 가치를 담은 인연 데이터
const TODAY_RECOMMENDATIONS = [
  {
    id: "rec-1",
    name: "지민",
    age: 29,
    company: "네이버",
    department: "서비스 기획 (6년차)",
    location: "판교 그린팩토리",
    matchInsight: "민지님과 출퇴근 시간(09:30)과 주말 취향이 92% 닮았어요",
    commute: "09:30 출근 · 판교역 신분당선",
    mbti: "ENFP",
    lifestyle: "비흡연 · 가끔 와인 한잔",
    routine: "퇴근 후 탄천 40분 러닝 · 주말엔 독립서점 탐방",
    qna: {
      question: "퇴근 후 가장 힐링되는 순간은 언제인가요?",
      answer: "복잡한 하루 일과 마치고 좋아하는 재즈 들으며 밤 산책할 때 가장 편안해요.",
    },
    verificationBadge: "네이버 사내메일 재직 인증 완료",
    summaryBadge: "출퇴근·취향 92% 일치",
    handGradient: "from-[#F7EFE8] via-[#F4E8DC] to-[#EFE2D6]",
    quote: "사소한 일상을 편안하게 나누고, 서로의 성장을 조용히 응원해 줄 인연을 찾고 있어요.",
  },
  {
    id: "rec-2",
    name: "준호",
    age: 31,
    company: "토스",
    department: "데이터 엔지니어 (7년차)",
    location: "강남 테헤란로",
    matchInsight: "판교 · 강남 오피스 생활권 · 퇴근 후 커피 한잔하기 좋은 거리예요",
    commute: "10:00 출근 · 자차 (테헤란로)",
    mbti: "INTJ",
    lifestyle: "비흡연 · 술 안 마심",
    routine: "주말 아침 한강 러닝 · 테크 팟캐스트 듣기",
    qna: {
      question: "어떤 관계를 꿈꾸시나요?",
      answer: "주말에 각자 일에 몰입하다가도, 저녁엔 마주 앉아 편안하게 서로의 생각을 나눌 수 있는 관계요.",
    },
    verificationBadge: "토스 사내메일 재직 인증 완료",
    summaryBadge: "판교·강남 생활권 매칭",
    handGradient: "from-[#E8F0F8] via-[#DFECF8] to-[#D6E4F2]",
    quote: "꾸밈없는 담백한 대화 속에서 자연스러운 서로의 가치관을 알아가고 싶습니다.",
  },
];

function ChatContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as "today" | "matched" | "received" | "sent") || "today";

  const [activeTab, setActiveTab] = useState<"today" | "matched" | "received" | "sent">(initialTab);

  // 오늘의 인연 상태: 선택된 상세 프로필 및 각 인연별 결정 상태 관리
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<Record<string, "pending" | "liked" | "passed">>({
    "rec-1": "pending",
    "rec-2": "pending",
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const tabParam = searchParams.get("tab") as "today" | "matched" | "received" | "sent";
    if (tabParam && ["today", "matched", "received", "sent"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const pendingCount = TODAY_RECOMMENDATIONS.filter(
    (p) => (decisions[p.id] || "pending") === "pending"
  ).length;

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handlePass = (id: string) => {
    const profile = TODAY_RECOMMENDATIONS.find((p) => p.id === id);
    setDecisions((prev) => ({ ...prev, [id]: "passed" }));
    setSelectedProfileId(null);
    showToast(`${profile?.name || "추천"}님과의 인연은 다음에 만나기로 했어요`);
  };

  const handleLike = (id: string) => {
    const profile = TODAY_RECOMMENDATIONS.find((p) => p.id === id);
    setDecisions((prev) => ({ ...prev, [id]: "liked" }));
    setSelectedProfileId(null);
    showToast(`${profile?.name || "추천"}님에게 호감을 보냈어요. 상대방도 호감을 보내면 대화방이 열려요!`);
  };

  const handleReset = () => {
    setDecisions({
      "rec-1": "pending",
      "rec-2": "pending",
    });
    setSelectedProfileId(null);
    showToast("오늘의 인연을 다시 확인할 수 있어요");
  };

  const selectedProfile = TODAY_RECOMMENDATIONS.find((p) => p.id === selectedProfileId);

  // 매칭된 대화 목록
  const matchedRooms = [
    {
      id: "room-1",
      name: "서연",
      company: "카카오뱅크",
      job: "브랜드 마케터",
      lastMessage: "안녕하세요! 자필 글씨 내용이 너무 인상 깊어서 호감 보냈어요 😊",
      lastMessageTime: "오후 2:15",
      unreadCount: 2,
      verified: true,
      handGradient: "from-rose-100 to-pink-200",
    },
    {
      id: "room-2",
      name: "민우",
      company: "현대자동차",
      job: "R&D 연구원",
      lastMessage: "네 좋아요! 판교 근처 조용한 카페에서 뵐까요?",
      lastMessageTime: "어제",
      unreadCount: 0,
      verified: true,
      handGradient: "from-blue-100 to-sky-200",
    },
  ];

  // 내가 받은 호감 목록
  const receivedLikes = [
    {
      id: "recv-1",
      name: "수아",
      age: 28,
      company: "쿠팡",
      job: "서비스 기획자",
      mbti: "ENFP",
      receivedTime: "1시간 전",
      handwritingSummary: "퇴근 후 가볍게 러닝하고 책 읽는 걸 좋아해요 🏃",
      handGradient: "from-purple-100 to-pink-100",
    },
  ];

  // 내가 보낸 호감 목록
  const sentLikes = [
    {
      id: "sent-1",
      name: "다은",
      company: "라인플러스",
      job: "UI/UX 디자이너",
      sentTime: "어제",
      status: "pending",
    },
    {
      id: "sent-2",
      name: "유진",
      company: "LG전자",
      job: "마케팅",
      sentTime: "3일 전",
      status: "rejected",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F6]">
      <MobileHeader title="인연 · 대화" showVerifiedBadge={false} />

      {/* 토스 상단 토스트 */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="bg-[#191F28] text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3182F6] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 4대 탭 메뉴 (토스 스타일 세그먼트) */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex bg-[#E5E8EB]/80 p-1.5 rounded-2xl gap-1">
          <button
            onClick={() => {
              setActiveTab("today");
              setSelectedProfileId(null);
            }}
            className={`flex-1 py-2.5 text-[13.5px] font-bold rounded-xl transition-all relative flex items-center justify-center gap-1 ${
              activeTab === "today"
                ? "bg-white text-[#191F28] shadow-sm font-black"
                : "text-[#6B7684] hover:text-[#191F28]"
            }`}
          >
            <span>오늘의 인연</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#3182F6] text-white text-[11px] rounded-full font-black min-w-[18px] text-center">
                {pendingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("matched")}
            className={`flex-1 py-2.5 text-[13.5px] font-bold rounded-xl transition-all relative flex items-center justify-center gap-1 ${
              activeTab === "matched"
                ? "bg-white text-[#191F28] shadow-sm font-black"
                : "text-[#6B7684] hover:text-[#191F28]"
            }`}
          >
            <span>대화 중</span>
            <span className="px-1.5 py-0.2 bg-[#3182F6] text-white text-[11px] rounded-full font-black min-w-[18px] text-center">
              {matchedRooms.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("received")}
            className={`flex-1 py-2.5 text-[13.5px] font-bold rounded-xl transition-all relative flex items-center justify-center gap-1 ${
              activeTab === "received"
                ? "bg-white text-[#191F28] shadow-sm font-black"
                : "text-[#6B7684] hover:text-[#191F28]"
            }`}
          >
            <span>받은 호감</span>
            {receivedLikes.length > 0 && (
              <span className="px-1.5 py-0.2 bg-[#FF6F61] text-white text-[11px] rounded-full font-black min-w-[18px] text-center">
                {receivedLikes.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`flex-1 py-2.5 text-[13.5px] font-bold rounded-xl transition-all flex items-center justify-center ${
              activeTab === "sent"
                ? "bg-white text-[#191F28] shadow-sm font-black"
                : "text-[#6B7684] hover:text-[#191F28]"
            }`}
          >
            <span>보낸 호감</span>
          </button>
        </div>
      </div>

      {/* 탭 1: 오늘의 인연 (추천 요약 카드 및 상세 프로필 UX) */}
      {activeTab === "today" && (
        <>
          {/* A. 상세 프로필 전체 뷰 (카드를 터치했을 때 열림, 상단 고정 헤더 및 하단 고정 액션 바) */}
          {selectedProfile && (
            <div className="fixed inset-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-[60] bg-[#F2F4F6] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200">
              {/* 상단 고정 헤더 */}
              <div className="bg-white px-4 py-3.5 border-b border-[#E5E8EB] flex items-center justify-between shrink-0 shadow-2xs">
                <button
                  onClick={() => setSelectedProfileId(null)}
                  className="p-1 -ml-1 text-[#4E5968] hover:text-[#191F28] active:scale-95 transition-transform flex items-center gap-1.5 text-sm font-bold cursor-pointer"
                >
                  <ArrowLeft className="w-4.5 h-4.5" />
                  <span>추천 목록</span>
                </button>

                <span className="text-[16px] font-bold text-[#191F28]">
                  {selectedProfile.name}님의 상세 프로필
                </span>

                <button
                  onClick={() => setSelectedProfileId(null)}
                  className="p-1 -mr-1 text-[#8B95A1] hover:text-[#191F28] active:scale-95 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 스크롤 가능한 상세 내용 본체 */}
              <div className="flex-1 overflow-y-auto p-4 pb-36 flex flex-col gap-4">
                {/* 1. 토스 매칭 인사이트 칩 */}
                <div className="bg-[#E8F3FF] rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#3182F6] flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-bold text-[#1B64DA] leading-snug">
                    {selectedProfile.matchInsight}
                  </p>
                </div>

                {/* 2. 아이덴티티 & 안심 인증 영역 */}
                <div className="bg-white rounded-[28px] p-5.5 shadow-sm border border-[#E5E8EB] flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <h2 className="text-[26px] font-black text-[#191F28] tracking-tight">
                          {selectedProfile.name}
                        </h2>
                        <span className="text-base font-bold text-[#8B95A1]">
                          {selectedProfile.age}세
                        </span>
                      </div>

                      <span className="text-xs text-[#00B368] font-extrabold bg-[#E6F7F0] px-3 py-1 rounded-full flex items-center gap-1 border border-[#00B368]/20">
                        <ShieldCheck className="w-4 h-4 text-[#00B368]" />
                        <span>{selectedProfile.company} 재직 인증</span>
                      </span>
                    </div>

                    <p className="text-sm text-[#4E5968] font-semibold flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-4 h-4 text-[#8B95A1]" />
                      <span>{selectedProfile.department} · {selectedProfile.location}</span>
                    </p>
                  </div>

                  {/* 3. 체온 & 필체 듀얼 뷰 */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* 좌측: 손등의 온기 카드 */}
                    <div
                      className={`h-40 rounded-2xl bg-gradient-to-br ${selectedProfile.handGradient} p-3.5 flex flex-col justify-between relative overflow-hidden`}
                    >
                      <span className="self-start text-xs font-bold text-[#4E5968] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                        얼굴 대신 손등의 온기
                      </span>
                      <div className="flex items-center justify-center my-auto opacity-70">
                        <Hand className="w-8 h-8 text-slate-500" />
                      </div>
                      <span className="self-end text-xs font-extrabold text-[#3182F6] bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm">
                        AI 손등 검증 완료
                      </span>
                    </div>

                    {/* 우측: 정갈한 자필 엽서 카드 */}
                    <div className="h-40 rounded-2xl bg-[#FFFDF8] p-3.5 flex flex-col justify-between border border-[#F5E8D0]/70">
                      <span className="self-start text-xs font-bold text-[#8F6B00] bg-amber-50 px-2.5 py-1 rounded-lg">
                        정갈한 자필 엽서
                      </span>
                      <p className="text-[13.5px] text-[#333D4B] leading-relaxed font-serif italic my-auto line-clamp-3 text-center px-1">
                        &ldquo;{selectedProfile.quote}&rdquo;
                      </p>
                      <span className="self-end text-[11px] font-bold text-[#8F6B00]/80">
                        클린 문구 검증
                      </span>
                    </div>
                  </div>

                  {/* 4. 직장인 라이프스타일 팩트 시트 */}
                  <div className="flex flex-col divide-y divide-[#F2F4F6] pt-1">
                    <div className="py-3.5 flex items-center gap-3">
                      <Train className="w-4.5 h-4.5 text-[#8B95A1] shrink-0" />
                      <div className="flex items-center justify-between flex-1">
                        <span className="font-bold text-sm text-[#8B95A1]">출퇴근 루틴</span>
                        <span className="font-extrabold text-[15px] text-[#191F28]">{selectedProfile.commute}</span>
                      </div>
                    </div>

                    <div className="py-3.5 flex items-center gap-3">
                      <Coffee className="w-4.5 h-4.5 text-[#8B95A1] shrink-0" />
                      <div className="flex items-center justify-between flex-1">
                        <span className="font-bold text-sm text-[#8B95A1]">성향 · 라이프</span>
                        <span className="font-extrabold text-[15px] text-[#191F28]">
                          {selectedProfile.mbti} · {selectedProfile.lifestyle}
                        </span>
                      </div>
                    </div>

                    <div className="py-3.5 flex items-center gap-3">
                      <Briefcase className="w-4.5 h-4.5 text-[#8B95A1] shrink-0" />
                      <div className="flex items-center justify-between flex-1">
                        <span className="font-bold text-sm text-[#8B95A1]">직무 및 연차</span>
                        <span className="font-extrabold text-[15px] text-[#191F28]">{selectedProfile.department}</span>
                      </div>
                    </div>
                  </div>

                  {/* 5. 가치관 1문 1답 */}
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      <MessageSquareQuote className="w-4 h-4 text-[#3182F6]" />
                      <span className="text-xs font-extrabold text-[#3182F6]">가치관 1문 1답</span>
                    </div>
                    <h4 className="text-[15px] font-bold text-[#191F28]">
                      Q. {selectedProfile.qna.question}
                    </h4>
                    <p className="text-sm text-[#333D4B] font-medium leading-relaxed bg-[#F9FAFB] p-3.5 rounded-2xl">
                      &ldquo;{selectedProfile.qna.answer}&rdquo;
                    </p>
                  </div>

                  {/* 6. 안심 보호 문구 */}
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#8B95A1] font-medium pt-1">
                    <Lock className="w-3.5 h-3.5 text-[#00B368]" />
                    <span>회사 동료 및 지인에게는 절대 프로필이 노출되지 않아요</span>
                  </div>
                </div>
              </div>

              {/* 고정 하단 액션 바 (토스 FixedBottomCTA 가이드 준수: h-14, text-[16px] font-bold) */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-4 pb-6 border-t border-[#E5E8EB] flex flex-col gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-20">
                {(decisions[selectedProfile.id] || "pending") === "pending" ? (
                  <>
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => handlePass(selectedProfile.id)}
                        className="w-1/3 h-14 rounded-2xl bg-[#F2F4F6] text-[#4E5968] font-bold text-[16px] hover:bg-[#E5E8EB] active:scale-[0.98] transition-all cursor-pointer"
                      >
                        다음에 만나요
                      </button>
                      <button
                        onClick={() => handleLike(selectedProfile.id)}
                        className="w-2/3 h-14 rounded-2xl bg-[#3182F6] text-white font-bold text-[16px] hover:bg-[#1B64DA] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
                      >
                        <Heart className="w-5 h-5 fill-white" />
                        <span>호감 보내기</span>
                      </button>
                    </div>
                    <p className="text-center text-xs text-[#8B95A1] font-medium">
                      상대방에게 거절 알림이 가지 않으며, 서로 호감을 보내야 대화가 열려요
                    </p>
                  </>
                ) : decisions[selectedProfile.id] === "liked" ? (
                  <div className="flex flex-col gap-2">
                    <div className="w-full h-14 rounded-2xl bg-[#E8F3FF] text-[#3182F6] font-bold text-[16px] flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5 fill-[#3182F6]" />
                      <span>이미 호감을 보낸 인연이에요</span>
                    </div>
                    <button
                      onClick={() => setSelectedProfileId(null)}
                      className="w-full py-1 text-sm text-[#8B95A1] font-bold hover:text-[#191F28] cursor-pointer"
                    >
                      추천 목록으로 돌아가기
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="w-full h-14 rounded-2xl bg-[#F2F4F6] text-[#8B95A1] font-bold text-[16px] flex items-center justify-center">
                      <span>다음에 만나기로 한 인연이에요</span>
                    </div>
                    <button
                      onClick={() => setSelectedProfileId(null)}
                      className="w-full py-1 text-sm text-[#8B95A1] font-bold hover:text-[#191F28] cursor-pointer"
                    >
                      추천 목록으로 돌아가기
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* B. 추천된 이성의 요약 카드 목록 뷰 (Summary Cards List) */}
          <div className="flex-1 px-4 pb-28 flex flex-col gap-3.5 animate-in fade-in duration-150">
            {/* 상단 인연 도착 안내 바 */}
            <div className="py-1.5 flex items-center justify-between px-1">
              <span className="text-sm font-semibold text-[#8B95A1]">
                매일 밤 10시에 도착하는 소중한 인연이에요
              </span>
              <span className="text-xs bg-[#E8F3FF] text-[#3182F6] font-bold px-3 py-1 rounded-full">
                {pendingCount > 0 ? `미확인 ${pendingCount}명` : "모두 확인 완료"}
              </span>
            </div>

            {/* 모든 인연을 확인했을 때 표시되는 토스 안심 완료 카드 */}
            {pendingCount === 0 && (
              <div className="bg-white rounded-[24px] p-6 text-center flex flex-col items-center gap-3.5 border border-[#E5E8EB] shadow-sm">
                <div className="w-13 h-13 rounded-2xl bg-[#E8F3FF] flex items-center justify-center text-[#3182F6]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#191F28]">
                    오늘의 인연을 모두 확인했어요
                  </h3>
                  <p className="text-sm text-[#8B95A1] mt-1.5 leading-relaxed font-medium">
                    매일 밤 10시에 새로운 직장인 인연이 도착해요.<br />
                    아래 카드를 눌러 프로필을 언제든 다시 살펴볼 수 있어요.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="h-11 px-4 rounded-xl bg-[#F2F4F6] text-[#333D4B] font-bold text-sm hover:bg-[#E5E8EB] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-[#6B7684]" />
                  <span>인연 선택 초기화</span>
                </button>
              </div>
            )}

            {/* 추천 인연 요약 카드 목록 */}
            <div className="flex flex-col gap-3.5">
              {TODAY_RECOMMENDATIONS.map((profile) => {
                const status = decisions[profile.id] || "pending";
                return (
                  <div
                    key={profile.id}
                    onClick={() => setSelectedProfileId(profile.id)}
                    className="w-full bg-white rounded-[26px] p-5 shadow-sm border border-[#E5E8EB] hover:border-[#3182F6]/50 hover:shadow-md transition-all active:scale-[0.99] text-left flex flex-col gap-3.5 cursor-pointer relative group"
                  >
                    {/* 카드 상단: 매칭 인사이트 뱃지 & 결정 상태 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B64DA] bg-[#E8F3FF] px-3 py-1 rounded-full">
                        <Sparkles className="w-3.5 h-3.5 text-[#3182F6]" />
                        <span>{profile.summaryBadge}</span>
                      </div>

                      <div>
                        {status === "liked" ? (
                          <span className="text-xs font-bold text-[#3182F6] bg-[#E8F3FF] px-3 py-1 rounded-full flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5 fill-[#3182F6]" />
                            <span>호감 보냄</span>
                          </span>
                        ) : status === "passed" ? (
                          <span className="text-xs font-bold text-[#8B95A1] bg-[#F2F4F6] px-3 py-1 rounded-full">
                            다음에 만나요
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-[#00B368] bg-[#E6F7F0] px-3 py-1 rounded-full flex items-center gap-1 border border-[#00B368]/20">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#00B368]" />
                            <span>{profile.company} 인증</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 카드 본체: 프로필 인적사항 및 손등 온기 썸네일 */}
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-15 h-15 rounded-2xl bg-gradient-to-br ${profile.handGradient} flex items-center justify-center shrink-0 border border-black/5 relative group-hover:scale-105 transition-transform`}
                      >
                        <Hand className="w-7 h-7 text-slate-500/70" />
                        <span className="absolute -bottom-1 text-[10px] font-extrabold text-[#3182F6] bg-white/95 px-1.5 py-0.5 rounded-md shadow-2xs">
                          AI인증
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-[18px] font-black text-[#191F28] truncate">
                            {profile.name}
                          </h3>
                          <span className="text-sm font-bold text-[#8B95A1]">
                            {profile.age}세
                          </span>
                        </div>
                        <p className="text-sm text-[#333D4B] font-bold mt-0.5 truncate">
                          {profile.company} · {profile.department.split(" (")[0]}
                        </p>
                        <p className="text-[13px] text-[#6B7684] font-medium mt-0.5 flex items-center gap-1 truncate">
                          <Train className="w-3.5 h-3.5 text-[#8B95A1] shrink-0" />
                          <span>{profile.commute}</span>
                        </p>
                      </div>
                    </div>

                    {/* 정갈한 자필 엽서 한 줄 인용문 미리보기 */}
                    <div className="bg-[#FFFDF8] border border-[#F5E8D0]/70 p-3.5 rounded-2xl flex items-start gap-2.5">
                      <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-[#333D4B] font-serif italic truncate flex-1 leading-relaxed">
                        &ldquo;{profile.quote}&rdquo;
                      </p>
                    </div>

                    {/* 하단 태그 칩 & 프로필 상세 확인 CTA */}
                    <div className="flex items-center justify-between pt-1 border-t border-[#F2F4F6]">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <span className="text-xs font-bold text-[#4E5968] bg-[#F2F4F6] px-2.5 py-1 rounded-lg">
                          #{profile.mbti}
                        </span>
                        <span className="text-xs font-bold text-[#4E5968] bg-[#F2F4F6] px-2.5 py-1 rounded-lg truncate">
                          #{profile.lifestyle.split(" · ")[0]}
                        </span>
                      </div>

                      <div className="text-sm font-bold text-[#3182F6] flex items-center gap-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform">
                        <span>프로필 보기</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* 탭 2: 매칭된 대화방 목록 */}
      {activeTab === "matched" && (
        <div className="p-4 flex flex-col gap-3 pb-24">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-semibold text-[#8B95A1]">
              서로 호감을 수락한 안심 대화방이에요
            </span>
          </div>

          {matchedRooms.map((room) => (
            <Link
              key={room.id}
              href={`/chat/${room.id}`}
              className="bg-white rounded-3xl p-4.5 shadow-sm border border-[#E5E8EB] flex items-center gap-4 hover:bg-slate-50 transition-colors active:scale-[0.99]"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${room.handGradient} flex items-center justify-center shrink-0 border border-black/5`}
              >
                <Hand className="w-6 h-6 text-slate-500/80" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[17px] text-[#191F28]">
                      {room.name}
                    </span>
                    <span className="text-xs text-[#00B368] font-bold bg-[#E6F7F0] px-2 py-0.5 rounded-md">
                      {room.company}
                    </span>
                  </div>
                  <span className="text-[13px] text-[#8B95A1] font-medium">
                    {room.lastMessageTime}
                  </span>
                </div>
                <p className="text-sm text-[#4E5968] truncate font-medium">
                  {room.lastMessage}
                </p>
              </div>

              {room.unreadCount > 0 && (
                <div className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#3182F6] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {room.unreadCount}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* 탭 3: 내가 받은 호감 목록 */}
      {activeTab === "received" && (
        <div className="p-4 flex flex-col gap-3.5 pb-24">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-semibold text-[#8B95A1]">
              나에게 도착한 호감을 72시간 내 수락해 보세요
            </span>
          </div>

          {receivedLikes.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E8EB] flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${item.handGradient} flex items-center justify-center shrink-0 border border-black/5`}
                  >
                    <Hand className="w-6 h-6 text-slate-500/80" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[17px] text-[#191F28]">
                        {item.name}
                      </span>
                      <span className="text-sm text-[#8B95A1] font-bold">{item.age}세</span>
                    </div>
                    <p className="text-sm text-[#4E5968] font-medium mt-0.5">
                      {item.company} · {item.job}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-[#FF6F61] font-extrabold bg-[#FFF0EE] px-2.5 py-1 rounded-full">
                  {item.receivedTime}
                </span>
              </div>

              <div className="bg-[#FFFBF2] p-3.5 rounded-2xl border border-[#F5E8D0] flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                <p className="text-sm text-[#6B7684] italic truncate font-serif">
                  &ldquo;{item.handwritingSummary}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  onClick={() => showToast("호감을 거절했어요")}
                  className="flex-1 h-12 bg-[#F2F4F6] text-[#6B7684] text-[15px] font-bold rounded-2xl hover:bg-[#E5E8EB] active:scale-95 transition-all cursor-pointer"
                >
                  정중히 거절
                </button>
                <Link
                  href="/chat/room-1"
                  className="flex-1 h-12 bg-[#3182F6] text-white text-[15px] font-bold rounded-2xl hover:bg-[#1B64DA] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  수락하고 대화하기
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 탭 4: 내가 보낸 호감 목록 */}
      {activeTab === "sent" && (
        <div className="p-4 flex flex-col gap-3 pb-24">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-semibold text-[#8B95A1]">
              내가 보낸 호감의 응답 상태예요
            </span>
          </div>

          {sentLikes.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4.5 shadow-sm border border-[#E5E8EB] flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#F2F4F6] flex items-center justify-center font-bold text-base text-[#4E5968]">
                  {item.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[17px] text-[#191F28]">
                      {item.name}
                    </span>
                    <span className="text-sm text-[#8B95A1]">
                      {item.company}
                    </span>
                  </div>
                  <span className="text-[13px] text-[#8B95A1] font-medium">
                    {item.sentTime}에 보냄
                  </span>
                </div>
              </div>

              <div>
                {item.status === "pending" ? (
                  <span className="text-xs font-bold text-[#3182F6] bg-[#E8F3FF] px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    수락 대기 중
                  </span>
                ) : (
                  <span className="text-xs font-bold text-[#8B95A1] bg-[#F2F4F6] px-3 py-1.5 rounded-full">
                    인연이 닿지 않았어요
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MatchingAndChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2F4F6]" />}>
      <ChatContent />
    </Suspense>
  );
}
