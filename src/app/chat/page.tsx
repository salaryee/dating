import MobileHeader from "@/components/layout/MobileHeader";
import { MessageCircleHeart, ShieldCheck, Clock } from "lucide-react";

const CHAT_ROOMS = [
  {
    id: 1,
    name: "지민",
    company: "네이버",
    lastMessage: "네! 주말에 시간 괜찮아요 ㅎㅎ 판교 쪽에서 뵐까요?",
    time: "오후 3:24",
    unread: 2,
    avatarGradient: "from-rose-400 to-pink-500",
    verified: true,
  },
  {
    id: 2,
    name: "서연",
    company: "카카오뱅크",
    lastMessage: "프로필 보고 취미가 비슷해서 말 걸어봤어요 😊",
    time: "어제",
    unread: 0,
    avatarGradient: "from-purple-400 to-indigo-500",
    verified: true,
  },
];

export default function ChatListPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MobileHeader title="매칭 & 대화함" />

      {/* 실시간 매칭 알림 배너 */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircleHeart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <p className="text-xs font-bold">새로운 매칭이 성사되었습니다!</p>
              <p className="text-[10px] text-white/80">서로 좋아요를 누른 인연과 대화를 시작하세요.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 대화 목록 */}
      <div className="px-4 flex flex-col gap-2">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          진행 중인 대화
        </h2>

        {CHAT_ROOMS.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center gap-3 hover:border-rose-100 cursor-pointer transition-all active:scale-[0.99]"
          >
            {/* 아바타 */}
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${room.avatarGradient} flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0 relative`}
            >
              {room.name[0]}
              {room.verified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 ring-2 ring-white">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              )}
            </div>

            {/* 대화 내용 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">{room.name}</span>
                  <span className="text-[11px] text-slate-400">({room.company})</span>
                </div>
                <span className="text-[10px] text-slate-400">{room.time}</span>
              </div>
              <p className="text-xs text-slate-600 truncate mt-0.5">{room.lastMessage}</p>
            </div>

            {/* 안 읽은 뱃지 */}
            {room.unread > 0 && (
              <div className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-sm">
                {room.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
