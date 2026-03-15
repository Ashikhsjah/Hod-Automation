"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Mic, MicOff, Send, X, Bot, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export default function ERPAssistant() {
    const { user } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [recognition, setRecognition] = useState<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Only render on client to prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
        setMessages([{ id: '1', text: `Hello ${user?.name || 'there'}! I'm your ERP Assistant. Say or type a command like "Go to Academics".`, sender: 'bot', timestamp: new Date() }]);

        // Initialize Speech Recognition
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.interimResults = false;
            rec.lang = 'en-US';
            rec.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                addMessage(transcript, 'user');
                processCommand(transcript.toLowerCase());
                setIsListening(false);
            };
            rec.onerror = () => setIsListening(false);
            rec.onend = () => setIsListening(false);
            setRecognition(rec);
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const addMessage = (text: string, sender: 'user' | 'bot') => {
        setMessages(prev => [...prev, {
            id: Date.now().toString() + Math.random(),
            text,
            sender,
            timestamp: new Date()
        }]);
    };

    const processCommand = (rawText: string) => {
        const role = user?.role || 'faculty';

        // Strip common navigation prefixes before keyword matching
        const prefixes = ['navigate to ', 'go to ', 'open ', 'show ', 'take me to ', 'load '];
        let text = rawText.toLowerCase().replace(/ page$/, '').trim();
        for (const prefix of prefixes) {
            if (text.startsWith(prefix)) {
                text = text.slice(prefix.length).trim();
                break;
            }
        }

        // Full command map — HOD + Faculty routes
        // IMPORTANT: More specific entries must come BEFORE broader ones
        const commands = [
            // ── HOD-specific ─────────────────────────────────────────────
            {
                keywords: ['requests', 'request', 'approval', 'approvals', 'pending approval'],
                path: role === 'hod' ? '/dashboard/hod/requests' : '/dashboard/faculty/requests',
                label: 'Requests Page'
            },
            {
                keywords: ['faculty', 'faculty list', 'faculty page', 'teachers'],
                path: '/dashboard/hod/faculty',
                label: 'Faculty Page',
                hodOnly: false
            },
            // ⚠️ student feedback MUST come before students
            {
                keywords: ['student feedback', 'student complaints', 'feedback', 'student review'],
                path: '/dashboard/hod/student-complaints',
                label: 'Student Feedback Page'
            },
            {
                keywords: ['students', 'student', 'student list'],
                path: '/dashboard/hod/students',
                label: 'Students Page'
            },
            {
                keywords: ['publications', 'publication', 'papers published', 'research papers'],
                path: '/dashboard/hod/publications',
                label: 'Publications Page'
            },
            {
                keywords: ['r and d', 'r&d', 'research performance', 'r&d performance', 'research and development'],
                path: '/dashboard/hod/performance',
                label: 'R&D Performance Page'
            },
            {
                keywords: ['staff performance', 'staff', 'performance'],
                path: '/dashboard/hod/staff-performance',
                label: 'Staff Performance Page'
            },
            // ── Shared ────────────────────────────────────────────────────
            {
                keywords: ['academics', 'academic'],
                path: role === 'hod' ? '/dashboard/academics' : '/dashboard/faculty/academics',
                label: 'Academics Page'
            },
            {
                keywords: ['complaints', 'complaint', 'grievance', 'grievances'],
                path: role === 'hod' ? '/dashboard/hod/complaints' : '/dashboard/faculty/complaint',
                label: 'Complaints Page'
            },
            {
                keywords: ['reports', 'report'],
                path: role === 'hod' ? '/dashboard/hod/reports' : '/dashboard/faculty/reports',
                label: 'Reports Page'
            },
            {
                keywords: ['circulars', 'circular', 'notices', 'notice', 'announcements'],
                path: role === 'hod' ? '/dashboard/hod/circulars' : '/dashboard/faculty/circulars',
                label: 'Circulars Page'
            },
            {
                keywords: ['profile', 'my profile', 'account', 'my account'],
                path: '/dashboard/faculty/profile',
                label: 'Profile Page'
            },
            {
                keywords: ['dashboard', 'home', 'overview', 'main', 'start'],
                path: role === 'hod' ? '/dashboard/hod' : '/dashboard/faculty',
                label: 'Dashboard Overview'
            },
        ];

        let matchedCmd = null;
        for (const cmd of commands) {
            if (cmd.keywords.some(k => text.includes(k))) {
                matchedCmd = cmd;
                break;
            }
        }

        if (matchedCmd) {
            const responseText = `✅ Opening ${matchedCmd.label}...`;
            setTimeout(() => {
                addMessage(responseText, 'bot');
                setTimeout(() => {
                    router.push(matchedCmd!.path);
                    setIsOpen(false);
                }, 900);
            }, 400);
        } else {
            setTimeout(() => {
                addMessage("❓ I didn't understand that. Try saying 'Go to Academics', 'Open Complaints', or 'Show Reports'.", 'bot');
            }, 400);
        }
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const text = inputValue.trim();
        setInputValue('');
        addMessage(text, 'user');
        processCommand(text.toLowerCase());
    };

    const handleMic = () => {
        if (!recognition) {
            addMessage("⚠️ Voice recognition is not supported in this browser. Please try Chrome.", 'bot');
            return;
        }
        if (isListening) {
            recognition.stop();
            setIsListening(false);
        } else {
            setIsListening(true);
            recognition.start();
        }
    };

    // Don't render on server to prevent hydration issues
    if (!mounted) return null;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                fontFamily: 'inherit',
            }}
        >
            {/* Chat Panel */}
            {isOpen && (
                <div
                    style={{
                        marginBottom: '16px',
                        width: '380px',
                        height: '520px',
                        background: '#ffffff',
                        borderRadius: '20px',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.20)',
                        border: '1px solid #e5e7eb',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        animation: 'fadeSlideUp 0.25s ease-out',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '16px 20px',
                        background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexShrink: 0,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '50%',
                                background: 'rgba(255,255,255,0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Bot size={20} />
                            </div>
                            <div>
                                <p style={{ fontWeight: 700, fontSize: '14px', margin: 0 }}>ERP Assistant</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite' }} />
                                    <span style={{ fontSize: '10px', opacity: 0.8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Online</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                background: 'rgba(255,255,255,0.15)',
                                border: 'none',
                                borderRadius: '8px',
                                width: '32px', height: '32px',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white',
                            }}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '16px',
                            background: '#f8fafc',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        }}
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                }}
                            >
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '10px 14px',
                                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                    background: msg.sender === 'user' ? 'linear-gradient(135deg, #2563eb, #4f46e5)' : '#ffffff',
                                    color: msg.sender === 'user' ? 'white' : '#1e293b',
                                    fontSize: '13px',
                                    lineHeight: '1.5',
                                    boxShadow: msg.sender === 'bot' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                                    border: msg.sender === 'bot' ? '1px solid #e2e8f0' : 'none',
                                    fontWeight: 500,
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isListening && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <div style={{
                                    padding: '10px 16px',
                                    background: '#fee2e2',
                                    borderRadius: '18px 18px 18px 4px',
                                    border: '1px solid #fecaca',
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                }}>
                                    <Loader2 size={14} color="#ef4444" style={{ animation: 'spin 1s linear infinite' }} />
                                    <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 600, letterSpacing: '0.05em' }}>LISTENING...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Suggestions */}
                    <div style={{
                        padding: '8px 16px',
                        background: '#f1f5f9',
                        display: 'flex',
                        gap: '6px',
                        overflowX: 'auto',
                        flexShrink: 0,
                        borderTop: '1px solid #e2e8f0',
                    }}>
                        {['Academics', 'Complaints', 'Reports', 'Profile'].map((s) => (
                            <button
                                key={s}
                                onClick={() => { addMessage(s, 'user'); processCommand(s.toLowerCase()); }}
                                style={{
                                    padding: '4px 12px',
                                    background: 'white',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '20px',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    color: '#475569',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0,
                                }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div style={{
                        padding: '12px 16px',
                        background: 'white',
                        borderTop: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexShrink: 0,
                    }}>
                        <button
                            onClick={handleMic}
                            style={{
                                width: '40px', height: '40px',
                                borderRadius: '12px',
                                border: 'none',
                                background: isListening ? '#ef4444' : '#f1f5f9',
                                color: isListening ? 'white' : '#64748b',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                                transition: 'all 0.2s',
                            }}
                            title={isListening ? 'Stop Listening' : 'Start Voice Command'}
                        >
                            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                        </button>
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={isListening ? 'Listening...' : 'Type a command...'}
                            style={{
                                flex: 1,
                                height: '40px',
                                padding: '0 12px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                background: '#f8fafc',
                                fontSize: '13px',
                                outline: 'none',
                                color: '#1e293b',
                            }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            style={{
                                width: '40px', height: '40px',
                                borderRadius: '12px',
                                border: 'none',
                                background: inputValue.trim() ? 'linear-gradient(135deg, #2563eb, #4f46e5)' : '#f1f5f9',
                                color: inputValue.trim() ? 'white' : '#cbd5e1',
                                cursor: inputValue.trim() ? 'pointer' : 'default',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                                transition: 'all 0.2s',
                            }}
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* ── Floating Toggle Button ─────────────────────────────── */}
            <div style={{ position: 'relative' }}>

                {/* Tooltip — shown when closed */}
                {!isOpen && (
                    <div style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 12px)',
                        right: 0,
                        background: '#1e1b4b',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                        padding: '5px 11px',
                        borderRadius: '8px',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
                        pointerEvents: 'none',
                        animation: 'tooltipFade 0.2s ease-out',
                        opacity: 0,
                    }}
                    className="erp-tooltip"
                    >
                        Ask ERP Assistant
                        {/* Arrow */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-5px',
                            right: '20px',
                            width: '10px',
                            height: '10px',
                            background: '#1e1b4b',
                            transform: 'rotate(45deg)',
                            borderRadius: '2px',
                        }} />
                    </div>
                )}

                {/* Outer glow ring */}
                {!isOpen && (
                    <div style={{
                        position: 'absolute',
                        inset: '-6px',
                        borderRadius: '50%',
                        background: 'conic-gradient(from 0deg, #4f46e5, #8b5cf6, #6366f1, #4f46e5)',
                        opacity: 0.35,
                        animation: 'glowSpin 3s linear infinite',
                        filter: 'blur(4px)',
                        zIndex: -1,
                    }} />
                )}

                {/* Main Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="erp-fab"
                    style={{
                        width: '62px',
                        height: '62px',
                        borderRadius: '50%',
                        border: 'none',
                        background: isOpen
                            ? 'linear-gradient(135deg, #1e1b4b, #312e81)'
                            : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #8b5cf6 100%)',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isOpen
                            ? '0 8px 24px rgba(30,27,75,0.5)'
                            : '0 8px 30px rgba(99,102,241,0.55), 0 0 0 0 rgba(99,102,241,0.4)',
                        position: 'relative',
                        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                        animation: isOpen ? 'none' : 'floatBob 3s ease-in-out infinite',
                    }}
                    aria-label="Toggle ERP Assistant"
                >
                    {/* AI Spark/Robot Icon */}
                    {isOpen ? (
                        <X size={26} strokeWidth={2.5} />
                    ) : (
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Robot head */}
                            <rect x="7" y="9" width="14" height="11" rx="3" fill="white" fillOpacity="0.95"/>
                            {/* Eyes */}
                            <circle cx="11" cy="14" r="1.5" fill="#6366f1"/>
                            <circle cx="17" cy="14" r="1.5" fill="#6366f1"/>
                            {/* Mouth */}
                            <rect x="10.5" y="17" width="7" height="1.5" rx="0.75" fill="#6366f1" fillOpacity="0.7"/>
                            {/* Antenna */}
                            <line x1="14" y1="9" x2="14" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <circle cx="14" cy="5" r="1.5" fill="white"/>
                            {/* Ears */}
                            <rect x="4.5" y="12" width="2.5" height="5" rx="1.25" fill="white" fillOpacity="0.8"/>
                            <rect x="21" y="12" width="2.5" height="5" rx="1.25" fill="white" fillOpacity="0.8"/>
                            {/* Spark top-right */}
                            <path d="M22 4L22.8 6.2L25 7L22.8 7.8L22 10L21.2 7.8L19 7L21.2 6.2Z" fill="white" fillOpacity="0.9"/>
                        </svg>
                    )}

                    {/* Notification Badge */}
                    {!isOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '-3px',
                            right: '-3px',
                            width: '19px',
                            height: '19px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ef4444, #f97316)',
                            border: '2.5px solid white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '9px',
                            fontWeight: 800,
                            color: 'white',
                            boxShadow: '0 2px 6px rgba(239,68,68,0.5)',
                        }}>
                            1
                        </div>
                    )}
                </button>
            </div>

            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(12px) scale(0.95); }
                    to   { opacity: 1; transform: translateY(0)   scale(1);    }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0.4; }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                /* Gentle up-down float */
                @keyframes floatBob {
                    0%, 100% { transform: translateY(0);   }
                    50%      { transform: translateY(-6px); }
                }
                /* Spinning glow ring */
                @keyframes glowSpin {
                    to { transform: rotate(360deg); }
                }
                /* Tooltip fade-in */
                @keyframes tooltipFade {
                    from { opacity: 0; transform: translateY(4px); }
                    to   { opacity: 1; transform: translateY(0);   }
                }
                /* Scale up on hover */
                .erp-fab:hover {
                    transform: scale(1.12) !important;
                    box-shadow: 0 12px 40px rgba(99,102,241,0.65), 0 0 0 6px rgba(99,102,241,0.15) !important;
                    animation: none !important;
                }
                /* Show tooltip on hover */
                .erp-fab:hover ~ * .erp-tooltip,
                div:hover > .erp-tooltip {
                    opacity: 1 !important;
                    animation: tooltipFade 0.2s ease-out forwards !important;
                }
                /* Hover sibling tooltip reveal */
                .erp-fab:hover + .erp-tooltip {
                    opacity: 1 !important;
                }
            `}</style>
        </div>
    );
}
