import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const active =
    "text-emerald-400 border-b-2 border-emerald-400";

  const normal =
    "text-slate-300 hover:text-white transition";

  return (

    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex justify-between items-center">

        <Link
          to="/dashboard"
          className="text-xl md:text-2xl font-black text-white"
        >
          InterviewIQ AI
        </Link>

        <div className="hidden md:flex gap-8 font-semibold">

          <Link
            to="/dashboard"
            className={
              location.pathname === "/dashboard"
                ? active
                : normal
            }
          >
            Dashboard
          </Link>

          <Link
            to="/select-role"
            className={
              location.pathname === "/select-role"
                ? active
                : normal
            }
          >
            Interview
          </Link>

          <Link
            to="/history"
            className={
              location.pathname === "/history"
                ? active
                : normal
            }
          >
            History
          </Link>

          <Link
            to="/profile"
            className={
              location.pathname === "/profile"
                ? active
                : normal
            }
          >
            Profile
          </Link>

        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-3xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>


        <div className="hidden md:flex items-center gap-5">

          <div className="text-right">

            <h3 className="text-white font-semibold">
              {user?.name}
            </h3>

            <p className="text-slate-400 text-sm">
              {user?.email}
            </p>

          </div>

          <div className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold"
          >
            Logout
          </button>

        </div>

      </div>
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-5 space-y-4">

          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-300 hover:text-emerald-400"
          >
            Dashboard
          </Link>

          <Link
            to="/select-role"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-300 hover:text-emerald-400"
          >
            Interview
          </Link>

          <Link
            to="/history"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-300 hover:text-emerald-400"
          >
            History
          </Link>

          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-300 hover:text-emerald-400"
          >
            Profile
          </Link>

          <hr className="border-slate-700" />

          <p className="text-white font-semibold">
            {user?.name}
          </p>

          <p className="text-slate-400 text-sm">
            {user?.email}
          </p>

          <button
            onClick={logout}
            className="w-full bg-red-500 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>

        </div>
      )}

    </nav>
  );
}

export default Navbar;