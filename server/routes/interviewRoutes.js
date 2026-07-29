const express = require("express");

const router = express.Router();

const {generateQuestions,evaluateInterview,saveInterview,getHistory,getDashboardStats,getInterviewById} = require("../controllers/interviewController");
router.post("/evaluate", evaluateInterview);
router.post("/generate", generateQuestions);
router.post("/save", saveInterview);
router.get("/dashboard/:userId", getDashboardStats);
router.get("/history/:userId", getHistory);
router.get("/:id", getInterviewById);

module.exports = router;

