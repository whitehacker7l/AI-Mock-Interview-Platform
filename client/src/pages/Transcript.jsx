import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";

function Transcript() {
    const { id } = useParams();
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/interview/${id}`);
                setInterview(res.data.interview);
            } catch (err) {
                console.log("Transcript Fetch Fail:", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchInterview();
    }, [id]);

    const getGrade = (score) => {
        if (score >= 90) return "A+";
        if (score >= 80) return "A";
        if (score >= 70) return "B";
        if (score >= 60) return "C";
        return "D";
    };

    const downloadPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.text("AI Mock Interview Report", 20, 20);

        doc.setFontSize(14);

        doc.text(`Role: ${interview.role}`, 20, 40);

        doc.text(`Level: ${interview.level}`, 20, 50);

        doc.text(`Tech Stack: ${interview.techstack}`, 20, 60);

        doc.text(`Score: ${interview.score}`, 20, 70);

        doc.text(`Grade: ${getGrade(interview.score)}`, 20, 80);

        doc.text("Feedback:", 20, 95);

        doc.setFontSize(11);

        doc.text(
            interview.feedback,
            20,
            105,
            {
                maxWidth: 170
            }
        );

        doc.save("Interview-Report.pdf");

    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center font-sans">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm font-semibold text-slate-400 tracking-wider">Decrypting conversation logs node...</p>
            </div>
        );
    }

    if (!interview) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">
                            Transcript Not Found
                        </h1>

                        <Link
                            to="/history"
                            className="mt-6 inline-block bg-emerald-500 px-6 py-3 rounded-xl"
                        >
                            Back to History
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden p-6 md:p-12 font-sans">

                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-4xl mx-auto z-10 relative space-y-8">

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-800/40 border border-slate-700/60 backdrop-blur-md rounded-3xl p-6 shadow-xl">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-[10px] font-bold tracking-widest uppercase font-mono mb-2 shadow-inner">
                                🔒 Session Data Verified
                            </span>
                            <h1 className="text-3xl font-black bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
                                {interview?.role || "Technical Session"} Transcript
                            </h1>
                            <p className="text-slate-400 text-sm font-medium mt-1">
                                Experience Level: <span className="text-blue-400 font-bold">{interview?.level || "General"}</span>
                            </p>
                        </div>
                    
                        <div className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-2xl shadow-inner text-center shrink-0">
                            <span className="text-3xl font-black text-emerald-400 font-mono tracking-tighter block">
                                {interview?.score || 0}
                            </span>

                            <p className="text-emerald-300 font-bold mt-1">
                                Grade {getGrade(interview?.score || 0)}
                            </p>


                            <span className="text-[9px] text-slate-500 block font-bold uppercase tracking-wider mt-0.5">FINAL GRADE</span>
                        </div>
                    </div>

                    <div className="bg-slate-800/40 border border-slate-700/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl">
                        <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2 border-b border-slate-700/50 pb-3">
                            🎯 Evaluation Feedback Summary
                        </h2>
                        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl font-mono text-xs text-slate-300 leading-relaxed shadow-inner whitespace-pre-line">
                            {interview?.feedback || "No analytical text feedback generated for this instance."}
                        </div>
                    </div>

                    <div className="bg-slate-800/40 border border-slate-700/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
                        <h2 className="text-lg font-bold text-slate-200 border-b border-slate-700/50 pb-3 mb-2">
                            💬 Conversation History Blocks
                        </h2>

                        {interview?.questions && interview.questions.length > 0 ? (
                            interview.questions.map((q, index) => (
                                <div key={index} className="border-l-4 border-emerald-500/60 pl-4 py-2 space-y-3">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-mono">Question {index + 1}</span>
                                        <p className="text-sm font-bold text-slate-200 mt-0.5">{q}</p>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl shadow-inner">
                                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-mono mb-1">Candidate Answer:</span>
                                        <p className="text-xs font-semibold text-slate-400 leading-relaxed">
                                            {interview?.answers?.[index] || <span className="text-rose-400/80 italic font-medium">Answer input bypassed / field empty.</span>}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm font-medium text-slate-500 italic">No question transcript structures mapped in this token parameters.</p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-6 pb-2">

                        <Link
                            to="/history"
                            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm text-center flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                        >
                            ← Back to Log History Vault
                        </Link>

                        <button
                            onClick={downloadPDF}
                            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 text-sm flex items-center justify-center gap-2"
                        >
                            📄 Download PDF Transcript
                        </button>

                    </div>


                </div>
            </div>
        </>);
}

export default Transcript;
