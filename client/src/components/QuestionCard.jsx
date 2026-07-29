import React from "react";

function QuestionCard({
  questionNumber,
  totalQuestions,
  questionText,
  onSpeak,
}) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 min-h-[180px] flex flex-col justify-center relative shadow-inner group">

      <div className="absolute top-3 left-4 text-xs font-bold text-slate-600 uppercase tracking-widest">
        System Prompt Question
      </div>

      <div className="absolute top-3 right-4 text-xs font-bold text-blue-400 font-mono">
        {questionNumber} / {totalQuestions}
      </div>

      <h2 className="text-lg md:text-xl font-medium text-center text-slate-200 leading-relaxed max-w-2xl mx-auto mt-6">
        {questionText || (
          <span className="text-slate-500 animate-pulse">
            🔄 Pulling context from local session variables...
          </span>
        )}
      </h2>
      
      <div className="flex justify-center mt-6">
        <button
          onClick={onSpeak}
          className="bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded-xl font-semibold transition"
        >
          🔊 Speak Question
        </button>
      </div>

    </div>
  );
}

export default QuestionCard;