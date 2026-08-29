import MobileHeader from "@/components/layout/MobileHeader";
import {
  ShieldCheck,
  Building2,
  ChevronRight,
  Sparkles,
  Settings,
  Heart,
  FileCheck,
  Lock,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MobileHeader title="내 프로필" showPoints={false} />

      <div className="p-4 flex flex-col gap-4">
        {/* 프로필 요약 카드 */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-900 flex items-center justify-center text-white text-xl font-bold shadow-md">
            나
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">내 프로필 설정</h2>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                인증 대기 중
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              직장인 인증을 완료하고 이성을 만나보세요
            </p>
          </div>
        </div>

        {/* 직장인 인증 센터 섹션 */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-5 text-white shadow-lg flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-400" />
              <h3 className="text-sm font-bold">직장인 인증 센터</h3>
            </div>
            <span className="text-[10px] bg-rose-500/80 px-2 py-0.5 rounded-full font-medium">
              신뢰도 UP
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            회사 이메일(@company.com) 인증 또는 명함/사원증 사진을 업로드하시면 <strong>인증 뱃지</strong>가 부여됩니다.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              <span>회사 메일 인증</span>
            </button>
            <button className="bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow">
              <FileCheck className="w-3.5 h-3.5" />
              <span>명함/서류 제출</span>
            </button>
          </div>
        </div>

        {/* 메뉴 리스트 */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">
          {[
            { label: "내가 보낸 좋아요 내역", icon: Heart, badge: "3건" },
            { label: "보유 하트 충전소", icon: Sparkles, badge: "50 H" },
            { label: "이상형 조건 설정 (나이, 지역, 직군)", icon: Settings, badge: null },
            { label: "계정 및 보안 설정", icon: Lock, badge: null },
          ].map((menu, idx) => {
            const Icon = menu.icon;
            return (
              <div
                key={idx}
                className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-semibold text-slate-800">{menu.label}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  {menu.badge && <span className="font-bold text-rose-500">{menu.badge}</span>}
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
