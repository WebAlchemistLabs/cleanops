"use client";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { X, Send, Sparkles, Loader2, ChevronDown, RotateCcw, Bot, User } from "lucide-react";
import type { ChatMessage } from "@/types";

const SUGGESTIONS = [
  "Who are my top customers?",
  "Which crew performs best?",
  "Any unassigned jobs?",
  "How's revenue this month?",
  "What's the cancellation rate?",
];

export function ChatWidget() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "there";
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMessage[]>([{
    id: "w", role: "assistant",
    content: `Hi ${firstName}! I know your business data. Ask me anything — revenue, jobs, customers, staff, or performance.`,
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSugg, setShowSugg] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 80); }, [open]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  async function send(text?: string) {
    const c = (text || input).trim();
    if (!c || loading) return;
    setInput(""); setShowSugg(false);
    const userMsg: ChatMessage = { id: `u${Date.now()}`, role: "user", content: c, timestamp: new Date() };
    setMsgs((p) => [...p, userMsg]);
    setLoading(true);
    try {
      const apiMsgs = [...msgs, userMsg].filter((m) => m.id !== "w").map((m) => ({ role: m.role, content: m.content }));
      if (!apiMsgs.find((m) => m.role === "user" && m.content === c)) apiMsgs.push({ role: "user", content: c });
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: apiMsgs }) });
      const data = await res.json();
      setMsgs((p) => [...p, { id: `a${Date.now()}`, role: "assistant", content: data.reply || "Sorry, try again.", timestamp: new Date() }]);
    } catch {
      setMsgs((p) => [...p, { id: `e${Date.now()}`, role: "assistant", content: "Something went wrong. Please try again.", timestamp: new Date() }]);
    } finally { setLoading(false); }
  }

  function reset() {
    setMsgs([{ id: "w", role: "assistant", content: `Hi ${firstName}! Ask me anything about your business.`, timestamp: new Date() }]);
    setShowSugg(true); setInput("");
  }

  return (
    <>
      {/* FAB */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        {!open && (
          <div className="bg-[#111119] border border-[rgba(255,255,255,0.1)] rounded-xl px-3 py-2 text-xs text-[#EFEFF4] font-medium shadow-[0_4px_20px_rgba(0,0,0,0.5)] whitespace-nowrap animate-[fade-up_0.4s_ease-out_forwards]">
            Ask your AI assistant ✨
          </div>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-13 h-13 w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: open ? "#18181F" : "linear-gradient(135deg,#00D4FF,#0087A8)",
            border: open ? "1px solid rgba(255,255,255,0.1)" : "none",
            boxShadow: open ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,212,255,0.4)",
          }}
        >
          {open ? <ChevronDown className="w-5 h-5 text-[#8B8B9E]" /> : <Sparkles className="w-5 h-5 text-[#09090F]" />}
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-[76px] right-5 z-50 flex flex-col rounded-2xl overflow-hidden animate-[slide-up_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]"
          style={{ width: 350, height: 500, background: "#0E0E16", border: "1px solid rgba(255,255,255,0.09)", boxShadow: "0 24px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,212,255,0.07)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 shrink-0" style={{ background: "linear-gradient(135deg,rgba(0,212,255,0.07),rgba(0,87,168,0.05))", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-[#0E0E16]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#EFEFF4]">CleanOps AI</p>
              <p className="text-[10px] text-[#22C55E] font-medium">Online · Knows your data</p>
            </div>
            <button onClick={reset} className="w-6 h-6 rounded-lg flex items-center justify-center text-[#5A5A72] hover:text-[#8B8B9E] hover:bg-[rgba(255,255,255,0.05)]" title="Reset">
              <RotateCcw className="w-3 h-3" />
            </button>
            <button onClick={() => setOpen(false)} className="w-6 h-6 rounded-lg flex items-center justify-center text-[#5A5A72] hover:text-[#8B8B9E] hover:bg-[rgba(255,255,255,0.05)]">
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
            {msgs.map((m) => {
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isUser ? "bg-[#00D4FF] text-[#09090F]" : "bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.2)]"}`}>
                    {isUser ? <User className="w-3 h-3" strokeWidth={2.5} /> : <Bot className="w-3 h-3 text-[#00D4FF]" />}
                  </div>
                  <div className={`max-w-[80%] flex flex-col gap-1 ${isUser ? "items-end" : ""}`}>
                    <div className={`px-3 py-2 rounded-xl text-xs leading-relaxed ${isUser ? "bg-[#00D4FF] text-[#09090F] font-medium rounded-br-sm" : "bg-[#1A1A26] border border-[rgba(255,255,255,0.07)] text-[#E0E0E8] rounded-bl-sm"}`}>
                      {m.content}
                    </div>
                    <span className="text-[10px] text-[#5A5A72] px-1">{m.timestamp.toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>
              );
            })}
            {loading && (
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center shrink-0"><Bot className="w-3 h-3 text-[#00D4FF]" /></div>
                <div className="bg-[#1A1A26] border border-[rgba(255,255,255,0.07)] rounded-xl rounded-bl-sm px-3 py-2.5">
                  <div className="flex items-center gap-1">
                    {[0,1,2].map((i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8B8B9E] animate-bounce-dot" style={{ animationDelay: `${i*0.2}s` }} />)}
                  </div>
                </div>
              </div>
            )}
            {showSugg && msgs.length === 1 && !loading && (
              <div className="space-y-2 pt-1">
                <p className="text-[10px] font-semibold text-[#5A5A72] uppercase tracking-widest">Try asking</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((q) => (
                    <button key={q} onClick={() => send(q)} className="px-2.5 py-1 rounded-xl text-[11px] font-medium text-[#8B8B9E] hover:text-[#00D4FF] transition-colors" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-2.5 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about your business..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                disabled={loading}
                className="flex-1 bg-transparent text-xs text-[#E0E0E8] placeholder:text-[#5A5A72] outline-none"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="w-6 h-6 rounded-lg flex items-center justify-center transition-all disabled:opacity-40"
                style={{ background: input.trim() && !loading ? "linear-gradient(135deg,#00D4FF,#0087A8)" : "rgba(255,255,255,0.06)" }}
              >
                {loading ? <Loader2 className="w-3 h-3 text-[#5A5A72] animate-spin" /> : <Send className="w-3 h-3" style={{ color: input.trim() ? "#09090F" : "#5A5A72" }} />}
              </button>
            </div>
            <p className="text-[9px] text-[#5A5A72] text-center mt-1.5">Powered by GPT-4o · Sees your live data</p>
          </div>
        </div>
      )}
    </>
  );
}
