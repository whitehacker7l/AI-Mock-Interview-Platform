import React from "react";

function RoleCard({ roleName, description, icon, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`border rounded-2xl p-6 transition-all duration-300 cursor-pointer block text-left group relative overflow-hidden ${
        isSelected
          ? "bg-slate-800 border-emerald-500/80 shadow-emerald-500/10 shadow-lg"
          : "bg-slate-800/30 border-slate-800 hover:border-slate-700 shadow-md hover:-translate-y-0.5"
      }`}
    >
      <div className="flex items-start gap-4">
        
        <div className={`w-12 h-12 text-2xl rounded-xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-200 ${
          isSelected ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-900 text-slate-400"
        }`}>
          {icon || "💻"}
        </div>
        
        <div className="space-y-1 pr-6">
          <h3 className={`text-lg font-extrabold tracking-tight transition-colors ${
            isSelected ? "text-emerald-400" : "text-slate-200"
          }`}>
            {roleName}
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed font-medium">
            {description || "Launch customized algorithmic tracking scenario loops."}
          </p>
        </div>
      </div>

      {isSelected && (
        <span className="absolute bottom-2 right-2 text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded-md shadow-inner animate-pulse">
          SELECTED // ACTIVE
        </span>
      )}
    </div>
  );
}

export default RoleCard;
