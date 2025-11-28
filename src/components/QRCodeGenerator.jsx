import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2 } from 'lucide-react';

const QRCodeGenerator = ({ value, onChange, title, onTitleChange, onSave, onDownload }) => {
    return (
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="text-gradient" style={{ fontSize: '1.5rem' }}>Generator</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Enter card title..."
                    style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid var(--glass-border)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        color: 'white',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Content</label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter text or URL..."
                    style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid var(--glass-border)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        color: 'white',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-primary" onClick={onSave} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Share2 size={18} />
                    Save Card
                </button>
                <button className="btn-primary" onClick={onDownload} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                    <Download size={18} />
                    Download
                </button>
            </div>
        </div>
    );
};

export default QRCodeGenerator;
