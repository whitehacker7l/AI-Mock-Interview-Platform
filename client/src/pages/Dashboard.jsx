import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState({
    totalInterviews: 0,
    bestScore: 0,
    averageScore: 0,
    latestScore: 0,
    graphData: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(
          `http://localhost:5000/api/interview/dashboard/${user._id}`
        );
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 p-4 md:p-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 md:p-10 text-white shadow-xl">
          <h1 className="text-3xl md:text-5xl font-black">
            Welcome Back 👋
          </h1>
          <p className="mt-3 text-slate-300 text-lg">
            {user?.name || "Candidate"}
          </p>
          <p className="mt-6 text-slate-400 max-w-2xl">
            Practice AI powered mock interviews, improve your skills,
            track your progress and crack your dream company.
          </p>

          <Link
            to="/select-role"
            className="inline-block mt-8 bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-xl font-bold transition"
          >
            🚀 Start Interview
          </Link>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-slate-500 font-semibold">
              Total Interviews
            </h2>

            <p className="text-5xl font-black mt-5 text-blue-600">
              {stats.totalInterviews}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-slate-500 font-semibold">
              Best Score
            </h2>

            <p className="text-5xl font-black mt-5 text-green-600">
              {stats.bestScore}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-slate-500 font-semibold">
              Average Score
            </h2>

            <p className="text-5xl font-black mt-5 text-orange-500">
              {stats.averageScore}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-slate-500 font-semibold">
              Latest Score
            </h2>

            <p className="text-5xl font-black mt-5 text-purple-600">
              {stats.latestScore}
            </p>

          </div>

        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-xl p-8 mt-12 text-white">

          <>
            <h2 className="text-3xl font-black mb-2">
              📈 Performance Analytics
            </h2>

            <p className="text-slate-400 mb-8">
              Your interview performance over time
            </p>
          </>
          {stats.graphData.length === 0 ? (
            <div className="h-80 flex items-center justify-center text-slate-400">
              No interview data available yet.
            </div>
          ) : (
            <div className="h-64 md:h-80">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={stats.graphData}>

                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="#334155"
                    strokeDasharray="5 5"
                  />

                  <XAxis
                    dataKey="interview"
                    stroke="#94a3b8"
                  />

                  <YAxis
                    domain={[0, 100]}
                    stroke="#94a3b8"
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "none",
                      borderRadius: "12px",
                      color: "#fff"
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="url(#colorScore)"
                    strokeWidth={4}
                    dot={{
                      r: 6,
                      fill: "#10b981",
                      stroke: "#ffffff",
                      strokeWidth: 2
                    }}
                    activeDot={{
                      r: 9
                    }}
                    animationDuration={1500}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>
          )}
          
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mt-14 mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            to="/select-role"
            className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-1 transition"
          >

            <div className="text-5xl">🎤</div>

            <h3 className="text-2xl font-bold mt-5">
              New Interview
            </h3>

            <p className="text-slate-500 mt-3">
              Generate a fresh AI interview.
            </p>

          </Link>

          <Link
            to="/history"
            className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-1 transition"
          >

            <div className="text-5xl">📜</div>

            <h3 className="text-2xl font-bold mt-5">
              Interview History
            </h3>

            <p className="text-slate-500 mt-3">
              View all previous interviews.
            </p>

          </Link>

          <Link
            to="/profile"
            className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-1 transition"
          >

            <div className="text-5xl">👤</div>

            <h3 className="text-2xl font-bold mt-5">
              My Profile
            </h3>

            <p className="text-slate-500 mt-3">
              Update your account information.
            </p>

          </Link>

        </div>

      </div>
    </>
  );
}

export default Dashboard;