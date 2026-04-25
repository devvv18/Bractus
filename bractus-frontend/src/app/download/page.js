export default function DownloadPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
    }}>
      <h1 style={{
        fontSize: 'clamp(3rem, 8vw, 6rem)',
        fontWeight: 300,
        color: 'var(--text)',
      }}>
        Download
      </h1>
    </div>
  )
}
