import { useReveal } from '../hooks/useReveal'

export default function ModelShowcase() {
  const ref = useReveal()

  return (
    <section id="model" className="section section-alt">
      <div className="container" ref={ref}>
        <span className="section-eyebrow">Real-Time Rendering</span>
        <h2 className="section-title">The same eye for performance, applied to pixels</h2>
        <p className="section-intro">
          A GPU-rendered asset, running live in this page — not a screenshot. Drag to rotate, scroll to zoom.
        </p>

        <div style={{
          position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden',
          border: '1px solid var(--border-lit)', background: 'var(--surface)',
          boxShadow: '0 0 0 1px rgba(56,189,248,.1), var(--shadow)',
        }}>
          <div className="bp-grid" style={{ opacity: .5 }} />
          <model-viewer
            src="/portfolio/models/damaged-helmet.glb"
            alt="A damaged futuristic combat helmet, glTF sample model"
            camera-controls
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="18deg"
            interaction-prompt="none"
            shadow-intensity="1"
            exposure="1.05"
            environment-image="neutral"
            style={{
              width: '100%', height: '480px', position: 'relative', zIndex: 1,
              '--poster-color': 'transparent',
            }}
          />
          <span style={{
            position: 'absolute', top: 16, left: 16, zIndex: 2,
            fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--text-dim)',
            letterSpacing: '.1em', textTransform: 'uppercase',
          }}>
            glTF · DamagedHelmet.glb
          </span>
        </div>

        <p style={{
          marginTop: 16, fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--muted)',
        }}>
          Model: "Damaged Helmet" by ctxwing (CC BY 4.0)
        </p>
      </div>
    </section>
  )
}
