import { Link } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between">
      
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center z-10 flex-1 flex flex-col justify-center items-center">
        
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700/60 text-emerald-400 text-xs font-semibold tracking-wide mb-6 uppercase shadow-inner animate-pulse">
          ✨ Next-Gen AI Feedback v2.0
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-[1.15]">
          Crack Your Next Tech Job With{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
            AI-Powered
          </span>{" "}
          Mock Interviews
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          Practice standard technical and behavioral rounds with intelligent LLMs. Receive instant grading, detailed metrics, and code improvement suggestions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center">
          <Link
            to="/signup"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5 text-center text-base"
          >
            🚀 Get Started For Free
          </Link>
          <Link
            to="/login"
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 backdrop-blur-md text-center text-base"
          >
            Sign In Account
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 w-full max-w-4xl text-left">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-2xl mb-3">🤖</div>
            <h3 className="font-bold text-slate-200 mb-1">Tailored Tech Stacks</h3>
            <p className="text-sm text-slate-400">Questions generated for Frontend, Backend, or Full Stack specifications.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="font-bold text-slate-200 mb-1">Detailed Score Breakdown</h3>
            <p className="text-sm text-slate-400">Get rated instantly based on structural logic, tech knowledge, and grammar.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-2xl mb-3">📜</div>
            <h3 className="font-bold text-slate-200 mb-1">Persistent History Logs</h3>
            <p className="text-sm text-slate-400">Keep tracking past attempts and track your preparation curves over days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
