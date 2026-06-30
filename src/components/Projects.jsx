import { useReveal, useStaggerReveal } from '../hooks/useReveal'

const PROJECTS = [
  {
    title: 'Rust Migration Framework',
    body: 'Open-source patterns for FastAPI → Axum migrations — async I/O, error handling, and DB pooling recipes.',
    tags: ['Rust', 'Axum', 'Open Source'],
    link: 'https://github.com/codetopolymath',
  },
  {
    title: 'LazyVim Config',
    body: 'Neovim setup tuned for polyglot work (Rust / Python / Go / JS) with LSP, DAP debugging, and Git integration.',
    tags: ['Neovim', 'Lua', 'DevTools'],
    link: 'https://github.com/codetopolymath',
  },
  {
    title: 'MEV Arbitrage Bots',
    body: 'Cosmos SDK trading systems for DEX arbitrage, with a backtesting framework for strategy validation.',
    tags: ['Go', 'Cosmos SDK', 'DeFi'],
    link: null,
  },
  {
    title: 'AI / ML Experiments',
    body: 'LangChain + vector DB document Q&A using RAG patterns. Exploring how LLMs plug into backend workflows.',
    tags: ['Python', 'LangChain', 'RAG'],
    link: null,
  },
]

export default function Projects() {
  const headRef = useReveal()
  const gridRef = useStaggerReveal('.proj-card', { stagger: 0.1 })

  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <div ref={headRef}>
          <span className="section-eyebrow">Side Projects &amp; Open Source</span>
          <h2 className="section-title">Experiments and weekend builds</h2>
          <p className="section-intro">
            Most production work lives in private repositories. These are the things I explore in my own time.
          </p>
        </div>

        <div ref={gridRef} className="proj-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {PROJECTS.map((p, i) => (
            <div key={i} className="proj-card" style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '22px 20px',
              display: 'flex', flexDirection: 'column', gap: 12,
              transition: 'border-color .2s, transform .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', margin: 0, flex: 1 }}>{p.title}</h3>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--muted)', fontSize: '.8rem', marginLeft: 8, flexShrink: 0 }}>↗</a>
                )}
              </div>
              <p style={{ fontSize: '.88rem', color: 'var(--text-dim)', lineHeight: 1.65, margin: 0, flex: 1 }}>{p.body}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'var(--orange)',
                    background: 'var(--orange-dim)', border: '1px solid rgba(249,115,22,.2)',
                    padding: '3px 8px', borderRadius: 6,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 24, color: 'var(--muted)', fontSize: '.9rem' }}>
          More on <a href="https://github.com/codetopolymath" target="_blank" rel="noopener noreferrer">GitHub →</a>
        </p>
      </div>
      <style>{`
        @media(max-width:900px){.proj-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:480px){.proj-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  )
}
