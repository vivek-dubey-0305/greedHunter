==================================================
🧠 GreedHunter – Quiz, Events, Rewards Platform
==================================================

GreedHunter is an engaging quiz-based web platform designed for students of schools and colleges to participate in quizzes, events, and games for a chance to win goodies, rewards, and cash prizes. It also includes a one-on-one challenge mode, a dynamic dashboard, and subdomains for notes and events.

--------------------------------------------------
🚀 FEATURES:
- User authentication with refresh and access tokens
- Role-based access (admin vs users)
- Dynamic quiz/game/event creation with categories
- Event enrollment, active status, winner tracking
- Challenge Mode (Random & Specific)
- Spectator Mode to watch live challenges
- Rewards system with Razorpay payouts
- Animated dashboard UI (React + Tailwind + GSAP)
- Camera proctoring (detect phone, mirror, extra person)

--------------------------------------------------
🗃️ TECHNOLOGIES USED:

Frontend (User/Admin):
- React v19
- Tailwind CSS v4
- GSAP for animations
- Axios, React-Router-DOM
- Context API for auth

Backend:
- Node.js (Express.js)
- MongoDB (Mongoose)
- Razorpay SDK
- JWT-based Auth
- Multer for file uploads
- Socket.IO for live events

--------------------------------------------------

🛠️ SETUP INSTRUCTIONS:

1. Clone the repo:
   git clone https://github.com/yourusername/GreedHunter.git
   cd GreedHunter

2. Install dependencies:
   Backend: 
     cd backend
     npm install
   Frontend: 
     cd ../frontend
     npm install

3. Environment Setup:
   - Create `.env` files in backend and frontend with keys:
     - MONGO_URI
     - JWT_SECRET
     - RAZORPAY_KEY_ID / SECRET
     - SESSION_SECRET

4. Start Servers:
   - Backend: `npm run dev`
   - Frontend: `npm run dev`

--------------------------------------------------
🔒 SECURITY CONSIDERATIONS:
- All authentication tokens stored in HttpOnly cookies.
- Admin dashboard restricted via role check.
- Rewards withdrawal uses secure Razorpay API.
- Camera proctoring runs during live quizzes.

--------------------------------------------------
📦 REQUIREMENTS:
See `requirements.txt` for backend dependencies.

--------------------------------------------------
📧 CONTACT:
- Developer: vivek.dubey0305@gmail.com
