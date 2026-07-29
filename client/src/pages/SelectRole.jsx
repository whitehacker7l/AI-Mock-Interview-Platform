import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AILoader from "../components/AILoader";
import RoleCard from "../components/RoleCard";

function SelectRole() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!role || !experience || !difficulty || !questions) {
      toast.error("Please configure all options to continue.");
      return;
    }
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
        "http://localhost:5000/api/interview/generate",
        {
          userId: user?._id || user?.id,
          role,
          level: experience,
          difficulty,
          techstack: role,
          questions: Number(questions),
        }
      );

      if (res.data && res.data.success) {
        localStorage.setItem("questions", JSON.stringify(res.data.questions));
        localStorage.setItem("role", role);
        localStorage.setItem("level", experience);
        localStorage.setItem("techstack", role);
        localStorage.setItem("difficulty", difficulty);
        navigate("/interview");
      } else {
        toast.error("Failed to generate questions from AI");
      }
    } catch (error) {
      console.log("Full Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <AILoader />}
      <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden flex justify-center items-center p-4 md:p-8 font-sans">
        
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="bg-slate-800/40 border border-slate-700/60 backdrop-blur-md shadow-2xl rounded-3xl p-6 md:p-8 w-full max-w-2xl z-10 transition-all duration-300">
          
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-[10px] font-bold tracking-widest uppercase font-mono mb-4 shadow-inner">
              ⚙️ Configuration Gateway
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
              Customize Interview
            </h1>
            <p className="text-slate-400 text-sm mt-1.5 font-medium">
              Setup parameters for the intelligent LLM instance
            </p>
          </div>

          <div className="space-y-6">
            
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-3 px-1 font-mono">
                Target Profile Role Track
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RoleCard roleName="Frontend Developer" description="React, HTML, CSS, JavaScript" icon="💻" isSelected={role === "Frontend Developer"} onClick={() => setRole("Frontend Developer")} />
                <RoleCard roleName="Backend Developer" description="Node, Express, MongoDB" icon="🖥️" isSelected={role === "Backend Developer"} onClick={() => setRole("Backend Developer")} />
                <RoleCard roleName="React Developer" description="React Hooks, Redux Toolkit" icon="⚛️" isSelected={role === "React Developer"} onClick={() => setRole("React Developer")} />
                <RoleCard roleName="Full Stack Developer" description="MERN Stack Architecture" icon="🚀" isSelected={role === "Full Stack Developer"} onClick={() => setRole("Full Stack Developer")} />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1 font-mono">
                Experience Level
              </label>
              <select
                className="w-full bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 rounded-xl p-4 outline-none text-slate-200 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold text-sm"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="" className="bg-slate-900">Select Experience</option>
                <option className="bg-slate-900">Fresher</option>
                <option className="bg-slate-900">1-2 Years</option>
                <option className="bg-slate-900">3-5 Years</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1 font-mono">
                AI Simulation Complexity
              </label>
              <select
                className="w-full bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 rounded-xl p-4 outline-none text-slate-200 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold text-sm"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="" className="bg-slate-900">Select Difficulty</option>
                <option className="bg-slate-900">Easy</option>
                <option className="bg-slate-900">Medium</option>
                <option className="bg-slate-900">Hard</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1 font-mono">
                Total Questions Length
              </label>
              <select
                className="w-full bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 rounded-xl p-4 outline-none text-slate-200 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold text-sm"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
              >
                <option value="" className="bg-slate-900">Number of Questions</option>
                <option className="bg-slate-900">5</option>
                <option className="bg-slate-900">10</option>
                <option className="bg-slate-900">15</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4.5 mt-2 bg-[#00bfa5] hover:bg-[#00a892] text-slate-950 font-extrabold rounded-2xl tracking-wide shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-center text-base"
            >
              {loading ? "Initializing Simulation Instance..." : "🚀 Generate AI Interview"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default SelectRole;
