# PrepAI

PrepAI is an AI-powered interview preparation app. Practice mock interviews, review feedback and past results, and compare a resume with a job description to identify skills to develop.

> AI-generated scores and recommendations are estimates. Use them as guidance, not as a definitive assessment.

## Live demo

[Open PrepAI](https://prep-ai-gamma-six.vercel.app/)

## Features

- **Mock interviews:** Choose an interview topic and answer questions by voice or text.
- **Answer feedback:** Review scores for clarity, relevance, technical accuracy, and confidence, along with strengths, weaknesses, and a suggestion.
- **Interview history and results:** Revisit saved sessions and question-by-question feedback.
- **Skill Gap Analyzer:** Upload a resume and a job description, or paste the job description, to see matched, partially matched, and missing skills, strengths, and an improvement roadmap.
- **Saved Skill Gap reports:** Reuse cached reports for matching inputs.

## Screenshots

Screenshots will be added here. Use screenshots captured from the running app with test data, and make sure they do not reveal personal information, browser tabs, or credentials.

## Technology

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **AI:** Groq API
- **Document parsing:** PDF and DOCX
- **Authentication:** JWT bearer tokens; passwords hashed with bcrypt

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

- Node.js and npm
- A MongoDB connection string
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

`AI_MODEL` and `SKILL_GAP_MODEL` are optional; the application uses the model shown above as a default. Keep actual credentials private. Never commit `.env` files or put server secrets in frontend variables.

### 2. Configure the frontend

Create `client/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Use the backend origin only—do not append `/api`.

### 3. Install dependencies

In one terminal:

```powershell
cd server
npm install
```

In another terminal:

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

Start the frontend in a second terminal:

```powershell
cd client
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### 5. Seed interview questions

The question data is in `server/src/data/questions.json`. To seed the development database:

```powershell
cd server
node src/scripts/seedQuestions.js
```

> **Warning:** The seed script deletes all existing question records before inserting the questions from the JSON file. Run it only against a database where replacing the question collection is intentional.

## API overview

All endpoints are under `/api`. Protected endpoints require an `Authorization: Bearer <token>` header.

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | No | Create an account |
| `POST` | `/api/auth/login` | No | Sign in and receive a token |
| `GET` | `/api/auth/logout` | Bearer token recommended | Invalidate the current token |
| `GET` | `/api/auth/get-me` | Yes | Get the signed-in user |
| `GET` | `/api/sessions/topics` | No | Get interview topics |
| `POST` | `/api/sessions` | Yes | Create an interview session |
| `GET` | `/api/sessions` | Yes | List the signed-in user's sessions |
| `GET` | `/api/sessions/:id` | Yes | Get a session and its questions |
| `GET` | `/api/sessions/:id/summary` | Yes | Get scores and feedback for a session |
| `POST` | `/api/sessions/:sessionId/answers` | Yes | Submit an answer and receive feedback |
| `POST` | `/api/skill-gap/analyze` | Yes | Analyze a resume against a job description |

## Deployment

- **Frontend:** Deploy the `client` directory to Vercel and set `VITE_API_URL` to the public backend origin.
- **Backend:** Deploy the `server` directory to your backend host. Configure `PORT`, `CLIENT_URL`, `MONGO_URL`, `JWT_SECRET`, `AI_API_KEY`, and `SKILL_GAP_API_KEY`; configure model variables if you want to override the defaults.
- **Database:** Use MongoDB Atlas or another reachable MongoDB deployment. Set `CLIENT_URL` to the deployed frontend origin so the backend CORS configuration accepts it.

Do not commit production credentials. Set environment variables in the hosting provider's project settings.

## Known limitations

- Voice input depends on browser support for the Web Speech API; the transcript can be edited before submission.
- Speech recognition can mishear technical terms.
- AI scores and Skill Gap results are estimates, not guarantees.
- The confidence score is based on answer text, not vocal tone.
- Scanned PDFs without selectable text may not produce usable extracted text.

## Contributors

- [@Bhanu-Grimmjow](https://github.com/Bhanu-Grimmjow) — interview, scoring, history, UI, and project integration.
- [@Lakshya-jain11](https://github.com/Lakshya-jain11) — initial Skill Gap Analyzer implementation.

## Useful commands

Build the frontend:

```powershell
cd client
npm run build
```

Lint the frontend:

```powershell
cd client
npm run lint
```

The server package currently does not define an automated test suite.
