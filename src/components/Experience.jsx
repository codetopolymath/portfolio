import { Timeline } from 'antd'
import { useReveal } from '../hooks/useReveal'

const dateChip = (label, color, bg, border) => (
  <span style={{
    fontFamily: 'var(--mono)', fontSize: '.72rem', color,
    letterSpacing: '.05em', display: 'inline-block',
    background: bg, border: `1px solid ${border}`,
    padding: '2px 10px', borderRadius: 999, marginBottom: 10,
  }}>{label}</span>
)

const ITEMS = [
  {
    color: '#38bdf8',
    children: (
      <div style={{ paddingBottom: 28 }}>
        {dateChip('Jul 2023 – Present', 'var(--orange)', 'var(--orange-dim)', 'rgba(249,115,22,.2)')}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
          Software Developer — Pinnacle Teleservices
        </h3>
        <p style={{ fontSize: '.84rem', color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--mono)' }}>Nagpur, India</p>
        <p style={{ fontSize: '.94rem', color: 'var(--text-dim)', lineHeight: 1.72, margin: 0 }}>
          Lead backend development for mission-critical communication systems. Architected and single-handedly built three backend services for the WhatsApp Business platform, cutting cloud costs{' '}
          <strong style={{ color: 'var(--text)' }}>~95%</strong>. Built event-driven, non-blocking I/O handling{' '}
          <strong style={{ color: 'var(--text)' }}>10,000+ messages/minute</strong>. Developed{' '}
          <strong style={{ color: 'var(--text)' }}>TRANSPARENCY</strong> — a real-time anti-spam solution monitoring communication hops to block fake reports and malicious URLs.
        </p>
      </div>
    ),
  },
  {
    color: '#38bdf8',
    children: (
      <div style={{ paddingBottom: 28 }}>
        {dateChip('Jun 2022 – Jul 2023', 'var(--blue)', 'var(--blue-dim)', 'rgba(56,189,248,.2)')}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
          Software Developer — Pinnacle Teleservices
        </h3>
        <p style={{ fontSize: '.84rem', color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--mono)' }}>Nagpur, India</p>
        <p style={{ fontSize: '.94rem', color: 'var(--text-dim)', lineHeight: 1.72, margin: 0 }}>
          Full-stack developer across blockchain, CPaaS, and decentralized systems. Built an SMPP client/server module (delivered in 3 days) and an Asterisk voice module with IVR and CDR. Architected{' '}
          <strong style={{ color: 'var(--text)' }}>DOCUR</strong> on IPFS,{' '}
          <strong style={{ color: 'var(--text)' }}>CHAINRY</strong> with smart-contract APIs, and{' '}
          <strong style={{ color: 'var(--text)' }}>BRAANDS</strong>, a fractional-NFT platform.
        </p>
      </div>
    ),
  },
  {
    color: '#4ade80',
    children: (
      <div style={{ paddingBottom: 28 }}>
        {dateChip('Feb 2022 – Jul 2022', 'var(--green)', 'rgba(74,222,128,.1)', 'rgba(74,222,128,.2)')}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
          Internships — Internship Studio
        </h3>
        <p style={{ fontSize: '.94rem', color: 'var(--text-dim)', lineHeight: 1.72, margin: 0 }}>
          Three focused tracks: C++ &amp; Data Structures/Algorithms, Cybersecurity (ethical hacking, network analysis, web-security testing), and Machine Learning (Python, pandas, scikit-learn).
        </p>
      </div>
    ),
  },
  {
    color: '#f97316',
    children: (
      <div>
        {dateChip('A++ Grade', 'var(--orange)', 'var(--orange-dim)', 'rgba(249,115,22,.2)')}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
          B.Tech, Chemical Engineering
        </h3>
        <p style={{ fontSize: '.94rem', color: 'var(--text-dim)', lineHeight: 1.72, margin: 0 }}>
          A systems-thinking foundation — process design, throughput analysis, and failure mode engineering — that carried directly into how I architect software for scale and reliability.
        </p>
      </div>
    ),
  },
]

export default function Experience() {
  const headRef = useReveal()
  const bodyRef = useReveal({ y: 20, delay: 0.15 })

  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <div ref={headRef}>
          <span className="section-eyebrow">Experience &amp; Education</span>
          <h2 className="section-title">How I got here</h2>
        </div>
        <div ref={bodyRef} style={{ maxWidth: 760 }}>
          <Timeline items={ITEMS} style={{ marginTop: 8 }} />
        </div>
      </div>
    </section>
  )
}
