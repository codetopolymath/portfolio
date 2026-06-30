import { useEffect, useRef } from 'react'
import { Button } from 'antd'
import { gsap } from 'gsap'

const LANGS = ['Rust', 'Python', 'Go', 'Java', 'JavaScript']

export default function Hero() {
  const canvasRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const nodes = []
    const NODE_COUNT = 28
    const THRESHOLD = 190

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.8 + 1,
        pulse: Math.random(),
      })
    }

    const ticker = gsap.ticker.add(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
        n.pulse = (n.pulse + 0.008) % 1
      })
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < THRESHOLD) {
            const a = (1 - d / THRESHOLD) * 0.18
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(56,189,248,${a})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      nodes.forEach(n => {
        const pulse = Math.sin(n.pulse * Math.PI * 2) * 0.3 + 0.5
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56,189,248,${pulse * 0.55})`
        ctx.fill()
      })
    })

    return () => {
      gsap.ticker.remove(ticker)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    if (!textRef.current) return
    const ctx = gsap.context(() => {
      gsap.set(['.hero-eyebrow', '.hero-h1', '.hero-lede', '.hero-status', '.hero-cta-row', '.hero-chips'], { opacity: 0, y: 22 })
      gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 })
        .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.55 })
        .to('.hero-h1', { opacity: 1, y: 0, duration: 0.7 }, '-=0.25')
        .to('.hero-lede', { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
        .to('.hero-status', { opacity: 1, y: 0, duration: 0.5 }, '-=0.25')
        .to('.hero-cta-row', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .to('.hero-chips', { opacity: 1, y: 0, duration: 0.45 }, '-=0.15')
    }, textRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" style={{
      position: 'relative', minHeight: '92vh',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden', padding: '80px 0 60px',
    }}>
      <canvas ref={canvasRef} aria-hidden="true" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, opacity: .85,
      }} />
      <div className="bp-grid" />

      <div className="container" ref={textRef} style={{
        position: 'relative', zIndex: 2,
        display: 'grid', gridTemplateColumns: '1fr auto',
        gap: '48px', alignItems: 'center',
      }}>
        <div style={{ maxWidth: 640 }}>
          <p className="hero-eyebrow" style={{
            fontFamily: 'var(--mono)', color: 'var(--blue)', fontSize: '.82rem',
            letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 20,
          }}>
            // Backend Lead · Distributed &amp; High-Performance Systems
          </p>
          <h1 className="hero-h1" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', fontWeight: 900,
            lineHeight: 1.06, letterSpacing: '-2px', marginBottom: 24,
          }}>
            I build systems where{' '}
            <span style={{
              background: 'linear-gradient(100deg, var(--blue), #818cf8 55%, var(--orange))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>
              milliseconds matter.
            </span>
          </h1>
          <p className="hero-lede" style={{
            fontSize: '1.12rem', color: 'var(--text-dim)',
            lineHeight: 1.75, marginBottom: 24, maxWidth: 580,
          }}>
            High-throughput, low-latency platforms for mission-critical telecom and distributed systems.
            I came to software from{' '}
            <strong style={{ color: 'var(--text)' }}>Chemical Engineering</strong>{' '}
            — that process-design mindset shapes how I architect for scale and reliability.
          </p>

          <div className="hero-status" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 999, padding: '8px 18px', marginBottom: 28,
            fontSize: '.88rem', color: 'var(--text-dim)',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: 'var(--green)',
              boxShadow: '0 0 0 3px rgba(74,222,128,.2)', display: 'inline-block', flexShrink: 0,
              animation: 'statusPulse 2.2s infinite',
            }} />
            Currently building at <strong style={{ color: 'var(--text)', marginLeft: 4 }}>Pinnacle Teleservices</strong> · Nagpur
          </div>

          <div className="hero-cta-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
            <a href="mailto:code.to.polymath@gmail.com" style={{ textDecoration: 'none' }}>
              <Button type="primary" size="large" style={{
                borderRadius: 11, fontWeight: 700, height: 46, paddingInline: 24,
                background: 'linear-gradient(100deg, var(--blue), #818cf8)', border: 'none', color: '#050c17',
              }}>
                Email me
              </Button>
            </a>
            <a href="/portfolio/images/resume.pdf" download="Rohit_Ghawale_Resume.pdf" style={{ textDecoration: 'none' }}>
              <Button size="large" style={{
                borderRadius: 11, fontWeight: 600, height: 46, paddingInline: 22,
                background: 'var(--surface)', borderColor: 'var(--border-lit)', color: 'var(--text)',
              }}>
                Download résumé
              </Button>
            </a>
            <a href="https://github.com/codetopolymath" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Button size="large" style={{
                borderRadius: 11, fontWeight: 600, height: 46, paddingInline: 22,
                background: 'transparent', borderColor: 'var(--border)', color: 'var(--text-dim)',
              }}>
                GitHub
              </Button>
            </a>
          </div>

          <ul className="hero-chips" style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {LANGS.map(l => (
              <li key={l} style={{
                fontFamily: 'var(--mono)', fontSize: '.8rem',
                background: 'var(--surface)', border: '1px solid var(--border)',
                padding: '5px 14px', borderRadius: 999, color: 'var(--text)',
              }}>
                {l}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-photo-wrap" style={{ flexShrink: 0 }}>
          <div style={{
            width: 280, height: 340, borderRadius: 20, overflow: 'hidden', position: 'relative',
            border: '1px solid var(--border-lit)',
            boxShadow: '0 0 0 1px rgba(56,189,248,.15), 0 32px 64px rgba(0,0,0,.6)',
          }}>
            <img src="/portfolio/profile.jpg" alt="Rohit Ghawale" style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top center',
              filter: 'grayscale(100%) brightness(0.8) contrast(1.1)',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(160deg, rgba(56,189,248,.12) 0%, rgba(129,140,248,.08) 50%, rgba(249,115,22,.06) 100%)',
              mixBlendMode: 'screen',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
              background: 'linear-gradient(transparent, rgba(5,12,23,.75))',
            }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, paddingLeft: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', opacity: .6 }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--muted)' }}>rohit.ghawale@pinnacle</span>
          </div>
        </div>
      </div>

      <a href="#metrics" aria-label="Scroll down" style={{
        position: 'absolute', left: '50%', bottom: 24, transform: 'translateX(-50%)', zIndex: 2,
        width: 24, height: 40, border: '2px solid var(--border-lit)', borderRadius: 12,
        display: 'flex', justifyContent: 'center', textDecoration: 'none',
      }}>
        <span style={{
          width: 3, height: 7, marginTop: 6, background: 'var(--blue)',
          borderRadius: 2, animation: 'scrolly 1.8s infinite',
        }} />
      </a>

      <style>{`
        @keyframes scrolly { 0% { opacity:0; transform:translateY(0); } 40% { opacity:1; } 80% { opacity:0; transform:translateY(10px); } 100% { opacity:0; } }
        @keyframes statusPulse { 0% { box-shadow:0 0 0 0 rgba(74,222,128,.5); } 70% { box-shadow:0 0 0 7px rgba(74,222,128,0); } 100% { box-shadow:0 0 0 0 rgba(74,222,128,0); } }
        @media (max-width: 768px) {
          .hero-photo-wrap { display: none !important; }
        }
        @media (max-width: 768px) {
          .container[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
