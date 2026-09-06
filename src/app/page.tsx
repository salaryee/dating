"use client";

import Link from "next/link";
import MobileHeader from "@/components/layout/MobileHeader";
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building2,
  Users,
  Clock,
  ChevronRight,
  HeartHandshake,
  CheckCircle2,
  Award,
  Lock,
  MessageSquare,
} from "lucide-react";

// 실시간 가입 피드 데이터
const LIVE_NEWCOMERS = [
  {
    company: "현대자동차",
    age: 31,
    gender: "남성",
    job: "연구개발",
    location: "남양",
    timeAgo: "방금 전",
    verified: true,
  },
  {
    company: "네이버",
    age: 28,
    gender: "여성",
    job: "서비스 기획",
    location: "판교",
    timeAgo: "8분 전",
    verified: true,
  },
  {
    company: "삼일PwC",
    age: 32,
    gender: "남성",
    job: "공인회계사",
    location: "용산",
    timeAgo: "21분 전",
    verified: true,
  },
  {
    company: "토스뱅크",
    age: 29,
    gender: "여성",
    job: "데이터 분석",
    location: "강남",
    timeAgo: "35분 전",
    verified: true,
  },
  {
    company: "삼성전자",
    age: 30,
    gender: "남성",
    job: "반도체 설계",
    location: "화성",
    timeAgo: "52분 전",
    verified: true,
  },
  {
    company: "카카오",
    age: 27,
    gender: "여성",
    job: "브랜드 디자인",
    location: "판교",
    timeAgo: "1시간 전",
    verified: true,
  },
];

// 이번 주 인기 직장/업계 랭킹 (토스증권 실시간 차트 스타일)
const INDUSTRY_RANKINGS = [
  {
    rank: 1,
    industry: "IT · 테크 · 플랫폼",
    companies: "네이버, 카카오, 토스, 라인, 쿠팡",
    percent: 34,
  },
  {
    rank: 2,
    industry: "대기업 · 제조 · 전자",
    companies: "삼성전자, 현대자동차, SK하이닉스, LG전자",
    percent: 27,
  },
  {
    rank: 3,
    industry: "금융 · 전문직 · 회계/법무",
    companies: "금융지주, 삼일PwC, 김앤장, 대형병원",
    percent: 19,
  },
  {
    rank: 4,
    industry: "바이오 · 제약 · 헬스케어",
    companies: "삼성바이오로직스, 셀트리온, 유한양행",
    percent: 11,
  },
  {
    rank: 5,
    industry: "공기업 · 공공기관",
    companies: "한국전력, 인천국제공항공사, 코레일",
    percent: 9,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F6]">
      <MobileHeader />

      <div className="p-4 sm:p-5 flex flex-col gap-4 pb-28">
        
        {/* 1. 개인화 퀵 액션 배너 (토스 홈 최상단 계좌/혜택 카드 스타일) */}
        <Link
          href="/chat?tab=today"
          className="bg-gradient-to-r from-[#3182F6] to-[#1B64DA] rounded-3xl p-5 text-white shadow-lg shadow-blue-500/15 flex items-center justify-between active:scale-[0.99] transition-transform"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-200 fill-blue-200" />
              <span className="text-xs font-extrabold text-blue-100">
                오늘의 인연 도착
              </span>
            </div>
            <h2 className="text-lg font-black tracking-tight mt-0.5">
              민지님, 오늘의 인연 2명이 도착했어요
            </h2>
            <p className="text-[11px] text-blue-100/90 font-medium">
              밤 10시 매칭 · 직장과 라이프스타일 확인하기
            </p>
          </div>

          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 ml-3">
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
        </Link>

        {/* 2. 실시간 남녀 성비 게이지 (토스식 투명한 지표 공개) */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E8EB] flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#3182F6]" />
              <h3 className="text-sm font-extrabold text-[#191F28]">
                실시간 가입 성비
              </h3>
            </div>
            <span className="text-[11px] font-bold text-[#00B368] bg-[#E6F7F0] px-2.5 py-0.5 rounded-full">
              5:5 균형 유지 중
            </span>
          </div>

          {/* 비율 바 게이지 */}
          <div className="flex flex-col gap-2">
            <div className="h-3.5 w-full bg-[#F2F4F6] rounded-full overflow-hidden flex">
              <div
                className="bg-[#3182F6] h-full transition-all duration-500 rounded-l-full"
                style={{ width: "51%" }}
              ></div>
              <div
                className="bg-[#FF6F61] h-full transition-all duration-500 rounded-r-full"
                style={{ width: "49%" }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold px-1">
              <div className="flex items-center gap-1.5 text-[#3182F6]">
                <span className="w-2 h-2 rounded-full bg-[#3182F6]"></span>
                <span>남성 51% (738명)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#FF6F61]">
                <span className="w-2 h-2 rounded-full bg-[#FF6F61]"></span>
                <span>여성 49% (706명)</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#8B95A1] font-medium leading-relaxed bg-[#F9FAFB] p-2.5 rounded-xl border border-[#F2F4F6]">
            특정 성별 쏠림 없는 건강한 5:5 성비로 양방향 매칭 성공률이 높아요.
          </p>
        </div>

        {/* 3. 오늘 새롭게 합류한 직장인 (실시간 라이브 피드) */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E8EB] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00B368] block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#00B368] animate-ping absolute top-0 left-0"></span>
              </div>
              <h3 className="text-sm font-extrabold text-[#191F28]">
                오늘 합류한 직장인
              </h3>
            </div>
            <span className="text-[11px] font-extrabold text-[#8B95A1]">
              실시간 LIVE
            </span>
          </div>

          <p className="text-xs text-[#6B7684] font-medium">
            100% 명함 및 재직 인증을 통과한 직장인들이에요.
          </p>

          <div className="divide-y divide-[#F2F4F6] pt-1">
            {LIVE_NEWCOMERS.map((person, idx) => (
              <div
                key={idx}
                className="py-3 flex items-center justify-between first:pt-1 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 ${
                      person.gender === "남성"
                        ? "bg-[#E8F3FF] text-[#3182F6]"
                        : "bg-[#FFF0EE] text-[#FF6F61]"
                    }`}
                  >
                    {person.gender === "남성" ? "남" : "여"}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs text-[#191F28]">
                        {person.company}
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00B368]" />
                      <span className="text-[11px] text-[#6B7684] font-semibold">
                        {person.age}세 · {person.gender}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8B95A1] font-medium mt-0.5">
                      {person.job} · {person.location}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-[#8B95A1] bg-[#F2F4F6] px-2 py-0.5 rounded-md">
                  {person.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. 이번 주 인기 직장 & 업계 랭킹 (토스증권 실시간 차트 스타일) */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E8EB] flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#3182F6]" />
              <h3 className="text-sm font-extrabold text-[#191F28]">
                이번 주 인기 업계 랭킹
              </h3>
            </div>
            <span className="text-[11px] text-[#8B95A1] font-medium">
              가입자 비율
            </span>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            {INDUSTRY_RANKINGS.map((item) => (
              <div key={item.rank} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 text-center font-black text-xs ${
                        item.rank <= 3 ? "text-[#3182F6]" : "text-[#8B95A1]"
                      }`}
                    >
                      {item.rank}
                    </span>
                    <span className="font-extrabold text-[#191F28]">
                      {item.industry}
                    </span>
                  </div>
                  <span className="font-extrabold text-[#3182F6]">
                    {item.percent}%
                  </span>
                </div>

                {/* 프로그레스 바 */}
                <div className="h-1.5 w-full bg-[#F2F4F6] rounded-full overflow-hidden">
                  <div
                    className="bg-[#3182F6] h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percent * 2.5}%` }}
                  ></div>
                </div>

                <p className="text-[10px] text-[#8B95A1] pl-6 truncate font-medium">
                  {item.companies}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. 토스 안심 안전 지표 3종 (Trust Badges) */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E8EB] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#00B368]" />
            <h3 className="text-sm font-extrabold text-[#191F28]">
              샐러리 안심 보호 시스템
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="bg-[#F9FAFB] p-3 rounded-2xl border border-[#F2F4F6] flex flex-col items-center">
              <span className="text-base font-black text-[#00B368]">100%</span>
              <span className="text-[10px] font-bold text-[#191F28] mt-1">
                Gemini AI
              </span>
              <span className="text-[9px] text-[#8B95A1] mt-0.5">
                손등사진 검증
              </span>
            </div>

            <div className="bg-[#F9FAFB] p-3 rounded-2xl border border-[#F2F4F6] flex flex-col items-center">
              <span className="text-base font-black text-[#3182F6]">98.4%</span>
              <span className="text-[10px] font-bold text-[#191F28] mt-1">
                재직 인증
              </span>
              <span className="text-[9px] text-[#8B95A1] mt-0.5">
                사내메일/명함
              </span>
            </div>

            <div className="bg-[#F9FAFB] p-3 rounded-2xl border border-[#F2F4F6] flex flex-col items-center">
              <span className="text-base font-black text-[#191F28]">100%</span>
              <span className="text-[10px] font-bold text-[#191F28] mt-1">
                지인 차단
              </span>
              <span className="text-[9px] text-[#8B95A1] mt-0.5">
                회사 동료 필터
              </span>
            </div>
          </div>
        </div>

        {/* 6. 건강한 매칭 소셜 프루프 통계 */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E8EB] flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#3182F6]" />
            <h3 className="text-sm font-extrabold text-[#191F28]">
              어제 성사된 직장인 인연
            </h3>
          </div>

          <div className="bg-[#E8F3FF]/70 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#4E5968]">어제 밤 10시 매칭</p>
              <p className="text-xl font-black text-[#3182F6] mt-0.5">
                총 46쌍 성사
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold text-[#4E5968]">첫 대화 응답률</p>
              <p className="text-sm font-black text-[#191F28] mt-0.5">91.4%</p>
            </div>
          </div>
        </div>

        {/* 7. 하단 직장인 인연 바로보기 CTA 버튼 */}
        <div className="pt-2">
          <Link
            href="/chat?tab=today"
            className="w-full h-14 bg-[#3182F6] text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
          >
            <HeartHandshake className="w-5 h-5" />
            <span>오늘의 직장인 인연 보러가기</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
