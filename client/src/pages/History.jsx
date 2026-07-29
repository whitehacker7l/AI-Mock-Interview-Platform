import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

function History() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id || user?.id;

        if (!userId) {
          toast.error("Telemetry Session Missing: Please log in.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/interview/history/${userId}`);

        if (res.data.success) {
          setInterviews(res.data.interviews);
        }
      } catch (error) {
        console.error("History Matrix Error:", error);
        toast.error("Failed to load interview history stream");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center font-sans">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-400 tracking-wider">Syncing past simulation blocks...</p>
      </div>
    );
  }

  const filteredInterviews = interviews.filter((item) => {
    return (
      item.role?.toLowerCase().includes(search.toLowerCase()) ||
      item.techstack?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const scoreColor = (score) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden p-4 md:p-12 font-sans">

        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto z-10 relative">
          
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold tracking-wider uppercase font-mono shadow-inner mb-3">
              📜 History Vault
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
              Interview History Logs
            </h1>
            <p className="text-slate-400 font-medium mt-1">Review all your previous high-fidelity AI mock sessions</p>
            <div className="mt-6">
              <input
                type="text"
                placeholder="🔍 Search by role or tech stack..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {filteredInterviews.length === 0 ? (
         
            <div className="bg-slate-800/40 border border-slate-700/60 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl">
              <span className="text-3xl md:text-4xl mb-3 block">📭</span>
              <p className="text-slate-400 text-lg font-medium">No simulation records logged inside this node yet.</p>
              <p className="text-slate-500 text-sm mt-1">Go ahead and launch your first AI interview configuration! 🚀</p>
            </div>
          ) : (
            
            <div className="grid md:grid-cols-2 gap-6">
              {filteredInterviews.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-slate-800/40 border border-slate-700/60 backdrop-blur-md rounded-3xl shadow-xl p-6 hover:border-slate-600 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                   
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-extrabold text-slate-100 tracking-tight group-hover:text-white transition-colors">
                          {item.role}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className="text-[10px] font-bold px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 uppercase tracking-wide">
                            {item.level}
                          </span>
                          <span className="text-[10px] font-bold px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-blue-400 uppercase tracking-wide">
                            {item.difficulty || "Medium"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right shrink-0 bg-slate-900/60 border border-slate-800 px-3.5 py-2 rounded-2xl shadow-inner">
                        <span className={`text-2xl font-black ${scoreColor(item.score)} font-mono tracking-tighter`}>
                          {item.score || 0}
                        </span>
                        <span className="text-[9px] text-slate-500 block font-bold uppercase tracking-wider mt-0.5">SCORE</span>
                        <p className="text-xs mt-2">
                          {item.score >= 90
                            ? "🏆 Excellent"
                            : item.score >= 75
                              ? "🔥 Good"
                              : item.score >= 60
                                ? "👍 Average"
                                : "📘 Beginner"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 mt-5 shadow-inner">
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1 font-mono">Target Repository / Tech Stack</p>
                      <p className="text-sm text-slate-300 font-semibold">{item.techstack || item.role}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800/80">
                    <span className="text-xs text-slate-500 font-mono">
                      TIMESTAMP: {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => navigate(`/transcript/${item._id}`)}
                      className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors tracking-wide flex items-center gap-1 font-mono uppercase bg-emerald-950/20 border border-emerald-900/30 px-3 py-1.5 rounded-xl"
                    >
                      View Transcript ➜
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>);
}

export default History;
