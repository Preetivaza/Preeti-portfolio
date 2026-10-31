"use client";
import { useEffect, useRef, useState } from "react";
export function Reveal({ children, className = "" }: any) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => { const o = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && x.target.classList.add("in")), { threshold: 0.1 }); r.current && o.observe(r.current); return () => o.disconnect(); }, []);
  return <div ref={r} className={"rv " + className}>{children}</div>;
}
export function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", message: "", website: "" });
  const [s, setS] = useState<string>("idle");
  const submit = async () => {
    setS("sending");
    const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
    if (r.ok) { setS("ok"); setF({ name: "", email: "", message: "", website: "" }); } else setS((await r.json()).error || "Something went wrong. Try again.");
  };
  return (
    <div className="space-y-3">
      <input className="inp" placeholder="Your name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} aria-label="Name" />
      <input className="inp" type="email" placeholder="Your email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} aria-label="Email" />
      <textarea className="inp h-32" placeholder="Your message" value={f.message} onChange={e => setF({ ...f, message: e.target.value })} aria-label="Message" />
      <input className="hidden" tabIndex={-1} autoComplete="off" value={f.website} onChange={e => setF({ ...f, website: e.target.value })} />
      <button className="btn btn-p" onClick={submit} disabled={s === "sending"}>{s === "sending" ? "Sending…" : "Send message"}</button>
      {s === "ok" && <p className="text-sm text-violet-300">Message sent. I'll get back to you soon.</p>}
      {s !== "idle" && s !== "ok" && s !== "sending" && <p className="text-sm text-red-400">{s}</p>}
    </div>
  );
}


export function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("preeti-theme");
    const next = saved === "light";
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
  }, []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    localStorage.setItem("preeti-theme", next ? "light" : "dark");
  };
  return <button type="button" onClick={toggle} className="theme-toggle" aria-label={light ? "Switch to dark theme" : "Switch to light theme"} title={light ? "Switch to dark theme" : "Switch to light theme"}>{light ? "☾" : "☼"}</button>;
}
