import { useState, useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import QRCodeGenerator from './components/QRCodeGenerator'
import QRCard from './components/QRCard'
import HistorySidebar from './components/HistorySidebar'
import { Menu, X } from 'lucide-react'

function App() {
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [history, setHistory] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const cardRef = useRef(null)

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('qr_history')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Save history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('qr_history', JSON.stringify(history))
  }, [history])

  const handleSave = () => {
    if (!text.trim()) return

    const newCard = {
      id: Date.now(),
      value: text,
      title: title,
      timestamp: new Date().toISOString()
    }

    setHistory([newCard, ...history])
  }

  const handleDelete = (id) => {
    setHistory(history.filter(item => item.id !== id))
  }

  const handleLoad = (item) => {
    setText(item.value)
    setTitle(item.title || '')
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false)
    }
  }

  const handleDownload = async () => {
    if (!cardRef.current) return

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2 // Higher quality
      })

      const link = document.createElement('a')
      link.download = `${title || text || 'qrcode'}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Failed to download QR card:', err)
    }
  }

  return (
    <div className="app-container">
      <button
        className="btn-primary"
        style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 100, padding: '0.5rem' }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div style={{
        position: 'fixed',
        top: 0,
        right: isSidebarOpen ? 0 : '-320px',
        width: '300px',
        height: '100vh',
        transition: 'right 0.3s ease',
        zIndex: 90
      }}>
        <HistorySidebar history={history} onLoad={handleLoad} onDelete={handleDelete} />
      </div>

      <header style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '2rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Live QR Gen</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Create, Customize, and Save your QR Cards</p>
      </header>

      <main style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        width: '100%'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <QRCodeGenerator
            value={text}
            onChange={setText}
            title={title}
            onTitleChange={setTitle}
            onSave={handleSave}
            onDownload={handleDownload}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }} ref={cardRef}>
          <QRCard value={text} title={title} />
        </div>
      </main>
    </div>
  )
}

export default App
