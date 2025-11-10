import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Calendar as CalendarIcon,
  BookOpen,
  Gauge,
  Video,
  FileDown,
  Plus,
  CheckCircle,
  GraduationCap,
  Search,
  User,
  LogOut,
  Mail,
  Lock,
} from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://jfuvyurcuurzepjjlolp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdXZ5dXJjdXVyemVwampsb2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NjE3NTQsImV4cCI6MjA3NzEzNzc1NH0.UOUw-xvSX3nIYixINYo_5aolwMjyADLNctF_ZSuqRVM';
const supabase = createClient(supabaseUrl, supabaseKey);

const save = (k,v)=>localStorage.setItem(k, JSON.stringify(v));
const load = (k,f)=>{ try{ const v = JSON.parse(localStorage.getItem(k)||"null"); return v ?? f } catch { return f } };
const offsetDay = n => { const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10) };
const timeRange = s => `${s.start}–${s.end}`;
const formatDate = iso => { const d=new Date(iso+"T00:00:00"); return d.toLocaleDateString(undefined,{weekday:"short", month:"short", day:"numeric"}) };
const groupBy = (arr,fn)=> arr.reduce((a,x)=>{ const k=fn(x); (a[k]??=[]).push(x); return a }, {});
function Reveal({ children, delay = 0, className = "", style, as: Component = "div", ...rest }){
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={`will-change-transform transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Component>
  );
}
const DEMO_USER = {
  id: "demo-user",
  email: "demo@sciencehub.local",
  user_metadata: {
    full_name: "Demo Student"
  }
};
const DEMO_PROFILE = {
  name: "Demo Student",
  grade: "11",
  school: "Cypress Ranch HS",
  user_id: DEMO_USER.id
};

// ---------- Welcome Page ----------
function WelcomePage({ onGetStarted }){
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50 text-slate-900">
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl text-white shadow-lg shadow-emerald-200">
            🔭
        </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-500">Science Learning Hub</p>
            <h1 className="text-xl font-semibold tracking-tight">Future-Ready Experiments</h1>
          </div>
        </div>
      </header>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-emerald-200/70 blur-3xl animate-orbit-slow" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-sky-200/80 blur-3xl animate-orbit" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-100/40 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200/40" />
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200/30" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200/20" />
        <svg className="absolute inset-0 h-full w-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#grid)" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      <main className="relative z-20 flex min-h-screen flex-col justify-center px-6 pt-24 pb-16 md:flex-row md:items-center md:gap-16 md:px-16">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 shadow-sm shadow-emerald-100 backdrop-blur">
            <span className="text-lg">✨</span>
            Next-Gen Science Platform
          </div>
          <h2 className="mt-6 text-5xl font-black leading-tight sm:text-6xl lg:text-[4.5rem]">
            Ignite Your <span className="whitespace-nowrap bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">Curiosity</span> &amp; Build Scientific Superpowers.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Step inside a living science studio where labs feel cinematic, progress becomes a game, and collaboration happens at light speed. Crafted by students, tuned for innovation, designed to wow.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
          <button 
            onClick={onGetStarted}
              className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-emerald-300 transition hover:scale-[1.02]"
          >
              Start Exploring
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-2xl transition group-hover:translate-x-1">
                →
              </span>
          </button>
            <div className="flex items-center gap-4 rounded-full bg-white/70 px-5 py-3 text-sm font-medium text-slate-600 shadow-sm shadow-emerald-100 backdrop-blur">
              <div className="relative flex -space-x-2">
                {["🧬","⚗️","🛰️","🌿"].map((icon, idx) => (
                  <div key={idx} className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-emerald-100 to-white text-lg shadow-md shadow-emerald-200" style={{ zIndex: 4 - idx }}>
                    {icon}
        </div>
                ))}
              </div>
              <span>Join the community</span>
            </div>
          </div>
          <dl className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { label: "Live Labs", value: "Weekly" },
              { label: "Peer Mentors", value: "Available" },
              { label: "Digital Resources", value: "Unlimited" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-emerald-100 bg-white/60 px-5 py-4 text-center shadow-sm shadow-emerald-100 backdrop-blur">
                <dt className="text-xs uppercase tracking-[0.2em] text-emerald-500">{item.label}</dt>
                <dd className="mt-2 text-3xl font-bold text-slate-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 w-full max-w-xl md:mt-0">
          <div className="relative rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-2xl shadow-emerald-200/50 backdrop-blur">
            <div className="absolute -left-8 top-10 hidden h-24 w-24 -rotate-12 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-300 md:flex">
              <div className="text-center">
                <div className="text-xs uppercase tracking-[0.3em]">Lab</div>
                <div className="text-2xl font-bold">Live</div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-6 py-4 text-white shadow-lg">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Now Streaming</p>
                <h3 className="mt-1 text-xl font-semibold">DNA Barcoding Expedition</h3>
              </div>
              <span className="rounded-full bg-emerald-400 px-4 py-1 text-sm font-semibold text-slate-900">Join</span>
            </div>

            <div className="mt-6 grid gap-4">
              {[
                {
                  title: "Microscopy Masterclass",
                  meta: "Biology Lab • 4:00 PM",
                  progress: 72,
                  tag: "Lab",
                },
                {
                  title: "Quantum Garage Build",
                  meta: "Physics Workshop • 6:30 PM",
                  progress: 54,
                  tag: "Workshop",
                },
                {
                  title: "Eco-Challenge Sprint",
                  meta: "Env Science • 7:45 PM",
                  progress: 89,
                  tag: "Collab",
                },
              ].map((card) => (
                <div key={card.title} className="group relative overflow-hidden rounded-3xl border border-emerald-100/60 bg-white px-5 py-4 shadow-lg shadow-emerald-100/40 transition hover:-translate-y-1 hover:shadow-emerald-200/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-emerald-500">{card.tag}</p>
                      <h4 className="mt-1 text-lg font-semibold">{card.title}</h4>
                    </div>
                    <span className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-xs font-semibold text-white">
                      {card.progress}% full
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-500">{card.meta}</p>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-emerald-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500" style={{ width: `${card.progress}%` }} />
                  </div>
                  <div className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-emerald-100/40 blur-2xl transition duration-500 group-hover:-right-8 group-hover:opacity-80" />
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-3xl border border-emerald-100 bg-white/70 px-5 py-4 text-sm font-medium text-slate-600 shadow-inner shadow-emerald-100">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-500">Streak</p>
                <p className="text-lg font-semibold text-slate-900">We've been learning for 28 days straight</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-xl text-white shadow-lg shadow-emerald-300">
                ⚡
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <svg className="h-24 w-full" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#waveGradient)" d="M0,20 C200,80 400,10 600,40 C800,70 1000,20 1200,50 C1300,65 1400,55 1440,48 L1440,0 L0,0 Z" />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#5eead4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <style>{`
        @keyframes orbit {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(15px, -10px, 0) rotate(3deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }
        @keyframes orbitSlow {
          0% { transform: translate3d(0, 0, 0); opacity: 0.6; }
          50% { transform: translate3d(-18px, 12px, 0); opacity: 0.9; }
          100% { transform: translate3d(0, 0, 0); opacity: 0.6; }
        }
        .animate-orbit { animation: orbit 8s ease-in-out infinite; }
        .animate-orbit-slow { animation: orbitSlow 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// ---------- Intro Animation ----------
function IntroAnimation({ onComplete }){
  const [mounted, setMounted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const typingTimers = useRef({ interval: null, pause: null });
  const phrases = useRef(["Discover", "Experiment", "Collaborate", "Innovate"]);
  
  useEffect(() => {
    setMounted(true);
    
    const exitTimer = setTimeout(() => setFadeOut(true), 3200);
    const completeTimer = setTimeout(() => onComplete(), 3600);
    
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);
  
  useEffect(() => {
    if (typingTimers.current.interval) clearInterval(typingTimers.current.interval);
    if (typingTimers.current.pause) clearTimeout(typingTimers.current.pause);

    const phrase = phrases.current[phraseIndex];
    let charIndex = 0;
    setTypedText("");

    typingTimers.current.interval = setInterval(() => {
      charIndex += 1;
      setTypedText(phrase.slice(0, charIndex));
      if (charIndex >= phrase.length) {
        clearInterval(typingTimers.current.interval);
        typingTimers.current.pause = setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % phrases.current.length);
        }, 900);
      }
    }, 90);

    return () => {
      if (typingTimers.current.interval) clearInterval(typingTimers.current.interval);
      if (typingTimers.current.pause) clearTimeout(typingTimers.current.pause);
    };
  }, [phraseIndex]);
          
          return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-600 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50 to-white" />
      <div className="absolute inset-0">
        <div className="absolute -left-20 -top-28 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl animate-intro-float-slow" />
        <div className="absolute right-12 top-16 h-56 w-56 rounded-[40%] bg-gradient-to-br from-emerald-300/40 to-teal-200/40 blur-3xl animate-intro-float" />
        <div className="absolute bottom-12 left-16 h-52 w-52 rounded-full bg-sky-200/50 blur-3xl animate-intro-float-delayed" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_30%_25%,rgba(16,185,129,0.12),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(14,165,233,0.12),transparent_55%)]" />
        <div className="absolute inset-0">
          {[...Array(28)].map((_, idx) => (
            <span
              key={idx}
              className="absolute h-1 w-1 rounded-full bg-emerald-400/70"
              style={{
                left: `${(idx * 37) % 100}%`,
                top: `${(idx * 53) % 100}%`,
                animation: `particleFloat ${5 + (idx % 5)}s ease-in-out ${(idx % 7) * 0.35}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 px-6 text-center">
        <div className={`inline-flex items-center gap-2 rounded-full border border-emerald-200/40 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600 backdrop-blur transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Science Learning Hub
        </div>
        <h1 className={`mt-6 text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-slate-900 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Your launchpad to modern science.
        </h1>
        <p className={`mt-4 mx-auto max-w-xl text-base sm:text-lg text-slate-600 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Build experiments with motion, data, and teamwork. This is the space where student scientists craft their next breakthrough.
        </p>
        <div className={`mt-6 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="text-xs uppercase tracking-[0.45em] text-emerald-500">We</div>
          <div className="mt-2 h-12 text-3xl font-semibold text-slate-900">
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">{typedText}</span>
            <span className="ml-1 inline-block h-8 w-[3px] translate-y-1 align-middle bg-emerald-500 animate-intro-cursor" />
          </div>
        </div>
        <div className={`mt-10 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-350 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {["🔬 Live Labs", "🧪 Interactive Kits", "🛰️ Projects", "📡 Signal Boosts"].map((item, idx) => {
            const [icon, label] = item.split(" ");
            return (
              <div
                key={item}
                className="flex items-center gap-3 rounded-full border border-emerald-200/40 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm shadow-emerald-100 backdrop-blur"
                style={{ animation: `introBadge 0.8s ease ${(idx + 1) * 0.12 + 0.4}s backwards` }}
              >
                <span className="text-xl">{icon}</span>
                {label}
              </div>
            );
          })}
        </div>
        <div className={`mt-12 flex items-center justify-center gap-8 text-[11px] uppercase tracking-[0.45em] text-emerald-500 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="relative flex items-center gap-2">
            <span className="h-[2px] w-10 bg-emerald-300" />
            Momentum
              </span>
          <span className="relative flex items-center gap-2">
            <span className="h-[2px] w-10 bg-emerald-300" />
            Curiosity
              </span>
          <span className="relative flex items-center gap-2">
            <span className="h-[2px] w-10 bg-emerald-300" />
            Impact
              </span>
        </div>
      </div>
      
      <style>{`
        @keyframes particleFloat {
          0% { transform: translate3d(0, 0, 0); opacity: 0.3; }
          50% { transform: translate3d(9px, -14px, 0); opacity: 0.85; }
          100% { transform: translate3d(0, 0, 0); opacity: 0.3; }
        }
        @keyframes introFloat {
          0% { transform: translate3d(0, 0, 0); opacity: 0.75; }
          50% { transform: translate3d(10px, -14px, 0); opacity: 1; }
          100% { transform: translate3d(0, 0, 0); opacity: 0.75; }
        }
        @keyframes introFloatSlow {
          0% { transform: translate3d(0, 0, 0); opacity: 0.6; }
          50% { transform: translate3d(-14px, 12px, 0); opacity: 0.9; }
          100% { transform: translate3d(0, 0, 0); opacity: 0.6; }
        }
        @keyframes introPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 30px rgba(16,185,129,0.25); }
          50% { transform: scale(1.08); box-shadow: 0 16px 40px rgba(16,185,129,0.4); }
        }
        .animate-intro-float {
          animation: introFloat 6s ease-in-out infinite;
        }
        .animate-intro-float-delayed {
          animation: introFloat 6.5s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .animate-intro-float-slow {
          animation: introFloatSlow 7s ease-in-out infinite;
        }
        .animate-intro-pulse {
          animation: introPulse 2.4s ease-in-out infinite;
        }
        .animate-intro-cursor {
          animation: introCursor 1s steps(2, start) infinite;
        }
        @keyframes introCursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes introBadge {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const SEED_COURSES = [
  { id:"biology", name:"Biology", color:"bg-green-100 text-green-900" },
  { id:"chemistry", name:"Chemistry", color:"bg-blue-100 text-blue-900" },
  { id:"physics", name:"Physics", color:"bg-purple-100 text-purple-900" },
  { id:"envsci", name:"Environmental Science", color:"bg-emerald-100 text-emerald-900" },
];
const SEED_SESSIONS = [
  { id:"s1", title:"Cell Biology Lab — Microscopy", type:"Virtual Lab", course:"Biology", date:offsetDay(1), start:"16:00", end:"17:00", location:"Biology Lab", host:"Dr. Smith & TA Team", spots:8, description:"Explore cell structures through virtual microscopy. Learn to identify organelles and cellular processes." },
  { id:"s2", title:"Chemistry Tutoring — Stoichiometry", type:"Live Tutoring", course:"Chemistry", date:offsetDay(2), start:"15:30", end:"16:30", location:"Chemistry Lab", host:"Peer Tutor: Sarah", spots:5, description:"One-on-one help with mole calculations, balancing equations, and stoichiometric problems." },
  { id:"s3", title:"Physics Workshop — Forces & Motion", type:"Workshop", course:"Physics", date:offsetDay(4), start:"17:00", end:"18:00", location:"Physics Lab", host:"Physics Club", spots:12, description:"Hands-on experiments with Newton's laws. Build and test simple machines!" },
  { id:"s4", title:"Science Study Buddy Matching", type:"Peer Matching", course:"Mixed", date:offsetDay(3), start:"14:00", end:"15:00", location:"Online", host:"Science Department", spots:20, description:"Connect with study partners for ongoing scientific collaboration and mutual support." },
  { id:"s5", title:"Environmental Science Project", type:"Collaboration", course:"Environmental Science", date:offsetDay(5), start:"16:30", end:"17:30", location:"Science Lab", host:"Environmental Club", spots:15, description:"Collaborative research project on local ecosystem health. Data collection and analysis." },
  { id:"s6", title:"Chemistry Lab — Acid-Base Reactions", type:"Virtual Lab", course:"Chemistry", date:offsetDay(6), start:"15:00", end:"16:00", location:"Chemistry Lab", host:"Dr. Johnson", spots:10, description:"Virtual titration experiments and pH analysis. Learn about acid-base chemistry hands-on." },
];

export default function App(){
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (loading) {
        console.log('Loading timeout reached, stopping loading');
        setLoading(false);
      }
    }, 1500); // fallback timeout to avoid getting stuck on loading

    const demoSession = load('fbla_demo_session', null);
    if (demoSession) {
      setUser(DEMO_USER);
      setProfile(demoSession.profile || DEMO_PROFILE);
      setShowWelcome(false);
      setLoading(false);
      clearTimeout(timeout);
      return;
    }

    // Check for existing session
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await loadUserProfile(session.user.id, session.user);
          setShowWelcome(false); // Don't show welcome if user is already logged in
        } else {
          // Only show welcome if intro has been shown before
          if (localStorage.getItem('intro_shown')) {
            setShowWelcome(true);
          }
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
        clearTimeout(timeout);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (session?.user) {
          setUser(session.user);
          await loadUserProfile(session.user.id, session.user);
          setShowWelcome(false); // Hide welcome page when user logs in
        } else {
          setUser(null);
          setProfile(null);
          setShowWelcome(true); // Show welcome page when user logs out
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setUser(null);
        setProfile(null);
        setShowWelcome(true);
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const loadUserProfile = async (userId, sessionUser = null) => {
    if (userId === DEMO_USER.id) {
      const stored = load('fbla_demo_session', null);
      if (stored?.profile) {
        setProfile(stored.profile);
      } else {
        setProfile(DEMO_PROFILE);
        save('fbla_demo_session', { profile: DEMO_PROFILE });
      }
      return;
    }

    const sourceUser = sessionUser ?? user;
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        // Create default profile if there's an error
        const defaultProfile = {
          name: sourceUser?.user_metadata?.full_name || "Student",
          grade: "11",
          school: "Cypress Ranch HS",
          user_id: userId
        };
        setProfile(defaultProfile);
        return;
      }
      
      if (data) {
        setProfile(data);
      } else {
        // Create default profile if none exists
        const defaultProfile = {
          name: sourceUser?.user_metadata?.full_name || "Student",
          grade: "11",
          school: "Cypress Ranch HS",
          user_id: userId
        };
        setProfile(defaultProfile);
        await saveUserProfile(defaultProfile);
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
      // Set a fallback profile to prevent loading issues
      const fallbackProfile = {
        name: "Student",
        grade: "11",
        school: "Cypress Ranch HS",
        user_id: userId
      };
      setProfile(fallbackProfile);
    }
  };

  const saveUserProfile = async (profileData) => {
    try {
      if (!user?.id || user.id === DEMO_USER.id) {
        console.error('No user ID available for saving profile');
        save('fbla_demo_session', { profile: profileData });
        setProfile(profileData);
        return;
      }

      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          ...profileData,
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Error saving profile:', error);
        // Don't throw error, just log it
      }
    } catch (error) {
      console.error('Error in saveUserProfile:', error);
      // Don't throw error, just log it
    }
  };

  const handleProfileUpdate = async (newProfile) => {
    setProfile(newProfile);
    if (user) {
      await saveUserProfile(newProfile);
    }
  };

  const handleLogout = async () => {
    // Store user info before clearing state
    const currentUser = user;
    const isDemoUser = currentUser?.id === DEMO_USER.id;
    
    // Clear state immediately for instant feedback
    setUser(null);
    setProfile(null);
    setShowWelcome(true);
    setLoading(false);
    setPage("home");
    
    // Then handle cleanup asynchronously
    try {
      if (isDemoUser) {
        localStorage.removeItem('fbla_demo_session');
      } else {
        // Sign out from Supabase - the auth state change listener will confirm
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Error during logout cleanup:', error);
      // State is already cleared, so user is effectively logged out
    }
  };

  const handleAuthSuccess = useCallback(async (sessionUser) => {
    if (sessionUser && sessionUser.id !== DEMO_USER.id) {
      setUser(sessionUser);
      await loadUserProfile(sessionUser.id, sessionUser);
    } else {
      setUser(DEMO_USER);
      setProfile(DEMO_PROFILE);
      save('fbla_demo_session', { profile: DEMO_PROFILE });
    }
    setShowWelcome(false);
    setLoading(false);
    setPage("home");
  }, [loadUserProfile, setShowWelcome, setLoading, setPage]);

  const handleDemoLogin = useCallback(() => {
    handleAuthSuccess(DEMO_USER);
  }, [handleAuthSuccess]);

  // Show intro animation first
  if (showIntro) {
    return <IntroAnimation onComplete={() => { 
      setShowIntro(false); 
      setShowWelcome(true); 
    }} />;
  }

  // Show welcome page after intro (only if not logged in)
  if (showWelcome && !user) {
    return <WelcomePage onGetStarted={() => setShowWelcome(false)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
          <button 
            onClick={() => setLoading(false)} 
            className="mt-4 text-sm text-slate-500 hover:text-slate-700 underline"
          >
            Skip loading (if stuck)
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} onDemoLogin={handleDemoLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <Header page={page} setPage={setPage} profile={profile} setProfile={handleProfileUpdate} user={user} onLogout={handleLogout} />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-8">
        {page==="home" && <Home setPage={setPage} />}
        {page==="schedule" && <Schedule user={user} />}
        {page==="dashboard" && <Dashboard user={user} />}
        {page==="resources" && <Resources user={user} />}
        {page==="about" && <About />}
      </main>
      <Footer />
    </div>
  );
}

function Header({ page, setPage, profile, setProfile, user, onLogout }){
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="text-2xl">🔬</div>
          <span className="font-semibold">Science Learning Hub</span>
        </div>
        <nav className="ml-auto hidden md:flex items-center gap-1">
          <NavBtn active={page==="home"} onClick={()=>setPage("home")}>Home</NavBtn>
          <NavBtn active={page==="schedule"} onClick={()=>setPage("schedule")} icon={<CalendarIcon className="size-4" />}>Schedule</NavBtn>
          <NavBtn active={page==="dashboard"} onClick={()=>setPage("dashboard")} icon={<Gauge className="size-4" />}>Dashboard</NavBtn>
          <NavBtn active={page==="resources"} onClick={()=>setPage("resources")} icon={<BookOpen className="size-4" />}>Resources</NavBtn>
          <NavBtn active={page==="about"} onClick={()=>setPage("about")}>About</NavBtn>
        </nav>
        <ProfilePill profile={profile} setProfile={setProfile} user={user} onLogout={onLogout} />
      </div>
      <div className="md:hidden px-4 pb-3 flex gap-2">
        {["home","schedule","dashboard","resources","about"].map(p=> (
          <button key={p} onClick={()=>setPage(p)} className={`flex-1 rounded-xl border px-3 py-2 text-sm ${page===p? "bg-slate-900 text-white border-slate-900":"bg-white hover:bg-slate-50"}`}>{p[0].toUpperCase()+p.slice(1)}</button>
        ))}
      </div>
    </header>
  );
}
function NavBtn({active, onClick, children, icon}){
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition border ${active? "bg-slate-900 text-white border-slate-900":"bg-white hover:bg-slate-50 border-slate-200"}`}>{icon}{children}</button>
  );
}
function ProfilePill({ profile, setProfile, user, onLogout }){
  const initials = profile?.name?.split(" ").map(s=>s[0]).slice(0,2).join("").toUpperCase() || "ST";
  return (
    <div className="ml-2 flex items-center gap-3">
      <div className="size-9 rounded-full bg-slate-900 text-white grid place-items-center text-xs font-semibold" aria-hidden>{initials}</div>
      <div className="leading-tight">
        <div className="font-semibold text-sm">{profile?.name || "Student"}</div>
        <div className="text-xs text-slate-500">Grade {profile?.grade || "11"} · {profile?.school || "Cypress Ranch HS"}</div>
      </div>
      <div className="flex items-center gap-2">
      <EditProfile onSave={setProfile} current={profile} />
        <button onClick={onLogout} className="rounded-lg border px-3 py-1 text-xs hover:bg-slate-50 flex items-center gap-1">
          <LogOut className="size-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
function EditProfile({ current, onSave }){
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(current || { name: "Student", grade: "11", school: "Cypress Ranch HS" });
  
  useEffect(() => {
    if (current) {
      setForm(current);
    }
  }, [current, open]);

  const handleSave = () => {
    try {
      onSave(form);
      setOpen(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      // Still close the modal even if there's an error
      setOpen(false);
    }
  };

  return (
    <>
      <button onClick={()=>setOpen(true)} className="rounded-lg border px-3 py-1 text-xs hover:bg-slate-50">Edit</button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal>
          <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-3">Edit Profile</h3>
            <div className="grid gap-3">
              {["name","grade","school"].map(f=> (
                <label key={f} className="grid gap-1 text-sm">
                  <span className="text-slate-600">{f[0].toUpperCase()+f.slice(1)}</span>
                  <input 
                    className="rounded-xl border px-3 py-2" 
                    value={form[f] || ""} 
                    onChange={e=>setForm({...form, [f]:e.target.value})} 
                  />
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={()=>setOpen(false)} className="rounded-xl border px-3 py-2">Cancel</button>
              <button onClick={handleSave} className="rounded-xl bg-slate-900 text-white px-4 py-2">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ---------- Authentication ----------
function AuthPage({ onAuthSuccess, onDemoLogin }){
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        
        if (error) throw error;
        
        if (data.user) {
          onAuthSuccess(data.user);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        if (data.user) {
          onAuthSuccess(data.user);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="text-3xl">🔬</div>
            <span className="text-2xl font-bold">Science Learning Hub</span>
          </div>
          <p className="text-slate-600">Join the scientific learning community</p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-lg">
          <div className="flex gap-2 mb-6">
            <button 
              onClick={() => setMode("login")}
              className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
                mode === "login" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Login
            </button>
            <button 
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
                mode === "signup" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 size-4" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 size-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 size-4" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-2 rounded-xl font-medium hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center justify-center">
              <span className="text-xs uppercase tracking-wide text-slate-400 bg-white px-2">or</span>
              <div className="absolute left-0 right-0 h-px bg-slate-200" aria-hidden />
            </div>
            <button
              type="button"
              onClick={onDemoLogin}
              className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Continue as Guest
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-slate-900 font-medium hover:underline"
              >
                {mode === "login" ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home({ setPage }){
  const spotlight = SEED_SESSIONS.slice(0, 3);
  const journey = [
    {
      icon: "🌌",
      title: "Discover Cinematic Labs",
      description: "Launch into immersive lab streams with dynamic hosts, overlays, and live chat that keeps every participant engaged.",
    },
    {
      icon: "🤝",
      title: "Experiment With Your Crew",
      description: "Co-create investigations, track real-time progress, and unlock achievements that celebrate collaboration.",
    },
    {
      icon: "🚀",
      title: "Track Your Progress",
      description: "Visualize your learning journey with interactive dashboards, progress tracking, and achievements that celebrate your scientific growth.",
    },
  ];
  const quickLinks = [
    {
      badge: "Schedule",
      title: "Plan your next session",
      description: "Reserve labs, workshops, and peer hangs with a couple of taps.",
      action: () => setPage("schedule"),
      icon: <CalendarIcon className="size-5" />,
    },
    {
      badge: "Dashboard",
      title: "Visualize your wins",
      description: "Track streaks, unit mastery, and unlockable achievements in one glance.",
      action: () => setPage("dashboard"),
      icon: <Gauge className="size-5" />,
    },
    {
      badge: "Resources",
      title: "Dive into creative tools",
      description: "Discover interactive lessons, flashcard worlds, and AI-enhanced lab guides.",
      action: () => setPage("resources"),
      icon: <BookOpen className="size-5" />,
    },
  ];
  const tickerItems = [
    "⚡ New lab sessions available this week",
    "🧠 Join virtual study groups",
    "🌿 Explore environmental science projects",
    "🛰️ Physics experiments now open",
    "🧪 Chemistry lab sessions starting soon",
  ];
  const metrics = [
    { value: "Learn", label: "Interactive Labs", detail: "Hands-on virtual experiments" },
    { value: "Track", label: "Your Progress", detail: "Monitor your scientific journey" },
    { value: "Connect", label: "With Peers", detail: "Join study groups and collaborate" },
    { value: "Explore", label: "Resources", detail: "Access lessons, videos, and tools" },
  ];

  return (
    <section className="space-y-16">
      <div className="relative overflow-hidden rounded-[32px] border border-emerald-200/60 bg-slate-900 text-white shadow-[0_25px_70px_-30px_rgba(13,148,136,0.7)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-10 h-56 w-56 rounded-full bg-emerald-500/40 blur-3xl animate-hero-float" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-400/25 blur-3xl animate-hero-float-delayed" />
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_top,_rgba(34,197,94,0.45),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(6,182,212,0.4),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_45%)]" />
          </div>
        <div className="relative z-10 flex flex-col gap-12 px-8 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-16">
          <div className="max-w-xl space-y-6">
            <Reveal className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
              <span className="text-lg">⚡</span>
              <span>Student Science Studio</span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="text-5xl font-black leading-tight sm:text-6xl">
                Where science class becomes{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 bg-clip-text text-transparent">
                  a creative studio
                </span>.
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="text-lg text-emerald-100/90">
                Launch your learning journey with live lab sessions, collaborative study groups, and progress tracking that makes science fun and engaging.
                Explore resources, join sessions, and track your progress as you master new scientific concepts.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setPage("schedule")}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-slate-900 shadow-lg shadow-emerald-400/40 transition hover:translate-y-[-2px] hover:shadow-emerald-300/60"
                >
                  <CalendarIcon className="size-5 text-emerald-500" />
                  Reserve a Lab
                  <span className="text-lg transition group-hover:translate-x-1">→</span>
                </button>
                <button
                  onClick={() => setPage("resources")}
                  className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-white transition hover:bg-white/20"
                >
                  <BookOpen className="size-5" />
                  Explore Resources
                </button>
              </div>
            </Reveal>
            <Reveal delay={420}>
              <div className="flex flex-wrap items-center gap-6">
                <p className="max-w-xs text-sm text-emerald-100">
                  Join science clubs, study groups, and collaborative projects. Plan experiments, share data, and learn together with peers.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={180} className="w-full max-w-lg">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur">
              <div className="absolute -top-6 right-4 h-24 w-24 rotate-12 rounded-3xl bg-gradient-to-br from-emerald-400/60 to-teal-500/50 blur-xl" />
              <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-emerald-300/20 blur-3xl" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-sm font-medium">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-emerald-200">Live Control Room</p>
                    <p className="mt-1 text-lg font-semibold text-white">Signal locked on Science Stream</p>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-300 text-base font-semibold text-slate-900 shadow-md shadow-emerald-200">
                    ● LIVE
                  </span>
                </div>
                <div className="space-y-4">
                  {spotlight.map((session, idx) => (
                    <div
                      key={session.id}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-left transition hover:border-white/30 hover:bg-white/20"
                    >
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-lg font-semibold text-slate-900 shadow-lg shadow-emerald-400/40">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200">
                            {session.type}
                          </span>
                          <span className="text-xs text-emerald-100/80">{formatDate(session.date)}</span>
                        </div>
                        <p className="mt-2 text-base font-semibold text-white">{session.title}</p>
                        <p className="mt-1 text-xs text-emerald-100/80">
                          {timeRange(session)} · {session.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.25em] text-emerald-100">
                  <span>Upcoming Sessions</span>
                  <span className="inline-flex items-center gap-2 text-emerald-300">
                    <Gauge className="size-4" />
                    Live Now
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={100} className="relative overflow-hidden rounded-3xl border border-emerald-100/70 bg-white/80 shadow-lg shadow-emerald-100/60 backdrop-blur">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-50 via-white to-sky-50 opacity-75" />
        <div className="relative flex items-center gap-4 px-6 py-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">
            Live Feed
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div className="animate-home-marquee whitespace-nowrap text-sm font-medium text-emerald-700">
              {[...tickerItems, ...tickerItems].map((item, idx) => (
                <span key={`${item}-${idx}`} className="mx-6 inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {item}
                </span>
              ))}
      </div>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, idx) => (
          <Reveal
            key={metric.label}
            delay={idx * 120}
            className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-xl shadow-emerald-100/60 backdrop-blur"
          >
            <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_top_left,_rgba(16,185,129,0.2),transparent_60%)]" />
            <div className="relative space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-emerald-500">
                {metric.label}
              </span>
              <div className="text-4xl font-bold text-slate-900">{metric.value}</div>
              <p className="text-sm text-slate-600">{metric.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-emerald-200 via-transparent to-emerald-200 lg:block" />
        <div className="grid gap-8 lg:grid-cols-3">
          {journey.map((step, idx) => (
            <Reveal
              key={step.title}
              delay={idx * 140}
              className="group relative h-full rounded-3xl border border-emerald-100/60 bg-white/70 p-8 shadow-lg shadow-emerald-100/50 backdrop-blur"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative z-10 space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <span className="text-lg">{step.icon}</span>
                  Phase {idx + 1}
                </span>
                <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                <div className="pt-2 text-sm font-semibold text-emerald-600 transition group-hover:translate-x-1">
                  Start learning →
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {quickLinks.map((card, idx) => (
          <Reveal key={card.title} delay={idx * 120} className="h-full">
            <button
              onClick={card.action}
              className="group relative flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white/80 p-6 text-left shadow-xl shadow-emerald-100/60 transition hover:-translate-y-1 hover:shadow-emerald-200/80"
            >
              <div className="absolute -right-10 top-6 h-24 w-24 rounded-full bg-emerald-100/50 blur-2xl transition group-hover:-right-6" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{card.badge}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 text-emerald-500">{card.icon}</span>
                </div>
                <h4 className="text-xl font-semibold text-slate-900">{card.title}</h4>
                <p className="text-sm text-slate-600">{card.description}</p>
              </div>
              <span className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                Explore
                <span className="text-lg transition group-hover:translate-x-1">→</span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal delay={100} className="relative overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_18px_60px_-20px_rgba(16,185,129,0.35)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 left-16 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />
          <div className="absolute right-10 bottom-0 h-48 w-48 rounded-full bg-sky-200/50 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_top_right,_rgba(59,130,246,0.3),_transparent_60%)]" />
        </div>
        <div className="relative z-10 grid gap-8 p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Learn · Practice · Master
            </span>
            <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Your complete science learning platform.
            </h3>
            <p className="text-base text-slate-600">
              Everything you need to excel in science—from interactive lab sessions and study groups to progress tracking and resource libraries. 
              Join a community of learners and take your scientific knowledge to the next level.
            </p>
            <ul className="grid gap-2 text-sm text-slate-600">
              <li className="inline-flex items-center gap-2">
                <CheckCircle className="size-4 text-emerald-500" />
                Responsive design works on any device—desktop, tablet, or mobile
              </li>
              <li className="inline-flex items-center gap-2">
                <CheckCircle className="size-4 text-emerald-500" />
                Interactive elements keep you engaged as you learn
              </li>
              <li className="inline-flex items-center gap-2">
                <CheckCircle className="size-4 text-emerald-500" />
                Complete toolkit for labs, study sessions, and collaborative projects
              </li>
            </ul>
          </div>
          <div className="space-y-4 rounded-3xl border border-emerald-100 bg-white/70 p-6 text-slate-700 shadow-inner shadow-emerald-100 backdrop-blur">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 px-5 py-4 text-white shadow-lg shadow-emerald-300">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/80">Learning Features</div>
              <div className="mt-2 text-2xl font-semibold">Interactive Experience</div>
            </div>
            <div className="grid gap-3 text-sm">
              <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-white/60 px-4 py-3">
                <span>Virtual Labs</span>
                <span className="text-lg font-semibold text-emerald-600">Available</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-white/60 px-4 py-3">
                <span>Study Groups</span>
                <span className="text-lg font-semibold text-emerald-600">Join Now</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-white/60 px-4 py-3">
                <span>Progress Tracking</span>
                <span className="text-lg font-semibold text-emerald-600">Enabled</span>
              </div>
            </div>
            <button
              onClick={() => setPage("about")}
              className="w-full rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-300 transition hover:bg-emerald-600"
            >
              Learn More About the Platform
            </button>
          </div>
        </div>
      </Reveal>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(12px, -16px, 0); }
        }
        @keyframes heroFloatDelayed {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-16px, 10px, 0); }
        }
        .animate-hero-float { animation: heroFloat 8s ease-in-out infinite; }
        .animate-hero-float-delayed { animation: heroFloatDelayed 10s ease-in-out infinite; }
        @keyframes homeMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-home-marquee {
          animation: homeMarquee 18s linear infinite;
        }
      `}</style>
    </section>
  );
}

// ---------- Schedule ----------
function Schedule(){
  const [query, setQuery] = useState("");
  const [sessions, setSessions] = useState(()=> load("fbla_sessions", SEED_SESSIONS));
  const [showForm, setShowForm] = useState(false);
  useEffect(()=> save("fbla_sessions", sessions), [sessions]);

  const filtered = sessions.filter(s => [s.title, s.type, s.course, s.location, s.host].join(" ").toLowerCase().includes(query.toLowerCase()));
  const byDate = groupBy(filtered, s=>s.date);
  const dates = Object.keys(byDate).sort();

  return (
    <section className="grid gap-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <h2 className="text-2xl font-bold flex items-center gap-2"><CalendarIcon className="size-6" />Weekly Schedule</h2>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search sessions…" className="rounded-2xl border pl-9 pr-3 py-2 w-64" />
          </div>
          <button onClick={()=>setShowForm(true)} className="rounded-2xl bg-slate-900 text-white px-4 py-2 inline-flex items-center gap-2"><Plus className="size-4" />New Session</button>
        </div>
      </div>

      <div className="grid gap-4">
        {dates.map(d => (
          <div key={d} className="rounded-2xl border bg-white p-4">
            <div className="text-sm font-semibold text-slate-600 mb-2">{formatDate(d)}</div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {byDate[d].map(s => <SessionCard key={s.id} s={s} onReserve={()=>reserve(setSessions, s.id)} />)}
            </div>
          </div>
        ))}
        {dates.length===0 && <div className="rounded-xl border bg-white p-6 text-slate-600">No sessions found. Try a different search or add a new one.</div>}
      </div>

      {showForm && <SessionForm onClose={()=>setShowForm(false)} onCreate={session=>setSessions([session, ...sessions])} />}
    </section>
  );
}
function SessionCard({ s, onReserve }){
  const full = (s.reserved||0) >= s.spots;
  const isPeerMatching = s.type === "Peer Matching";
  const isCollaboration = s.type === "Collaboration";
  
  return (
    <div className="rounded-xl border p-4 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-500">{s.type} · {s.course}</span>
            {(isPeerMatching || isCollaboration) && (
              <span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-purple-100 text-purple-700">Connect & Learn</span>
            )}
          </div>
          <h3 className="font-semibold text-lg leading-snug mt-1">{s.title}</h3>
          <p className="text-sm text-slate-600 mt-1">{timeRange(s)} · {s.location} · Host: {s.host}</p>
          {s.description && (
            <p className="text-sm text-slate-700 mt-2 bg-slate-50 rounded-lg p-2">{s.description}</p>
          )}
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${full? "bg-red-100 text-red-700":"bg-emerald-100 text-emerald-700"}`}>{full? "Full": `${s.spots - (s.reserved||0)} spots left`}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button disabled={full} onClick={onReserve} className={`rounded-xl px-3 py-2 text-sm border ${full? "opacity-50 cursor-not-allowed":"bg-slate-900 text-white border-slate-900 hover:brightness-110"}`}>
          {isPeerMatching ? (full ? "Waitlist" : "Find Study Buddy") : 
           isCollaboration ? (full ? "Waitlist" : "Join Project") : 
           (full ? "Join Waitlist" : "Reserve Spot")}
        </button>
        <span className="text-xs text-slate-500">{formatDate(s.date)}</span>
      </div>
    </div>
  );
}
function SessionForm({ onClose, onCreate }){
  const [form, setForm] = useState({ title:"", type:"Group Study", course:"Biology", date:new Date().toISOString().slice(0,10), start:"16:00", end:"17:00", location:"", host:"", spots:6, description:"" });
  const field = (label,key)=>(
    <label className="grid gap-1 text-sm">
      <span className="text-slate-600">{label}</span>
      <input className="rounded-xl border px-3 py-2" value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} />
    </label>
  );
  const select = (label,key,opts)=>(
    <label className="grid gap-1 text-sm">
      <span className="text-slate-600">{label}</span>
      <select className="rounded-xl border px-3 py-2" value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}>
        {opts.map(o => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold mb-3">Create Session</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {field("Title","title")}
          {select("Type","type",["Group Study","Live Tutoring","Workshop","Peer Matching","Collaboration"])}
          {select("Course","course",["Biology","Chemistry","Physics","Environmental Science","Mixed"])}
          {field("Location","location")}
          {field("Host","host")}
          <label className="grid gap-1 text-sm"><span className="text-slate-600">Date</span><input type="date" className="rounded-xl border px-3 py-2" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} /></label>
          <label className="grid gap-1 text-sm"><span className="text-slate-600">Start</span><input type="time" className="rounded-xl border px-3 py-2" value={form.start} onChange={e=>setForm({...form, start:e.target.value})} /></label>
          <label className="grid gap-1 text-sm"><span className="text-slate-600">End</span><input type="time" className="rounded-xl border px-3 py-2" value={form.end} onChange={e=>setForm({...form, end:e.target.value})} /></label>
          <label className="grid gap-1 text-sm"><span className="text-slate-600">Spots</span><input type="number" min={1} className="rounded-xl border px-3 py-2" value={form.spots} onChange={e=>setForm({...form, spots:Number(e.target.value)})} /></label>
        </div>
        <label className="grid gap-1 text-sm mt-3">
          <span className="text-slate-600">Description</span>
          <textarea className="rounded-xl border px-3 py-2 h-20 resize-none" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="What will students do in this session? What should they bring?" />
        </label>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-xl border px-4 py-2">Cancel</button>
          <button onClick={()=>{ onCreate({ id:crypto.randomUUID(), ...form }); onClose() }} className="rounded-xl bg-slate-900 text-white px-4 py-2">Create</button>
        </div>
      </div>
    </div>
  );
}
const reserve = (setSessions,id)=> {
  setSessions(prev=> prev.map(s=> s.id===id? { ...s, reserved: Math.min((s.reserved||0)+1, s.spots) } : s ));
  // Show confirmation
  alert("Successfully reserved your spot! You'll receive a confirmation email shortly.");
};

// ---------- Dashboard ----------
function Dashboard(){
  const [courses, setCourses] = useState(()=> load("fbla_courses", SEED_COURSES));
  const [units, setUnits] = useState(()=> load("fbla_units", {
    biology:[{id:"1",name:"Cell Structure & Function",done:true},{id:"2",name:"Genetics & Heredity",done:false},{id:"3",name:"Evolution",done:false},{id:"4",name:"Ecology",done:false}],
    chemistry:[{id:"1",name:"Atomic Structure",done:true},{id:"2",name:"Chemical Bonding",done:false},{id:"3",name:"Stoichiometry",done:false},{id:"4",name:"Acid-Base Chemistry",done:false}],
    physics:[{id:"1",name:"Forces & Motion",done:false},{id:"2",name:"Energy & Work",done:false},{id:"3",name:"Waves & Sound",done:false},{id:"4",name:"Electricity & Magnetism",done:false}],
    envsci:[{id:"1",name:"Ecosystems",done:false},{id:"2",name:"Biodiversity",done:false},{id:"3",name:"Climate Change",done:false},{id:"4",name:"Environmental Policy",done:false}],
  }));
  const [goal,setGoal] = useState(()=> load("fbla_goal", 5));
  const [streak,setStreak] = useState(()=> load("fbla_streak", 3));
  const [achievements, setAchievements] = useState(()=> load("fbla_achievements", []));
  const [studySessions, setStudySessions] = useState(()=> load("fbla_study_sessions", 0));

  useEffect(()=> save("fbla_courses", courses), [courses]);
  useEffect(()=> save("fbla_units", units), [units]);
  useEffect(()=> save("fbla_goal", goal), [goal]);
  useEffect(()=> save("fbla_streak", streak), [streak]);
  useEffect(()=> save("fbla_achievements", achievements), [achievements]);
  useEffect(()=> save("fbla_study_sessions", studySessions), [studySessions]);

  const totalDone = Object.values(units).flat().filter(u=>u.done).length;
  const totalUnits = Object.values(units).flat().length;
  const overallProgress = Math.round((totalDone / totalUnits) * 100);

  // Achievement system
  const checkAchievements = (newUnits) => {
    const newAchievements = [];
    const totalCompleted = Object.values(newUnits).flat().filter(u=>u.done).length;
    
    if (totalCompleted >= 5 && !achievements.includes("first_five")) {
      newAchievements.push("first_five");
    }
    if (totalCompleted >= 10 && !achievements.includes("study_master")) {
      newAchievements.push("study_master");
    }
    if (streak >= 7 && !achievements.includes("week_warrior")) {
      newAchievements.push("week_warrior");
    }
    
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
    }
  };

  const handleUnitToggle = (courseId, unitId) => {
    const newUnits = {
      ...units, 
      [courseId]: units[courseId].map(x => x.id === unitId ? {...x, done: !x.done} : x)
    };
    setUnits(newUnits);
    checkAchievements(newUnits);
  };

  return (
    <section className="grid gap-6">
      <h2 className="text-2xl font-bold flex items-center gap-2"><div className="text-2xl">🔬</div>Your Scientific Progress Dashboard</h2>
      
      {/* Achievement Banner */}
      {achievements.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🏆</div>
            <div>
              <div className="font-semibold">Achievements Unlocked!</div>
              <div className="text-sm opacity-90">
                {achievements.includes("first_five") && "First Five Units Complete! "}
                {achievements.includes("study_master") && "Study Master! "}
                {achievements.includes("week_warrior") && "Week Warrior Streak! "}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-4">
        <Stat label="Scientific Progress" value={`${overallProgress}%`} sub={`${totalDone}/${totalUnits} labs completed`} />
        <Stat label="Weekly Lab Goal" value={`${totalDone}/${goal}`} sub="Labs completed" />
        <Stat label="Research Streak" value={`${streak} days`} sub="Keep experimenting!" />
        <Stat label="Lab Sessions" value={`${studySessions}`} sub="This month" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border bg-white p-5">
          <h3 className="font-semibold mb-3">Course Progress</h3>
          <div className="grid gap-4">
            {courses.map(c => {
              const courseUnits = units[c.id];
              const completed = courseUnits.filter(u=>u.done).length;
              const progress = Math.round((completed / courseUnits.length) * 100);
              
              return (
              <div key={c.id} className="rounded-xl border p-4">
                  <div className="flex items-center justify-between mb-3">
                  <div className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs font-semibold ${c.color}`}>{c.name}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">{completed}/{courseUnits.length} complete</span>
                      {progress === 100 && <span className="text-lg">🎉</span>}
                </div>
                  </div>
                  <ProgressBar value={progress} />
                <div className="mt-3 grid md:grid-cols-2 gap-2">
                    {courseUnits.map(u => (
                      <button key={u.id} onClick={()=>handleUnitToggle(c.id, u.id)} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition ${u.done? "bg-emerald-50 border-emerald-200":"hover:bg-slate-50"}`}>
                      <CheckCircle className={`size-4 ${u.done? "text-emerald-600":""}`} aria-hidden />
                        <span className={`text-sm ${u.done? "line-through text-slate-500":""}`}>{u.name}</span>
                        {u.done && <span className="text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        </div>
        
        <div className="space-y-6">
        <div className="rounded-2xl border bg-white p-5">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-3">
              <button onClick={()=>setStreak(streak + 1)} className="w-full rounded-xl border px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2">
                <span className="text-lg">🧪</span>
                <span className="text-sm">Log Lab Session</span>
              </button>
              <button onClick={()=>setStudySessions(studySessions + 1)} className="w-full rounded-xl border px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2">
                <span className="text-lg">🔬</span>
                <span className="text-sm">Join Science Study</span>
              </button>
              <button onClick={()=>{ localStorage.clear(); location.reload() }} className="w-full rounded-xl border px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2">
                <span className="text-lg">🔄</span>
                <span className="text-sm">Reset Demo</span>
              </button>
            </div>
          </div>
          
          <div className="rounded-2xl border bg-white p-5">
            <h3 className="font-semibold mb-3">Settings</h3>
          <label className="grid gap-1 text-sm mb-3">
              <span className="text-slate-600">Weekly lab goal</span>
            <input type="number" min={1} className="rounded-xl border px-3 py-2" value={goal} onChange={e=>setGoal(Number(e.target.value))} />
          </label>
          <label className="grid gap-1 text-sm">
              <span className="text-slate-600">Research streak (days)</span>
            <input type="number" min={0} className="rounded-xl border px-3 py-2" value={streak} onChange={e=>setStreak(Number(e.target.value))} />
          </label>
            <p className="text-xs text-slate-500 mt-4">Tip: Click labs to mark complete. Scientific achievements unlock as you progress!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
function Stat({ label, value, sub }){
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{sub}</div>
    </div>
  );
}
function ProgressBar({ value }){
  return (
    <div className="h-3 w-full rounded-full bg-slate-100 mt-3">
      <div className="h-3 rounded-full bg-slate-900" style={{ width: `${value}%` }} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} />
    </div>
  );
}

// ---------- Resources ----------
function Resources(){
  const [tab, setTab] = useState("lessons");
  return (
    <section className="grid gap-6">
      <h2 className="text-2xl font-bold flex items-center gap-2"><div className="text-2xl">🔬</div>Interactive Science Resources</h2>
      <div className="flex flex-wrap gap-2">
        {["lessons","videos","quizzes","downloads","creative","peer"].map(t => (
          <button key={t} onClick={()=>setTab(t)} className={`rounded-xl px-4 py-2 border ${tab===t? "bg-slate-900 text-white border-slate-900":"bg-white hover:bg-slate-50"}`}>
            {t === "creative" ? "Creative Tools" : t === "peer" ? "Peer Projects" : t[0].toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>
      {tab==="lessons" && <Lessons />}
      {tab==="videos" && <Videos />}
      {tab==="quizzes" && <QuizWidget />}
      {tab==="downloads" && <Downloads />}
      {tab==="creative" && <CreativeTools />}
      {tab==="peer" && <PeerProjects />}
    </section>
  );
}
function Lessons(){
  const [selectedLesson, setSelectedLesson] = useState(null);
  
  const lessons = [
    { 
      id: 1,
      title:"Cell Structure & Organelles", 
      course:"Biology", 
      minutes:15, 
      summary:"Explore plant and animal cells, mitochondria, chloroplasts, and cellular processes.",
      content: {
        objectives: [
          "Identify major cell organelles and their functions",
          "Compare plant and animal cell structures", 
          "Understand cellular processes and energy production"
        ],
        keyConcepts: [
          "Cell membrane: Controls what enters and exits the cell",
          "Nucleus: Contains genetic material (DNA)",
          "Mitochondria: Powerhouse of the cell, produces ATP",
          "Chloroplasts: Site of photosynthesis in plant cells",
          "Ribosomes: Protein synthesis factories"
        ],
        activities: [
          "Virtual cell tour with 3D models",
          "Interactive organelle matching game",
          "Cell structure labeling exercise"
        ]
      }
    },
    { 
      id: 2,
      title:"Chemical Bonding & Molecular Structure", 
      course:"Chemistry", 
      minutes:18, 
      summary:"Ionic vs covalent bonds, Lewis structures, molecular geometry, and polarity.",
      content: {
        objectives: [
          "Distinguish between ionic and covalent bonds",
          "Draw Lewis structures for simple molecules",
          "Predict molecular geometry using VSEPR theory"
        ],
        keyConcepts: [
          "Ionic bonds: Transfer of electrons between metals and nonmetals",
          "Covalent bonds: Sharing of electrons between nonmetals",
          "Lewis structures: Show valence electrons and bonding",
          "VSEPR theory: Predicts molecular shape based on electron pairs"
        ],
        activities: [
          "Interactive bond formation simulation",
          "Lewis structure drawing practice",
          "Molecular geometry prediction game"
        ]
      }
    },
    { 
      id: 3,
      title:"Newton's Laws & Forces", 
      course:"Physics", 
      minutes:12, 
      summary:"Force diagrams, acceleration, friction, and real-world applications of Newton's laws.",
      content: {
        objectives: [
          "Apply Newton's three laws of motion",
          "Draw accurate free-body diagrams",
          "Calculate forces and acceleration"
        ],
        keyConcepts: [
          "First Law: Objects at rest stay at rest, objects in motion stay in motion",
          "Second Law: F = ma (Force equals mass times acceleration)",
          "Third Law: For every action, there is an equal and opposite reaction",
          "Free-body diagrams: Visual representation of forces acting on objects"
        ],
        activities: [
          "Force simulation experiments",
          "Free-body diagram practice",
          "Real-world physics problem solving"
        ]
      }
    },
    { 
      id: 4,
      title:"Ecosystem Dynamics & Energy Flow", 
      course:"Environmental Science", 
      minutes:14, 
      summary:"Food webs, energy pyramids, nutrient cycling, and ecosystem stability.",
      content: {
        objectives: [
          "Trace energy flow through ecosystems",
          "Understand trophic levels and energy transfer",
          "Analyze ecosystem stability and biodiversity"
        ],
        keyConcepts: [
          "Food chains: Linear sequence of energy transfer",
          "Food webs: Complex network of interconnected food chains",
          "Energy pyramid: Shows energy loss at each trophic level",
          "10% rule: Only 10% of energy transfers between trophic levels"
        ],
        activities: [
          "Interactive food web builder",
          "Energy pyramid calculations",
          "Ecosystem stability analysis"
        ]
      }
    }
  ];

  if (selectedLesson) {
    const lesson = lessons.find(l => l.id === selectedLesson);
  return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedLesson(null)}
            className="rounded-xl border px-4 py-2 hover:bg-slate-50"
          >
            ← Back to Lessons
          </button>
          <div>
            <h2 className="text-2xl font-bold">{lesson.title}</h2>
            <p className="text-slate-600">{lesson.course} · {lesson.minutes} minutes</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border bg-white p-6">
              <h3 className="text-xl font-semibold mb-4">Learning Objectives</h3>
              <ul className="space-y-2">
                {lesson.content.objectives.map((objective, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <h3 className="text-xl font-semibold mb-4">Key Concepts</h3>
              <div className="space-y-3">
                {lesson.content.keyConcepts.map((concept, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-700">{concept}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border bg-white p-6">
              <h3 className="text-xl font-semibold mb-4">Interactive Activities</h3>
              <div className="space-y-3">
                {lesson.content.activities.map((activity, i) => (
                  <button 
                    key={i}
                    className="w-full text-left p-3 rounded-xl border hover:bg-slate-50 transition"
                  >
                    <div className="text-sm font-medium">{activity}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full rounded-xl bg-blue-600 text-white px-4 py-2">
                  Start Interactive Module
                </button>
                <button className="w-full rounded-xl border px-4 py-2">
                  Take Practice Quiz
                </button>
                <button className="w-full rounded-xl border px-4 py-2">
                  Download Study Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {lessons.map((lesson)=>(
        <article key={lesson.id} className="rounded-2xl border bg-white p-5 hover:shadow-md transition">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-900">{lesson.course}</span>
            <span className="text-xs text-slate-500">{lesson.minutes} min</span>
          </div>
          <h3 className="font-semibold text-lg leading-snug mb-3">{lesson.title}</h3>
          <p className="text-sm text-slate-600 mb-4">{lesson.summary}</p>
          <button 
            onClick={() => setSelectedLesson(lesson.id)}
            className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800 transition"
          >
            Open Lesson
          </button>
        </article>
      ))}
    </div>
  );
}
function Videos(){
  const videoData = [
    {
      id: 1,
      title: "Cell Structure & Organelles",
      course: "Biology",
      duration: "12:34",
      description: "Learn about plant and animal cell structures, mitochondria, chloroplasts, and cellular processes.",
      embedId: "fKE8iTOe8KI", // Khan Academy Biology video
      thumbnail: "https://img.youtube.com/vi/fKE8iTOe8KI/maxresdefault.jpg"
    },
    {
      id: 2,
      title: "Chemical Bonding Explained",
      course: "Chemistry", 
      duration: "15:22",
      description: "Understanding ionic vs covalent bonds, Lewis structures, and molecular geometry.",
      embedId: "QXT4OVM4vXI", // Khan Academy Chemistry video
      thumbnail: "https://img.youtube.com/vi/QXT4OVM4vXI/maxresdefault.jpg"
    },
    {
      id: 3,
      title: "Newton's Laws of Motion",
      course: "Physics",
      duration: "18:45",
      description: "Force diagrams, acceleration, friction, and real-world applications of Newton's laws.",
      embedId: "kKKM8Y-u7ds", // Khan Academy Physics video
      thumbnail: "https://img.youtube.com/vi/kKKM8Y-u7ds/maxresdefault.jpg"
    },
    {
      id: 4,
      title: "Ecosystem Dynamics",
      course: "Environmental Science",
      duration: "14:18",
      description: "Food webs, energy pyramids, nutrient cycling, and ecosystem stability.",
      embedId: "H6bQ2aVf99U", // Khan Academy Environmental Science video
      thumbnail: "https://img.youtube.com/vi/H6bQ2aVf99U/maxresdefault.jpg"
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-4">
        {videoData.map(video => (
          <div key={video.id} className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
            <div className="aspect-video bg-slate-100 relative cursor-pointer" onClick={() => setSelectedVideo(video)}>
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-3">
                  <Video className="size-6 text-slate-900" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-900">{video.course}</span>
                <span className="text-xs text-slate-500">{video.duration}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
              <p className="text-sm text-slate-600">{video.description}</p>
          </div>
        </div>
      ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.embedId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <p className="text-slate-700">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function QuizWidget(){
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const QUIZZES = {
    biology: {
      title: "Biology Quiz",
      questions: [
        { q:"What is the powerhouse of the cell?", choices:["Nucleus","Mitochondria","Ribosome","Endoplasmic Reticulum"], answer:1, explanation:"Mitochondria are known as the powerhouse of the cell because they produce ATP (energy) through cellular respiration." },
        { q:"Which organelle is responsible for protein synthesis?", choices:["Mitochondria","Ribosome","Golgi Apparatus","Lysosome"], answer:1, explanation:"Ribosomes are the cellular structures responsible for protein synthesis, reading mRNA and assembling amino acids." },
        { q:"What is the process by which plants make their own food?", choices:["Respiration","Photosynthesis","Digestion","Fermentation"], answer:1, explanation:"Photosynthesis is the process by which plants use sunlight, carbon dioxide, and water to produce glucose and oxygen." },
        { q:"Which blood type is considered the universal donor?", choices:["A","B","AB","O"], answer:3, explanation:"Type O blood is considered the universal donor because it lacks A and B antigens, making it compatible with all blood types." },
        { q:"What is the basic unit of heredity?", choices:["Chromosome","Gene","DNA","Protein"], answer:1, explanation:"A gene is the basic unit of heredity, containing the instructions for making specific proteins." }
      ]
    },
    chemistry: {
      title: "Chemistry Quiz",
      questions: [
        { q:"What is the pH of pure water at 25°C?", choices:["6","7","8","9"], answer:1, explanation:"Pure water has a pH of 7, which is neutral on the pH scale." },
        { q:"Which element has the chemical symbol 'Na'?", choices:["Nitrogen","Sodium","Neon","Nickel"], answer:1, explanation:"Sodium has the chemical symbol 'Na' from its Latin name 'natrium'." },
        { q:"What type of bond forms between a metal and a nonmetal?", choices:["Covalent","Ionic","Hydrogen","Metallic"], answer:1, explanation:"Ionic bonds form between metals and nonmetals when electrons are transferred from the metal to the nonmetal." },
        { q:"What is Avogadro's number?", choices:["6.02 × 10²³","6.02 × 10²²","6.02 × 10²⁴","6.02 × 10²¹"], answer:0, explanation:"Avogadro's number is 6.02 × 10²³, representing the number of particles in one mole of a substance." },
        { q:"Which gas makes up about 78% of Earth's atmosphere?", choices:["Oxygen","Carbon Dioxide","Nitrogen","Argon"], answer:2, explanation:"Nitrogen makes up about 78% of Earth's atmosphere, with oxygen making up about 21%." }
      ]
    },
    physics: {
      title: "Physics Quiz",
      questions: [
        { q:"Which of Newton's laws states that for every action there is an equal and opposite reaction?", choices:["First Law","Second Law","Third Law","Law of Gravity"], answer:2, explanation:"Newton's Third Law states that for every action, there is an equal and opposite reaction." },
        { q:"What is the acceleration due to gravity on Earth?", choices:["9.8 m/s²","8.9 m/s²","10.0 m/s²","9.1 m/s²"], answer:0, explanation:"The acceleration due to gravity on Earth is approximately 9.8 m/s²." },
        { q:"What is the unit of electric current?", choices:["Volt","Ampere","Ohm","Watt"], answer:1, explanation:"The ampere (A) is the unit of electric current in the International System of Units." },
        { q:"Which type of wave requires a medium to travel?", choices:["Light waves","Radio waves","Sound waves","X-rays"], answer:2, explanation:"Sound waves are mechanical waves that require a medium (solid, liquid, or gas) to travel through." },
        { q:"What is the speed of light in a vacuum?", choices:["3 × 10⁶ m/s","3 × 10⁸ m/s","3 × 10⁷ m/s","3 × 10⁹ m/s"], answer:1, explanation:"The speed of light in a vacuum is approximately 3 × 10⁸ m/s (300,000,000 m/s)." }
      ]
    }
  };

  const currentQuiz = selectedQuiz ? QUIZZES[selectedQuiz] : null;
  const currentQuestion = currentQuiz ? currentQuiz.questions[step] : null;
  const done = currentQuiz && step >= currentQuiz.questions.length;

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const handleNext = () => {
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }
    setStep(step + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setStep(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (!selectedQuiz) {
  return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Choose a Quiz</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(QUIZZES).map(([key, quiz]) => (
            <button
              key={key}
              onClick={() => setSelectedQuiz(key)}
              className="rounded-2xl border bg-white p-6 hover:shadow-md transition text-left"
            >
              <div className="text-2xl mb-3">
                {key === 'biology' ? '🧬' : key === 'chemistry' ? '🧪' : '⚛️'}
              </div>
              <h4 className="font-semibold text-lg mb-2">{quiz.title}</h4>
              <p className="text-sm text-slate-600">{quiz.questions.length} questions</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 max-w-3xl">
      {!done ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-slate-500">Question {step + 1} of {currentQuiz.questions.length}</div>
            <div className="text-sm text-slate-500">Score: {score}</div>
          </div>
          <h3 className="font-semibold text-xl mb-6">{currentQuestion.q}</h3>
          <div className="grid gap-3 mb-6">
            {currentQuestion.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => !showResult && handleAnswerSelect(idx)}
                disabled={showResult}
                className={`rounded-xl border px-4 py-3 text-left transition ${
                  showResult
                    ? idx === currentQuestion.answer
                      ? "bg-green-100 border-green-500 text-green-900"
                      : idx === selectedAnswer && idx !== currentQuestion.answer
                      ? "bg-red-100 border-red-500 text-red-900"
                      : "bg-gray-50 border-gray-200"
                    : "hover:bg-slate-50"
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
          {showResult && (
            <div className="mb-4 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-900">
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
            </div>
          )}
          {showResult && (
            <button
              onClick={handleNext}
              className="w-full rounded-xl bg-slate-900 text-white px-4 py-2"
            >
              {step + 1 < currentQuiz.questions.length ? "Next Question" : "Finish Quiz"}
            </button>
          )}
        </div>
      ) : (
        <div className="text-center">
          <div className="text-4xl mb-4">
            {score === currentQuiz.questions.length ? "🎉" : score >= currentQuiz.questions.length * 0.8 ? "👏" : "📚"}
          </div>
          <div className="text-sm text-slate-500 mb-2">Quiz Complete!</div>
          <div className="text-4xl font-bold mb-2">{score} / {currentQuiz.questions.length}</div>
          <div className="text-lg text-slate-600 mb-6">
            {score === currentQuiz.questions.length ? "Perfect Score!" : 
             score >= currentQuiz.questions.length * 0.8 ? "Great Job!" : 
             "Keep Studying!"}
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={resetQuiz} className="rounded-xl border px-4 py-2">
              Try Another Quiz
            </button>
            <button onClick={() => { setStep(0); setScore(0); setSelectedAnswer(null); setShowResult(false); }} className="rounded-xl bg-slate-900 text-white px-4 py-2">
              Retry This Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
function Downloads(){
  const files=[
    { name:"Biology_Lab_Manual.pdf", size:"2.1 MB" },
    { name:"Chemistry_Formula_Sheet.pdf", size:"180 KB" },
    { name:"Physics_Equations_Reference.pdf", size:"145 KB" },
    { name:"Environmental_Science_Data_Sheets.pdf", size:"320 KB" },
    { name:"Lab_Report_Template.docx", size:"65 KB" },
    { name:"Scientific_Method_Guide.pdf", size:"95 KB" },
  ];
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {files.map((f,i)=>(
        <div key={i} className="rounded-2xl border bg-white p-4 flex items-center justify-between">
          <div>
            <div className="font-medium">{f.name}</div>
            <div className="text-xs text-slate-500">{f.size}</div>
          </div>
          <button className="rounded-xl border px-3 py-2 inline-flex items-center gap-2 hover:bg-slate-50"><FileDown className="size-4" />Download</button>
        </div>
      ))}
    </div>
  );
}

function CreativeTools(){
  const [selectedTool, setSelectedTool] = useState(null);
  const [conceptMap, setConceptMap] = useState([]);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  
  const flashcards = [
    { front: "Mitochondria", back: "The powerhouse of the cell - produces ATP through cellular respiration" },
    { front: "Photosynthesis", back: "Process by which plants convert sunlight, CO₂, and water into glucose and oxygen" },
    { front: "Newton's Third Law", back: "For every action, there is an equal and opposite reaction" },
    { front: "pH Scale", back: "Measures acidity (0-6), neutrality (7), and alkalinity (8-14)" },
    { front: "DNA", back: "Deoxyribonucleic acid - contains genetic instructions for all living organisms" }
  ];
  
  const tools = [
    {
      id: "mindmap",
      title: "Scientific Concept Map",
      description: "Visualize connections between scientific concepts",
      icon: "🧠",
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Create Your Scientific Concept Map</h4>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 h-64 relative">
            <div className="absolute top-4 left-4 bg-blue-100 px-3 py-2 rounded-lg text-sm font-medium">Cell Biology</div>
            <div className="absolute top-16 left-8 bg-green-100 px-3 py-2 rounded-lg text-sm">Mitochondria</div>
            <div className="absolute top-16 left-32 bg-green-100 px-3 py-2 rounded-lg text-sm">Nucleus</div>
            <div className="absolute top-28 left-20 bg-yellow-100 px-3 py-2 rounded-lg text-sm">DNA</div>
            <div className="absolute top-4 right-4 bg-purple-100 px-3 py-2 rounded-lg text-sm font-medium">Chemistry</div>
            <div className="absolute top-16 right-8 bg-orange-100 px-3 py-2 rounded-lg text-sm">Bonds</div>
            <div className="absolute top-16 right-32 bg-orange-100 px-3 py-2 rounded-lg text-sm">Reactions</div>
            <div className="absolute top-28 right-20 bg-pink-100 px-3 py-2 rounded-lg text-sm">pH</div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 px-3 py-2 rounded-lg text-sm font-medium">Physics</div>
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-indigo-100 px-3 py-2 rounded-lg text-sm">Forces</div>
            <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 bg-teal-100 px-3 py-2 rounded-lg text-sm">Motion</div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl bg-purple-600 text-white px-4 py-2 text-sm">Add Concept</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Save Map</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Export</button>
          </div>
        </div>
      )
    },
    {
      id: "flashcards",
      title: "Interactive Flashcards",
      description: "Create and study with digital flashcards",
      icon: "🃏",
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Flashcard Study Session</h4>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 min-h-[200px] flex items-center justify-center cursor-pointer" onClick={() => setFlashcardIndex((flashcardIndex + 1) % flashcards.length)}>
            <div className="text-center">
              <div className="text-3xl mb-3">🧪</div>
              <h5 className="font-semibold mb-2">{flashcards[flashcardIndex].front}</h5>
              <p className="text-slate-700">{flashcards[flashcardIndex].back}</p>
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <button onClick={() => setFlashcardIndex(Math.max(0, flashcardIndex - 1))} className="rounded-xl border px-4 py-2 text-sm">Previous</button>
            <button className="rounded-xl bg-green-600 text-white px-4 py-2 text-sm">Got it!</button>
            <button onClick={() => setFlashcardIndex((flashcardIndex + 1) % flashcards.length)} className="rounded-xl border px-4 py-2 text-sm">Next</button>
          </div>
          <div className="text-center text-sm text-slate-500">
            Card {flashcardIndex + 1} of {flashcards.length}
          </div>
        </div>
      )
    },
    {
      id: "timeline",
      title: "Concept Timeline",
      description: "Build chronological understanding",
      icon: "⏰",
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Scientific Discoveries Timeline</h4>
          <div className="space-y-3">
            {[
              { year: "1665", event: "Cell Theory - Robert Hooke", color: "bg-green-100" },
              { year: "1687", event: "Newton's Laws of Motion", color: "bg-blue-100" },
              { year: "1869", event: "Periodic Table - Mendeleev", color: "bg-purple-100" },
              { year: "1953", event: "DNA Structure - Watson & Crick", color: "bg-orange-100" },
            ].map((item, i) => (
              <div key={i} className={`${item.color} rounded-lg p-3 flex items-center gap-3`}>
                <div className="font-semibold text-sm w-16">{item.year}</div>
                <div className="flex-1">{item.event}</div>
              </div>
            ))}
          </div>
          <button className="w-full rounded-xl bg-indigo-600 text-white px-4 py-2">Create Your Timeline</button>
        </div>
      )
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {tools.map(tool => (
          <div key={tool.id} className="rounded-2xl border bg-white p-4 hover:shadow-md transition cursor-pointer" onClick={() => setSelectedTool(tool)}>
            <div className="text-3xl mb-3">{tool.icon}</div>
            <h3 className="font-semibold mb-2">{tool.title}</h3>
            <p className="text-sm text-slate-600">{tool.description}</p>
          </div>
        ))}
      </div>
      
      {selectedTool && (
        <div className="rounded-2xl border bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-2xl">{selectedTool.icon}</span>
              {selectedTool.title}
            </h3>
            <button onClick={() => setSelectedTool(null)} className="text-slate-500 hover:text-slate-700">✕</button>
          </div>
          {selectedTool.content}
        </div>
      )}
    </div>
  );
}

function PeerProjects(){
  const [projects, setProjects] = useState(() => load("fbla_projects", [
    { id: 1, title: "Microscopy Image Analysis", course: "Biology", members: 3, status: "active", description: "Developing AI to identify cell structures in microscope images" },
    { id: 2, title: "Chemistry Simulation Game", course: "Chemistry", members: 2, status: "recruiting", description: "Building an interactive game to learn chemical reactions" },
    { id: 3, title: "Physics Lab Assistant", course: "Physics", members: 4, status: "completed", description: "Mobile app that helps with physics calculations and experiments" },
    { id: 4, title: "Environmental Monitoring Station", course: "Environmental Science", members: 5, status: "active", description: "Building sensors to monitor local air and water quality" },
  ]));
  
  useEffect(() => save("fbla_projects", projects), [projects]);
  
  const joinProject = (id) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, members: p.members + 1, status: "active" } : p
    ));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Student-Led Projects</h3>
        <button className="rounded-xl bg-purple-600 text-white px-4 py-2 text-sm">Start New Project</button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map(project => (
          <div key={project.id} className="rounded-2xl border bg-white p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{project.title}</h4>
                <p className="text-sm text-slate-600">{project.course}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                project.status === "completed" ? "bg-green-100 text-green-700" :
                project.status === "active" ? "bg-blue-100 text-blue-700" :
                "bg-yellow-100 text-yellow-700"
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-sm text-slate-700 mb-3">{project.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">👥 {project.members} members</span>
              {project.status === "recruiting" && (
                <button onClick={() => joinProject(project.id)} className="rounded-xl bg-purple-600 text-white px-3 py-1.5 text-sm">
                  Join Project
                </button>
              )}
              {project.status === "active" && (
                <button className="rounded-xl border px-3 py-1.5 text-sm">View Details</button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-6">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <span className="text-xl">💡</span>
          Start Your Own Project
        </h4>
        <p className="text-sm text-slate-700 mb-4">
          Have an idea for a creative project? Connect with other students who share your interests and build something amazing together!
        </p>
        <div className="flex gap-2">
          <button className="rounded-xl bg-purple-600 text-white px-4 py-2 text-sm">Create Project</button>
          <button className="rounded-xl border px-4 py-2 text-sm">Browse Ideas</button>
        </div>
      </div>
    </div>
  );
}

// ---------- About ----------
function About(){
  return (
    <section className="grid gap-6">
      <h2 className="text-2xl font-bold">About This Science Learning Hub</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl border bg-white p-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <span className="text-xl">🎯</span>
            Our Mission
          </h3>
          <p className="text-slate-700 mb-4">
            This Science Learning Hub was designed to make scientific learning more engaging, collaborative, and accessible through peer-to-peer connections. Built by science students, for science students, it encourages hands-on experimentation and keeps learners motivated.
          </p>
          <ul className="list-disc pl-6 text-slate-700 space-y-1 text-sm">
            <li>Virtual lab sessions and peer tutoring</li>
            <li>Interactive science experiments and simulations</li>
            <li>Scientific progress tracking and achievements</li>
            <li>Collaborative research projects</li>
        </ul>
        </div>
        
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <span className="text-xl">📚</span>
            Subject Areas
          </h3>
          <div className="space-y-3">
            {[
              { name: "Biology", color: "bg-green-100 text-green-900", topics: "Cell Biology, Genetics, Evolution, Ecology" },
              { name: "Chemistry", color: "bg-blue-100 text-blue-900", topics: "Atomic Structure, Bonding, Reactions, Stoichiometry" },
              { name: "Physics", color: "bg-purple-100 text-purple-900", topics: "Forces, Energy, Waves, Electricity" },
              { name: "Environmental Science", color: "bg-emerald-100 text-emerald-900", topics: "Ecosystems, Climate, Biodiversity, Sustainability" },
            ].map((subject, i) => (
              <div key={i} className="rounded-lg border p-3">
                <div className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs font-semibold ${subject.color} mb-2`}>
                  {subject.name}
                </div>
                <p className="text-sm text-slate-600">{subject.topics}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl border bg-white p-6">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="text-xl">⚡</span>
          Key Features
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-slate-50">
            <div className="text-2xl mb-2">📅</div>
            <h4 className="font-semibold mb-1">Virtual Labs</h4>
            <p className="text-sm text-slate-600">Live experiments, peer tutoring, and collaborative research</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-50">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-semibold mb-1">Scientific Progress</h4>
            <p className="text-sm text-slate-600">Track lab completion, experiments, and scientific achievements</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-50">
            <div className="text-2xl mb-2">🔬</div>
            <h4 className="font-semibold mb-1">Science Tools</h4>
            <p className="text-sm text-slate-600">Interactive experiments, simulations, and research projects</p>
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <span className="text-xl">🎓</span>
          Built for Students, By Students
        </h3>
        <p className="text-slate-700 mb-4">
          This Science Learning Hub was created to make science education more engaging and accessible. Built with modern web technologies, 
          it provides a complete platform for virtual labs, study groups, progress tracking, and collaborative learning.
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Platform Features:</h4>
            <ul className="list-disc pl-6 text-slate-600 space-y-1">
              <li>Fully responsive design</li>
              <li>User authentication & profiles</li>
              <li>Interactive science components</li>
              <li>Real-time progress tracking</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Learning Benefits:</h4>
            <ul className="list-disc pl-6 text-slate-600 space-y-1">
              <li>Peer-to-peer science learning</li>
              <li>Virtual lab experiences</li>
              <li>Scientific progress tracking</li>
              <li>Collaborative research projects</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer className="border-t mt-12">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500 flex flex-col md:flex-row items-center gap-2 justify-between">
        <div>© {new Date().getFullYear()} Science Learning Hub</div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
}
