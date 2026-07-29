import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/interview/history/${user._id}`
        );

        if (res.data.success) {
          setHistory(res.data.interviews);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (user?._id) {
      fetchHistory();
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
  <>
    <Navbar/>
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden flex justify-center items-center p-4 md:p-8 font-sans">

      {/* 🌀 BACKGROUND GLOW AURAS */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* MAIN CONTAINER (Kept Your Width & Formatting Specs) */}
      <div className="bg-slate-800/40 border border-slate-700/60 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-5xl mx-2 md:mx-auto overflow-hidden z-10">

        {/* Header - Kept Layout, Updated to Cyber Gradient */}
        <div className="bg-gradient-to-r from-emerald-500/30 via-teal-600/40 to-blue-600/30 h-32 md:h-40 border-b border-slate-700/40 relative">
          <div className="absolute -bottom-14 left-10">
            {/* Avatar Photo Frame */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-slate-800 border-4 border-slate-700 shadow-xl flex items-center justify-center text-5xl transform hover:scale-105 transition-transform duration-300">
              👤
            </div>
          </div>
        </div>

        {/* Content Panel Area */}
        <div className="pt-16 md:pt-20 px-4 md:px-10 pb-8 md:pb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
                {user?.name || "Candidate Instance"}
              </h1>
              <p className="text-slate-400 font-medium mt-1">
                {user?.email || "anonymous@gateway.io"}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold tracking-wider uppercase font-mono shadow-inner">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Verified Profile
            </span>
          </div>

          {/* 📊 THE 3 BENTO CARDS GRID (Kept Layout, Updated Theme) */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">

            {/* Card 1: Preferred Role */}
            <div className="bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 text-center shadow-md transition-all duration-300 group">
              <h2 className="text-blue-400 text-3xl mb-2 group-hover:scale-110 transition-transform">💼</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Preferred Role</p>
              <h3 className="text-lg font-black text-slate-200 mt-2 truncate">
                {localStorage.getItem("role") || "Not Selected"}
              </h3>
            </div>

            {/* Card 2: Total Interviews Mock Count */}
            <div className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 text-center shadow-md transition-all duration-300 group">
              <h2 className="text-emerald-400 text-3xl mb-2 group-hover:scale-110 transition-transform">📈</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Interviews Taken</p>
              <h3 className="text-2xl font-black text-slate-200 mt-2 font-mono">
                {history.length}
              </h3>
            </div>

            {/* Card 3: Personal Best Score Grade */}
            <div className="bg-slate-900/60 border border-slate-800 hover:border-yellow-500/40 rounded-2xl p-6 text-center shadow-md transition-all duration-300 group">
              <h2 className="text-yellow-400 text-3xl mb-2 group-hover:scale-110 transition-transform">🏆</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Best Assessment</p>
              <h3 className="text-2xl font-black text-slate-200 mt-2 font-mono">
                {history.length
                  ? Math.max(...history.map((item) => item.score || 0))
                  : 0}
              </h3>
            </div>

          </div>

          <div className="mt-10 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-inner">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-200 mb-6 flex items-center gap-2">
              ⚙️ Account Information Credentials
            </h2>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex flex-col sm:flex-row justify-betweenborder-b border-slate-800 pb-3 text-slate-300">
                <span className="font-sans font-bold text-slate-500">Name</span>
                <span className="font-semibold">{user?.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-betweenborder-b border-slate-800 pb-3 text-slate-300">
                <span className="font-sans font-bold text-slate-500">Email</span>
                <span className="font-semibold select-all">{user?.email}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-betweentext-slate-300 pt-1">
                <span className="font-sans font-bold text-slate-500">Account Status</span>
                <span className="text-emerald-400 font-bold uppercase tracking-wide text-xs bg-emerald-950/40 border border-emerald-900/50 px-2.5 py-0.5 rounded-md">
                  Active
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="mt-10 w-full bg-rose-600/10 hover:bg-rose-600 border border-rose-500/30 hover:border-rose-500 text-rose-400 hover:text-white py-4 rounded-2xl font-bold transition-all duration-300 transform active:scale-[0.99] shadow-md tracking-wide"
          >
            Terminal Sign Out & Clear Tokens
          </button>

        </div>
      </div>
    </div>
  </>);
}

export default Profile;
