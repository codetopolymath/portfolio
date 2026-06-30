import { useEffect, useState } from 'react'
import { Button } from 'antd'

const NAV_LINKS = [
  { href: '#work', label: 'What I Do' },
  { href: '#notable', label: 'Work' },
  { href: '#stack', label: 'Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#polymath', label: 'Polymath' },
  { href: '#experience', label: 'Experience' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href)).filter(Boolean)
    if (!sections.length) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(5,12,23,.92)' : 'rgba(5,12,23,.65)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      transition: 'background .25s',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <a href="#top" aria-label="Home" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          color: 'var(--text)', fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
        }}>
          <span style={{ fontFamily: 'var(--mono)', color: 'var(--blue)', fontWeight: 700 }}>&lt;/&gt;</span>
          <span>Rohit Ghawale</span>
        </a>

        <nav aria-label="Primary" className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
              style={{
                padding: '6px 13px', borderRadius: 7,
                fontSize: '.88rem', fontWeight: 500, textDecoration: 'none',
                color: active === l.href ? 'var(--blue)' : 'var(--text-dim)',
                background: active === l.href ? 'var(--blue-dim)' : 'transparent',
                transition: 'color .15s, background .15s',
              }}
              onMouseEnter={e => {
                if (active !== l.href) {
                  e.currentTarget.style.color = 'var(--text)'
                  e.currentTarget.style.background = 'rgba(255,255,255,.04)'
                }
              }}
              onMouseLeave={e => {
                if (active !== l.href) {
                  e.currentTarget.style.color = 'var(--text-dim)'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >{l.label}</a>
          ))}
          <a href="#contact" style={{ marginLeft: 8, textDecoration: 'none' }}>
            <Button size="small" ghost style={{ borderRadius: 8, fontWeight: 600, borderColor: 'var(--blue)', color: 'var(--blue)' }}>
              Let's Talk
            </Button>
          </a>
        </nav>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
        >
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text)', borderRadius: 2, marginBottom: 5 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text)', borderRadius: 2, marginBottom: 5 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text)', borderRadius: 2 }} />
        </button>
      </div>

      {open && (
        <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '12px 0' }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '13px 28px', color: 'var(--text-dim)', fontSize: '.95rem', textDecoration: 'none' }}>
              {l.label}
            </a>
          ))}
          <div style={{ padding: '12px 28px' }}>
            <a href="#contact" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
              <Button block ghost style={{ borderColor: 'var(--blue)', color: 'var(--blue)' }}>Let's Talk</Button>
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .nav-toggle { display: block !important; }
        }
      `}</style>
    </header>
  )
}
