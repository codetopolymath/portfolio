import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '../hooks/useReveal'

const PURSUITS = [
  {
    prefix: 'driving',
    label: 'Long drives',
    desc: "When the system needs a hard reset, I get behind the wheel. There's something about the open road — the rhythm of it — that untangles what's stuck.",
    icon: '🚗',
    type: 'life',
  },
  {
    prefix: 'swimming',
    label: 'Swimming',
    desc: "Beginner level, but fully committed. The water teaches patience — you can't rush the technique.",
    icon: '🏊',
    type: 'life',
  },
  {
    prefix: 'boxing',
    label: 'Boxing',
    desc: 'Trained for a stretch. Footwork, timing, reading an opponent. The strategic layer surprised me.',
    icon: '🥊',
    type: 'life',
  },
  {
    prefix: 'badminton',
    label: 'Badminton',
    desc: "Recreational level, but played seriously enough to appreciate the game's geometry and reaction speed.",
    icon: '🏸',
    type: 'life',
  },
  {
    prefix: 'gymnastics',
    label: 'Gymnastics',
    desc: 'Tried it. Discovered that body control is its own kind of engineering problem.',
    icon: '🤸',
    type: 'life',
  },
  {
    prefix: 'rust',
    label: 'Rust',
    desc: "Primary language. The ownership model is a different way of thinking about system resources — I'm a convert.",
    icon: '🦀',
    type: 'tech',
  },
  {
    prefix: 'python',
    label: 'Python',
    desc: 'FastAPI, ML experiments, data pipelines. The speed of iteration matters for exploration.',
    icon: '🐍',
    type: 'tech',
  },
  {
    prefix: 'go',
    label: 'Go',
    desc: 'Clean concurrency model. When Rust is overkill, Go is the right tool.',
    icon: '🔵',
    type: 'tech',
  },
  {
    prefix: 'laravel',
    label: 'Laravel',
    desc: 'PHP framework exploration — elegant routing, Eloquent ORM, and artisan tooling. The polymath instinct: know enough to evaluate any ecosystem.',
    icon: '🎯',
    type: 'tech',
  },
  {
    prefix: 'java',
    label: 'Java',
    desc: 'Spring Boot APIs, enterprise integrations, and the OOP fundamentals that shaped how I think about abstraction. A language I keep returning to.',
    icon: '☕',
    type: 'tech',
  },
  {
    prefix: 'chem-eng',
    label: 'Chem. Engineering',
    desc: 'The origin skill. Process design, throughput optimization, failure modes — turned out to be excellent preparation for distributed systems.',
    icon: '⚗️',
    type: 'origin',
  },
]

const TYPE_COLOR = {
  life: 'var(--orange)',
  tech: 'var(--blue)',
  origin: 'var(--green)',
}

export default function Polymath() {
  const headRef = useReveal()
  const cardsRef = useRef(null)

  useEffect(() => {
    if (!cardsRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.querySelectorAll('.poly-card'),
        { opacity: 0, y: 20, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.55, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
        }
      )
    }, cardsRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="polymath" className="section">
      <div className="container">
        <div ref={headRef}>
          <span className="section-eyebrow">The Polymath</span>
          <h2 className="section-title">
            <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-dim)', fontWeight: 400 }}>_.</span>to.polymath
          </h2>
          <p className="section-intro">
            The email says it all. The pattern is{' '}
            <code style={{
              fontFamily: 'var(--mono)', background: 'var(--surface)',
              padding: '2px 7px', borderRadius: 5, fontSize: '.92em', color: 'var(--blue)',
            }}>[skill].to.polymath</code>
            {' '}— whatever I'm obsessing over currently fills the blank. In software, that same curiosity drives learning new languages, tools, and paradigms before they become mainstream. Outside of terminals and editors, the same drive runs on a different substrate.
          </p>
        </div>

        <div ref={cardsRef} className="poly-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {PURSUITS.map(p => (
            <div key={p.prefix} className="poly-card" style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '20px 18px',
              position: 'relative', overflow: 'hidden',
              transition: 'border-color .18s, transform .18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = TYPE_COLOR[p.type]; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}>
              <div style={{
                position: 'absolute', top: 0, right: 0, fontSize: '1.6rem',
                opacity: .1, transform: 'translate(6px,-6px)', lineHeight: 1,
              }}>
                {p.icon}
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', marginBottom: 8, letterSpacing: '.08em' }}>
                <span style={{ color: TYPE_COLOR[p.type] }}>{p.prefix}</span>
                <span style={{ color: 'var(--muted)' }}>.to.polymath</span>
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 7 }}>
                {p.icon} {p.label}
              </h4>
              <p style={{ fontSize: '.86rem', color: 'var(--text-dim)', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 40, padding: '22px 24px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', borderLeft: '3px solid var(--blue)',
        }}>
          <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '.95rem', lineHeight: 1.7 }}>
            The Chemical Engineering degree wasn't a detour — it was the foundation.{' '}
            <strong style={{ color: 'var(--text)' }}>Process design, throughput analysis, and failure mode thinking</strong>{' '}
            map directly onto distributed systems architecture. When I say I think in systems, I mean it literally.
          </p>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.poly-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:540px){.poly-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  )
}
