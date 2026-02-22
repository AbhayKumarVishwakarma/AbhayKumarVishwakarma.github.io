import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════════
   RESUME DATA
══════════════════════════════════════════════════════════ */
const RESUME = {
  name: "Abhay Kumar",
  title: "AI & Backend Engineer",
  location: "Sultanpur, Uttar Pradesh",
  phone: "+91 7233053062",
  email: "abhaykumarv00@gmail.com",
  github: "https://github.com/AbhayKumarVishwakarma",
  linkedin: "https://www.linkedin.com/in/abhay-kumar-vishwakarma-3b0b66260/",
  resumeUrl: "https://drive.google.com/file/d/1SVnUwxGP3wiPpW33MI1UJaMdOIiDTgke/view",
  tagline: "Building intelligent systems — from scalable REST APIs to AI agents powered by LLMs, LangChain, LangGraph & RAG.",
  skills: {
    Languages: ["Python", "Java", "C#", "JavaScript"],
    Frameworks: ["FastAPI", "Flask", "Spring Boot", ".NET", "Node.js", "React.js"],
    Databases: ["MySQL", "PostgreSQL", "MSSQL", "MongoDB", "Pinecone"],
    "AI & Tools": ["AI Agents", "Chatbots", "LLMs", "LangChain", "LangGraph", "Generative AI", "NLP", "RAG", "OpenAI APIs", "Hugging Face", "Prompt Engineering", "Vector DBs"],
    "Cloud & Tools": ["Azure Functions", "Azure Cloud", "Git", "GitHub", "Postman", "PowerApps"],
    Technologies: ["REST APIs", "Webhooks", "Microservices", "Serverless", "OAuth2", "Workflow Automation"],
  },
  experience: [
    {
      role: "Associate Engineer",
      company: "Alphavima Technologies",
      period: "Jul 2024 – Present",
      color: "#4285F4",
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
      color: "#EA4335",
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
      emoji: "🤖",
      stack: ["FastAPI", "Python", "LLMs", "LangChain", "RAG", "Pinecone", "MongoDB", "JWT"],
      color: "#4285F4",
      github: "https://github.com/AbhayKumarVishwakarma/AI-Assistant",
      desc: "AI-driven chat platform with multiple specialised agents (General & Health Assistants). Features JWT auth, LangChain orchestration, Pinecone Vector DB, RAG for document-based Q&A, and PDF ingestion pipelines.",
    },
    {
      title: "Safar — Online Bus Booking",
      emoji: "🚌",
      stack: ["Java", "Spring Boot", "MySQL", "HTML", "CSS", "JavaScript"],
      color: "#EA4335",
      github: "https://github.com/AbhayKumarVishwakarma/Safar",
      desc: "Seamless bus ticket booking platform with admin route management and secure payments. Role-based access control, CRUD for routes/users/reservations, and Agile team collaboration.",
    },
    {
      title: "Portfolio Management System",
      emoji: "📊",
      stack: ["Python", "Flask", "React", "MongoDB"],
      color: "#34A853",
      github: "https://github.com/AbhayKumarVishwakarma/Project-Prism",
      desc: "Platform for managing portfolios, tasks, and resources for teams. Admin auth, full CRUD, task assignment to managers, and React frontend for real-time milestone and project tracking.",
    },
  ],
  education: [
    { degree: "Master of Computer Applications", school: "Kurukshetra University", period: "Jul 2024 – Jun 2026", icon: "🎓", color: "#4285F4" },
    { degree: "Full Stack Web Development", school: "Masai School", period: "Aug 2022 – Aug 2023", icon: "💻", color: "#34A853" },
    { degree: "Bachelor's degree", school: "University of Allahabad", period: "Jul 2019 – Jun 2022", icon: "💻", color: "#980bdaff" },
  ],
};

const G = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];
const FLOATS = ["🚀", "⚡", "🤖", "💡", "🔧", "🧩", "☁️", "💻", "🔑", "📡", "🌐", "⭐", "🎯", "📊", "🔬", "💎", "⚙️", "🧠", "🔭", "📱", "🌟", "🐍", "☕", "🏆"];
const NAV_LINKS = [
  { label: "About", id: "about", icon: "👤" },
  { label: "Skills", id: "skills", icon: "⚡" },
  { label: "Experience", id: "experience", icon: "💼" },
  { label: "Projects", id: "projects", icon: "🚀" },
  { label: "Education", id: "education", icon: "🎓" },
  { label: "Contact", id: "contact", icon: "✉️" },
];

/* ══════════════════════════════════════════════════════════
   GLOBAL CSS
══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Display:wght@400;700&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; }
body { font-family: 'Google Sans', sans-serif; background: #fff; color: #202124; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

@keyframes floatUp {
  0%   { transform: translateY(110vh) rotate(0deg) scale(0.6); opacity: 0; }
  8%   { opacity: 0.7; }
  92%  { opacity: 0.7; }
  100% { transform: translateY(-15vh) rotate(380deg) scale(1.05); opacity: 0; }
}
@keyframes fadeSlideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(26px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
@keyframes gentleFloat {
  0%,100% { transform: translateY(0) rotate(-1.5deg); }
  50%     { transform: translateY(-14px) rotate(1.5deg); }
}
@keyframes orbitSpin { to { transform: rotate(360deg); } }

/* ── NAV ── */
.p-nav {
  position: fixed; top: 4px; left: 0; right: 0; z-index: 500;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 28px; height: 60px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0,0,0,0.07);
  box-shadow: 0 1px 12px rgba(0,0,0,0.05);
  transition: box-shadow 0.3s;
}
.p-nav.scrolled { box-shadow: 0 2px 22px rgba(0,0,0,0.1); }

.logo-btn {
  display: inline-flex; align-items: center; gap: 1px;
  background: none; border: none; cursor: pointer;
  font-family: 'Google Sans Display', sans-serif;
  font-size: 1.32rem; font-weight: 700; letter-spacing: -0.5px;
  padding: 4px 0;
}

.nav-ul { display: flex; align-items: center; gap: 4px; list-style: none; }
.nav-ul li { display: flex; }

.nl-btn {
  background: none; border: none; cursor: pointer;
  font-family: 'Google Sans', sans-serif; font-size: 0.84rem; font-weight: 500;
  padding: 6px 13px; border-radius: 20px; color: #5F6368;
  transition: background 0.18s, color 0.18s; white-space: nowrap;
}
.nl-btn:hover { background: rgba(0,0,0,0.05); color: #202124; }
.nl-btn.active { background: rgba(66,133,244,0.1); color: #4285F4; font-weight: 600; }

.hire-btn {
  background: #4285F4; color: #fff; border: none; cursor: pointer;
  font-family: 'Google Sans', sans-serif; font-size: 0.84rem; font-weight: 600;
  padding: 8px 18px; border-radius: 20px;
  transition: box-shadow 0.2s, transform 0.15s; white-space: nowrap;
}
.hire-btn:hover { box-shadow: 0 4px 16px rgba(66,133,244,0.4); transform: translateY(-1px); }

/* Hamburger */
.hbg {
  display: none; flex-direction: column; justify-content: center; align-items: center;
  gap: 5px; width: 40px; height: 40px;
  background: none; border: none; cursor: pointer; border-radius: 10px;
  transition: background 0.18s;
}
.hbg:hover { background: rgba(0,0,0,0.05); }
.hbg span {
  display: block; width: 20px; height: 2px; background: #5F6368;
  border-radius: 2px; transition: transform 0.3s, opacity 0.3s;
}
.hbg.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hbg.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hbg.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile drawer */
.mob-drawer {
  position: fixed; top: 64px; left: 0; right: 0; z-index: 490;
  background: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  padding: 10px 14px 16px;
  display: flex; flex-direction: column; gap: 3px;
  animation: fadeSlideDown 0.2s ease both;
}
.mob-btn {
  display: flex; align-items: center; gap: 10px;
  background: none; border: none; cursor: pointer;
  font-family: 'Google Sans', sans-serif; font-size: 0.95rem; font-weight: 500;
  text-align: left; padding: 11px 16px; border-radius: 12px;
  color: #202124; transition: background 0.16s, color 0.16s;
}
.mob-btn:hover { background: rgba(66,133,244,0.07); color: #4285F4; }
.mob-btn.active { background: rgba(66,133,244,0.1); color: #4285F4; font-weight: 600; }
.mob-hire {
  margin-top: 8px; background: #4285F4; color: #fff; border: none; cursor: pointer;
  font-family: 'Google Sans', sans-serif; font-size: 0.95rem; font-weight: 600;
  padding: 13px 16px; border-radius: 12px; transition: opacity 0.2s;
}
.mob-hire:hover { opacity: 0.88; }

/* Progress bar */
.pb-track { position: fixed; top: 0; left: 0; right: 0; height: 4px; z-index: 600; }
.pb-fill { height: 100%; background: linear-gradient(90deg,#4285F4,#EA4335,#FBBC04,#34A853); transition: width 0.08s linear; border-radius: 0 2px 2px 0; }

/* Reveal */
.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.in { opacity: 1 !important; transform: translateY(0) !important; }

/* Skill chip */
.s-chip {
  display: inline-block; padding: 4px 12px; border-radius: 20px;
  font-size: 0.75rem; font-weight: 500; cursor: default;
  border: 1.5px solid rgba(0,0,0,0.1);
  background: #f8f9fa; color: #202124;
  transition: all 0.16s; user-select: none;
}
.s-chip:hover { transform: translateY(-2px); }

/* ── RESPONSIVE ── */
@media (max-width: 820px) {
  .nav-ul { display: none !important; }
  .hbg { display: flex !important; }
}
@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr !important; text-align: center; }
  .about-chips { justify-content: center !important; }
  .hero-btns { flex-direction: column !important; align-items: center !important; }
  .hero-btns > * { width: 210px !important; justify-content: center !important; }
  .sk-grid { grid-template-columns: 1fr !important; }
  .pj-grid { grid-template-columns: 1fr !important; }
  .ed-grid { grid-template-columns: 1fr !important; }
  .ct-links { flex-direction: column !important; align-items: center !important; }
  .sec { padding: 68px 18px !important; }
  .sk-sec { padding: 68px 18px !important; }
  .contact-card { padding: 40px 20px !important; }
}
@media (max-width: 480px) {
  .sec { padding: 56px 14px !important; }
  .sk-sec { padding: 56px 14px !important; }
  .tl-item { padding-left: 14px !important; }
  .p-nav { padding: 0 16px !important; }
}
`;

/* ══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════ */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 68;
  window.scrollTo({ top, behavior: "smooth" });
}

function useReveal() {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); obs.disconnect(); }
    }, { threshold: 0.07 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function SectionLabel({ children, center }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, justifyContent: center ? "center" : "flex-start" }}>
      <div style={{ width: 26, height: 3, borderRadius: 2, background: "linear-gradient(90deg,#4285F4,#34A853)", flexShrink: 0 }} />
      <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#5F6368" }}>{children}</span>
    </div>
  );
}
function SectionTitle({ children }) {
  return (
    <h2 style={{ fontFamily: "'Google Sans Display',sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700, letterSpacing: -1, marginBottom: 40, color: "#202124", lineHeight: 1.15 }}>
      {children}
    </h2>
  );
}

/* ══════════════════════════════════════════════════════════
   PROGRESS BAR
══════════════════════════════════════════════════════════ */
function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => { const m = document.body.scrollHeight - window.innerHeight; setPct(m > 0 ? (window.scrollY / m) * 100 : 0); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="pb-track"><div className="pb-fill" style={{ width: `${pct}%` }} /></div>;
}

/* ══════════════════════════════════════════════════════════
   FLOATING WORLD
══════════════════════════════════════════════════════════ */
function FloatingWorld() {
  const pts = useRef(Array.from({ length: 24 }, (_, i) => ({
    id: i, x: 3 + Math.random() * 94,
    delay: i * 0.44, duration: 9 + Math.random() * 8,
    item: FLOATS[i % FLOATS.length], size: 1.0 + Math.random() * 1.4,
  }))).current;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {pts.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, bottom: -60,
          fontSize: `${p.size}rem`, opacity: 0, userSelect: "none",
          animation: `floatUp ${p.duration}s ${p.delay}s ease-in-out infinite`,
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.09))",
        }}>{p.item}</div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════════ */
function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = e => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  // Close drawer when clicking outside
  useEffect(() => {
    if (!open) return;
    const fn = e => {
      if (!e.target.closest(".mob-drawer") && !e.target.closest(".hbg")) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  const go = useCallback((id) => { setOpen(false); scrollTo(id); }, []);

  return (
    <>
      <nav className={`p-nav${scrolled ? " scrolled" : ""}`}>
        <button className="logo-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          {"Abhay".split("").map((ch, i) => <span key={i} style={{ color: G[i % 4] }}>{ch}</span>)}
          <span style={{ color: "#5F6368", marginLeft: 1 }}>.dev</span>
        </button>

        <ul className="nav-ul">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <button className={`nl-btn${active === id ? " active" : ""}`} onClick={() => go(id)}>
                {label}
              </button>
            </li>
          ))}
          <li><button className="hire-btn" onClick={() => window.open(RESUME.resumeUrl, "_blank")}>Resume →</button></li>
        </ul>

        <button className={`hbg${open ? " open" : ""}`} onClick={() => setOpen(o => !o)} aria-label="Toggle menu" aria-expanded={open}>
          <span /><span /><span />
        </button>
      </nav>

      {open && (
        <div className="mob-drawer">
          {NAV_LINKS.map(({ label, id, icon }) => (
            <button key={id} className={`mob-btn${active === id ? " active" : ""}`} onClick={() => go(id)}>
              <span style={{ fontSize: "1.1rem" }}>{icon}</span> {label}
            </button>
          ))}
          <button className="mob-hire" onClick={() => window.open(RESUME.resumeUrl, "_blank")}>✉️ &nbsp;Resume</button>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "110px 20px 64px", position: "relative", zIndex: 1 }}>

      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f8f9fa", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 24, padding: "6px 16px", fontSize: "0.78rem", color: "#5F6368", marginBottom: 28, animation: "fadeSlideDown 0.55s ease both" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34A853", display: "inline-block", animation: "blink 1.6s ease infinite" }} />
        Open to full-time & freelance opportunities
      </div>

      <h1 style={{ fontFamily: "'Google Sans Display',sans-serif", fontSize: "clamp(3rem,10vw,7.5rem)", fontWeight: 700, letterSpacing: -4, lineHeight: 1, marginBottom: 8, animation: "fadeSlideDown 0.6s 0.1s ease both", animationFillMode: "both", opacity: 0 }}>
        {RESUME.name.split("").map((ch, i) => (
          <span key={i} style={{ color: ch === " " ? "transparent" : G[i % 4] }}>{ch === " " ? "\u00A0" : ch}</span>
        ))}
      </h1>

      <div style={{ fontSize: "clamp(1rem,2.8vw,1.45rem)", fontWeight: 600, color: "#202124", marginBottom: 16, animation: "fadeSlideDown 0.6s 0.18s ease both", animationFillMode: "both", opacity: 0 }}>
        {RESUME.title}
      </div>

      <p style={{ fontSize: "clamp(0.88rem,2vw,1.05rem)", color: "#5F6368", maxWidth: 540, lineHeight: 1.82, marginBottom: 36, animation: "fadeSlideDown 0.6s 0.26s ease both", animationFillMode: "both", opacity: 0 }}>
        {RESUME.tagline}
      </p>

      <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", animation: "fadeSlideDown 0.6s 0.34s ease both", animationFillMode: "both", opacity: 0 }}>
        <Btn bg="#4285F4" color="#fff" onClick={() => scrollTo("projects")}>🚀 View Projects</Btn>
        <BtnLink href={RESUME.github} borderColor="rgba(0,0,0,0.2)" textColor="#202124">🐙 GitHub</BtnLink>
        <Btn bg="transparent" color="#4285F4" border="2px solid #4285F4" onClick={() => scrollTo("contact")}>✉️ Contact Me</Btn>
      </div>

      {/* Search bar */}
      <div style={{ marginTop: 52, width: "100%", maxWidth: 560, animation: "fadeSlideDown 0.6s 0.44s ease both", animationFillMode: "both", opacity: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid rgba(0,0,0,0.14)", borderRadius: 28, padding: "14px 22px", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <span style={{ color: "#9aa0a6", fontSize: "0.92rem", flex: 1, textAlign: "left" }}>Search skills, projects, experience…</span>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
        </div>
      </div>

      <div style={{ marginTop: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, color: "#bbb", fontSize: "0.72rem", animation: "blink 2.5s ease infinite" }}>
        <span>scroll to explore</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
    </div>
  );
}

function Btn({ bg, color, border, onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: bg, color, border: border || "none", borderRadius: 24, padding: "12px 26px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Google Sans',sans-serif", transition: "all 0.18s", boxShadow: hov && bg === "#4285F4" ? "0 6px 20px rgba(66,133,244,0.4)" : "none", transform: hov ? "translateY(-2px)" : "none", opacity: 1 }}>
      {children}
    </button>
  );
}
function BtnLink({ href, borderColor, textColor, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: "transparent", color: textColor, border: `2px solid ${hov ? textColor : borderColor}`, borderRadius: 24, padding: "10px 26px", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", transition: "all 0.18s", transform: hov ? "translateY(-2px)" : "none" }}>
      {children}
    </a>
  );
}

/* ══════════════════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════════════════ */
function About() {
  const ref = useReveal();
  return (
    <section id="about" className="sec" style={{ maxWidth: 1080, margin: "0 auto", padding: "88px 28px" }}>
      <div ref={ref} className="reveal">
        <SectionLabel>About Me</SectionLabel>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 190, height: 190, borderRadius: "50%", background: "linear-gradient(135deg,#4285F4 0%,#34A853 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4.5rem", animation: "gentleFloat 4.5s ease-in-out infinite", boxShadow: "0 24px 64px rgba(66,133,244,0.22)", position: "relative", zIndex: 1 }}>
                👨‍💻
              </div>
              <div style={{ position: "absolute", inset: -16, borderRadius: "50%", border: "2px dashed rgba(66,133,244,0.25)", animation: "orbitSpin 10s linear infinite" }}>
                {G.map((c, i) => {
                  const a = (i * 90 * Math.PI) / 180;
                  const r = 109;
                  return <div key={i} style={{ position: "absolute", width: 13, height: 13, borderRadius: "50%", background: c, boxShadow: `0 0 8px ${c}99`, top: `calc(50% + ${Math.sin(a) * r}px - 6.5px)`, left: `calc(50% + ${Math.cos(a) * r}px - 6.5px)` }} />;
                })}
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: "'Google Sans Display',sans-serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, letterSpacing: -0.8, marginBottom: 16 }}>
              Hi, I'm <span style={{ color: "#4285F4" }}>Abhay Kumar</span>
            </h2>
            <p style={{ color: "#5F6368", lineHeight: 1.9, fontSize: "0.97rem", marginBottom: 14 }}>
              A passionate AI Engineer. I build AI-powered voice & chat assistants, and intelligent agents using LLMs, LangChain & RAG pipelines.
            </p>
            <p style={{ color: "#5F6368", lineHeight: 1.9, fontSize: "0.97rem", marginBottom: 22 }}>
              Currently pursuing my MCA at Kurukshetra University while shipping AI-driven products daily at Alphavima Technologies.
            </p>
            <div className="about-chips" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["📍 Sultanpur, UP", "🎓 MCA Student", "🤖 AI Enthusiast", "🌐 Open to Remote", "⚡ Fast Learner"].map(t => (
                <Chip key={t} label={t} color="#4285F4" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chip({ label, color }) {
  const [hov, setHov] = useState(false);
  return (
    <span className="s-chip"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? color : "#f8f9fa", color: hov ? "#fff" : "#202124", borderColor: hov ? color : "rgba(0,0,0,0.1)", transform: hov ? "translateY(-2px)" : "none" }}>
      {label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   SKILLS
══════════════════════════════════════════════════════════ */
const CAT = {
  Languages: { icon: "🔤", color: "#4285F4" },
  Frameworks: { icon: "🏗️", color: "#EA4335" },
  Databases: { icon: "🗄️", color: "#FBBC04" },
  "AI & Tools": { icon: "🤖", color: "#EA4335" },
  "Cloud & Tools": { icon: "☁️", color: "#34A853" },
  Technologies: { icon: "⚙️", color: "#4285F4" },
};
function Skills() {
  const ref = useReveal();
  return (
    <div id="skills" style={{ background: "#f8f9fa" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div ref={ref} className="reveal sk-sec" style={{ padding: "88px 28px" }}>
          <SectionLabel>Expertise</SectionLabel>
          <SectionTitle>Skills & Technologies</SectionTitle>
          <div className="sk-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
            {Object.entries(RESUME.skills).map(([cat, items]) => {
              const { icon, color } = CAT[cat] || { icon: "🔹", color: "#4285F4" };
              return <SkillCard key={cat} category={cat} items={items} icon={icon} color={color} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
function SkillCard({ category, items, icon, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", borderRadius: 20, padding: "22px 24px", border: `1.5px solid ${hov ? color : "rgba(0,0,0,0.07)"}`, boxShadow: hov ? `0 10px 32px ${color}22` : "none", transform: hov ? "translateY(-5px)" : "none", transition: "all 0.22s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: "1.4rem", width: 40, height: 40, borderRadius: 12, background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</span>
        <span style={{ fontWeight: 700, fontSize: "0.93rem", color: "#202124" }}>{category}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {items.map(item => (
          <span key={item} className="s-chip"
            onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#f8f9fa"; e.currentTarget.style.color = "#202124"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "none"; }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   EXPERIENCE
══════════════════════════════════════════════════════════ */
function Experience() {
  const ref = useReveal();
  return (
    <section id="experience" className="sec" style={{ maxWidth: 1080, margin: "0 auto", padding: "88px 28px" }}>
      <div ref={ref} className="reveal">
        <SectionLabel>Career</SectionLabel>
        <SectionTitle>Work Experience</SectionTitle>
        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div style={{ position: "absolute", left: 0, top: 8, bottom: 0, width: 2, background: "linear-gradient(180deg,#4285F4,#EA4335,#FBBC04,#34A853)", borderRadius: 2 }} />
          {RESUME.experience.map((exp, i) => <ExpItem key={i} exp={exp} />)}
        </div>
      </div>
    </section>
  );
}
function ExpItem({ exp }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="tl-item" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", paddingLeft: 24, marginBottom: 40 }}>
      <div style={{ position: "absolute", left: -39, top: 6, width: 16, height: 16, borderRadius: "50%", border: `2.5px solid ${exp.color}`, background: hov ? exp.color : "#fff", boxShadow: hov ? `0 0 0 5px ${exp.color}22` : "none", transition: "all 0.2s", zIndex: 1 }} />
      <div style={{ background: "#fff", border: `1.5px solid ${hov ? exp.color : "rgba(0,0,0,0.07)"}`, borderRadius: 18, padding: "22px 24px", boxShadow: hov ? `0 8px 32px ${exp.color}18` : "none", transform: hov ? "translateX(4px)" : "none", transition: "all 0.22s" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 700, fontSize: "1.08rem", color: "#202124" }}>{exp.role}</span>
              {exp.badge && <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: "#34A85322", color: "#34A853" }}>{exp.badge}</span>}
            </div>
            <div style={{ color: exp.color, fontWeight: 600, fontSize: "0.87rem", marginTop: 3 }}>{exp.company}</div>
          </div>
          <span style={{ fontSize: "0.76rem", color: "#5F6368", background: "#f8f9fa", padding: "4px 12px", borderRadius: 12, whiteSpace: "nowrap" }}>📅 {exp.period}</span>
        </div>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          {exp.points.map((pt, j) => <li key={j} style={{ color: "#5F6368", fontSize: "0.875rem", lineHeight: 1.82, marginBottom: 7 }}>{pt}</li>)}
        </ul>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════════ */
function Projects() {
  const ref = useReveal();
  return (
    <section id="projects" className="sec" style={{ maxWidth: 1080, margin: "0 auto", padding: "88px 28px" }}>
      <div ref={ref} className="reveal">
        <SectionLabel>Portfolio</SectionLabel>
        <SectionTitle>Featured Projects</SectionTitle>
        <div className="pj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22 }}>
          {RESUME.projects.map((p, i) => <ProjectCard key={i} project={p} />)}
        </div>
      </div>
    </section>
  );
}
function ProjectCard({ project }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? `${project.color}07` : "#f8f9fa", border: `1.5px solid ${hov ? project.color : "rgba(0,0,0,0.07)"}`, borderRadius: 22, padding: "28px 24px", transform: hov ? "translateY(-7px)" : "none", boxShadow: hov ? `0 14px 44px ${project.color}22` : "none", transition: "all 0.24s", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <span style={{ fontSize: "2.4rem" }}>{project.emoji}</span>
        <a href={project.github} target="_blank" rel="noreferrer" title="View on GitHub"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 10, background: hov ? project.color : "#e8e8e8", color: hov ? "#fff" : "#5F6368", textDecoration: "none", fontSize: "0.95rem", transition: "all 0.2s" }}>
          🔗
        </a>
      </div>
      <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "#202124", marginBottom: 10 }}>{project.title}</div>
      <p style={{ color: "#5F6368", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: 18, flex: 1 }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.stack.map(t => (
          <span key={t} style={{ fontSize: "0.72rem", padding: "3px 10px", borderRadius: 12, background: `${project.color}15`, color: project.color, fontWeight: 600 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   EDUCATION
══════════════════════════════════════════════════════════ */
function Education() {
  const ref = useReveal();
  return (
    <div id="education" style={{ background: "#f8f9fa" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div ref={ref} className="reveal sk-sec" style={{ padding: "88px 28px" }}>
          <SectionLabel>Education</SectionLabel>
          <SectionTitle>Academic Background</SectionTitle>
          <div className="ed-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {RESUME.education.map((e, i) => <EduCard key={i} edu={e} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
function EduCard({ edu }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", borderRadius: 20, padding: "26px 24px", border: `1.5px solid ${hov ? edu.color : "rgba(0,0,0,0.07)"}`, display: "flex", gap: 18, alignItems: "flex-start", transform: hov ? "translateY(-5px)" : "none", boxShadow: hov ? `0 10px 32px ${edu.color}20` : "none", transition: "all 0.22s" }}>
      <span style={{ fontSize: "1.8rem", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: `${edu.color}12`, borderRadius: 14, flexShrink: 0 }}>{edu.icon}</span>
      <div>
        <div style={{ fontWeight: 700, fontSize: "1rem", color: "#202124", marginBottom: 4 }}>{edu.degree}</div>
        <div style={{ color: edu.color, fontWeight: 600, fontSize: "0.87rem", marginBottom: 5 }}>{edu.school}</div>
        <div style={{ color: "#5F6368", fontSize: "0.78rem" }}>📅 {edu.period}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════ */
function Contact() {
  const ref = useReveal();
  const links = [
    { icon: "✉️", label: "abhaykumarv00@gmail.com", href: `mailto:${RESUME.email}`, color: "#EA4335" },
    { icon: "📞", label: "+91 7233053062", href: `tel:${RESUME.phone}`, color: "#34A853" },
    { icon: "🐙", label: "GitHub", href: RESUME.github, color: "#202124" },
    { icon: "💼", label: "LinkedIn", href: RESUME.linkedin, color: "#0077b5" },
  ];
  return (
    <section id="contact" className="sec" style={{ maxWidth: 1080, margin: "0 auto", padding: "88px 28px" }}>
      <div ref={ref} className="reveal">
        <div className="contact-card" style={{ background: "linear-gradient(135deg,#f0f4ff 0%,#e8f5e9 100%)", borderRadius: 32, padding: "64px 44px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(66,133,244,0.05)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(52,168,83,0.05)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <SectionLabel center>Let's Connect</SectionLabel>
            <h2 style={{ fontFamily: "'Google Sans Display',sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, letterSpacing: -1, marginBottom: 14, color: "#202124" }}>
              Ready to build something <span style={{ color: "#4285F4" }}>intelligent</span>?
            </h2>
            <p style={{ color: "#5F6368", marginBottom: 36, fontSize: "1rem", maxWidth: 460, margin: "0 auto 36px" }}>
              Drop me a line — always open to exciting projects, collaborations, or full-time opportunities.
            </p>
            <div className="ct-links" style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {links.map(l => <CLink key={l.label} {...l} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function CLink({ icon, label, href, color }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", borderRadius: 24, padding: "11px 22px", textDecoration: "none", color: hov ? color : "#202124", fontSize: "0.88rem", fontWeight: 500, border: `1.5px solid ${hov ? color : "rgba(0,0,0,0.1)"}`, transform: hov ? "translateY(-3px)" : "none", boxShadow: hov ? `0 6px 20px ${color}28` : "none", transition: "all 0.2s" }}>
      {icon} {label}
    </a>
  );
}

/* ══════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ textAlign: "center", padding: "28px 24px", color: "#9aa0a6", fontSize: "0.8rem", borderTop: "1px solid rgba(0,0,0,0.07)", position: "relative", zIndex: 1 }}>
      <div style={{ display: "inline-flex", gap: 1, fontWeight: 700, fontSize: "1.05rem", marginBottom: 6 }}>
        {"Abhay".split("").map((ch, i) => <span key={i} style={{ color: G[i % 4] }}>{ch}</span>)}
        <span style={{ color: "#5F6368" }}>.dev</span>
      </div>
      <p>© {new Date().getFullYear()} Abhay Kumar · Built with React & ❤️</p>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════════════════════ */
export default function App() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observers = NAV_LINKS.map(({ id }) => {
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
      <ProgressBar />
      <FloatingWorld />
      <Nav active={active} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}