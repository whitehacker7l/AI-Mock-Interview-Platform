import React from "react";

function ProgressBar({ current, total }) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full space-y-2 select-none">
      <div className="flex justify-between items-baseline">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
          Simulation Progress
        </span>
        <span className="text-base font-black text-blue-400 font-mono">
          {current} <span className="text-slate-600 font-medium text-xs">/ {total}</span>
        </span>
      </div>
      
      <div className="w-full bg-slate-950 border border-slate-800 rounded-full h-3.5 p-0.5 shadow-inner">
        <div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500 shadow-md shadow-blue-500/20"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
