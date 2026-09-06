"use client";

import { useState } from "react";
import MobileHeader from "@/components/layout/MobileHeader";
import { MessageSquare, Heart, Building2, Sparkles, Plus } from "lucide-react";

const LOUNGE_POSTS = [
  {
    id: 1,
    category: "소개팅 후기",
    company: "카카오",
    title: "판교 근처에서 첫 소개팅하기 좋은 조용한 카페 추천해요!",
    content: "자필 글씨 보고 매칭된 분이랑 지난 주말에 만났는데, 조용하고 대화하기 너무 좋았습니다. 주차도 편하고 분위기 괜찮아요.",
    likes: 34,
    comments: 18,
    time: "15분 전",
    liked: false,
  },
  {
    id: 2,
    category: "연애 고민",
    company: "현대자동차",
    title: "주말 첫 만남 장소로 어디가 부담 없을까요? (강남/양재)",
    content: "서로 퇴근 시간이 비슷해서 평일 저녁이나 주말 낮에 뵙기로 했는데, 너무 시끄럽지 않고 편안한 곳 추천 부탁드려요!",
    likes: 22,
    comments: 14,
    time: "40분 전",
    liked: true,
  },
  {
    id: 3,
    category: "직장인 일상",
    company: "토스 (비바리퍼블리카)",
    title: "다들 퇴근하고 손글씨 쪽지 어떻게 쓰셨나요? ㅎㅎ",
    content: "오랜만에 펜 잡고 종이에 글씨 쓰려니 어색했는데, 막상 정성껏 쓰니까 상대방 분도 진심으로 봐주시는 것 같아 좋네요.",
    likes: 47,
    comments: 31,
    time: "1시간 전",
    liked: false,
  },
];

export default function LoungePage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [posts, setPosts] = useState(LOUNGE_POSTS);

  const categories = ["전체", "🔥 실시간 인기", "소개팅 후기", "직장인 일상", "연애 고민"];

  const handleToggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F6]">
      <MobileHeader title="직장인 라운지" />

      {/* 상단 카테고리 알약 탭 (토스 스타일 가로 스크롤) */}
      <div className="px-5 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all active:scale-95 ${
              activeCategory === cat
                ? "bg-[#191F28] text-white shadow-sm"
                : "bg-white text-[#4E5968] border border-[#E5E8EB] hover:bg-[#F2F4F6]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 라운지 글 작성 프롬프트 (토스 커뮤니티 스타일) */}
      <div className="px-5 pb-2">
        <div className="bg-white rounded-2xl p-3.5 border border-[#E5E8EB] flex items-center justify-between shadow-sm cursor-pointer hover:border-[#3182F6]/40 transition-all active:scale-[0.99]">
          <span className="text-xs text-[#8B95A1] font-medium">
            동료 직장인들과 연애나 소개팅 이야기를 나눠보세요
          </span>
          <span className="text-xs font-extrabold text-[#3182F6] flex items-center gap-0.5 shrink-0 ml-2">
            <Plus className="w-3.5 h-3.5 stroke-[3]" /> 글쓰기
          </span>
        </div>
      </div>

      {/* 피드 리스트 영역 (토스 스타일 화이트 카드) */}
      <div className="p-5 pt-1 flex flex-col gap-3 pb-28">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-[24px] p-5 border border-[#E5E8EB] shadow-sm flex flex-col gap-3 hover:border-blue-200 transition-all cursor-pointer"
          >
            {/* 글 헤더 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold text-[#3182F6] bg-[#E8F3FF] px-2 py-0.5 rounded-md">
                  {post.category}
                </span>
                <span className="text-[11px] text-[#4E5968] font-bold flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-[#8B95A1]" />
                  {post.company}
                </span>
              </div>
              <span className="text-[11px] text-[#8B95A1]">{post.time}</span>
            </div>

            {/* 본문 */}
            <div>
              <h3 className="text-sm font-extrabold text-[#191F28] leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-[#4E5968] mt-1.5 line-clamp-2 leading-relaxed font-medium">
                {post.content}
              </p>
            </div>

            {/* 좋아요 & 댓글 액션 바 */}
            <div className="flex items-center justify-between pt-3 border-t border-[#F2F4F6] text-xs text-[#8B95A1]">
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleLike(post.id);
                  }}
                  className={`flex items-center gap-1 font-bold transition-colors ${
                    post.liked ? "text-rose-500" : "hover:text-[#191F28]"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      post.liked ? "fill-rose-500 stroke-rose-500" : ""
                    }`}
                  />
                  <span>{post.likes}</span>
                </button>
                <span className="flex items-center gap-1 font-bold hover:text-[#191F28] transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments}</span>
                </span>
              </div>
              <span className="text-[11px] text-[#8B95A1] font-medium flex items-center gap-0.5">
                <Sparkles className="w-3 h-3 text-[#FEE500]" /> 인기글
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
