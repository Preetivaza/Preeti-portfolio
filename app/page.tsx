import { getPortfolio } from "@/lib/db";
import { Reveal, ContactForm, ThemeToggle } from "@/components/Client";
export const dynamic = "force-dynamic";
const H = ({ t }: { t: string }) => <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">{t}</h2>;
export default async function Home() {
  const { profile: p, sections, ...d }: any = await getPortfolio();
  const vis = sections.filter((s: any) => s.visible);
  const links = [["GitHub", p.github], ["LinkedIn", p.linkedin], ["LeetCode", p.leetcode]].filter(l => l[1]);
  const S: any = {
    about: <div className="max-w-3xl"><p className="text-lg leading-relaxed text-zinc-300">{p.about}</p></div>,
    skills: <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{d.skills.map((s: any, i: number) => <div key={i} className="skill-card group"><div className="mb-4 flex items-center gap-3"><span className="skill-icon">{["⌘","◈","✳","✦","▤","⚙"][i % 6]}</span><h3 className="font-display text-base font-semibold text-white">{s.category}</h3></div><div className="flex flex-wrap gap-2">{s.items.map((x: string) => <span key={x} className="skill-chip">{x}</span>)}</div></div>)}</div>,
    experience: <div className="space-y-6 border-l border-accent/40 pl-6">{d.experience.map((e: any, i: number) => <div key={i} className="relative"><span className="absolute -left-[29px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />
      <h3 className="font-display text-lg font-medium">{e.role}</h3><p className="text-sm text-violet-300">{e.company}{e.period && ` · ${e.period}`}</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-400">{e.points.map((x: string, j: number) => <li key={j}>{x}</li>)}</ul></div>)}</div>,
    projects: <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{d.projects.map((x: any, i: number) => <article key={i} className="card flex flex-col overflow-hidden !p-0">
      {x.image && <img src={x.image} alt={x.title} loading="lazy" className="h-44 w-full object-cover" />}
      <div className="flex flex-1 flex-col p-6"><h3 className="font-display text-xl font-medium">{x.title}</h3><p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{x.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">{x.tech.map((t: string) => <span key={t} className="chip">{t}</span>)}</div>
        <div className="mt-4 flex gap-4 text-sm">{x.github && <a className="text-violet-300 hover:underline" href={x.github} target="_blank" rel="noreferrer">Code</a>}{x.live && <a className="text-violet-300 hover:underline" href={x.live} target="_blank" rel="noreferrer">Live demo</a>}</div></div></article>)}</div>,
    education: <div className="grid gap-4 md:grid-cols-2">{d.education.map((e: any, i: number) => <div key={i} className="card"><h3 className="font-display font-medium">{e.degree}</h3><p className="text-sm text-zinc-400">{e.institute}</p><p className="mt-2 text-sm text-violet-300">{e.score} · {e.period}</p></div>)}</div>,
    achievements: <div className="grid gap-4 md:grid-cols-2">{d.achievements.map((a: any, i: number) => <div key={i} className="card"><h3 className="font-display font-medium">{a.title}</h3><p className="text-xs text-violet-300">{a.date}</p><p className="mt-2 text-sm text-zinc-400">{a.description}</p>{a.certificate && <a className="mt-3 inline-block text-sm text-violet-300 hover:underline" href={a.certificate} target="_blank" rel="noreferrer">View certificate</a>}</div>)}</div>,
    certifications: <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{(d.certifications || []).map((c: any, i: number) => <article key={i} className="card flex flex-col"><div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-xl text-violet-300">✦</div><h3 className="font-display font-medium">{c.title}</h3>{c.issuer && <p className="mt-1 text-sm text-violet-300">{c.issuer}</p>}{c.date && <p className="mt-1 text-xs text-zinc-500">{c.date}</p>}{c.description && <p className="mt-3 text-sm text-zinc-400">{c.description}</p>}{c.certificate && <a className="mt-4 text-sm text-violet-300 hover:underline" href={c.certificate} target="_blank" rel="noreferrer">View certificate ↗</a>}</article>)}</div>,
    profiles: <div className="flex flex-wrap gap-3">{links.map(([l, u]) => <a key={l} href={u} target="_blank" rel="noreferrer" className="btn btn-o">{l}</a>)}</div>,
    resume: <div><p className="mb-5 max-w-xl text-zinc-400">Download my latest resume for a complete overview of my education, experience and projects.</p>{p.resume && <div className="flex gap-3"><a className="btn btn-p" href={p.resume} target="_blank" rel="noreferrer">View resume</a><a className="btn btn-o" href={p.resume} download>Download PDF</a></div>}</div>,
    contact: <div className="grid gap-10 md:grid-cols-2"><div className="space-y-2 text-zinc-400"><p>Open to internships and full-time roles. Send a message and I'll reply by email.</p><a className="block text-violet-300 hover:underline" href={`mailto:${p.email}`}>{p.email}</a><p>{p.phone}</p></div><ContactForm /></div>,
  };
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: p.name, jobTitle: p.title, email: p.email, sameAs: links.map(l => l[1]) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 text-sm" aria-label="Main">
          <a href="#top" className="shrink-0 font-display font-semibold">{p.name.split(" ")[0]}<span className="text-accent">.</span></a>
          <div className="flex flex-1 items-center justify-end gap-4 overflow-x-auto text-zinc-400 [scrollbar-width:none] sm:gap-6">
            {[["Home","top"],["About","about"],["Skills","skills"],["Experience","experience"],["Projects","projects"],["Education","education"]].map(([label,id]) => <a key={id} href={`#${id}`} className="whitespace-nowrap transition hover:text-white">{label}</a>)}
          </div>
          <ThemeToggle />
        </nav>
      </header>
      <main id="top">
        <section className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 pb-16 pt-28 md:grid-cols-[0.9fr_1.1fr]">
          <div className="pointer-events-none absolute left-0 top-20 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
          <div className="hero-in relative order-2 md:order-2">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-violet-300">{p.title}</p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">{p.name}</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">{p.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#projects" className="btn btn-p">See my projects</a><a href="#contact" className="btn btn-o">Contact me</a></div>
            <div className="mt-7 flex flex-wrap gap-4 text-sm text-zinc-400">{links.map(([label, url]) => <a key={label} href={url as string} target="_blank" rel="noreferrer" className="transition hover:text-violet-300">{label} ↗</a>)}</div>
          </div>
          <div className="hero-in relative order-1 mx-auto w-60 md:order-1 md:w-full md:max-w-sm" style={{ animationDelay: ".15s" }}>
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 opacity-70 blur-md" />
            <div className="relative rounded-full bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500 p-[5px] shadow-[0_0_70px_rgba(139,92,246,0.28)]">
              <img src={p.photo || "/preeti.png"} alt={`Portrait of ${p.name}`} className="aspect-square w-full rounded-full border-4 border-black object-cover" />
            </div>
          </div>
        </section>
        {vis.map((s: any) => <section key={s.id} id={s.id} className="mx-auto max-w-6xl px-5 py-20"><Reveal><H t={s.label} />{S[s.id]}</Reveal></section>)}
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-sm text-zinc-500">© {new Date().getFullYear()} {p.name}</footer>
    </>
  );
}
