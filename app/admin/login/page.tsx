"use client";
import { useState } from "react";
export default function Login() {
  const [f, setF] = useState({ email: "", password: "" }); const [err, setErr] = useState("");
  const go = async () => { const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }); r.ok ? (location.href = "/admin") : setErr((await r.json()).error); };
  return (
    <main className="grid min-h-screen place-items-center px-5"><div className="w-full max-w-sm space-y-3 rounded-xl border border-white/10 p-6">
      <h1 className="font-display text-2xl font-semibold">Admin sign in</h1>
      <input className="inp" type="email" placeholder="Email" onChange={e => setF({ ...f, email: e.target.value })} />
      <input className="inp" type="password" placeholder="Password" onChange={e => setF({ ...f, password: e.target.value })} onKeyDown={e => e.key === "Enter" && go()} />
      {err && <p className="text-sm text-red-400">{err}</p>}
      <button className="btn btn-p w-full justify-center" onClick={go}>Sign in</button></div></main>
  );
}
