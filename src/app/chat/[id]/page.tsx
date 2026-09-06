"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  Send,
  MoreVertical,
  Hand,
  CheckCircle2,
  X,
} from "lucide-react";

export default function ChatRoomPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: "서로 호감을 수락하여 대화방이 열렸어요. 따뜻한 대화를 시작해 보세요.",
      time: "오후 2:10",
    },
    {
      id: 2,
      sender: "partner",
      text: "안녕하세요 지민님! 자필 글씨로 남겨주신 산책 이야기 보고 공감되어서 호감 보냈어요 😊",
      time: "오후 2:12",
      isRead: true,
    },
    {
      id: 3,
      sender: "me",
      text: "안녕하세요 서연님! 카카오뱅크 마케터시군요 ㅎㅎ 반갑습니다!",
      time: "오후 2:15",
      isRead: true,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [showExitModal, setShowExitModal] = useState(false);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: inputText,
      time: "방금",
      isRead: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB] justify-between">
      {/* 1. 상단 채팅방 헤더 (스크롤 시 컨텐츠 비침 방지 솔리드 헤더) */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/chat" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-900">서연</span>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  카카오뱅크
                </span>
              </div>
              <p className="text-[10px] text-slate-400">브랜드 마케터 · 28세</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowExitModal(true)}
          className="text-xs text-slate-400 hover:text-slate-700 px-2 py-1"
        >
          나가기
        </button>
      </header>

      {/* 2. 대화 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg) => {
          if (msg.sender === "system") {
            return (
              <div key={msg.id} className="my-2 text-center">
                <span className="inline-block bg-slate-200/70 text-slate-600 text-[11px] font-medium px-3.5 py-1.5 rounded-full">
                  {msg.text}
                </span>
              </div>
            );
          }

          const isMe = msg.sender === "me";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs font-medium leading-relaxed ${
                  isMe
                    ? "bg-[#3182F6] text-white rounded-tr-none shadow-sm"
                    : "bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-sm"
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1 px-1">
                {isMe && !msg.isRead && (
                  <span className="text-[10px] font-bold text-[#3182F6]">1</span>
                )}
                <span className="text-[9px] text-slate-400">{msg.time}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. 하단 메시지 입력창 */}
      <div className="p-3 bg-white border-t border-slate-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="따뜻한 메시지를 입력해 주세요"
            className="flex-1 px-4 py-3 bg-slate-100 rounded-2xl text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#3182F6] transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-2xl bg-[#3182F6] text-white flex items-center justify-center disabled:opacity-40 disabled:bg-slate-300 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 대화방 나가기 다이얼로그 (토스 UX: 왼쪽 버튼 [닫기] 원칙) */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                대화방을 나가시겠어요?
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                대화방을 나가면 대화 내역이 모두 삭제되고 다시 복구할 수 없어요.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowExitModal(false)}
                className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors"
              >
                닫기
              </button>
              <button
                onClick={() => router.push("/chat")}
                className="flex-1 py-3 bg-rose-500 text-white font-bold text-xs rounded-xl hover:bg-rose-600 transition-colors"
              >
                나가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
