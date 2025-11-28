import React from 'react';
import { Clock, Trash2 } from 'lucide-react';

const HistorySidebar = ({ history, onLoad, onDelete }) => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Clock size={20} className="text-gradient" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>History</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
                {history.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontStyle: 'italic' }}>
                        No saved cards yet.
                    </p>
                ) : (
                    history.map((item) => (
                        <div key={item.id} style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                            onClick={() => onLoad(item)}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                        >
                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '150px' }}>
                                <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{item.value}</p>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                                    {new Date(item.timestamp).toLocaleDateString()}
                                </p>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HistorySidebar;
