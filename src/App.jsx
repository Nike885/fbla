import React, { useState, useEffect } from "react";
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
} from "lucide-react";

const save = (k,v)=>localStorage.setItem(k, JSON.stringify(v));
const load = (k,f)=>{ try{ const v = JSON.parse(localStorage.getItem(k)||"null"); return v ?? f } catch { return f } };
const offsetDay = n => { const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10) };
const timeRange = s => `${s.start}–${s.end}`;
const formatDate = iso => { const d=new Date(iso+"T00:00:00"); return d.toLocaleDateString(undefined,{weekday:"short", month:"short", day:"numeric"}) };
const groupBy = (arr,fn)=> arr.reduce((a,x)=>{ const k=fn(x); (a[k]??=[]).push(x); return a }, {});

const SEED_COURSES = [
  { id:"apenv", name:"AP Environmental Science", color:"bg-emerald-100 text-emerald-900" },
  { id:"alg2",  name:"Algebra II",               color:"bg-indigo-100 text-indigo-900" },
  { id:"cs",    name:"Intro to Computer Science",color:"bg-sky-100 text-sky-900" },
];
const SEED_SESSIONS = [
  { id:"s1", title:"Unit 1 Review — Ecosystems", type:"Group Study", course:"AP Environmental Science", date:offsetDay(1), start:"16:00", end:"17:00", location:"Library Room B", host:"Nikhil & Team", spots:8, description:"Collaborative review session covering food webs, energy flow, and ecosystem dynamics. Bring your notes!" },
  { id:"s2", title:"Algebra II Tutoring — Quadratics", type:"Live Tutoring", course:"Algebra II", date:offsetDay(2), start:"15:30", end:"16:30", location:"Room 214", host:"Peer Tutor: Maya", spots:5, description:"One-on-one help with quadratic functions, factoring, and graphing. Come prepared with specific questions." },
  { id:"s3", title:"Python Basics: Loops", type:"Workshop", course:"Intro to Computer Science", date:offsetDay(4), start:"17:00", end:"18:00", location:"STEM Lab", host:"CS Club", spots:12, description:"Hands-on coding workshop. Bring your laptop and learn loops through fun mini-projects!" },
  { id:"s4", title:"Study Buddy Matching", type:"Peer Matching", course:"Mixed", date:offsetDay(3), start:"14:00", end:"15:00", location:"Online", host:"Student Services", spots:20, description:"Connect with study partners for ongoing collaboration and mutual support." },
  { id:"s5", title:"Creative Science Projects", type:"Collaboration", course:"AP Environmental Science", date:offsetDay(5), start:"16:30", end:"17:30", location:"Science Lab", host:"Environmental Club", spots:15, description:"Work together on hands-on environmental projects and experiments." },
];

export default function App(){
  const [page, setPage] = useState("home");
  const [profile, setProfile] = useState(()=> load("fbla_profile", { name:"Student", grade:"11", school:"Cypress Ranch HS" }));
  useEffect(()=> save("fbla_profile", profile), [profile]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <Header page={page} setPage={setPage} profile={profile} setProfile={setProfile} />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-8">
        {page==="home" && <Home setPage={setPage} />}
        {page==="schedule" && <Schedule />}
        {page==="dashboard" && <Dashboard />}
        {page==="resources" && <Resources />}
        {page==="about" && <About />}
      </main>
      <Footer />
    </div>
  );
}

function Header({ page, setPage, profile, setProfile }){
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="size-6" aria-hidden />
          <span className="font-semibold">Student Learning Hub</span>
        </div>
        <nav className="ml-auto hidden md:flex items-center gap-1">
          <NavBtn active={page==="home"} onClick={()=>setPage("home")}>Home</NavBtn>
          <NavBtn active={page==="schedule"} onClick={()=>setPage("schedule")} icon={<CalendarIcon className="size-4" />}>Schedule</NavBtn>
          <NavBtn active={page==="dashboard"} onClick={()=>setPage("dashboard")} icon={<Gauge className="size-4" />}>Dashboard</NavBtn>
          <NavBtn active={page==="resources"} onClick={()=>setPage("resources")} icon={<BookOpen className="size-4" />}>Resources</NavBtn>
          <NavBtn active={page==="about"} onClick={()=>setPage("about")}>About</NavBtn>
        </nav>
        <ProfilePill profile={profile} setProfile={setProfile} />
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
function ProfilePill({ profile, setProfile }){
  const initials = profile.name?.split(" ").map(s=>s[0]).slice(0,2).join("").toUpperCase() || "ST";
  return (
    <div className="ml-2 flex items-center gap-3">
      <div className="size-9 rounded-full bg-slate-900 text-white grid place-items-center text-xs font-semibold" aria-hidden>{initials}</div>
      <div className="leading-tight">
        <div className="font-semibold text-sm">{profile.name}</div>
        <div className="text-xs text-slate-500">Grade {profile.grade} · {profile.school}</div>
      </div>
      <EditProfile onSave={setProfile} current={profile} />
    </div>
  );
}
function EditProfile({ current, onSave }){
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(current);
  useEffect(()=> setForm(current), [open]);
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
                  <input className="rounded-xl border px-3 py-2" value={form[f]} onChange={e=>setForm({...form, [f]:e.target.value})} />
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={()=>setOpen(false)} className="rounded-xl border px-3 py-2">Cancel</button>
              <button onClick={()=>{ onSave(form); setOpen(false) }} className="rounded-xl bg-slate-900 text-white px-4 py-2">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Home({ setPage }){
  return (
    <section>
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-emerald-600 text-white p-8 md:p-12 shadow-xl">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">Design to Learn: A Student-run Learning Hub</h1>
          <p className="mt-4 text-white/90 text-lg">Built by students, for students. Join live tutoring, track your progress, and explore interactive resources across AP Environmental Science, Algebra II, and Computer Science.</p>
          <div className="mt-6 flex gap-3">
            <button onClick={()=>setPage("schedule")} className="rounded-2xl bg-white/95 text-slate-900 px-5 py-3 font-semibold inline-flex items-center gap-2"><CalendarIcon className="size-5" />See Schedule</button>
            <button onClick={()=>setPage("resources")} className="rounded-2xl border border-white/60 px-5 py-3 font-semibold">Browse Resources</button>
          </div>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        <FeatureCard icon={<CalendarIcon className="size-6" />} title="Live Tutoring & Study Sessions" desc="Join or create sessions that fit your week. Filter by subject and reserve a spot in seconds." />
        <FeatureCard icon={<Gauge className="size-6" />} title="Personal Dashboard" desc="Visualize goals, streaks, and unit completion. Your progress saves to this device." />
        <FeatureCard icon={<BookOpen className="size-6" />} title="Interactive Resources" desc="Lessons, short videos, practice quizzes, and downloadable study guides." />
      </div>
    </section>
  );
}
function FeatureCard({ icon, title, desc }){
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white p-3">{icon}</div>
      <h3 className="mt-4 font-semibold text-lg">{title}</h3>
      <p className="text-slate-600 mt-1">{desc}</p>
    </div>
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
  const [form, setForm] = useState({ title:"", type:"Group Study", course:"AP Environmental Science", date:new Date().toISOString().slice(0,10), start:"16:00", end:"17:00", location:"", host:"", spots:6, description:"" });
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
          {select("Course","course",["AP Environmental Science","Algebra II","Intro to Computer Science","Mixed"])}
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
const reserve = (setSessions,id)=> setSessions(prev=> prev.map(s=> s.id===id? { ...s, reserved: Math.min((s.reserved||0)+1, s.spots) } : s ));

// ---------- Dashboard ----------
function Dashboard(){
  const [courses, setCourses] = useState(()=> load("fbla_courses", SEED_COURSES));
  const [units, setUnits] = useState(()=> load("fbla_units", {
    apenv:[{id:"1",name:"Ecosystems",done:false},{id:"2",name:"Biodiversity",done:false},{id:"3",name:"Populations",done:false},{id:"4",name:"Climate Change",done:false}],
    alg2:[{id:"1",name:"Quadratics",done:true},{id:"2",name:"Polynomials",done:false},{id:"3",name:"Exponentials",done:false},{id:"4",name:"Logarithms",done:false}],
    cs:[{id:"1",name:"Variables",done:true},{id:"2",name:"Loops",done:false},{id:"3",name:"Functions",done:false},{id:"4",name:"Data Structures",done:false}],
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
      <h2 className="text-2xl font-bold flex items-center gap-2"><Gauge className="size-6" />Your Learning Dashboard</h2>
      
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
        <Stat label="Overall Progress" value={`${overallProgress}%`} sub={`${totalDone}/${totalUnits} units`} />
        <Stat label="Weekly Goal" value={`${totalDone}/${goal}`} sub="Units completed" />
        <Stat label="Study Streak" value={`${streak} days`} sub="Keep it going!" />
        <Stat label="Study Sessions" value={`${studySessions}`} sub="This month" />
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
                <span className="text-lg">🔥</span>
                <span className="text-sm">Log Study Session</span>
              </button>
              <button onClick={()=>setStudySessions(studySessions + 1)} className="w-full rounded-xl border px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2">
                <span className="text-lg">📚</span>
                <span className="text-sm">Join Peer Study</span>
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
              <span className="text-slate-600">Weekly unit goal</span>
              <input type="number" min={1} className="rounded-xl border px-3 py-2" value={goal} onChange={e=>setGoal(Number(e.target.value))} />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-600">Streak (days)</span>
              <input type="number" min={0} className="rounded-xl border px-3 py-2" value={streak} onChange={e=>setStreak(Number(e.target.value))} />
            </label>
            <p className="text-xs text-slate-500 mt-4">Tip: Click units to mark complete. Achievements unlock as you progress!</p>
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
      <h2 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="size-6" />Interactive Resources</h2>
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
  const cards = [
    { title:"Ecosystems & Energy Flow", course:"AP Environmental Science", minutes:12, summary:"Producers → Consumers → Decomposers, 10% rule, food webs." },
    { title:"Quadratic Functions", course:"Algebra II", minutes:10, summary:"Vertex form, factoring vs. quadratic formula, discriminant." },
    { title:"Python Loops", course:"Intro to CS", minutes:9, summary:"for vs while, range(), off-by-one, break/continue." },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {cards.map((c,i)=>(
        <article key={i} className="rounded-2xl border bg-white p-5 hover:shadow-md transition">
          <h3 className="font-semibold text-lg leading-snug">{c.title}</h3>
          <div className="text-xs text-slate-500 mt-1">{c.course} · {c.minutes} min</div>
          <p className="text-sm text-slate-600 mt-3">{c.summary}</p>
          <button className="mt-4 rounded-xl bg-slate-900 text-white px-4 py-2 text-sm">Open Lesson</button>
        </article>
      ))}
    </div>
  );
}
function Videos(){
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {[1,2].map(i => (
        <div key={i} className="aspect-video rounded-2xl border bg-slate-100 grid place-items-center text-slate-500">
          <div className="flex flex-col items-center">
            <Video className="size-8" />
            <div className="mt-2 text-sm">Video Placeholder — add school-hosted clip</div>
          </div>
        </div>
      ))}
    </div>
  );
}
function QuizWidget(){
  const QUESTIONS = [
    { q:"In a food chain, approximately what percentage of energy transfers from one trophic level to the next?", choices:["100%","50%","10%","1%"], answer:2 },
    { q:"The vertex of y = (x-3)^2 + 4 is at:", choices:["(3,4)","(-3,4)","(3,-4)","(-3,-4)"], answer:0 },
    { q:"Which loop is guaranteed to run at least once?", choices:["for","while","do…while (conceptually)","None"], answer:2 },
  ];
  const [step,setStep] = useState(0);
  const [score,setScore] = useState(0);
  const done = step>=QUESTIONS.length;
  return (
    <div className="rounded-2xl border bg-white p-6 max-w-2xl">
      {!done ? (
        <div>
          <div className="text-sm text-slate-500 mb-2">Question {step+1} of {QUESTIONS.length}</div>
          <h3 className="font-semibold text-lg">{QUESTIONS[step].q}</h3>
          <div className="mt-4 grid gap-2">
            {QUESTIONS[step].choices.map((c,idx)=>(
              <button key={idx} onClick={()=>{ if(idx===QUESTIONS[step].answer) setScore(score+1); setStep(step+1) }} className="rounded-xl border px-4 py-2 text-left hover:bg-slate-50">{c}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-sm text-slate-500">Quiz complete</div>
          <div className="text-3xl font-bold mt-1">{score} / {QUESTIONS.length}</div>
          <button onClick={()=>{ setStep(0); setScore(0) }} className="mt-4 rounded-xl bg-slate-900 text-white px-4 py-2">Retry Quiz</button>
        </div>
      )}
    </div>
  );
}
function Downloads(){
  const files=[
    { name:"APES_Unit1_Study-Guide.pdf", size:"238 KB" },
    { name:"AlgebraII_Formula-Sheet.pdf", size:"120 KB" },
    { name:"Python_Loops_CheatSheet.pdf", size:"95 KB" },
    { name:"Peer_Study_Templates.docx", size:"45 KB" },
    { name:"Creative_Project_Ideas.pdf", size:"180 KB" },
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
  
  const tools = [
    {
      id: "mindmap",
      title: "Mind Map Creator",
      description: "Visualize connections between concepts",
      icon: "🧠",
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Create Your Mind Map</h4>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 h-64 grid place-items-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🎨</div>
              <p className="text-slate-600">Interactive mind mapping tool coming soon!</p>
              <p className="text-sm text-slate-500 mt-2">Drag & drop concepts, connect ideas, and export your maps.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl bg-purple-600 text-white px-4 py-2 text-sm">Start Mapping</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Save Map</button>
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
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 min-h-[200px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-3">📚</div>
              <h5 className="font-semibold mb-2">Ecosystem Components</h5>
              <p className="text-slate-700">Click to reveal definition</p>
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <button className="rounded-xl border px-4 py-2 text-sm">Previous</button>
            <button className="rounded-xl bg-green-600 text-white px-4 py-2 text-sm">Got it!</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Next</button>
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
          <h4 className="font-semibold">Environmental Science Timeline</h4>
          <div className="space-y-3">
            {[
              { year: "1960s", event: "Environmental Movement Begins", color: "bg-green-100" },
              { year: "1970", event: "First Earth Day", color: "bg-blue-100" },
              { year: "1987", event: "Montreal Protocol", color: "bg-purple-100" },
              { year: "1997", event: "Kyoto Protocol", color: "bg-orange-100" },
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
    { id: 1, title: "Environmental Data Visualization", course: "AP Environmental Science", members: 3, status: "active", description: "Creating interactive charts showing climate data trends" },
    { id: 2, title: "Math Game Development", course: "Algebra II", members: 2, status: "recruiting", description: "Building a fun quiz game to help with quadratic functions" },
    { id: 3, title: "Python Learning Bot", course: "Computer Science", members: 4, status: "completed", description: "AI chatbot that helps explain coding concepts" },
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
      <h2 className="text-2xl font-bold">About This Student Learning Hub</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <span className="text-xl">🎯</span>
            Our Mission
          </h3>
          <p className="text-slate-700 mb-4">
            This Student Learning Hub was designed to make learning more engaging, collaborative, and accessible through peer-to-peer connections. Built by students, for students, it encourages creative exploration and keeps learners motivated.
          </p>
          <ul className="list-disc pl-6 text-slate-700 space-y-1 text-sm">
            <li>Peer-to-peer tutoring and study sessions</li>
            <li>Interactive learning resources and tools</li>
            <li>Progress tracking and achievement systems</li>
            <li>Creative project collaboration</li>
          </ul>
        </div>
        
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <span className="text-xl">📚</span>
            Subject Areas
          </h3>
          <div className="space-y-3">
            {[
              { name: "AP Environmental Science", color: "bg-emerald-100 text-emerald-900", topics: "Ecosystems, Biodiversity, Climate Change" },
              { name: "Algebra II", color: "bg-indigo-100 text-indigo-900", topics: "Quadratics, Polynomials, Logarithms" },
              { name: "Computer Science", color: "bg-sky-100 text-sky-900", topics: "Python, Data Structures, Algorithms" },
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
            <h4 className="font-semibold mb-1">Live Sessions</h4>
            <p className="text-sm text-slate-600">Tutoring, study groups, and collaborative workshops</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-50">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-semibold mb-1">Progress Tracking</h4>
            <p className="text-sm text-slate-600">Personal dashboard with achievements and goals</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-50">
            <div className="text-2xl mb-2">🎨</div>
            <h4 className="font-semibold mb-1">Creative Tools</h4>
            <p className="text-sm text-slate-600">Interactive resources and peer projects</p>
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <span className="text-xl">🏆</span>
          FBLA Website Design Project
        </h3>
        <p className="text-slate-700 mb-4">
          This website demonstrates front-end design principles, accessibility standards, and thoughtful user experience design. Built with React and Tailwind CSS, it showcases modern web development practices while serving a real educational need.
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Technical Features:</h4>
            <ul className="list-disc pl-6 text-slate-600 space-y-1">
              <li>Fully responsive design</li>
              <li>Local data persistence</li>
              <li>Interactive components</li>
              <li>Accessibility compliance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Educational Impact:</h4>
            <ul className="list-disc pl-6 text-slate-600 space-y-1">
              <li>Peer-to-peer learning</li>
              <li>Motivation through gamification</li>
              <li>Creative exploration tools</li>
              <li>Student collaboration</li>
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
        <div>© {new Date().getFullYear()} Student Learning Hub</div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
}
