const groq = require("../config/ai");
const InterviewSession = require("../models/InterviewSession");
const generateQuestions = async (req, res) => {
  try {

    const { userId, role, level, difficulty, techstack, questions } = req.body;
    const previousInterviews = await InterviewSession.find({
      user: userId,
      role: role,
    });
    const oldQuestions = previousInterviews.flatMap(
      (item) => item.questions || []
    );
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `
Generate exactly ${questions} interview questions.

Role: ${role}
Experience Level: ${level}
Difficulty: ${difficulty}
Tech Stack: ${techstack}

Never repeat any of these previously asked questions:

${oldQuestions.join("\n")}

Rules:
- Generate completely NEW questions.
- Do NOT repeat any question from the above list.
- Questions should match the difficulty level.
- Only questions.
- Number them from 1 to ${questions}.
- No answers.
- Practical interview questions only.
`,
        },
      ],
    });

    const text = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      questions: text,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI Error",
    });

  }
};

const evaluateInterview = async (req, res) => {

  try {
    console.log("REQ BODY:", req.body);

    const { questions, answers } = req.body;

    const completion = await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: `
You are a senior technical interviewer at Google.

Evaluate the candidate very strictly but fairly.

Scoring Rules:

95-100 = Outstanding candidate, production-ready, almost no weaknesses.

90-94 = Excellent candidate with only minor improvements needed.

80-89 = Good candidate with noticeable weaknesses.

70-79 = Average candidate.

60-69 = Beginner.

Below 60 = Poor performance.

The overall score MUST match the technical ratings.

Don't always give scores around 90.
Use the full range from 0-100.

Questions:
${(questions || []).join("\n")}

Candidate Answers:
${(answers || []).join("\n")}

Return ONLY in this format:

Overall Score: __/100

Technical Knowledge: __/10

Communication: __/10

Problem Solving: __/10

Strengths:
- ...

Weaknesses:
- ...

Suggestions:
- ...

Final Feedback:
...
`
        }
      ]

    });

    const feedback = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      feedback,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Evaluation Failed",
    });

  }

};

const saveInterview = async (req, res) => {
  console.log("SAVE API CALLED");

  try {
    const { user, role, level,difficulty, techstack, questions, answers, feedback, score } = req.body;

    const interview = await InterviewSession.create({
      user, role, level,difficulty, techstack, questions, answers, feedback, score,
    });

    console.log(interview); 
    res.status(201).json({ success: true, interview });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to save interview" });
  }
};

const getHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const interviews = await InterviewSession.find({
      user: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const interviews = await InterviewSession.find({ user: userId }).sort({ createdAt: 1 });
    const totalInterviews = interviews.length;
    const bestScore =
      interviews.length > 0
        ? Math.max(...interviews.map((i) => i.score))
        : 0;
    const averageScore =
      interviews.length > 0
        ? Math.round(
          interviews.reduce((sum, i) => sum + i.score, 0) /
          interviews.length
        )
        : 0;

    const latestScore =
      interviews.length > 0
        ? interviews[interviews.length - 1].score
        : 0;

    res.json({
      success: true,
      totalInterviews,
      bestScore,
      averageScore,
      latestScore,
      graphData: interviews.map((item, index) => ({
        interview: index + 1,
        score: item.score,
      })),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
    });
  }
};

const getInterviewById = async (req, res) => {
  try {

    const interview = await InterviewSession.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.json({
      success: true,
      interview,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

module.exports = {
  generateQuestions,
  evaluateInterview,
  saveInterview,
  getHistory,
  getDashboardStats,
  getInterviewById,
};