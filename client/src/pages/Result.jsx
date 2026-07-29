import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ScoreCard from "../components/ScoreCard";
import jsPDF from "jspdf";
import axios from "axios";
import FeedbackCard from "../components/FeedbackCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions, answers } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log("Result useEffect called");
    const evaluateInterview = async () => {
      console.log("Evaluate API called");
      try {
        const res = await axios.post(
          "http://localhost:5000/api/interview/evaluate",
          { questions, answers }
        );
        const aiFeedback = res.data.feedback;
        setFeedback(aiFeedback);

        const user = JSON.parse(localStorage.getItem("user"));

        const match = aiFeedback.match(/Overall Score:\s*(\d+)/);
        const calculatedScore = match ? Number(match[1]) : 0;

        setScore(calculatedScore);

        await axios.post("http://localhost:5000/api/interview/save", {
          user: user?._id || user?.id,
          role: localStorage.getItem("role"),
          level: localStorage.getItem("level"),
          difficulty: localStorage.getItem("difficulty"),
          techstack: localStorage.getItem("techstack"),
          questions,
          answers,
          feedback: aiFeedback,
          score: calculatedScore,
        });
      } catch (err) {
        console.log("Evaluation workflow crash:", err);
      } finally {
        setLoading(false);
      }
    };

    if (questions && answers) {
      evaluateInterview();
    } else {
      setLoading(false);
    }
  }, [questions, answers]);

  const getValue = (title) => {
    const regex = new RegExp(`${title}:\\s*(.*)`);
    return feedback.match(regex)?.[1] || "-";
  };

  const getSection = (title, nextTitle) => {
    const regex = new RegExp(`${title}:([\\s\\S]*?)${nextTitle}:`, "i");
    return feedback.match(regex)?.[1]?.trim() || "";
  };

  const chartData = [
    {
      name: "Technical",
      score: parseFloat(getValue("Technical Knowledge")) || 0,
    },
    {
      name: "Communication",
      score: parseFloat(getValue("Communication")) || 0,
    },
    {
      name: "Problem Solving",
      score: parseFloat(getValue("Problem Solving")) || 0,
    },
  ];

  useEffect(() => {
    if (!location.state) {
      navigate("/dashboard");
    }
  }, []);

  const downloadCertificate = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const user = JSON.parse(localStorage.getItem("user"));
    const today = new Date().toLocaleDateString();

    const pageWidth = doc.internal.pageSize.getWidth(); 
    const pageHeight = doc.internal.pageSize.getHeight(); 
    
    doc.setDrawColor(226, 232, 240); 
    doc.setLineWidth(1);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

    doc.setDrawColor(42, 117, 99);
    doc.setLineWidth(1.5);
    doc.rect(14, 14, pageWidth - 28, pageHeight - 28);

    doc.setLineWidth(3);
    
    doc.line(12, 14, 30, 14);
    doc.line(14, 12, 14, 30);
  
    doc.line(pageWidth - 12, 14, pageWidth - 30, 14);
    doc.line(pageWidth - 14, 12, pageWidth - 14, 30);
   
    doc.line(12, pageHeight - 14, 30, pageHeight - 14);
    doc.line(14, pageHeight - 12, 14, pageHeight - 30);
    
    doc.line(pageWidth - 12, pageHeight - 14, pageWidth - 30, pageHeight - 14);
    doc.line(pageWidth - 14, pageHeight - 12, pageWidth - 14, pageHeight - 30);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); 
    doc.text("VERIFIED TECHNICAL EVALUATION ACCOMPLISHMENT LOG", pageWidth / 2, 38, { align: "center" });

    doc.setFont("times", "bolditalic"); 
    doc.setFontSize(36);
    doc.setTextColor(15, 23, 42); 
    doc.text("Certificate of Achievement", pageWidth / 2, 54, { align: "center" });

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 2 - 40, 62, pageWidth / 2 + 40, 62);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.setTextColor(113, 128, 150); 
    doc.text("THIS SPECIFICATION NODE HONORS", pageWidth / 2, 75, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(30, 64, 175);
    doc.text(user?.name?.toUpperCase() || "CANDIDATE INSTANCE", pageWidth / 2, 90, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.setTextColor(113, 128, 150);
    doc.text(
      `for successfully demonstrating technical logic competencies, language delivery vectors,`,
      pageWidth / 2,
      105,
      { align: "center" }
    );
    doc.text(
      `and algorithmic runtime evaluations inside the machine system architecture environment.`,
      pageWidth / 2,
      113,
      { align: "center" }
    );

    doc.setFont("times", "bolditalic");
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    doc.text(`Completed: ${localStorage.getItem("role") || "AI Technical Round"} Track`, pageWidth / 2, 128, { align: "center" });

    doc.setFillColor(240, 253, 244); 
    doc.setDrawColor(220, 252, 231);
    doc.setLineWidth(0.5);
    doc.roundedRect(pageWidth / 2 - 35, 142, 70, 16, 3, 3, "FD"); 

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(21, 128, 61); 
    doc.text(`METRIC RATIO SCORE: ${score} / 100`, pageWidth / 2, 152, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184); 
    doc.text("DATE OF CREDENTIAL ISSUANCE", 45, 173);
    doc.setFont("courier", "bold");
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105);
    doc.text(today, 45, 180);
    doc.setDrawColor(203, 213, 225);
    doc.line(45, 175, 95, 175); 

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text("AUTHORIZED VERIFICATION SYSTEM", pageWidth - 95, 173);
    doc.setFont("times", "bolditalic");
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text("InterviewIQ AI Engine", pageWidth - 95, 181);
    doc.setDrawColor(203, 213, 225);
    doc.line(pageWidth - 95, 175, pageWidth - 45, 175);

    doc.save(`InterviewIQ_Certificate_${user?.name || "Candidate"}.pdf`);
  };

  return (
    <>
      
      <div className="min-h-screen bg-slate-950 text-white p-4 md:p-10 font-sans relative overflow-hidden">

        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

        {loading ? (
          <div className="flex flex-col justify-center items-center mt-40 z-10 relative">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-6 text-slate-400 font-semibold tracking-wider">
              AI is evaluating your interview...
            </p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto z-10 relative space-y-10">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
              🎯 Interview Result
            </h1>

            <ScoreCard score={score} />

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Technical Knowledge</h3>
                <p className="text-4xl font-black mt-3 text-emerald-400 font-mono">
                  {getValue("Technical Knowledge")}
                </p>
              </div>
              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Communication</h3>
                <p className="text-4xl font-black mt-3 text-blue-400 font-mono">
                  {getValue("Communication")}
                </p>
              </div>
              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Problem Solving</h3>
                <p className="text-4xl font-black mt-3 text-purple-400 font-mono">
                  {getValue("Problem Solving")}
                </p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl">
              <h2 className="text-xl font-extrabold text-emerald-400 mb-6 uppercase tracking-wider text-sm font-mono">
                📊 Metric Matrix Evaluation
              </h2>
              <div className="h-64 md:h-80 select-none">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontClassName="font-mono text-xs" />
                    <YAxis domain={[0, 10]} stroke="#94a3b8" fontClassName="font-mono text-xs" />
                    <Tooltip
                      contentStyle={{
                        background: "#0f172a",
                        border: "1px solid #1e293b",
                        borderRadius: "16px",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="score" fill="#00bfa5" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">

              <FeedbackCard
                title="Strengths Identified"
                icon="✅"
                content={getSection("Strengths", "Weaknesses") || "Analysing vectors..."}
                type="success"
              />

              <FeedbackCard
                title="Structural Weaknesses"
                icon="❌"
                content={getSection("Weaknesses", "Suggestions") || "Analysing vectors..."}
                type="danger"
              />

            </div>

            <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl">
              <h2 className="text-xl font-extrabold text-yellow-400 mb-4">💡 Upgrade Suggestions</h2>
              <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300 leading-relaxed font-medium">
                {getSection("Suggestions", "Final Feedback") || "Compiling improvement points..."}
              </pre>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl">
              <h2 className="text-xl font-extrabold text-cyan-400 mb-4">🤖 Summary Conclusion</h2>
              <pre className="whitespace-pre-wrap font-mono text-xs text-slate-300 bg-slate-950 p-5 border border-slate-800 rounded-2xl shadow-inner leading-relaxed">
                {feedback.split("Final Feedback:")[1] || feedback || "Awaiting calculation signals..."}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-6 pb-4">

              <button
                onClick={downloadCertificate}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-10 py-4.5 rounded-2xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 text-base flex items-center justify-center gap-2"
              >
                🏆 Download Certificate
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("questions");
                  localStorage.removeItem("draftAnswers");
                  localStorage.removeItem("draftQuestion");
                  navigate("/dashboard");
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-extrabold px-12 py-4.5 rounded-2xl tracking-wide shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 text-base flex items-center justify-center gap-2"
              >
                🚀 Return To Core Dashboard
              </button>

            </div>

          </div>
        )}
      </div>
    </>
  );
}

export default Result;
