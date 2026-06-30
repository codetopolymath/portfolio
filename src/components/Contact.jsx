import { Button } from 'antd'
import { useReveal, useStaggerReveal } from '../hooks/useReveal'

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5Z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V9.96H5.66v8.38h2.68ZM7 8.78a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Zm11.34 9.56v-4.6c0-2.46-1.31-3.6-3.06-3.6a2.64 2.64 0 0 0-2.4 1.32h-.03V9.96h-2.68v8.38h2.68v-4.15c0-1.1.2-2.16 1.56-2.16 1.34 0 1.36 1.25 1.36 2.23v4.08h2.61Z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>
  </svg>
)

const LINKS = [
  {
    href: 'mailto:code.to.polymath@gmail.com',
    label: 'code.to.polymath@gmail.com',
    sub: 'Fastest response',
    icon: <EmailIcon />,
    external: false,
  },
  {
    href: 'https://linkedin.com/in/99-rohit-ghawale',
    label: 'linkedin.com/in/99-rohit-ghawale',
    sub: 'Professional network',
    icon: <LinkedInIcon />,
    external: true,
  },
  {
    href: 'https://github.com/codetopolymath',
    label: 'github.com/codetopolymath',
    sub: 'Code &amp; projects',
    icon: <GitHubIcon />,
    external: true,
  },
]

export default function Contact() {
  const headRef = useReveal()
  const linksRef = useStaggerReveal('.contact-row', { stagger: 0.1, y: 16 })

  return (
    <section id="contact" className="section">
      <div className="container">
        <div ref={headRef} style={{ maxWidth: 600 }}>
          <span className="section-eyebrow">Let's Connect</span>
          <h2 className="section-title">Open to interesting conversations</h2>
          <p className="section-intro">
            Backend, performance, distributed systems, or a completely different track — I'm generally reachable and always up for a good technical discussion.
          </p>
          <a href="mailto:code.to.polymath@gmail.com" style={{ textDecoration: 'none' }}>
            <Button type="primary" size="large" style={{
              borderRadius: 12, fontWeight: 700, height: 50, paddingInline: 28,
              background: 'linear-gradient(100deg, var(--blue), #818cf8)',
              border: 'none', color: '#050c17', marginBottom: 44, display: 'inline-flex', alignItems: 'center',
            }}>
              Send me an email
            </Button>
          </a>
        </div>

        <div ref={linksRef} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="contact-row"
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: '16px 20px',
                color: 'var(--text-dim)', textDecoration: 'none',
                transition: 'border-color .15s, color .15s, transform .15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--blue)'
                e.currentTarget.style.color = 'var(--blue)'
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-dim)'
                e.currentTarget.style.transform = 'none'
              }}>
              <span style={{ color: 'var(--blue)', flexShrink: 0 }}>{l.icon}</span>
              <div>
                <div style={{ fontSize: '.95rem', fontWeight: 500 }}>{l.label}</div>
                <div style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: 2, fontFamily: 'var(--mono)' }} dangerouslySetInnerHTML={{ __html: l.sub }} />
              </div>
              {l.external && <span style={{ marginLeft: 'auto', fontSize: '1rem', opacity: .4 }}>↗</span>}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
