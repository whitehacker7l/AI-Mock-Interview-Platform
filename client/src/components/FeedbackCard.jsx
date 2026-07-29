import React from "react";

function FeedbackCard({ title, icon, content, type = "default" }) {
  const typeStyles = {
    success: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-950/10",
      titleColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
    },
    danger: {
      border: "border-rose-500/30",
      bg: "bg-rose-950/10",
      titleColor: "text-rose-400",
      iconBg: "bg-rose-500/10",
    },
    warning: {
      border: "border-amber-500/30",
      bg: "bg-amber-950/10",
      titleColor: "text-amber-400",
      iconBg: "bg-amber-500/10",
    },
    default: {
      border: "border-slate-700/60",
      bg: "bg-slate-800/40",
      titleColor: "text-slate-200",
      iconBg: "bg-slate-700/40",
    },
  };

  const currentStyle = typeStyles[type] || typeStyles.default;

  return (
    <div
      className={`border rounded-3xl p-6 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-slate-600 group flex flex-col justify-between ${currentStyle.border} ${currentStyle.bg}`}
    >
      <div>
        <div className="flex items-center gap-3 border-b border-slate-800/60 pb-4 mb-4">
          <div
            className={`w-11 h-11 text-xl rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300 ${currentStyle.iconBg}`}
          >
            {icon || "📝"}
          </div>
          <h3 className={`text-lg font-extrabold tracking-tight ${currentStyle.titleColor}`}>
            {title}
          </h3>
        </div>
        <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300 leading-relaxed font-medium">
          {content || "Analyzing system vectors parameters..."}
        </pre>
      </div>
      <div className="flex justify-end pt-4 mt-2 border-t border-slate-800/40 opacity-40 group-hover:opacity-100 transition-opacity">
        <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500">
          AI_ANALYTICS_NODE // OK
        </span>
      </div>
    </div>
  );
}

export default FeedbackCard;
