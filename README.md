# PrepAI

PrepAI is an AI-powered interview preparation app. Users can practice mock interviews, receive feedback on their answers, review past results, and compare a resume with a job description using the Skill Gap Analyzer.

## Features

- **Mock interviews** — Choose an interview category and topic, answer questions by voice or text, and receive AI-generated feedback.
- **Interview results** — Review the overall score, four scoring dimensions, areas to improve, and feedback for each answered question.
- **Interview history** — Revisit previous interview sessions and their results.
- **Skill Gap Analyzer** — Upload a resume and a job description, or paste the job description, to see matched, partially matched, and missing skills, strengths, and an improvement roadmap.
- **Saved Skill Gap reports** — Reuse cached analysis for matching inputs.
- **Authentication** — Register, sign in, and access protected features.

AI results are estimates and should be reviewed critically. A skill not mentioned in a resume is not necessarily a skill the candidate lacks.

## Technology

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **AI:** Groq API
- **Document parsing:** PDF and DOCX

## Project structure

```text
PrepAI/
├── client/                 # React frontend
│   ├── public/             # Static assets and favicon
│   └── src/
│       ├── features/
│       │   ├── auth/       # Login, registration, and auth state
│       │   ├── dashboard/  # Dashboard and feature cards
│       │   ├── session/    # Interview setup, sessions, history, results
│       │   └── skillGap/   # Resume analysis UI and API client
│       ├── app.routes.jsx  # Frontend route definitions
│       └── main.jsx        # Frontend entry point
└── server/                 # Express backend
    └── src/
        ├── config/         # Database connection
        ├── controllers/    # API request handlers
        ├── data/           # Interview question data
        ├── middlewares/    # Authentication and uploads
        ├── models/         # MongoDB models
        ├── routes/         # API route definitions
        ├── scripts/        # Database maintenance scripts
        ├── services/       # AI and file-parsing services
        └── utils/          # Shared helpers and constants
```

## Prerequisites

- Node.js (use a current supported LTS version)
- npm
- MongoDB connection string
- Groq API key(s)

## Local development

### 1. Configure the backend

Create `server/.env` with your own values:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret

AI_API_KEY=your_groq_api_key_for_interview_feedback
AI_MODEL=openai/gpt-oss-20b

SKILL_GAP_API_KEY=your_groq_api_key_for_skill_gap_analysis
SKILL_GAP_MODEL=openai/gpt-oss-20b
```

The model variables are optional; the application uses the shown model as its default when they are omitted. Keep real credentials private. Never commit `.env` files or put server secrets in frontend environment variables.

### 2. Configure the frontend

Create `client/.env`:

```env
VITE_API_URL=http://localhost:3000
```

### 3. Install dependencies

In a terminal:

```powershell
cd server
npm install
```

In a second terminal:

```powershell
cd client
npm install
```

### 4. Start the applications

Start the backend:

```powershell
cd server
npm run dev
```

Start the frontend in another terminal:

```powershell
cd client
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### 5. Interview question data

Interview questions are stored in `server/src/data/questions.json`. To seed the development database, run:

```powershell
cd server
node src/scripts/seedQuestions.js
```

**Warning:** The seed script deletes the existing question records before inserting the question data. Use it only with a development database unless you intentionally want to replace its question collection.

## API overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register an account |
| `POST` | `/api/auth/login` | Sign in |
| `GET` | `/api/auth/logout` | Sign out |
| `GET` | `/api/auth/get-me` | Get the current user |
| `GET` | `/api/sessions/topics` | Get interview topics |
| `POST` | `/api/sessions` | Create an interview session |
| `GET` | `/api/sessions` | List the signed-in user's sessions |
| `GET` | `/api/sessions/:id` | Get an interview session |
| `GET` | `/api/sessions/:id/summary` | Get session results and feedback |
| `POST` | `/api/sessions/:sessionId/answers` | Submit an interview answer |
| `POST` | `/api/skill-gap/analyze` | Analyze a resume against a job description |

Most interview and Skill Gap endpoints require authentication.

## Useful commands

Frontend production build:

```powershell
cd client
npm run build
```

Frontend lint:

```powershell
cd client
npm run lint
```

## Security and privacy

- Keep API keys, database credentials, and JWT secrets in local or deployment environment settings.
- Do not commit `.env` files or share their contents.
- Only upload resumes and job descriptions you are authorized to use.
- AI-generated scores and recommendations are estimates, not guarantees.
