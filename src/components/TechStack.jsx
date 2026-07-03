import { Tooltip } from 'antd'
import { useReveal, useStaggerReveal } from '../hooks/useReveal'
import { LANG_DOCS } from '../data/docLinks'

const STACK = [
  {
    category: 'Languages',
    items: [
      { name: 'Rust', tip: 'Primary language for performance-critical services. Axum + Tokio.' },
      { name: 'Python', tip: 'FastAPI, Django, data pipelines, ML experiments.' },
      { name: 'Go', tip: 'Microservices, CLI tooling.' },
      { name: 'Java', tip: 'Spring Boot APIs, enterprise integrations.' },
      { name: 'JavaScript', tip: 'React frontends, Node scripts.' },
    ],
  },
  {
    category: 'Backend & Frameworks',
    items: [
      { name: 'Axum', tip: 'Async Rust web framework built on Tokio.' },
      { name: 'Tokio', tip: 'Async runtime for Rust.' },
      { name: 'FastAPI', tip: 'High-performance Python APIs.' },
      { name: 'Django', tip: 'Full-featured Python web framework.' },
      { name: 'Spring Boot', tip: 'Enterprise Java applications.' },
    ],
  },
  {
    category: 'Data & Messaging',
    items: [
      { name: 'PostgreSQL', tip: 'Primary RDBMS — connection pooling, query tuning.' },
      { name: 'ClickHouse', tip: 'Columnar OLAP for 1B+ record analytics.' },
      { name: 'Kafka', tip: 'Event streaming, 500K DLRs/hour.' },
      { name: 'DragonflyDB', tip: 'Redis-compatible in-memory store, 70% latency cuts.' },
      { name: 'MongoDB', tip: 'Document storage for flexible schemas.' },
    ],
  },
  {
    category: 'Infrastructure',
    items: [
      { name: 'Docker Swarm', tip: 'Container orchestration across 20-server clusters.' },
      { name: 'HAProxy', tip: 'Load balancing with health checks.' },
      { name: 'Ansible', tip: 'Infrastructure automation.' },
      { name: 'Terraform', tip: 'Infrastructure as code.' },
      { name: 'GitLab CI/CD', tip: 'Build, test, and deploy pipelines.' },
    ],
  },
  {
    category: 'Observability & Cloud',
    items: [
      { name: 'Prometheus', tip: 'Metrics collection, 50+ tracked signals.' },
      { name: 'Grafana', tip: 'Dashboards and alerting.' },
      { name: 'k6', tip: 'Load testing to validate TPS targets.' },
      { name: 'AWS', tip: 'EC2, S3, Lambda, VPC.' },
      { name: 'GCP', tip: 'Cloud Run, BigQuery, GCS.' },
    ],
  },
]

export default function TechStack() {
  const headRef = useReveal()
  const bodyRef = useStaggerReveal('.stack-col', { stagger: 0.08 })

  return (
    <section id="stack" className="section">
      <div className="container">
        <div ref={headRef}>
          <span className="section-eyebrow">Tech Stack</span>
          <h2 className="section-title">Tools of the trade</h2>
          <p className="section-intro">
            Hover any item for context. The depth varies — I write production Rust and Python daily; Go and Java at need.
          </p>
        </div>

        <div ref={bodyRef} className="stack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 28 }}>
          {STACK.map(group => (
            <div key={group.category} className="stack-col">
              <h4 style={{
                fontFamily: 'var(--mono)', fontSize: '.76rem', color: 'var(--blue)',
                letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 14,
              }}>{group.category}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {group.items.map(item => {
                  const docHref = LANG_DOCS[item.name]
                  const Tag = docHref ? 'a' : 'span'
                  return (
                    <Tooltip key={item.name} title={item.tip} placement="right" color="#111e35">
                      <Tag
                        {...(docHref ? { href: docHref, target: '_blank', rel: 'noopener noreferrer' } : {})}
                        style={{
                          display: 'inline-block', fontFamily: 'var(--mono)', fontSize: '.8rem',
                          color: 'var(--text-dim)', background: 'var(--surface)', border: '1px solid var(--border)',
                          padding: '6px 12px', borderRadius: 8, cursor: docHref ? 'pointer' : 'default', width: 'fit-content',
                          transition: 'border-color .18s, color .18s, transform .18s, box-shadow .18s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = 'var(--blue)'
                          e.currentTarget.style.color = 'var(--text)'
                          if (docHref) {
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(56,189,248,.28)'
                          }
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'var(--border)'
                          e.currentTarget.style.color = 'var(--text-dim)'
                          e.currentTarget.style.transform = 'none'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                      >
                        {item.name}
                      </Tag>
                    </Tooltip>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){.stack-grid{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:640px){.stack-grid{grid-template-columns:repeat(2,1fr)!important;}}
      `}</style>
    </section>
  )
}
