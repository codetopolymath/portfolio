import { Tag } from 'antd'
import { useReveal, useStaggerReveal } from '../hooks/useReveal'

const WORK = [
  {
    title: 'Telecom Platform Engineering',
    badge: 'CPaaS',
    body: 'SMS/OTP routing systems processing millions of messages daily — SMPP protocol handling, event-driven delivery-receipt pipelines on Kafka (500K DLRs/hour), and real-time analytics on 1B+ records with sub-second queries.',
    stack: ['SMPP', 'Kafka', 'ClickHouse', 'Rust · Axum'],
  },
  {
    title: 'Performance Optimization',
    body: 'Python → Rust migration cutting latency ~10× and infra costs 40%, plus database tuning across connection-pooled PostgreSQL, batched ClickHouse writes, and DragonflyDB for 70% lower query latency.',
    stack: ['Rust', 'Tokio', 'PostgreSQL', 'DragonflyDB'],
  },
  {
    title: 'Distributed Systems & Reliability',
    body: 'Zero-downtime deployments with automated rollback across 20-server clusters, HAProxy load balancing, BBR congestion control for <2ms internal latency, and an observability stack tracking 50+ metrics end to end.',
    stack: ['Docker Swarm', 'HAProxy', 'Prometheus', 'Grafana'],
  },
  {
    title: 'Fraud Prevention & Platforms',
    badge: 'earlier work',
    badgeMuted: true,
    body: 'TRANSPARENCY — a TRAI-approved fraud-prevention system processing 50K+ verifications/day at 99.99% uptime (Django REST + React). DOCUR, a decentralized file-sharing platform on FastAPI + IPFS cutting storage costs 80%.',
    stack: ['Django', 'React', 'FastAPI', 'IPFS'],
  },
]

export default function NotableWork() {
  const headRef = useReveal()
  const gridRef = useStaggerReveal('.work-card', { stagger: 0.12 })

  return (
    <section id="notable" className="section section-alt">
      <div className="container">
        <div ref={headRef}>
          <span className="section-eyebrow">Notable Work</span>
          <h2 className="section-title">Systems built, shipped, and battle-tested</h2>
        </div>

        <div ref={gridRef} className="work-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {WORK.map((w, i) => (
            <div key={i} className="work-card" style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '28px 26px',
              transition: 'border-color .2s, box-shadow .2s, transform .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                <h3 style={{ fontSize: '1.12rem', fontWeight: 700, color: 'var(--text)', margin: 0, flex: 1 }}>{w.title}</h3>
                {w.badge && (
                  <Tag style={{
                    borderRadius: 6, fontSize: '.7rem', fontFamily: 'var(--mono)', border: 'none',
                    background: w.badgeMuted ? 'var(--surface-2)' : 'var(--blue-dim)',
                    color: w.badgeMuted ? 'var(--muted)' : 'var(--blue)',
                  }}>{w.badge}</Tag>
                )}
              </div>
              <p style={{ fontSize: '.94rem', color: 'var(--text-dim)', lineHeight: 1.72, marginBottom: 18 }}>{w.body}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {w.stack.map(s => (
                  <span key={s} style={{
                    fontFamily: 'var(--mono)', fontSize: '.75rem', color: 'var(--text-dim)',
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    padding: '4px 10px', borderRadius: 999,
                  }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:700px){.work-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}
