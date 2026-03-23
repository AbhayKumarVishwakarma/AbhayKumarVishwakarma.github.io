import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   RESUME DATA  (from old file — complete & accurate)
═══════════════════════════════════════════════════════════ */
const RESUME = {
  name: "Abhay Kumar",
  title: "AI & Backend Engineer",
  location: "Uttar Pradesh, India",
  phone: "+91 7233053062",
  email: "abhaykumarv00@gmail.com",
  github: "https://github.com/AbhayKumarVishwakarma",
  linkedin: "https://www.linkedin.com/in/abhay-kumar-vishwakarma-3b0b66260/",
  resumeUrl: "https://drive.google.com/file/d/1SVnUwxGP3wiPpW33MI1UJaMdOIiDTgke/view",
  tagline: "Building intelligent systems — from scalable REST APIs to AI agents powered by LLMs, LangChain, LangGraph & RAG.",
  skills: {
    Languages:       ["Python", "Java", "C#", "JavaScript"],
    Frameworks:      ["FastAPI", "Flask", "Spring Boot", ".NET", "Node.js", "React.js"],
    Databases:       ["MySQL", "PostgreSQL", "MSSQL", "MongoDB", "Pinecone"],
    "AI & Tools":    ["AI Agents", "Chatbots", "LLMs", "LangChain", "LangGraph", "Generative AI", "NLP", "RAG", "OpenAI APIs", "Hugging Face", "Prompt Engineering", "Vector DBs"],
    "Cloud & Tools": ["Azure Functions", "Azure Cloud", "Git", "GitHub", "Postman", "PowerApps"],
    Technologies:    ["REST APIs", "Webhooks", "Microservices", "Serverless", "OAuth2", "Workflow Automation"],
  },
  experience: [
    {
      role: "Associate Engineer",
      company: "Alphavima Technologies",
      period: "Jul 2024 – Present",
      badge: "Current",
      points: [
        "Built an AI Voice & Chat Assistant supporting natural language commands for real-time CRUD operations and product/vendor/customer insights via text & voice interfaces.",
        "Integrated Stripe and Payit payment gateways for secure customer payments, improving transaction reliability and UX.",
        "Implemented WhatsApp integration enabling real-time customer query processing and automated messaging.",
        "Built a centralised Review Management System to capture, manage, and analyse customer and vendor feedback.",
      ],
    },
    {
      role: "SDE",
      company: "Nolan Edutech",
      period: "Aug 2023 – Jun 2024",
      badge: null,
      points: [
        "Built an AI-powered event management system with QR-based check-ins, facial recognition attendee verification, and real-time attendance tracking.",
        "Built and integrated REST APIs for a fitness & health app supporting personalised workouts and progress tracking.",
        "Contributed to API design, system performance optimisation, and deployment workflows using Python, Flask, Node.js, Java & Spring Boot.",
      ],
    },
  ],
  projects: [
    {
      title: "AI Assistant",
      stack: "FastAPI · Python · LLMs · LangChain · RAG · Pinecone · MongoDB · JWT",
      github: "https://github.com/AbhayKumarVishwakarma/AI-Assistant",
      desc: "AI-driven chat platform with multiple specialised agents (General & Health Assistants). Features JWT auth, LangChain orchestration, Pinecone Vector DB, RAG for document-based Q&A, and PDF ingestion pipelines.",
      num: "01",
    },
    {
      title: "Safar — Online Bus Booking",
      stack: "Java · Spring Boot · MySQL · HTML · CSS · JavaScript",
      github: "https://github.com/AbhayKumarVishwakarma/Safar",
      desc: "Seamless bus ticket booking platform with admin route management and secure payments. Role-based access control, CRUD for routes/users/reservations, and Agile team collaboration.",
      num: "02",
    },
    {
      title: "Portfolio Management System",
      stack: "Python · Flask · React · MongoDB",
      github: "https://github.com/AbhayKumarVishwakarma/Project-Prism",
      desc: "Platform for managing portfolios, tasks, and resources for teams. Admin auth, full CRUD, task assignment to managers, and React frontend for real-time milestone and project tracking.",
      num: "03",
    },
  ],
  education: [
    { degree: "Master of Computer Applications", school: "Kurukshetra University",   period: "Jul 2024 – Jun 2026", icon: "🎓" },
    { degree: "Full Stack Web Development",       school: "Masai School",              period: "Aug 2022 – Aug 2023", icon: "💻" },
    { degree: "Bachelor's Degree",                school: "University of Allahabad",   period: "Jul 2019 – Jun 2022", icon: "🏛️" },
  ],
};

/* ── Skill orbs — names only (no icons), matching uploaded image style ── */
const SKILL_ORBS = [
  { id: 1,  label: "LangChain" },
  { id: 2,  label: "LangGraph" },
  { id: 3,  label: "OpenAI API" },
  { id: 4,  label: "RAG" },
  { id: 5,  label: "LLMs" },
  { id: 6,  label: "NLP" },
  { id: 7,  label: "Agentic AI" },
  { id: 8,  label: "AI Agents" },
  { id: 9,  label: "Vector DB" },
  { id: 10, label: "Pinecone" },
  { id: 11, label: "Hugging Face" },
  { id: 12, label: "Python" },
  { id: 13, label: "Java" },
  { id: 14, label: "C#" },
  { id: 15, label: "JavaScript" },
  { id: 16, label: "FastAPI" },
  { id: 17, label: "Flask" },
  { id: 18, label: "dotNet" },
  { id: 19, label: "Node.js" },
  { id: 20, label: "React.js" },
  { id: 21, label: "Spring Boot" },
  { id: 22, label: "REST APIs" },
  { id: 23, label: "Microservices" },
  { id: 24, label: "Azure" },
  { id: 25, label: "Docker" },
  { id: 26, label: "AWS"},
  { id: 27, label: "MySQL" },
  { id: 28, label: "PostgreSQL" },
  { id: 29, label: "MongoDB" },
  { id: 30, label: "Prompt Eng." },
];

/* Nav sections — includes About & Education from old file */
const SECTIONS = [
  { id: "hero",       label: "Home",       icon: "🏠" },
  { id: "about",      label: "About",      icon: "👤" },
  { id: "skills",     label: "Skills",     icon: "⚡" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "projects",   label: "Projects",   icon: "🚀" },
  { id: "education",  label: "Education",  icon: "🎓" },
  { id: "contact",    label: "Contact",    icon: "✉️" },
];

const MARQUEE_ITEMS = [
  "LangChain","LangGraph","OpenAI","RAG","LLMs","Agentic AI","AI Agents","Chatbots","Vector DB","FastAPI","Azure","Docker","AWS","Python","Pinecone","NLP","Prompt Engineering",
  "LangChain","LangGraph","OpenAI","RAG","LLMs","Agentic AI","AI Agents","Chatbots","Vector DB","FastAPI","Azure","Docker","AWS","Python","Pinecone","NLP","Prompt Engineering",
];

/* ═══════════════════════════════════════════════════════════
   ORB LAYOUT — scattered positions matching Antigravity style
═══════════════════════════════════════════════════════════ */
const ORB_LAYOUT = [
  { top:"6%",  left:"1%",  sz:82,  dur:"9s",  del:"0s",   dx1:"7px", dy1:"-10px",dx2:"-5px",dy2:"12px", dx3:"8px", dy3:"4px"  },
  { top:"2%",  left:"10%", sz:96,  dur:"11s", del:"0.8s", dx1:"-8px",dy1:"-14px",dx2:"6px", dy2:"9px",  dx3:"-7px",dy3:"6px"  },
  { top:"20%", left:"6%",  sz:90,  dur:"8s",  del:"1.5s", dx1:"9px", dy1:"-8px", dx2:"-7px",dy2:"14px", dx3:"6px", dy3:"-5px" },
  { top:"12%", left:"19%", sz:100, dur:"10s", del:"0.4s", dx1:"-6px",dy1:"-12px",dx2:"8px", dy2:"10px", dx3:"-9px",dy3:"7px"  },
  { top:"0%",  left:"29%", sz:110, dur:"12s", del:"0.2s", dx1:"10px",dy1:"-16px",dx2:"-8px",dy2:"12px", dx3:"7px", dy3:"-8px" },
  { top:"20%", left:"33%", sz:94,  dur:"9s",  del:"1.2s", dx1:"-9px",dy1:"-10px",dx2:"6px", dy2:"14px", dx3:"-8px",dy3:"5px"  },
  { top:"6%",  left:"41%", sz:88,  dur:"11s", del:"0.6s", dx1:"8px", dy1:"-12px",dx2:"-6px",dy2:"10px", dx3:"9px", dy3:"6px"  },
  { top:"38%", left:"15%", sz:78,  dur:"7s",  del:"1.8s", dx1:"-7px",dy1:"-9px", dx2:"5px", dy2:"12px", dx3:"-6px",dy3:"4px"  },
  { top:"40%", left:"27%", sz:94,  dur:"10s", del:"0.3s", dx1:"9px", dy1:"-13px",dx2:"-7px",dy2:"10px", dx3:"8px", dy3:"-7px" },
  { top:"32%", left:"39%", sz:82,  dur:"8s",  del:"2.1s", dx1:"-8px",dy1:"-11px",dx2:"6px", dy2:"13px", dx3:"-7px",dy3:"6px"  },
  { top:"4%",  left:"53%", sz:86,  dur:"9s",  del:"1.1s", dx1:"7px", dy1:"-14px",dx2:"-9px",dy2:"9px",  dx3:"6px", dy3:"7px"  },
  { top:"20%", left:"59%", sz:98,  dur:"12s", del:"0.5s", dx1:"-10px",dy1:"-10px",dx2:"8px",dy2:"15px", dx3:"-7px",dy3:"4px"  },
  { top:"2%",  left:"67%", sz:82,  dur:"8s",  del:"1.6s", dx1:"8px", dy1:"-12px",dx2:"-6px",dy2:"10px", dx3:"7px", dy3:"-6px" },
  { top:"36%", left:"51%", sz:90,  dur:"10s", del:"0.7s", dx1:"-9px",dy1:"-9px", dx2:"7px", dy2:"13px", dx3:"-8px",dy3:"5px"  },
  { top:"42%", left:"63%", sz:78,  dur:"7s",  del:"2.3s", dx1:"6px", dy1:"-11px",dx2:"-8px",dy2:"9px",  dx3:"7px", dy3:"7px"  },
  { top:"8%",  left:"78%", sz:90,  dur:"9s",  del:"1.0s", dx1:"-7px",dy1:"-13px",dx2:"9px", dy2:"11px", dx3:"-6px",dy3:"4px"  },
  { top:"26%", left:"83%", sz:78,  dur:"11s", del:"0.9s", dx1:"8px", dy1:"-10px",dx2:"-6px",dy2:"14px", dx3:"7px", dy3:"-5px" },
  { top:"0%",  left:"87%", sz:70,  dur:"8s",  del:"1.4s", dx1:"-6px",dy1:"-12px",dx2:"7px", dy2:"9px",  dx3:"-8px",dy3:"6px"  },
  { top:"22%", left:"77%", sz:86,  dur:"10s", del:"0.2s", dx1:"9px", dy1:"-11px",dx2:"-7px",dy2:"13px", dx3:"6px", dy3:"-7px" },
  { top:"38%", left:"4%",  sz:70,  dur:"7s",  del:"2.5s", dx1:"-8px",dy1:"-9px", dx2:"6px", dy2:"12px", dx3:"-5px",dy3:"5px"  },
  { top:"48%", left:"87%", sz:74,  dur:"9s",  del:"1.7s", dx1:"7px", dy1:"-13px",dx2:"-9px",dy2:"8px",  dx3:"6px", dy3:"6px"  },
  { top:"54%", left:"39%", sz:78,  dur:"8s",  del:"0.8s", dx1:"-7px",dy1:"-10px",dx2:"8px", dy2:"13px", dx3:"-6px",dy3:"4px"  },
  { top:"0%",  left:"29%", sz:110, dur:"12s", del:"0.2s", dx1:"10px",dy1:"-16px",dx2:"-8px",dy2:"12px", dx3:"7px", dy3:"-8px" },
  { top:"2%",  left:"67%", sz:82,  dur:"8s",  del:"1.6s", dx1:"8px", dy1:"-12px",dx2:"-6px",dy2:"10px", dx3:"7px", dy3:"-6px" },
  { top:"18%", left:"12%", sz:94,  dur:"11s", del:"0.4s", dx1:"-9px",dy1:"-11px",dx2:"8px", dy2:"14px", dx3:"-7px",dy3:"5px"  },
  { top:"32%", left:"71%", sz:88,  dur:"9s",  del:"1.1s", dx1:"7px", dy1:"-12px",dx2:"-8px",dy2:"10px", dx3:"6px", dy3:"-7px" },
  { top:"46%", left:"23%", sz:74,  dur:"7s",  del:"2.1s", dx1:"-8px",dy1:"-10px",dx2:"6px", dy2:"12px", dx3:"-7px",dy3:"5px"  },
  { top:"12%", left:"55%", sz:98,  dur:"10s", del:"0.6s", dx1:"9px", dy1:"-13px",dx2:"-8px",dy2:"11px", dx3:"7px", dy3:"-6px" },
  { top:"38%", left:"81%", sz:70,  dur:"8s",  del:"1.8s", dx1:"-6px",dy1:"-11px",dx2:"7px", dy2:"10px", dx3:"-8px",dy3:"7px"  },
  { top:"11%", left:"33%", sz:86,  dur:"9s",  del:"1.3s", dx1:"8px", dy1:"-12px",dx2:"-6px",dy2:"13px", dx3:"6px", dy3:"-5px" },
  { top:"6%",  left:"17%", sz:78,  dur:"11s", del:"0.5s", dx1:"-7px",dy1:"-10px",dx2:"8px", dy2:"14px", dx3:"-7px",dy3:"4px"  },
  { top:"52%", left:"65%", sz:92,  dur:"8s",  del:"2.0s", dx1:"9px", dy1:"-11px",dx2:"-7px",dy2:"12px", dx3:"6px", dy3:"-7px" },
  { top:"14%", left:"41%", sz:84,  dur:"10s", del:"0.3s", dx1:"-8px",dy1:"-13px",dx2:"7px", dy2:"11px", dx3:"-7px",dy3:"5px"  },
  { top:"30%", left:"89%", sz:76,  dur:"7s",  del:"2.4s", dx1:"6px", dy1:"-10px",dx2:"8px", dy2:"9px",  dx3:"7px", dy3:"6px"  },
  { top:"44%", left:"15%", sz:90,  dur:"9s",  del:"1.2s", dx1:"-9px",dy1:"-12px",dx2:"7px", dy2:"13px", dx3:"-8px",dy3:"4px"  },
  { top:"8%",  left:"69%", sz:82,  dur:"11s", del:"0.1s", dx1:"8px", dy1:"-11px",dx2:"-6px",dy2:"14px", dx3:"7px", dy3:"-5px" },
];

/* ═══════════════════════════════════════════════════════════
   GLOBAL CSS — Google Antigravity aesthetic
═══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Display:wght@300;400;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; font-size: 16px; }
body {
  font-family: 'Google Sans', sans-serif;
  background: #ffffff;
  color: #1a1a1a;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  cursor: none;
}

/* ── CUSTOM CURSOR ── */
.cursor {
  position: fixed; pointer-events: none; z-index: 9999;
  width: 12px; height: 12px; border-radius: 50%;
  background: #1a1a1a; transform: translate(-50%,-50%);
  transition: width .15s, height .15s;
  mix-blend-mode: multiply;
}
.cursor-ring {
  position: fixed; pointer-events: none; z-index: 9998;
  width: 36px; height: 36px; border-radius: 50%;
  border: 1px solid rgba(26,26,26,0.3);
  transform: translate(-50%,-50%);
  transition: width .3s, height .3s;
}
.cursor.hover  { width: 7px; height: 7px; }
.cursor-ring.hover { width: 54px; height: 54px; border-color: rgba(26,26,26,0.15); }

/* ── PROGRESS ── */
.prog { position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 600; }
.prog-fill { height: 100%; background: #1a1a1a; transition: width 0.08s linear; }

/* ── NAV ── */
.g-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 500;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px; height: 64px;
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  transition: box-shadow 0.3s;
}
.g-nav.raised { box-shadow: 0 1px 20px rgba(0,0,0,0.06); }

/* Logo — Google-coloured letters (from old file) */
.g-logo {
  display: inline-flex; align-items: center; gap: 1px;
  background: none; border: none; cursor: none;
  font-family: 'Google Sans Display', sans-serif;
  font-size: 1.32rem; font-weight: 700; letter-spacing: -0.5px;
  padding: 4px 0;
}

.nav-links { display: flex; align-items: center; gap: 2px; list-style: none; }
.nav-btn {
  background: none; border: none; cursor: none;
  font-family: 'Google Sans', sans-serif;
  font-size: 0.82rem; font-weight: 500; letter-spacing: 0.01em;
  padding: 6px 13px; border-radius: 100px; color: #5f6368;
  transition: background 0.18s, color 0.18s; white-space: nowrap;
}
.nav-btn:hover { background: rgba(0,0,0,0.04); color: #1a1a1a; }
.nav-btn.active { color: #1a1a1a; font-weight: 600; background: rgba(0,0,0,0.05); }

.resume-btn {
  background: #1a1a1a; color: #fff; border: none; cursor: none;
  font-family: 'Google Sans', sans-serif; font-size: 0.82rem; font-weight: 600;
  padding: 8px 18px; border-radius: 100px;
  transition: opacity 0.18s, transform 0.15s; white-space: nowrap;
}
.resume-btn:hover { opacity: 0.82; transform: translateY(-1px); }

/* Hamburger */
.hbg {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: none; padding: 6px; border-radius: 8px;
  transition: background 0.18s;
}
.hbg:hover { background: rgba(0,0,0,0.04); }
.hbg span { display: block; width: 20px; height: 1.5px; background: #1a1a1a; border-radius: 2px; transition: transform 0.3s, opacity 0.25s; }
.hbg.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.hbg.open span:nth-child(2) { opacity: 0; }
.hbg.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* Mobile drawer */
.mob-menu {
  position: fixed; top: 64px; left: 0; right: 0; z-index: 490;
  background: #fff; border-bottom: 1px solid rgba(0,0,0,0.06);
  padding: 10px 14px 18px;
  display: flex; flex-direction: column; gap: 2px;
  box-shadow: 0 16px 48px rgba(0,0,0,0.08);
  animation: slideDown 0.2s ease both;
}
.mob-item {
  display: flex; align-items: center; gap: 10px;
  background: none; border: none; cursor: none;
  font-family: 'Google Sans', sans-serif; font-size: 0.95rem; font-weight: 500;
  text-align: left; padding: 11px 16px; border-radius: 12px;
  color: #1a1a1a; transition: background 0.15s;
}
.mob-item:hover, .mob-item.active { background: rgba(0,0,0,0.04); }
.mob-resume {
  margin-top: 10px; background: #1a1a1a; color: #fff;
  border: none; cursor: none;
  font-family: 'Google Sans', sans-serif; font-size: 0.95rem; font-weight: 600;
  padding: 13px 16px; border-radius: 12px; transition: opacity 0.2s;
}
.mob-resume:hover { opacity: 0.85; }

/* ── ANIMATIONS ── */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeSlideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
@keyframes orbFloat {
  0%   { transform: translateY(0) scale(1); }
  50%  { transform: translateY(-10px) scale(1.02); }
  100% { transform: translateY(0) scale(1); }
}
@keyframes drift {
  0%,100% { transform: translate(0,0); }
  25%  { transform: translate(var(--dx1,8px), var(--dy1,-12px)); }
  50%  { transform: translate(var(--dx2,-6px), var(--dy2,10px)); }
  75%  { transform: translate(var(--dx3,7px), var(--dy3,5px)); }
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes gentleFloat {
  0%,100% { transform: translateY(0) rotate(-1.5deg); }
  50%     { transform: translateY(-14px) rotate(1.5deg); }
}
@keyframes orbitSpin { to { transform: rotate(360deg); } }

/* ── SCROLL REVEAL ── */
.rv { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
.rv.in { opacity: 1; transform: translateY(0); }

/* ── HERO ── */
.hero-section {
  min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 100px 40px 60px; text-align: center;
  position: relative; overflow: hidden; z-index: 1;
}
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.78rem; font-weight: 500; letter-spacing: 0.04em;
  color: #5f6368; background: rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.08);
  border-radius: 100px; padding: 6px 16px; margin-bottom: 28px;
  animation: fadeSlideDown 0.55s ease both;
}
.hero-dot { width: 7px; height: 7px; border-radius: 50%; background: #34A853; display: inline-block; animation: blink 1.8s ease infinite; }

/* Hero name — Google-colour letters, full weight 700 (matching old file) */
.hero-name {
  font-family: 'Google Sans Display', sans-serif;
  font-size: clamp(3rem, 10vw, 7.5rem);
  font-weight: 700;
  letter-spacing: -4px; line-height: 1;
  margin-bottom: 8px;
  animation: fadeUp 0.65s 0.1s ease both;
  animation-fill-mode: both; opacity: 0;
}

.hero-title {
  font-size: clamp(1rem, 2.8vw, 1.45rem); font-weight: 600;
  color: #1a1a1a; margin-bottom: 16px;
  animation: fadeUp 0.65s 0.2s ease both;
  animation-fill-mode: both; opacity: 0;
}
.hero-tagline {
  font-size: clamp(0.88rem, 2vw, 1.05rem); color: #5f6368;
  max-width: 540px; line-height: 1.82; margin-bottom: 36px;
  animation: fadeUp 0.65s 0.28s ease both;
  animation-fill-mode: both; opacity: 0;
}
.hero-ctas {
  display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;
  animation: fadeUp 0.65s 0.36s ease both;
  animation-fill-mode: both; opacity: 0;
}
.btn-dark {
  background: #1a1a1a; color: #fff; border: none; cursor: none;
  font-family: 'Google Sans', sans-serif; font-size: 0.92rem; font-weight: 600;
  padding: 13px 28px; border-radius: 100px;
  transition: opacity 0.18s, transform 0.15s;
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-dark:hover { opacity: 0.82; transform: translateY(-2px); }
.btn-outline {
  background: transparent; color: #1a1a1a;
  border: 1.5px solid rgba(0,0,0,0.2); cursor: none;
  font-family: 'Google Sans', sans-serif; font-size: 0.92rem; font-weight: 500;
  padding: 12px 28px; border-radius: 100px;
  transition: border-color 0.18s, transform 0.15s;
  text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
}
.btn-outline:hover { border-color: #1a1a1a; transform: translateY(-2px); }
.btn-blue {
  background: transparent; color: #4285F4;
  border: 1.5px solid #4285F4; cursor: none;
  font-family: 'Google Sans', sans-serif; font-size: 0.92rem; font-weight: 500;
  padding: 12px 28px; border-radius: 100px;
  transition: background 0.18s, transform 0.15s;
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-blue:hover { background: rgba(66,133,244,0.07); transform: translateY(-2px); }

/* Search bar (from old file) */
.hero-search {
  margin-top: 52px; width: 100%; max-width: 560px;
  animation: fadeUp 0.65s 0.44s ease both;
  animation-fill-mode: both; opacity: 0;
}
.search-inner {
  display: flex; align-items: center; gap: 12px;
  background: #fff; border: 1px solid rgba(0,0,0,0.14);
  border-radius: 28px; padding: 14px 22px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.08);
}
.hero-scroll-hint {
  margin-top: 36px; display: flex; flex-direction: column;
  align-items: center; gap: 5px; color: #bbb; font-size: 0.72rem;
  animation: blink 2.5s ease infinite;
}

/* ── MARQUEE ── */
.marquee-wrap {
  overflow: hidden; padding: 28px 0;
  border-top: 1px solid rgba(0,0,0,0.06);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  background: #fff;
}
.marquee-track { display: flex; gap: 48px; width: max-content; animation: marquee 22s linear infinite; }
.marquee-item { display: flex; align-items: center; gap: 10px; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #9aa0a6; white-space: nowrap; }
.marquee-dot { width: 4px; height: 4px; border-radius: 50%; background: #d1d5db; flex-shrink: 0; }

/* ── SKILL ORBS ── */
.orbs-section { padding: 100px 40px; background: #f8f9fa; position: relative; overflow: hidden; }
.orbs-header { text-align: center; margin-bottom: 72px; }
.section-eyebrow {
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em;
  text-transform: uppercase; color: #9aa0a6; margin-bottom: 16px;
  display: flex; align-items: center; justify-content: center; gap: 12px;
}
.section-eyebrow::before, .section-eyebrow::after { content:''; width: 32px; height: 1px; background: #d1d5db; }
.section-title {
  font-family: 'Google Sans Display', sans-serif;
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 700; letter-spacing: -1.5px; color: #1a1a1a; line-height: 1.1;
}

/* Orbs field — scattered floating circles */
.orbs-field {
  position: relative; width: 100%; max-width: 1100px; margin: 0 auto; height: 520px;
}
.orb {
  position: absolute;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; cursor: none;
  animation: drift var(--dur,8s) var(--del,0s) ease-in-out infinite;
}
.orb-circle {
  width: var(--sz,80px); height: var(--sz,80px); border-radius: 50%;
  background: #efefef;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Google Sans', sans-serif;
  font-size: var(--lfs, 0.72rem); font-weight: 600; color: #1a1a1a;
  text-align: center; padding: 0 8px; line-height: 1.3;
  border: 1px solid rgba(0,0,0,0.07);
  transition: all 0.28s cubic-bezier(0.34,1.56,0.64,1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  user-select: none;
}
.orb:hover .orb-circle {
  background: #1a1a1a; color: #fff;
  transform: scale(1.14);
  box-shadow: 0 12px 40px rgba(0,0,0,0.18);
}
.orb-label {
  font-size: 0.7rem; font-weight: 500; color: #5f6368;
  white-space: nowrap; opacity: 0; transform: translateY(4px);
  transition: opacity 0.2s, transform 0.2s;
}
.orb:hover .orb-label { opacity: 1; transform: translateY(0); color: #1a1a1a; font-weight: 600; }

/* ── ABOUT ── */
.about-section { padding: 100px 40px; background: #fff; }
.chip {
  display: inline-block; padding: 5px 14px; border-radius: 100px;
  font-size: 0.78rem; font-weight: 500; cursor: default;
  border: 1.5px solid rgba(0,0,0,0.1);
  background: #f8f9fa; color: #1a1a1a;
  transition: all 0.18s; user-select: none;
}
.chip:hover { background: #1a1a1a; color: #fff; border-color: #1a1a1a; transform: translateY(-2px); }

/* ── EXPERIENCE ── */
.exp-section { padding: 120px 40px; background: #fff; }
.exp-grid { max-width: 860px; margin: 0 auto; }
.exp-item {
  padding: 40px 0; border-bottom: 1px solid rgba(0,0,0,0.07);
  display: grid; grid-template-columns: 1fr 2fr; gap: 40px; align-items: start;
  transition: opacity 0.2s;
}
.exp-item:last-child { border-bottom: none; }
.exp-item:hover { opacity: 0.8; }
.exp-company { font-family: 'Google Sans Display', sans-serif; font-size: 1.05rem; font-weight: 700; color: #1a1a1a; margin-bottom: 6px; }
.exp-period { font-size: 0.78rem; color: #9aa0a6; font-weight: 500; letter-spacing: 0.02em; }
.exp-badge { display: inline-block; margin-top: 8px; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 10px; border-radius: 100px; background: #1a1a1a; color: #fff; }
.exp-role { font-size: 0.8rem; font-weight: 600; color: #5f6368; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em; }
.exp-points { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.exp-points li { font-size: 0.9rem; color: #5f6368; line-height: 1.75; padding-left: 14px; position: relative; }
.exp-points li::before { content: '—'; position: absolute; left: 0; color: #d1d5db; }

/* ── PROJECTS ── */
.proj-section { padding: 120px 40px; background: #f8f9fa; }
.proj-grid { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 2px; }
.proj-card {
  background: #fff; padding: 40px 36px;
  border: 1px solid rgba(0,0,0,0.06);
  position: relative; overflow: hidden; transition: background 0.22s; cursor: none;
}
.proj-card:hover { background: #1a1a1a; }
.proj-num { font-family: 'Google Sans Display', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; color: #d1d5db; margin-bottom: 24px; transition: color 0.22s; }
.proj-card:hover .proj-num { color: rgba(255,255,255,0.2); }
.proj-icon { font-size: 1.2rem; width: 48px; height: 48px; border-radius: 50%; background: #f8f9fa; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; border: 1px solid rgba(0,0,0,0.07); transition: all 0.22s; color: #1a1a1a; font-family: 'Google Sans', sans-serif; font-weight: 700; }
.proj-card:hover .proj-icon { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.15); color: #fff; }
.proj-title { font-family: 'Google Sans Display', sans-serif; font-size: 1.15rem; font-weight: 700; color: #1a1a1a; margin-bottom: 10px; letter-spacing: -0.3px; transition: color 0.22s; }
.proj-card:hover .proj-title { color: #fff; }
.proj-stack { font-size: 0.72rem; font-weight: 600; color: #9aa0a6; letter-spacing: 0.04em; margin-bottom: 16px; transition: color 0.22s; text-transform: uppercase; }
.proj-card:hover .proj-stack { color: rgba(255,255,255,0.4); }
.proj-desc { font-size: 0.87rem; color: #5f6368; line-height: 1.78; transition: color 0.22s; }
.proj-card:hover .proj-desc { color: rgba(255,255,255,0.68); }
.proj-links { display: flex; align-items: center; justify-content: flex-end; margin-top: 24px; }
.proj-gh { font-size: 0.78rem; font-weight: 600; color: #9aa0a6; text-decoration: none; transition: color 0.22s, transform 0.22s; display: inline-flex; align-items: center; gap: 5px; }
.proj-gh:hover, .proj-card:hover .proj-gh { color: rgba(255,255,255,0.6); }
.proj-card:hover .proj-gh:hover { color: #fff; }

/* ── EDUCATION ── */
.edu-section { padding: 100px 40px; background: #fff; }
.edu-grid { max-width: 960px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap: 18px; }
.edu-card {
  background: #f8f9fa; border-radius: 20px; padding: 28px 24px;
  border: 1.5px solid rgba(0,0,0,0.06);
  display: flex; gap: 18px; align-items: flex-start;
  transition: all 0.22s; cursor: none;
}
.edu-card:hover { background: #1a1a1a; border-color: #1a1a1a; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
.edu-icon { font-size: 1.6rem; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.06); border-radius: 14px; flex-shrink: 0; transition: background 0.22s; }
.edu-card:hover .edu-icon { background: rgba(255,255,255,0.1); }
.edu-degree { font-weight: 700; font-size: 0.97rem; color: #1a1a1a; margin-bottom: 5px; transition: color 0.22s; }
.edu-card:hover .edu-degree { color: #fff; }
.edu-school { font-size: 0.83rem; font-weight: 600; color: #5f6368; margin-bottom: 5px; transition: color 0.22s; }
.edu-card:hover .edu-school { color: rgba(255,255,255,0.6); }
.edu-period { font-size: 0.76rem; color: #9aa0a6; transition: color 0.22s; }
.edu-card:hover .edu-period { color: rgba(255,255,255,0.4); }

/* ── CONTACT ── */
.contact-section {
  padding: 140px 40px; background: #1a1a1a;
  text-align: center; position: relative; overflow: hidden;
}
.contact-bg-text {
  position: absolute; bottom: -60px; left: 50%; transform: translateX(-50%);
  font-family: 'Google Sans Display', sans-serif;
  font-size: clamp(5rem, 14vw, 14rem); font-weight: 700; letter-spacing: -4px;
  color: rgba(255,255,255,0.03); white-space: nowrap;
  pointer-events: none; user-select: none;
}
.contact-eyebrow { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 24px; }
.contact-title {
  font-family: 'Google Sans Display', sans-serif;
  font-size: clamp(2.4rem, 6vw, 4.8rem); font-weight: 700;
  letter-spacing: -2px; color: #fff; line-height: 1.05; margin-bottom: 48px;
}
.contact-title span { color: rgba(255,255,255,0.32); }
.contact-links { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
.c-link {
  display: inline-flex; align-items: center; gap: 9px;
  background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.75);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 100px;
  padding: 12px 24px; font-size: 0.85rem; font-weight: 500;
  text-decoration: none; transition: all 0.2s; cursor: none;
}
.c-link:hover { background: rgba(255,255,255,0.14); color: #fff; border-color: rgba(255,255,255,0.25); transform: translateY(-2px); }

/* ── FOOTER ── */
.g-footer {
  background: #1a1a1a; border-top: 1px solid rgba(255,255,255,0.06);
  padding: 24px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;
}
.footer-logo { font-family: 'Google Sans Display', sans-serif; font-size: 0.88rem; font-weight: 700; color: rgba(255,255,255,0.45); letter-spacing: -0.3px; display: flex; align-items: center; gap: 1px; }
.footer-copy { font-size: 0.76rem; color: rgba(255,255,255,0.22); }

/* ── SECTION HEADERS (experience / projects / edu) ── */
.sec-header { max-width: 860px; margin: 0 auto 56px; }
.sec-header-wide { max-width: 1000px; margin: 0 auto 56px; }
.sec-eyebrow { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #9aa0a6; display: flex; align-items: center; gap: 12px; }
.sec-eyebrow::before { content:''; width: 24px; height: 1px; background: #d1d5db; display: inline-block; }
.sec-title { font-family: 'Google Sans Display', sans-serif; font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 700; letter-spacing: -1.5px; color: #1a1a1a; margin-top: 14px; line-height: 1.1; }

/* ── RESPONSIVE ── */
@media (max-width: 820px) {
  .nav-links { display: none !important; }
  .hbg { display: flex !important; }
  .orbs-field { height: auto !important; display: flex !important; flex-wrap: wrap !important; justify-content: center !important; gap: 14px !important; padding: 16px 0 !important; }
  .orb { position: static !important; animation: orbFloat var(--dur,5s) var(--del,0s) ease-in-out infinite !important; }
  .exp-item { grid-template-columns: 1fr !important; gap: 12px !important; }
  .about-main-grid { grid-template-columns: 1fr !important; }
  .g-nav { padding: 0 20px !important; }
  .hero-section, .orbs-section, .exp-section, .proj-section, .edu-section, .about-section { padding-left: 20px !important; padding-right: 20px !important; }
  .proj-grid { grid-template-columns: 1fr !important; }
  .contact-section { padding: 100px 24px !important; }
}
@media (max-width: 480px) {
  .hero-name { letter-spacing: -2px !important; }
  .contact-title { letter-spacing: -1px !important; }
  .hero-ctas { flex-direction: column !important; align-items: center !important; }
  .hero-ctas > * { width: 200px !important; justify-content: center !important; }
  .g-footer { flex-direction: column; text-align: center; }
  .edu-grid { grid-template-columns: 1fr !important; }
}
`;

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: "smooth" });
}

function useReveal() {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); obs.disconnect(); } }, { threshold: 0.07 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

/* ═══════════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════════ */
function Cursor() {
  const dot = useRef(); const ring = useRef();
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf;
    const move = e => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) { dot.current.style.left = mx + "px"; dot.current.style.top = my + "px"; }
    };
    const loop = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ring.current) { ring.current.style.left = rx + "px"; ring.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(loop);
    };
    const over = e => {
      const isHov = !!e.target.closest("button,a,.orb");
      dot.current?.classList.toggle("hover", isHov);
      ring.current?.classList.toggle("hover", isHov);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); cancelAnimationFrame(raf); };
  }, []);
  return (<><div ref={dot} className="cursor" /><div ref={ring} className="cursor-ring" /></>);
}

/* ═══════════════════════════════════════════════════════════
   PROGRESS BAR
═══════════════════════════════════════════════════════════ */
function Progress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => { const m = document.body.scrollHeight - window.innerHeight; setP(m > 0 ? (window.scrollY / m) * 100 : 0); };
    window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="prog"><div className="prog-fill" style={{ width: `${p}%` }} /></div>;
}

/* ═══════════════════════════════════════════════════════════
   NAV — Google-coloured logo (from old file), links to all sections
═══════════════════════════════════════════════════════════ */
function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const [raised, setRaised] = useState(false);
  useEffect(() => {
    const fn = () => setRaised(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn);
  }, []);
  useEffect(() => {
    if (!open) return;
    const fn = e => { if (!e.target.closest(".mob-menu") && !e.target.closest(".hbg")) setOpen(false); };
    document.addEventListener("mousedown", fn); return () => document.removeEventListener("mousedown", fn);
  }, [open]);
  const go = useCallback(id => { setOpen(false); goTo(id); }, []);

  return (
    <>
      <nav className={`g-nav${raised ? " raised" : ""}`}>
        {/* Logo — plain black, Antigravity style */}
        <button className="g-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span style={{ color: "#1a1a1a" }}>Abhay</span>
          <span style={{ color: "#9aa0a6", marginLeft: 2, fontWeight: 400 }}>.dev</span>
        </button>

        <ul className="nav-links">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <button className={`nav-btn${active === id ? " active" : ""}`} onClick={() => go(id)}>{label}</button>
            </li>
          ))}
          <li>
            <button className="resume-btn" onClick={() => window.open(RESUME.resumeUrl, "_blank")}>Resume →</button>
          </li>
        </ul>

        <button className={`hbg${open ? " open" : ""}`} onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open}>
          <span /><span /><span />
        </button>
      </nav>

      {open && (
        <div className="mob-menu">
          {SECTIONS.map(({ id, label, icon }) => (
            <button key={id} className={`mob-item${active === id ? " active" : ""}`} onClick={() => go(id)}>
              <span style={{ fontSize: "1.1rem" }}>{icon}</span> {label}
            </button>
          ))}
          <button className="mob-resume" onClick={() => window.open(RESUME.resumeUrl, "_blank")}>📄 &nbsp;Resume</button>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO — full name in Google colours, weight 700 (old file style)
═══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <div id="hero" className="hero-section">
      {/* Badge */}
      <div className="hero-eyebrow">
        <span className="hero-dot" />
        Open to full-time &amp; freelance opportunities
      </div>

      {/* Name — plain #1a1a1a, weight 700, Google Sans Display — Antigravity style */}
      <h1 className="hero-name" style={{ color: "#1a1a1a" }}>
        {RESUME.name}
      </h1>

      {/* Title */}
      <div className="hero-title">{RESUME.title}</div>

      {/* Tagline */}
      <p className="hero-tagline">{RESUME.tagline}</p>

      {/* CTAs */}
      <div className="hero-ctas">
        <button className="btn-dark" onClick={() => goTo("projects")}>🚀 View Projects</button>
        <a href={RESUME.github} target="_blank" rel="noreferrer" className="btn-outline">🐙 GitHub</a>
        <button className="btn-blue" onClick={() => goTo("contact")}>✉️ Contact Me</button>
      </div>

      {/* Google-style search bar (from old file) */}
      {/* <div className="hero-search">
        <div className="search-inner">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span style={{ color: "#9aa0a6", fontSize: "0.92rem", flex: 1, textAlign: "left" }}>
            Search skills, projects, experience…
          </span>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </div>
      </div> */}

      {/* Scroll hint */}
      <div className="hero-scroll-hint">
        <span>scroll to explore</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════════════════════ */
function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-dot" />{item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SKILL ORBS — names only, no icons (user request)
═══════════════════════════════════════════════════════════ */
function SkillOrbs() {
  const ref = useReveal();
  return (
    <div id="skills" className="orbs-section">
      <div ref={ref} className="rv">
        <div className="orbs-header">
          <div className="section-eyebrow">Skills &amp; Technologies</div>
          <h2 className="section-title">The Tools I Think With</h2>
        </div>

        <div className="orbs-field">
          {SKILL_ORBS.map((skill, i) => {
            const L = ORB_LAYOUT[i] || ORB_LAYOUT[i % ORB_LAYOUT.length];
            /* Dynamically size label font based on orb size */
            const labelFs = L.sz >= 100 ? "0.78rem" : L.sz >= 88 ? "0.72rem" : "0.66rem";
            return (
              <div key={skill.id} className="orb"
                style={{
                  top: L.top, left: L.left,
                  "--sz": `${L.sz}px`,
                  "--lfs": labelFs,
                  "--dur": L.dur, "--del": L.del,
                  "--dx1": L.dx1, "--dy1": L.dy1,
                  "--dx2": L.dx2, "--dy2": L.dy2,
                  "--dx3": L.dx3, "--dy3": L.dy3,
                }}>
                <div className="orb-circle">{skill.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT — Antigravity editorial style
═══════════════════════════════════════════════════════════ */
function About() {
  const ref = useReveal();
  const stats = [
    { value: "2+",  label: "Years Experience" },
    { value: "3+",  label: "Projects Shipped" },
    { value: "10+", label: "Technologies" },
    { value: "2",   label: "Companies" },
  ];
  return (
    <section id="about" className="about-section">
      <div ref={ref} className="rv">

        {/* Section header — same style as experience/projects */}
        <div style={{ maxWidth: 1000, margin: "0 auto 56px" }}>
          <div className="sec-eyebrow">About</div>
          <div className="sec-title">Who I Am</div>
        </div>

        {/* Main about grid */}
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", border: "1px solid rgba(0,0,0,0.07)" }} className="about-main-grid">

          {/* Left — identity block */}
          <div style={{ padding: "52px 48px", borderRight: "1px solid rgba(0,0,0,0.07)" }}>
            {/* Name + role */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9aa0a6", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 20, height: 1, background: "#d1d5db", display: "inline-block" }} />
                AI Engineer
              </div>
              <h2 style={{ fontFamily: "'Google Sans Display', sans-serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 700, letterSpacing: "-1.5px", color: "#1a1a1a", lineHeight: 1.05, marginBottom: 8 }}>
                Abhay<br />Kumar
              </h2>
              <div style={{ width: 40, height: 2, background: "#1a1a1a", borderRadius: 1, marginTop: 20 }} />
            </div>

            {/* Bio */}
            <p style={{ fontSize: "0.95rem", color: "#5f6368", lineHeight: 1.85, marginBottom: 16 }}>
              A passionate AI Engineer dedicated to building AI-powered voice &amp; chat assistants and intelligent agents using LLMs, LangChain &amp; RAG pipelines.
            </p>
            <p style={{ fontSize: "0.95rem", color: "#5f6368", lineHeight: 1.85, marginBottom: 36 }}>
              Currently pursuing my MCA at Kurukshetra University while shipping AI-driven products daily at Alphavima Technologies.
            </p>

            {/* Tag pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["🤖 AI Engineer", "🧠 LLMs, LangChain & RAG", "💬 Voice & Chat Assistants", "🌐 Open to Remote", "⚡ Fast Learner"].map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>

          {/* Right — stats + contact strip */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1 }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  padding: "40px 36px",
                  borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.07)" : "none",
                  borderRight: i % 2 === 0 ? "1px solid rgba(0,0,0,0.07)" : "none",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f8f9fa"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{ fontFamily: "'Google Sans Display', sans-serif", fontSize: "clamp(2rem,3vw,2.8rem)", fontWeight: 700, letterSpacing: "-1.5px", color: "#1a1a1a", lineHeight: 1, marginBottom: 8 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.76rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9aa0a6" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact strip */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", padding: "24px 36px", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <a href={`mailto:${RESUME.email}`} style={{ fontSize: "0.8rem", color: "#5f6368", textDecoration: "none", fontWeight: 500, transition: "color 0.18s", display: "flex", alignItems: "center", gap: 6 }}
                onMouseEnter={e => e.currentTarget.style.color = "#1a1a1a"}
                onMouseLeave={e => e.currentTarget.style.color = "#5f6368"}>
                ✉ {RESUME.email}
              </a>
              <span style={{ color: "#e0e0e0" }}>·</span>
              <a href={RESUME.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: "0.8rem", color: "#5f6368", textDecoration: "none", fontWeight: 500, transition: "color 0.18s", display: "flex", alignItems: "center", gap: 6 }}
                onMouseEnter={e => e.currentTarget.style.color = "#1a1a1a"}
                onMouseLeave={e => e.currentTarget.style.color = "#5f6368"}>
                ◈ LinkedIn ↗
              </a>
              <span style={{ color: "#e0e0e0" }}>·</span>
              <a href={RESUME.github} target="_blank" rel="noreferrer" style={{ fontSize: "0.8rem", color: "#5f6368", textDecoration: "none", fontWeight: 500, transition: "color 0.18s", display: "flex", alignItems: "center", gap: 6 }}
                onMouseEnter={e => e.currentTarget.style.color = "#1a1a1a"}
                onMouseLeave={e => e.currentTarget.style.color = "#5f6368"}>
                ◎ GitHub ↗
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   EXPERIENCE
═══════════════════════════════════════════════════════════ */
function Experience() {
  const ref = useReveal();
  return (
    <section id="experience" className="exp-section">
      <div ref={ref} className="rv">
        <div className="sec-header">
          <div className="sec-eyebrow">Experience</div>
          <div className="sec-title">Where I've Built Things</div>
        </div>
        <div className="exp-grid">
          {RESUME.experience.map((e, i) => (
            <div key={i} className="exp-item">
              <div>
                <div className="exp-company">{e.company}</div>
                <div className="exp-period">{e.period}</div>
                {e.badge && <div className="exp-badge">{e.badge}</div>}
              </div>
              <div>
                <div className="exp-role">{e.role}</div>
                <ul className="exp-points">
                  {e.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════════════════ */
function Projects() {
  const ref = useReveal();
  return (
    <section id="projects" className="proj-section">
      <div ref={ref} className="rv">
        <div className="sec-header-wide">
          <div className="sec-eyebrow">Projects</div>
          <div className="sec-title">What I've Shipped</div>
        </div>
        <div className="proj-grid">
          {RESUME.projects.map((p, i) => (
            <div key={i} className="proj-card">
              <div className="proj-num">{p.num || `0${i + 1}`}</div>
              <div className="proj-icon">{String(i + 1).padStart(2, "0")}</div>
              <div className="proj-title">{p.title}</div>
              <div className="proj-stack">{p.stack}</div>
              <div className="proj-desc">{p.desc}</div>
              <div className="proj-links">
                <a href={p.github} target="_blank" rel="noreferrer" className="proj-gh">
                  GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   EDUCATION (from old file — 3 entries)
═══════════════════════════════════════════════════════════ */
function Education() {
  const ref = useReveal();
  return (
    <section id="education" className="edu-section">
      <div ref={ref} className="rv">
        <div className="sec-header-wide">
          <div className="sec-eyebrow">Education</div>
          <div className="sec-title">Academic Background</div>
        </div>
        <div className="edu-grid">
          {RESUME.education.map((e, i) => (
            <div key={i} className="edu-card">
              <div className="edu-icon">{e.icon}</div>
              <div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-school">{e.school}</div>
                <div className="edu-period">📅 {e.period}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════ */
function Contact() {
  const ref = useReveal();
  const links = [
    { icon: "✉", label: RESUME.email,         href: `mailto:${RESUME.email}` },
    { icon: "☎", label: RESUME.phone,          href: `tel:${RESUME.phone}` },
    { icon: "◎", label: "GitHub",              href: RESUME.github },
    { icon: "◈", label: "LinkedIn",            href: RESUME.linkedin },
    { icon: "📄", label: "Resume / CV",        href: RESUME.resumeUrl },
  ];
  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg-text">HIRE ME</div>
      <div ref={ref} className="rv" style={{ position: "relative" }}>
        <div className="contact-eyebrow">Let's Work Together</div>
        <h2 className="contact-title">
          Ready to build something <span>intelligent</span>?
        </h2>
        <div className="contact-links">
          {links.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="c-link">
              <span>{l.icon}</span>{l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER — Google-coloured logo from old file
═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="g-footer">
      <div className="footer-logo">
        <span style={{ color: "rgba(255,255,255,0.5)" }}>Abhay</span>
        <span style={{ color: "rgba(255,255,255,0.2)", marginLeft: 2, fontWeight: 400 }}>.dev</span>
      </div>
      <div className="footer-copy">© {new Date().getFullYear()} Abhay Kumar · AI & Backend Engineer</div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Cursor />
      <Progress />
      <Nav active={active} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <SkillOrbs />
        <Marquee />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
