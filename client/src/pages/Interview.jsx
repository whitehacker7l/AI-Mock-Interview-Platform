import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

function Interview() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setAnswer((prev) => prev + " " + transcript);
    };

    recognition.onerror = () => {
      toast.error("Voice Recognition Failed");
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("questions"));

    if (data) {
      const questionArray = data
        .split("\n")
        .map((q) => q.replace(/^\d+[\s\.)\-]+/, "").trim())
        .filter((q) => q !== "");

      setQuestions(questionArray);

      setTimeLeft(questionArray.length * 120);
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && questions.length > 0) {

      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestion] = answer;

      toast.success("⏳ Time is over! Interview submitted automatically.");

      navigate("/result", {
        state: {
          questions,
          answers: updatedAnswers,
        },
      });
    }
  }, [timeLeft]);

  useEffect(() => {
    window.speechSynthesis?.cancel();
  }, [currentQuestion]);

  const handleNext = () => {
    const updated = [...answers];
    updated[currentQuestion] = answer;
    setAnswers(updated);
    localStorage.setItem("draftAnswers", JSON.stringify(updated));
    localStorage.setItem("draftQuestion", currentQuestion + 1);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer(updated[currentQuestion + 1] || "");
    } else {
      navigate("/result", {
        state: { questions, answers: updated },
      });
    }
  };

  const handlePrevious = () => {
    const updated = [...answers];
    updated[currentQuestion] = answer;
    setAnswers(updated);
    localStorage.setItem("draftAnswers", JSON.stringify(updated));
    localStorage.setItem("draftQuestion", currentQuestion - 1);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswer(updated[currentQuestion - 1] || "");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      toast.error("Speech Recognition not supported.");
      return;
    }

    recognitionRef.current.start();
  };

  const speakQuestion = (text) => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden flex justify-center items-center p-4 md:p-8">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="bg-slate-800/50 border border-slate-700/60 backdrop-blur-xl w-full max-w-4xl rounded-3xl shadow-2xl p-4 md:p-10 z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center border-b border-slate-700/50 pb-6 mb-8 gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                Live Evaluation Session
              </h1>
            </div>
            <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 shadow-inner">
              ⚡ Questions Remaining: {questions.length - currentQuestion - 1}
              ⏳ {formatTime(timeLeft)}
            </div>
          </div>

          <ProgressBar
            current={currentQuestion + 1}
            total={questions.length}
          />

          <QuestionCard
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            questionText={questions[currentQuestion]}
            onSpeak={() => speakQuestion(questions[currentQuestion])}
          />

          <div className="mt-8 relative">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
              Construct Your Technical Answer
            </label>
            <textarea
              rows="5"
              placeholder="Structure your solution logically. Feel free to explain step-by-step or mention architectural patterns..."
              className="w-full p-5 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 rounded-2xl outline-none text-slate-200 placeholder-slate-600 focus:border-blue-500/80 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 resize-none font-sans shadow-inner leading-relaxed"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);

                const updated = [...answers];
                updated[currentQuestion] = e.target.value;

                setAnswers(updated);

                localStorage.setItem(
                  "draftAnswers",
                  JSON.stringify(updated)
                );
              }}
            />
            <div className="mt-4">
              <button
                onClick={startListening}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold transition ${isListening
                  ? "bg-red-600"
                  : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {isListening ? "🎙 Listening..." : "🎤 Speak Answer"}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-300 font-semibold transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              ⬅ Back Track
            </button>

            <button
              onClick={handleNext}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 shadow-lg ${currentQuestion === questions.length - 1
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/10 hover:shadow-emerald-500/20"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/10 hover:shadow-blue-500/20"
                }`}
            >
              {currentQuestion === questions.length - 1 ? "Submit & Finish Evaluation" : "Save & Proceed ➜"}
            </button>
          </div>

        </div>
      </div>
    </>);
}

export default Interview;
