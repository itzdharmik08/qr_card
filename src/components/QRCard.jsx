import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCard = ({ value, title, timestamp }) => {
    const date = timestamp ? new Date(timestamp).toLocaleDateString() : new Date().toLocaleDateString();

    return (
        <div className="glass-panel" style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
            border: '1px solid rgba(255, 255, 255, 0.15)'
        }}>
            <div style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '1rem',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
            }}>
                <QRCodeSVG
                    value={value || "https://example.com"}
                    size={200}
                    level="H"
                    includeMargin={false}
                />
            </div>

            <div style={{ textAlign: 'center', width: '100%' }}>
                <p style={{
                    color: 'var(--text-primary)',
                    fontWeight: '700',
                    fontSize: '1.5rem',
                    marginBottom: '0.25rem',
                    wordBreak: 'break-all'
                }}>
                    {title || "Card Title"}
                </p>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontWeight: '500',
                    fontSize: '1rem',
                    marginBottom: '0.5rem',
                    wordBreak: 'break-all'
                }}>
                    {value || "https://example.com"}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    Created: {date}
                </p>
            </div>
        </div>
    );
};

export default QRCard;
