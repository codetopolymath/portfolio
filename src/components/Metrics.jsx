import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const METRICS = [
  { value: 150, suffix: 'K', label: 'TPS sustained', color: 'var(--orange)' },
  { value: 10, suffix: 'M+', label: 'daily transactions', color: 'var(--orange)' },
  { value: 99.9, suffix: '%', decimals: 1, label: 'uptime', color: 'var(--green)' },
  { value: 10, prefix: '~', suffix: '×', label: 'latency cut (Rust)', color: 'var(--blue)' },
  { value: 40, suffix: '%', label: 'lower infra cost', color: 'var(--blue)' },
  { value: 1, suffix: 'B+', label: 'records, sub-sec query', color: 'var(--orange)' },
]

export default function Metrics() {
  const stripRef = useRef(null)

  useEffect(() => {
    if (!stripRef.current) return
    const nums = stripRef.current.querySelectorAll('[data-count]')
    const ctx = gsap.context(() => {
      nums.forEach(el => {
        const target = parseFloat(el.dataset.count)
        const decimals = parseInt(el.dataset.decimals || '0')
        const prefix = el.dataset.prefix || ''
        const suffix = el.dataset.suffix || ''
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = prefix + obj.v.toFixed(decimals) + suffix },
          onComplete: () => { el.textContent = prefix + target.toFixed(decimals) + suffix },
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    }, stripRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="metrics" aria-label="Impact metrics" ref={stripRef} style={{
      position: 'relative', background: 'var(--bg-alt)',
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      padding: '44px 0', overflow: 'hidden',
    }}>
      <div className="bp-grid" style={{ opacity: .5 }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="metrics-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '24px 16px', textAlign: 'center',
        }}>
          {METRICS.map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span
                data-count={m.value}
                data-decimals={m.decimals || undefined}
                data-prefix={m.prefix || undefined}
                data-suffix={m.suffix}
                style={{
                  fontFamily: 'var(--mono)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 700, color: m.color, lineHeight: 1.1,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                {m.prefix || ''}{m.value.toFixed(m.decimals || 0)}{m.suffix}
              </span>
              <span style={{ fontSize: '.78rem', color: 'var(--text-dim)', letterSpacing: '.02em' }}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.metrics-grid{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:540px){.metrics-grid{grid-template-columns:repeat(2,1fr)!important;}}
      `}</style>
    </section>
  )
}
