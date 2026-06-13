import { useEffect, useRef, useState } from "react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  ticketId?: string;
  timestamp: string; // ISO
  read: boolean;
}

interface Props {
  showNotification: boolean;
  setShowNotification: () => void;
}

// ─── Config: icon, color, label per type ───────────────────────────────────────
const TYPE_CONFIG: Record<string, { icon: string; color: string; bg: string; label: string }> = {
  assigned:      { icon: "📥", color: "text-blue-600",    bg: "bg-blue-50 border-blue-100",       label: "Assigned" },
  sla_warning:   { icon: "⏰", color: "text-amber-600",   bg: "bg-amber-50 border-amber-100",     label: "SLA Warning" },
  sla_breach:    { icon: "🚨", color: "text-red-600",     bg: "bg-red-50 border-red-100",         label: "SLA Breached" },
  new_comment:   { icon: "💬", color: "text-violet-600",  bg: "bg-violet-50 border-violet-100",   label: "New Reply" },
  status_change: { icon: "🔄", color: "text-slate-600",   bg: "bg-slate-50 border-slate-100",     label: "Status Update" },
  resolved:      { icon: "✅", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100", label: "Resolved" },
  reassigned:    { icon: "🔁", color: "text-sky-600",     bg: "bg-sky-50 border-sky-100",         label: "Reassigned" },
  reopened:      { icon: "↩️", color: "text-orange-600",  bg: "bg-orange-50 border-orange-100",   label: "Reopened" },
  mention:       { icon: "@",  color: "text-pink-600",    bg: "bg-pink-50 border-pink-100",       label: "Mention" },
  escalation:    { icon: "⚡", color: "text-rose-600",    bg: "bg-rose-50 border-rose-100",       label: "Escalated" },
  system:        { icon: "📢", color: "text-indigo-600",  bg: "bg-indigo-50 border-indigo-100",   label: "Announcement" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-PH", { month: "short", day: "numeric" });
}

// ─── Notification Item ─────────────────────────────────────────────────────────
function NotificationItem({ n, onClick, onToggleRead }: { n: Notification; onClick: () => void; onToggleRead: () => void }) {
  const cfg = TYPE_CONFIG[n.type];
  return (
    <div
      onClick={onClick}
      className={`group flex gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-slate-50 last:border-b-0 ${
        n.read ? "bg-white hover:bg-slate-50" : "bg-blue-50/40 hover:bg-blue-50"
      }`}
    >
      {/* Icon */}
      <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border text-base ${cfg.bg}`}>
        <span className={cfg.color}>{cfg.icon}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm leading-snug ${n.read ? "font-medium text-slate-700" : "font-semibold text-slate-900"}`}>
            {n.title}
          </p>
          {!n.read && <span className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-1.5" />}
        </div>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{n.message}</p>
        <div className="flex items-center gap-2 mt-1.5">
          {n.ticketId && (
            <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">{n.ticketId}</span>
          )}
          <span className="text-[11px] text-slate-400">{timeAgo(n.timestamp)}</span>
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ml-auto ${cfg.bg} ${cfg.color} border-0 opacity-0 group-hover:opacity-100 transition-opacity`}>
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Mark read/unread toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleRead(); }}
        title={n.read ? "Mark as unread" : "Mark as read"}
        className="shrink-0 self-start mt-1 w-5 h-5 rounded-full border border-slate-200 text-slate-300 hover:border-blue-400 hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px]"
      >
        {n.read ? "↺" : "✓"}
      </button>
    </div>
  );
}











function Notification({showNotification, setShowNotification}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "n1",
      type: "assigned",
      title: "New ticket assigned to you",
      message: "\"Laptop overheating and randomly shutting down\" was assigned to you by Patricia Lim.",
      ticketId: "T26-03-000001",
      timestamp: "2026-03-26T15:42:00",
      read: false,
    },
    {
      id: "n2",
      type: "sla_warning",
      title: "SLA at risk — 2 hours remaining",
      message: "\"Monitor not powering on after startup\" is approaching its SLA deadline (Mar 26, 5:00 PM).",
      ticketId: "T26-03-000002",
      timestamp: "2026-03-26T14:55:00",
      read: false,
    },
    {
      id: "n3",
      type: "sla_breach",
      title: "SLA breached",
      message: "\"VPN access request\" has exceeded its resolution SLA by 4 hours.",
      ticketId: "T26-03-000009",
      timestamp: "2026-03-26T13:10:00",
      read: false,
    },
    {
      id: "n4",
      type: "new_comment",
      title: "New reply on your ticket",
      message: "Henry Jabunan replied: \"Still happening even after restart, please advise.\"",
      ticketId: "T26-03-000003",
      timestamp: "2026-03-26T12:30:00",
      read: false,
    },
    {
      id: "n5",
      type: "resolved",
      title: "Ticket resolved — feedback requested",
      message: "\"Keyboard not responding properly\" was marked resolved by John Arian Malondras. Please confirm if the issue is fixed.",
      ticketId: "T26-03-000003",
      timestamp: "2026-03-26T06:22:00",
      read: true,
    },
    {
      id: "n6",
      type: "status_change",
      title: "Ticket status updated",
      message: "\"Cannot access shared drive\" moved from In-Progress to Closed.",
      ticketId: "T26-03-000004",
      timestamp: "2026-03-25T17:05:00",
      read: true,
    },
    {
      id: "n7",
      type: "reassigned",
      title: "Ticket reassigned",
      message: "\"New office chair request\" was reassigned from you to Patricia Lim.",
      ticketId: "T26-03-000005",
      timestamp: "2026-03-25T11:20:00",
      read: true,
    },
    {
      id: "n8",
      type: "mention",
      title: "You were mentioned",
      message: "Patricia Lim mentioned you in a comment: \"@you can you check the server logs for this?\"",
      ticketId: "T26-03-000007",
      timestamp: "2026-03-24T16:48:00",
      read: true,
    },
    {
      id: "n9",
      type: "escalation",
      title: "Ticket escalated to Critical",
      message: "\"Email account locked\" priority was escalated from High to Critical due to repeated requests.",
      ticketId: "T26-03-000012",
      timestamp: "2026-03-24T09:15:00",
      read: true,
    },
    {
      id: "n10",
      type: "reopened",
      title: "Ticket reopened",
      message: "Ana Dela Cruz reopened \"Payslip not received Feb\" — issue was not fully resolved.",
      ticketId: "T26-03-000006",
      timestamp: "2026-03-23T08:00:00",
      read: true,
    },
    {
      id: "n11",
      type: "system",
      title: "Scheduled maintenance tonight",
      message: "The helpdesk portal will be unavailable from 10:00 PM to 12:00 AM for scheduled maintenance.",
      timestamp: "2026-03-22T10:00:00",
      read: true,
    },
  ]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowNotification();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function toggleRead(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  }

  function markRead(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  return (
    // <div className="fixed w-screen h-screen">
      <div className={`absolute bottom-0 left-12 mt-2 w-120 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-black/60 overflow-hidden z-50 animate-fade-in transition-all duration-300 ${showNotification ? 'left-12 scale-100 opacity-100' : '-translate-x-[calc(57%)] translate-y-[calc(47%)] scale-0 opacity-0 pointer-events-none' }`}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-[11px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Mark all read
              </button>
            )}
            <button onClick={() => setShowNotification()} className="text-slate-400 hover:text-slate-700 text-lg leading-none transition-colors">×</button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-105 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 gap-2 text-center px-6">
              <span className="text-3xl">🔔</span>
              <p className="text-sm font-semibold text-slate-600">
                {notifications.length === 0 ? "No notifications" : "You're all caught up"}
              </p>
              <p className="text-xs text-slate-400">
                {notifications.length === 0
                  ? "New ticket activity will show up here."
                  : "No notifications match this filter."}
              </p>
            </div>
          ) : (
            notifications.map(n => (
              <NotificationItem
                key={n.id}
                n={n}
                onClick={() => markRead(n.id)}
                onToggleRead={() => toggleRead(n.id)}
              />
            ))
          )}
        </div>
      </div>
    // </div>
  )
}

export default Notification