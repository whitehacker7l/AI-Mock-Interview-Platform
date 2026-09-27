# 🤖 AI-Mock-Interview-Platform (InterviewIQ Engine)

An advanced, high-fidelity AI-powered mock interview simulator built using the MERN stack and integrated with the Groq LLM API (`llama-3.3-70b-versatile`). The platform empowers technical engineering candidates by generating tailored track isolates, listening to answers via real-time speech-to-text telemetry, compiling instantaneous score matrices, and issuing custom verifiable PDF achievement certificates.

---

## ✨ Cutting-Edge Features

- **Dynamic Theme Architecture**: Polished glassmorphic dark-cyber layout using sharp emerald/blue accent glow filters.
- **Tailored AI Question Generation**: Instantly structures interview parameters based on selected role grids, experience context, and difficulty levels.
- **Voice Telemetry Feed**: Native Web Speech API integration to capture candidate voice streams directly into text solutions.
- **Automatic Count-Up Counters**: Beautiful rolling metric digits animating from `0` on signup landing paths.
- **Metric Matrix Evaluation**: Real-time analytical grading graphs powered by `Recharts` mapping Technical, Communication, and Problem Solving dimensions.
- **Automated Landscape Certificate Engine**: Generates premium horizontal PDF credentials dynamically upon session completion with signature stamps.
- **Persistent Vault Logs**: Keeps historical session transcripts safely indexed in private MongoDB profiles.

---

## 📁 System Repository Directory Tree

```text
AI-Mock-Interview-Platform/
│
├── client/                     # React Frontend (Vite) 
|   ├
│   ├── src/
│   │   ├── components/         # Re-usable Structural Modules  
|   |   |   ├── AllLoader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── RoleCard.jsx
│   │   │   ├── QuestionCard.jsx
│   │   │   ├── FeedbackCard.jsx
|   |   |   ├── ProtectedRoute.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── ScoreCard.jsx
│   │   ├── pages/              # Platform Interface Screens
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── SelectRole.jsx
│   │   │   ├── Interview.jsx
│   │   │   ├── Result.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Profile.jsx
|   |   |   ├── NotFound.jsx
|   |   |   └── Transcript.jsx
|   |   |
│   │   ├── services/           # Axios Base Config Streams
│   │   │   └── authService.js
│   │   │   
│   │   ├── App.jsx             # Route Overlays Configuration
│   │   ├── main.jsx
│   │   └── index.css           # Tailwind Utility Layers
|   |
|   ├── index.html
│   ├── package.json
|   ├── package-lock.json
|   ├── postcss.config.js
|   ├── tailwind.config.js
│   └── vite.config.js
|
│
├── server/                     # Node.js + Express Backend
│   ├── config/
│   │   ├── db.js               # MongoDB Connection Matrix
│   │   └── ai.js               # Groq Client Initialization
│   ├── controllers/            # Logic Handlers
│   │   ├── authController.js   # JWT Auth & Auto-Login Flow
│   │   └── interviewController.js # LLM Prompt Compilation Logs
│   ├── models/                 # Database Schemas (Mongoose)
│   │   ├── User.js
│   │   └── InterviewSession.js
│   ├── routes/                 # API Endpoint Wire-ups
│   │   ├── authRoutes.js
│   │   └── interviewRoutes.js
│   ├── app.js                  # Middleware Core Wiring
│   ├── server.js               # Boot Listener Node
|   ├──package-lock.json
│   └── package.json
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md

```

---

## 🚀 Installation & Launch Protocols

### Prerequisites
- Node.js installed locally
- MongoDB Atlas active database cluster
- Groq Cloud Developer API key instance

### 🛠️ Step 1: Clone and Infrastructure Verification
```bash
git clone https://github.com
cd AI-Mock-Interview-Platform
```

### 🛠️ Step 2: Backend Environment Node Setup
1. Navigate into the backend repository node:
   ```bash
   cd server
   npm install
   ```
2. Create a private secure parameters configuration file named `.env` inside the `server/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ixglxbg.mongodb.net/aimock?retryWrites=true&w=majority
   JWT_SECRET=your_cyber_jwt_secret_token_signature_string
   GROQ_API_KEY=gsk_your_groq_cloud_live_api_key_variable
   ```
3. Run the development server instance:
   ```bash
   npm run dev
   # or: node server.js
   ```

### 🛠️ Step 3: Frontend Interface Compilation
1. Open a new discrete split terminal panel and navigate into the client workspace:
   ```bash
   cd client
   npm install
   ```
2. Fire up the Vite reactive client dev node:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` inside your modern Web Speech compatible browser (Google Chrome recommended).

---

## 📡 API Telemetry Endpoints Documentation

### Authentication System (`/api/auth`)
* `POST /signup` - Registers credentials records & initiates automatic secure session login token return.
* `POST /login` - Verifies passwords hashes and releases active JWT tokens.

### Simulation Matrix Suite (`/api/interview`)
* `POST /generate` - Re-routes custom configuration specifications payload to LLM context pipelines.
* `POST /evaluate` - Runs prompt split calculations targeting scoring metrics.
* `POST /save` - Saves complete response transcripts indices into MongoDB collections.
* `GET /history/:userId` - Extracts persistent record vectors for specific profile dashboards.

---

## 🔒 Security Whitelisting Note
If you experience a `MongooseServerSelectionError`, please verify that your local public network machine IP address or access bounds parameters are completely whitelisted inside your **MongoDB Atlas Cloud Dashboard Network Access Panel** (`0.0.0.0/0` is recommended for flexible local deployment).



Verified by Juned - 27 Sep 2026
