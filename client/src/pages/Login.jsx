import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Welcome back! Login Successful 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (


    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden flex justify-center items-center p-4 font-sans">
      
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="bg-slate-800/40 border border-slate-700/60 backdrop-blur-md w-full max-w-md rounded-3xl shadow-2xl p-8 md:p-10 z-10">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center mx-auto text-3xl shadow-xl shadow-emerald-500/10 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            🤖
          </div>
          <h1 className="text-3xl font-black mt-5 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm mt-1.5 font-medium">
            Log in to continue your AI mock preparations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">
              Registered Email
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                📧
              </span>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 rounded-xl outline-none text-slate-200 placeholder-slate-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">
              Secure Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                🔒
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 rounded-xl outline-none text-slate-200 placeholder-slate-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-emerald-500/10 disabled:opacity-50 disabled:pointer-events-none text-center text-base"
          >
            {loading ? "Authenticating Gateway..." : "Secure Sign In ➜"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-400 font-medium">
          New to the portal?{" "}
          <Link
            to="/signup"
            className="text-emerald-400 ml-1 font-bold hover:text-emerald-300 transition-colors hover:underline"
          >
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;