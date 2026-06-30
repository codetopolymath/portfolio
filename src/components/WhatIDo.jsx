import { useReveal, useStaggerReveal } from '../hooks/useReveal'

const PILLARS = [
  { n: '01', title: 'Scale under load', body: 'Built and scaled a telecom SMS/OTP platform to 150K TPS serving 10M+ daily transactions at 99.9% uptime.', accent: 'var(--orange)' },
  { n: '02', title: 'Performance migrations', body: 'Led Python → Rust migration cutting latency from ~50ms to <5ms and infrastructure costs by 40%.', accent: 'var(--blue)' },
  { n: '03', title: 'Event-driven services', body: 'Architected microservices on Axum/Tokio across 20 servers with zero-downtime rollouts and automated rollback.', accent: 'var(--blue)' },
  { n: '04', title: 'Data at scale', body: 'Tuned PostgreSQL, ClickHouse & DragonflyDB to cut query latency 70%, enabling real-time analytics on 1B+ records.', accent: 'var(--orange)' },
  { n: '05', title: 'Leading teams', body: 'Led an 8-person cross-functional team and served as SPOC for telecom operators, aggregators, and enterprise clients.', accent: 'var(--green)' },
]

export default function WhatIDo() {
  const headRef = useReveal()
  const gridRef = useStaggerReveal('.pillar-card', { stagger: 0.1 })

  return (
    <section id="work" className="section">
      <div className="container">
        <div ref={headRef}>
          <span className="section-eyebrow">What I Do</span>
          <h2 className="section-title">Engineering systems that hold under pressure</h2>
          <p className="section-intro">
            I specialize in <strong>high-throughput, sub-millisecond systems</strong> under real production load — the kind that can't afford a bad week.
          </p>
        </div>

        <div ref={gridRef} className="pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {PILLARS.map(p => (
            <div key={p.n} className="pillar-card" style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '26px 24px',
              transition: 'border-color .2s, transform .2s',
              position: 'relative', overflow: 'hidden', cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = p.accent; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: p.accent, opacity: .6 }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: p.accent, letterSpacing: '.15em', display: 'block', marginBottom: 12 }}>{p.n}</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10, color: 'var(--text)' }}>{p.title}</h3>
              <p style={{ fontSize: '.93rem', color: 'var(--text-dim)', lineHeight: 1.7, margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:860px){.pillars-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:540px){.pillars-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  )
}
