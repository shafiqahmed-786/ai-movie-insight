# 🎬 AI Movie Insight Builder

A cinematic AI-powered movie analytics dashboard built with modern full-stack architecture.

This project fetches real-time movie data, analyzes audience sentiment, visualizes ratings, and delivers a premium interactive UI experience.

🔗 Built for performance, scalability, and production-readiness.

---

## 🚀 Live Demo

> (Add Vercel link here after deployment)

---

## ✨ Features

### 🎥 Movie Data Engine
- Fetches real-time data from OMDb API
- Intelligent caching layer (Redis-style abstraction)
- API timeout protection
- Structured & validated responses

### 🔥 Animated Rating Meter
- Dynamic progress-based IMDb score visualization
- Smooth Framer Motion animation

### 🎞 Trailer Modal
- Embedded YouTube trailer modal
- Cinematic overlay with animation

### 📊 AI Sentiment Visualization
- Audience review summarization (OpenAI-ready architecture)
- Sentiment classification (Positive / Mixed / Negative)
- Key theme extraction UI

### 🌌 Cinematic UI System
- Glassmorphism cards
- Dynamic particle background
- Gradient hero typography
- Responsive layout (mobile optimized)
- Motion-based stagger animations

### ⚡ Production-Ready API
- Input validation (IMDb ID format)
- Error handling (400, 404, 500, 504)
- Request timeout protection
- Memory-based caching abstraction
- Clean JSON structure

### 🧪 Testing Infrastructure
- Jest configuration
- API route testing (mocked fetch)
- Error boundary testing
- Coverage reporting
- CI-ready test scripts

---

## 🏗 Tech Stack

### Frontend
- **Next.js 16 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **React Hot Toast**
- **React TSParticles**

### Backend
- Next.js Route Handlers
- OMDb API
- OpenAI API (Sentiment-ready integration)
- In-memory cache abstraction

### Testing
- Jest
- React Testing Library
- API route mocking

---

## 📁 Project Structure


app/
page.tsx
layout.tsx
api/
movie/route.ts

components/
MovieCard.tsx
CastList.tsx
RatingMeter.tsx
SentimentCard.tsx
TrailerModal.tsx
ParticlesBackground.tsx
Loader.tsx
ErrorBoundary.tsx

lib/
cache.ts
openai.ts
omdb.ts
tmdb.ts

types/
movie.ts


Modular, scalable, interview-ready structure.

---

## 🧠 Architecture Highlights

- Separation of concerns (UI / API / Services / Types)
- Reusable caching abstraction
- Error-first API design
- Defensive programming patterns
- Clean TypeScript typing
- Animations isolated from business logic

---

## 🔐 Environment Variables

Create `.env.local`:


OMDB_API_KEY=your_key
OPENAI_API_KEY=your_key
TMDB_API_KEY=your_key


Never commit this file.

---

## 💻 Run Locally

```bash
npm install
npm run dev

Open:

http://localhost:3000
🧪 Run Tests
npm test
npm run test:ci

Includes coverage reporting.

🚀 Deployment

Optimized for Vercel.

npm run build

🚀 Deployment

Optimized for Vercel.

npm run build

Then deploy via:

Vercel GitHub integration

📈 Performance Optimizations

Request caching (TTL-based)

Controlled API timeouts

Optimized animations

Reduced re-renders

Lazy modal rendering

Lighthouse-ready layout

🎯 Why This Project Stands Out

This is not a static movie viewer.

It demonstrates:

Full-stack thinking

API architecture design

UI/UX product sense

Motion design integration

Testing awareness

Deployment readiness

Error-safe production patterns

🛠 Future Enhancements

Real TMDb trailer auto-fetch

Redis integration for distributed caching

Real-time AI review analysis

Radar chart sentiment visualization

Authentication & watchlist

Server-side rendering optimization

👤 Author

Shafiq Ahmed Khan

Data Science & Product-Focused Engineer

Strong emphasis on analytics + user experience

Passionate about building production-grade systems

📜 License

MIT License


---

# 🔥 Why This README Is Strong

It:

✔ Shows architecture maturity  
✔ Mentions production safety  
✔ Highlights testing  
✔ Shows scalability awareness  
✔ Makes it sound intentional  
✔ Makes recruiter think “this guy understands systems”  

---
