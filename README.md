# AI Resume Analyzer

An intelligent application that analyzes resumes, extracts key information, and provides insights using Google's Generative AI (Gemini). It also features job matching and a modern user interface.

## 🚀 Features

- **User Authentication:** Secure signup and login functionality using NextAuth, JWT, and bcrypt.
- **Resume Upload & Parsing:** Support for uploading resumes in PDF or Word formats. Automatically extracts text using `pdf-parse` and `mammoth`.
- **AI-Powered Analysis:** Leverages Google's Gemini AI to analyze resume content, summarize skills, and offer improvements.
- **Job Matching:** Matches candidate profiles and resumes against job listings.
- **Modern UI/UX:** A responsive and interactive frontend built with Next.js, Tailwind CSS, and Framer Motion.

## 🛠️ Tech Stack

**Frontend:**
- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- NextAuth.js
- Axios & Lucide React

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- Google Generative AI (`@google/generative-ai`)
- JWT & bcrypt
- Multer (File Uploads)

## 📂 Project Structure

```
📦 AI-Resume-Analyzer
 ┣ 📂 Frontend      # Next.js frontend application
 ┣ 📂 backend       # Node.js/Express backend API
 ┗ 📜 README.md     # Project documentation
```

## ⚙️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/arghyadeep00/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
NODE_ENV=development
AI_API_KEY=your_gemini_api_key
AI_MODEL=gemini-3.5-flash-lite
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the Frontend directory, and install dependencies:
```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend` directory and add the following variables:
```env
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

Start the frontend server:
```bash
npm run dev
```

## 🚀 Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Sign up for a new account or log in.
3. Upload your resume (PDF/DOCX).
4. Get AI-powered insights, view your parsed data, and explore job matches!

## 📄 License

This project is open-source and available under the ISC License.
