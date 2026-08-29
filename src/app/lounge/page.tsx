import MobileHeader from "@/components/layout/MobileHeader";
import { MessageSquare, Heart, Building2, TrendingUp, Sparkles } from "lucide-react";

const LOUNGE_POSTS = [
  {
    id: 1,
    category: "소개팅 후기",
    company: "카카오",
    title: "판교 근처에서 첫 소개팅하기 좋은 카페 추천해요!",
    content: "조용하고 분위기 좋은 곳 찾다가 발견했는데 대화하기 너무 좋았습니다. 주차도 편하고...",
    likes: 24,
    comments: 12,
    time: "10분 전",
  },
  {
    id: 2,
    category: "연애 고민",
    company: "현대자동차",
    title: "주말 데이트 코스 어디가 좋을까요? (서울/경기)",
    content: "3번째 만남인데 이번엔 드라이브 겸 외곽으로 나가보고 싶은데 추천해주실 수 있나요?",
    likes: 18,
    comments: 15,
    time: "35분 전",
  },
  {
    id: 3,
    category: "직장인 일상",
    company: "토스",
    title: "다들 퇴근하고 보통 몇 시에 답장하시나요?",
    content: "야근 많은 날엔 카톡 텀이 길어지는데 상대방이 서운해할까 봐 걱정되네요 ㅠㅠ",
    likes: 32,
    comments: 28,
    time: "1시간 전",
  },
];

export default function LoungePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MobileHeader title="직장인 라운지" />

      {/* 상단 탭 / 필터 */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {["전체", "🔥 실시간 인기", "소개팅 꿀팁", "셀프 소개", "연애 고민"].map((tab, idx) => (
          <button
            key={idx}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              idx === 0
                ? "bg-rose-500 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 라운지 피드 리스트 */}
      <div className="p-4 flex flex-col gap-3">
        {LOUNGE_POSTS.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-2.5 hover:border-rose-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">
                  {post.category}
                </span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  {post.company}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">{post.time}</span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 leading-snug">{post.title}</h3>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{post.content}</p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer">
                  <Heart className="w-3.5 h-3.5" /> {post.likes}
                </span>
                <span className="flex items-center gap-1 hover:text-slate-600 transition-colors cursor-pointer">
                  <MessageSquare className="w-3.5 h-3.5" /> {post.comments}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 flex items-center gap-0.5">
                <Sparkles className="w-3 h-3 text-amber-500" /> 추천글
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
