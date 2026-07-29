import React from "react";

function ScoreCard({ score, title = "Overall Performance Score" }) {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col justify-center relative overflow-hidden transform hover:scale-[1.01] transition-all group">
      
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-xl group-hover:scale-110 transition-transform" />
      
      <h2 className="text-sm md:text-base text-white/80 font-bold uppercase tracking-wider font-sans">
        {title}
      </h2>
      <h1 className="text-5xl md:text-7xl font-black mt-2 font-mono tracking-tighter text-white">
        {score}
        <span className="text-lg md:text-2xl font-normal text-white/40 font-sans tracking-normal ml-1">/ 100</span>
      </h1>
    </div>
  );
}

export default ScoreCard;
