import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await registerUser({
        name,
        email,
        password,
      });

      toast.success("Account Created Successfully 🎉");

      navigate("/login");

    } catch (err) {
      console.log("Signup Axios Error Detail:", err);
      toast.error(err.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden flex items-center justify-center p-4 md:p-6 font-sans">

      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="bg-slate-800/40 border border-slate-700/60 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden flex w-full max-w-6xl z-10">

        <div className="hidden lg:flex w-1/2 flex-col justify-center bg-gradient-to-br from-slate-900/90 via-slate-800/60 to-slate-900/90 border-r border-slate-700/50 p-12 relative overflow-hidden">
          
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]" />

          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-emerald-400 text-[10px] font-bold tracking-widest uppercase shadow-inner">
              🤖 Intelligent Mock Engine
            </span>
            <h1 className="text-5xl font-black tracking-tight leading-[1.15] bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
              AI Mock Interview
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md font-medium">
              Practice smarter, gain data-driven confidence, and crack your dream core engineering roles.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-800/80 mt-12">
              <div className="text-left border-l-2 border-emerald-500 pl-3">
                <h2 className="text-3xl font-black text-white font-mono tracking-tight">10K+</h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">Active Nodes</p>
              </div>
              <div className="text-left border-l-2 border-blue-500 pl-3">
                <h2 className="text-3xl font-black text-white font-mono tracking-tight">50K+</h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">Rounds Fired</p>
              </div>
              <div className="text-left border-l-2 border-purple-500 pl-3">
                <h2 className="text-3xl font-black text-white font-mono tracking-tight">4.9★</h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">Metrics Rank</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 md:p-12 bg-slate-900/20">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">

            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center mx-auto text-3xl shadow-xl shadow-emerald-500/10 transform -rotate-3 mb-5">
                🚀
              </div>
              <h2 className="text-3xl font-black text-slate-100 tracking-tight">
                Create Account
              </h2>
              <p className="text-slate-400 text-sm mt-1.5 font-medium">
                Join the automated AI interview simulation platform
              </p>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">👤</span>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 rounded-xl outline-none text-slate-200 placeholder-slate-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">📧</span>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 rounded-xl outline-none text-slate-200 placeholder-slate-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">
                Secure Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔒</span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 rounded-xl outline-none text-slate-200 placeholder-slate-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-emerald-500/10 disabled:opacity-50 disabled:pointer-events-none text-center text-base"
            >
              {loading ? "Registering Credentials..." : "Create Account ➜"}
            </button>

            <p className="text-center mt-6 text-sm text-slate-400 font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-400 ml-1 font-bold hover:text-emerald-300 transition-colors hover:underline"
              >
                Login
              </Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Signup;
