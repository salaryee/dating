"use client";

import { useState } from "react";
import Link from "next/link";
import MobileHeader from "@/components/layout/MobileHeader";
import {
  MessageCircleHeart,
  ShieldCheck,
  Heart,
  X,
  Check,
  Clock,
  Sparkles,
  ChevronRight,
  Hand,
  FileText,
} from "lucide-react";

export default function MatchingAndChatPage() {
  const [activeTab, setActiveTab] = useState<"matched" | "received" | "sent">("matched");

  // 매칭된 대화 목록 (기획서 7번: 매칭 성공 시 대화방 개설)
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

  // 내가 받은 호감 목록 (기획서 6번: 수락/거절 선택)
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

  // 내가 보낸 호감 목록 (기획서 6번: 대기 중 / 거절 뱃지)
  const sentLikes = [
    {
      id: "sent-1",
      name: "다은",
      company: "라인플러스",
      job: "UI/UX 디자이너",
      sentTime: "어제",
      status: "pending", // 수락 대기 중
    },
    {
      id: "sent-2",
      name: "유진",
      company: "LG전자",
      job: "마케팅",
      sentTime: "3일 전",
      status: "rejected", // 거절됨 (기획서: 거절 뱃지 표시)
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F6]">
      <MobileHeader title="호감 · 대화" showVerifiedBadge={false} />

      {/* 3대 탭 메뉴 (토스 UX: 정갈한 세그먼트 컨트롤) */}
      <div className="px-5 pt-3 pb-2">
        <div className="flex bg-[#E5E8EB]/70 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab("matched")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "matched"
                ? "bg-white text-[#191F28] shadow-sm"
                : "text-[#6B7684] hover:text-[#191F28]"
            }`}
          >
            대화 중 ({matchedRooms.length})
          </button>
          <button
            onClick={() => setActiveTab("received")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all relative ${
              activeTab === "received"
                ? "bg-white text-[#191F28] shadow-sm"
                : "text-[#6B7684] hover:text-[#191F28]"
            }`}
          >
            받은 호감
            {receivedLikes.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-[#3182F6] text-white text-[9px] rounded-full font-black">
                {receivedLikes.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "sent"
                ? "bg-white text-[#191F28] shadow-sm"
                : "text-[#6B7684] hover:text-[#191F28]"
            }`}
          >
            보낸 호감 ({sentLikes.length})
          </button>
        </div>
      </div>

      {/* 탭 1: 매칭된 대화방 목록 */}
      {activeTab === "matched" && (
        <div className="p-5 flex flex-col gap-3 pb-24">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[#8B95A1]">
              서로 호감을 수락한 대화방이에요
            </span>
          </div>

          {matchedRooms.map((room) => (
            <Link
              key={room.id}
              href={`/chat/${room.id}`}
              className="bg-white rounded-2xl p-4 border border-[#E5E8EB] shadow-sm flex items-center gap-3.5 hover:border-[#3182F6]/40 transition-all cursor-pointer active:scale-[0.99]"
            >
              {/* 손등 썸네일 아바타 */}
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${room.handGradient} flex items-center justify-center text-[#191F28] font-bold text-sm shadow-inner shrink-0 relative`}
              >
                <Hand className="w-5 h-5 opacity-40 text-[#191F28]" />
                <div className="absolute -bottom-1 -right-1 bg-[#00B368] text-white rounded-full p-0.5 ring-2 ring-white">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              </div>

              {/* 대화방 정보 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-extrabold text-[#191F28]">{room.name}</span>
                    <span className="text-[11px] text-[#8B95A1] font-semibold">
                      · {room.company} ({room.job})
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8B95A1] font-medium">{room.lastMessageTime}</span>
                </div>
                <p className="text-xs text-[#4E5968] truncate mt-1 leading-normal font-medium">
                  {room.lastMessage}
                </p>
              </div>

              {/* 안 읽은 메시지 뱃지 */}
              {room.unreadCount > 0 && (
                <div className="w-5 h-5 rounded-full bg-[#3182F6] text-white text-[10px] font-black flex items-center justify-center shrink-0">
                  {room.unreadCount}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* 탭 2: 내가 받은 호감 목록 (수락 / 거절) */}
      {activeTab === "received" && (
        <div className="p-5 flex flex-col gap-3 pb-24">
          <span className="text-xs font-bold text-slate-500 px-1">
            내 손글씨와 가치관에 호감을 표현한 직장인이에요
          </span>

          {receivedLikes.map((like) => (
            <div
              key={like.id}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col gap-3.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-slate-900">{like.name}</span>
                  <span className="text-xs text-slate-500 font-medium">
                    {like.age}세 · {like.company}
                  </span>
                  <span className="text-[10px] bg-blue-50 text-[#3182F6] px-1.5 py-0.5 rounded font-bold">
                    {like.mbti}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">{like.receivedTime}</span>
              </div>

              {/* 상대방 자필 요약 문구 */}
              <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-100 text-xs text-slate-700 italic flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                <span>"{like.handwritingSummary}"</span>
              </div>

              {/* 수락 / 거절 버튼 (토스 UX: 거절권 보장 및 명확한 행동 라벨) */}
              <div className="flex items-center gap-2 pt-1">
                <button className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition-colors flex items-center justify-center gap-1">
                  <X className="w-3.5 h-3.5" />
                  <span>거절하기</span>
                </button>
                <button className="flex-2 py-2.5 rounded-xl bg-[#3182F6] text-white font-bold text-xs hover:bg-[#256fd8] transition-colors flex items-center justify-center gap-1 shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>호감 수락하고 대화하기</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 탭 3: 내가 보낸 호감 목록 (대기 / 거절 뱃지) */}
      {activeTab === "sent" && (
        <div className="p-5 flex flex-col gap-3 pb-24">
          <span className="text-xs font-bold text-slate-500 px-1">
            내가 호감을 보낸 내역이에요
          </span>

          {sentLikes.map((sent) => (
            <div
              key={sent.id}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                  {sent.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{sent.name}</p>
                  <p className="text-xs text-slate-400">
                    {sent.company} · {sent.job}
                  </p>
                </div>
              </div>

              <div>
                {sent.status === "pending" ? (
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200/60">
                    <Clock className="w-3 h-3" />
                    <span>상대방 확인 중</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 text-xs font-bold px-2.5 py-1 rounded-full">
                    <span>인연이 닿지 않았어요</span>
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
