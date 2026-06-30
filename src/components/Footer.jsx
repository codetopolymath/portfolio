export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '28px 0',
      background: 'var(--bg-alt)',
    }}>
      <div className="container" style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 12,
      }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--muted)', margin: 0 }}>
          &copy; {new Date().getFullYear()} Rohit Ghawale
        </p>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--muted)', margin: 0 }}>
          <span style={{ color: 'var(--blue)' }}>code</span>.to.<span style={{ color: 'var(--orange)' }}>polymath</span>
        </p>
      </div>
    </footer>
  )
}
