"use client";
import { useEffect, useState } from "react";
type F = { k: string; l: string; t?: "area" | "csv" | "lines" | "image" | "file" | "number" };
const api = (u: string, m = "GET", b?: any) => fetch(u, { method: m, headers: { "Content-Type": "application/json" }, body: b ? JSON.stringify(b) : undefined }).then(r => r.json());
const T = (k: string, l: string, t?: F["t"]): F => ({ k, l, t });
const LIST: Record<string, { label: string; title: string; fields: F[] }> = {
  projects: { label: "Projects", title: "title", fields: [T("title", "Title"), T("description", "Description", "area"), T("tech", "Tech (comma separated)", "csv"), T("image", "Project image", "image"), T("github", "GitHub URL"), T("live", "Live URL"), T("order", "Order (0 = first)", "number")] },
  skills: { label: "Skills", title: "category", fields: [T("category", "Category"), T("items", "Skills (comma separated)", "csv"), T("order", "Order", "number")] },
  experience: { label: "Experience", title: "role", fields: [T("role", "Role"), T("company", "Company"), T("period", "Period"), T("points", "Highlights (one per line)", "lines"), T("order", "Order", "number")] },
  education: { label: "Education", title: "degree", fields: [T("degree", "Degree"), T("institute", "Institute"), T("period", "Period"), T("score", "CGPA / score"), T("order", "Order", "number")] },
  achievements: { label: "Achievements", title: "title", fields: [T("title", "Title"), T("description", "Description", "area"), T("date", "Date"), T("certificate", "Certificate (image or PDF)", "image"), T("order", "Order", "number")] },
  certifications: { label: "Certifications", title: "title", fields: [T("title", "Certification name"), T("issuer", "Issuing organization"), T("date", "Date"), T("description", "Description", "area"), T("certificate", "Certificate file (image or PDF)", "image"), T("order", "Order", "number")] },
  messages: { label: "Messages", title: "name", fields: [] },
};
const PROFILE: F[] = [T("name", "Name"), T("title", "Headline"), T("tagline", "Hero tagline"), T("about", "About me", "area"), T("photo", "Profile photo", "image"), T("resume", "Resume (PDF)", "file"), T("email", "Email"), T("phone", "Phone"), T("location", "Location"), T("github", "GitHub URL"), T("linkedin", "LinkedIn URL"), T("leetcode", "LeetCode URL")];
const show = (f: F, v: any) => (f.t === "csv" ? (v || []).join(", ") : f.t === "lines" ? (v || []).join("\n") : v ?? "");
const parse = (f: F, v: string) => (f.t === "csv" ? v.split(",").map(x => x.trim()).filter(Boolean) : f.t === "lines" ? v.split("\n").map(x => x.trim()).filter(Boolean) : f.t === "number" ? Number(v) || 0 : v);

function Field({ f, v, set }: { f: F; v: any; set: (x: any) => void }) {
  const [txt, setTxt] = useState(show(f, v[f.k])); const [busy, setBusy] = useState(false);
  const commit = (s: string) => { setTxt(s); set({ ...v, [f.k]: f.t === "csv" || f.t === "lines" ? parse(f, s) : parse(f, s) }); };
  const up = async (file?: File) => {
    if (!file) return; setBusy(true); const fd = new FormData(); fd.append("file", file);
    const r = await (await fetch("/api/admin/upload", { method: "POST", body: fd })).json(); setBusy(false);
    r.url ? (setTxt(r.url), set({ ...v, [f.k]: r.url })) : alert(r.error || "Upload failed");
  };
  return <label className="block text-sm"><span className="mb-1 block text-zinc-400">{f.l}</span>
    {f.t === "image" || f.t === "file" ? <div className="flex flex-wrap items-center gap-3">
      {txt && f.t === "image" && !/\.pdf$/i.test(txt) && <img src={txt} alt="" className="h-12 w-12 rounded object-cover" />}
      <input type="file" accept={f.t === "file" ? "application/pdf" : "image/*,application/pdf"} onChange={e => up(e.target.files?.[0])} className="text-xs" />
      {busy && <span className="text-violet-300">Uploading…</span>}
      <input className="inp" placeholder="or paste a URL" value={txt} onChange={e => commit(e.target.value)} /></div>
    : f.t === "area" || f.t === "lines" ? <textarea className="inp h-28" value={txt} onChange={e => commit(e.target.value)} />
    : <input className="inp" type={f.t === "number" ? "number" : "text"} value={txt} onChange={e => commit(e.target.value)} />}
  </label>;
}
const Form = ({ fields, v, set }: { fields: F[]; v: any; set: (x: any) => void }) => <div className="space-y-3">{fields.map(f => <Field key={f.k + (v._id || "")} f={f} v={v} set={set} />)}</div>;

function Single({ col, fields }: { col: string; fields: F[] }) {
  const [v, setV] = useState<any>(null); const [m, setM] = useState("");
  useEffect(() => { api("/api/admin/" + col).then(setV); }, [col]);
  if (!v) return <p>Loading…</p>;
  return <div className="max-w-2xl"><Form fields={fields} v={v} set={setV} /><button className="btn btn-p mt-5" onClick={async () => { await api("/api/admin/" + col, "PUT", v); setM("Saved"); setTimeout(() => setM(""), 2000); }}>Save changes</button><span className="ml-3 text-sm text-violet-300">{m}</span></div>;
}

function Sections() {
  const [s, setS] = useState<any[]>([]); const [m, setM] = useState("");
  useEffect(() => { api("/api/admin/sections").then(setS); }, []);
  const mv = (i: number, d: number) => { const a = [...s]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; setS(a); };
  return <div className="max-w-md space-y-2">{s.map((x, i) => <div key={x.id} className="flex items-center gap-3 rounded-lg border border-white/10 px-3 py-2">
    <input type="checkbox" checked={x.visible} onChange={e => setS(s.map((y, j) => (j === i ? { ...y, visible: e.target.checked } : y)))} aria-label={`Show ${x.label}`} />
    <span className="flex-1">{x.label}</span><button className="btn btn-o !px-3 !py-1" onClick={() => mv(i, -1)}>Up</button><button className="btn btn-o !px-3 !py-1" onClick={() => mv(i, 1)}>Down</button></div>)}
    <button className="btn btn-p mt-3" onClick={async () => { await api("/api/admin/sections", "PUT", s); setM("Saved"); }}>Save order and visibility</button><span className="ml-3 text-sm text-violet-300">{m}</span></div>;
}

function List({ col }: { col: string }) {
  const cfg = LIST[col]; const [rows, setRows] = useState<any[]>([]); const [e, setE] = useState<any>(null);
  const load = () => api("/api/admin/" + col).then(setRows); useEffect(() => { setE(null); load(); }, [col]);
  const save = async () => { e._id ? await api(`/api/admin/${col}/${e._id}`, "PUT", e) : await api("/api/admin/" + col, "POST", e); setE(null); load(); };
  const del = async (id: string) => { if (confirm("Delete this item?")) { await api(`/api/admin/${col}/${id}`, "DELETE"); load(); } };
  if (col === "messages") return <div className="space-y-3">{!rows.length && <p className="text-zinc-500">No messages yet.</p>}{rows.map(r => <div key={r._id} className="card"><div className="flex justify-between"><b>{r.name}</b><button className="text-sm text-red-400" onClick={() => del(r._id)}>Delete</button></div><a className="text-sm text-violet-300" href={`mailto:${r.email}`}>{r.email}</a><p className="mt-2 whitespace-pre-wrap text-sm text-zinc-300">{r.message}</p><p className="mt-2 text-xs text-zinc-500">{new Date(r.createdAt).toLocaleString()}</p></div>)}</div>;
  if (e) return <div className="max-w-2xl"><Form fields={cfg.fields} v={e} set={setE} /><div className="mt-5 flex gap-3"><button className="btn btn-p" onClick={save}>Save</button><button className="btn btn-o" onClick={() => setE(null)}>Cancel</button></div></div>;
  return <div><button className="btn btn-p mb-4" onClick={() => setE({})}>Add new</button>
    <div className="space-y-2">{!rows.length && <p className="text-zinc-500">Nothing here yet. Add an item, or choose "Load starter content" above.</p>}{rows.map(r => <div key={r._id} className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3"><span>{r[cfg.title]}</span><span className="flex gap-4 text-sm"><button className="text-violet-300" onClick={() => setE(r)}>Edit</button><button className="text-red-400" onClick={() => del(r._id)}>Delete</button></span></div>)}</div></div>;
}

export default function Admin() {
  const [tab, setTab] = useState("profile"); const [k, setK] = useState(0);
  const tabs: [string, string][] = [["profile", "Profile"], ["sections", "Sections"], ...Object.entries(LIST).map(([a, b]) => [a, b.label] as [string, string])];
  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h1 className="font-display text-2xl font-semibold">Portfolio admin</h1>
        <div className="flex flex-wrap gap-2"><a className="btn btn-o" href="/" target="_blank">View site</a>
          <button className="btn btn-o" onClick={async () => { await api("/api/admin/seed", "POST"); setK(k + 1); alert("Starter content loaded"); }}>Load starter content</button>
          <button className="btn btn-o" onClick={async () => { await api("/api/admin/login", "DELETE"); location.href = "/admin/login"; }}>Sign out</button></div></div>
      <div className="mb-6 flex flex-wrap gap-2">{tabs.map(([id, l]) => <button key={id} onClick={() => setTab(id)} className={`btn ${tab === id ? "btn-p" : "btn-o"}`}>{l}</button>)}</div>
      <div key={tab + k}>{tab === "profile" ? <Single col="profile" fields={PROFILE} /> : tab === "sections" ? <Sections /> : <List col={tab} />}</div>
    </div>
  );
}
