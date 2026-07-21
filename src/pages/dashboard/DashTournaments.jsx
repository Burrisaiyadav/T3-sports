import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ChevronRight, CheckCircle2, Trophy, Sparkles, Layers } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import SportsEventBundle from '../../components/SportsEventBundle';

export default function DashTournaments() {
  const [activeTab, setActiveTab] = useState('bundle'); // 'bundle' | 'my_events'
  const { profile } = useAuthStore();
  const navigate = useNavigate();
  const registeredEvents = profile?.tournamentHistory || [];
  const bundleRef = useRef(null);

  // Automatically scroll and redirect focus directly to the bundle section on open
  useEffect(() => {
    if (bundleRef.current) {
      const timer = setTimeout(() => {
        bundleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', paddingBottom: 64 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 22 }}>🏆</span>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 700, color: '#111111', letterSpacing: '-0.02em' }}>
              Explore Tournaments & Events
            </h1>
          </div>
          <p style={{ color: '#555555', fontSize: 15, maxWidth: 600, lineHeight: 1.5 }}>
            Swipe through tournament bundles like a dating app to discover and register for sports events.
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{ background: '#FFFFFF', padding: 5, borderRadius: 100, border: '1px solid #E8E8E8', display: 'inline-flex', gap: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <button
            onClick={() => setActiveTab('bundle')}
            style={{
              background: activeTab === 'bundle' ? '#111111' : 'transparent',
              color: activeTab === 'bundle' ? '#FFFFFF' : '#555555',
              border: 'none',
              padding: '8px 18px',
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s'
            }}
          >
            <Layers size={15} color={activeTab === 'bundle' ? '#B7FF2A' : '#555555'} /> Event Bundle
          </button>

          <button
            onClick={() => setActiveTab('my_events')}
            style={{
              background: activeTab === 'my_events' ? '#111111' : 'transparent',
              color: activeTab === 'my_events' ? '#FFFFFF' : '#555555',
              border: 'none',
              padding: '8px 18px',
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s'
            }}
          >
            <CheckCircle2 size={15} color={activeTab === 'my_events' ? '#22C55E' : '#555555'} /> My Registrations ({registeredEvents.length})
          </button>
        </div>
      </div>

      {/* TARGET REF FOR AUTO SCROLLING DIRECTLY TO BUNDLE */}
      <div ref={bundleRef} style={{ scrollMarginTop: 80 }}>
        {activeTab === 'bundle' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#FFFFFF',
              borderRadius: 28,
              border: '1px solid #E8E8E8',
              padding: '28px 16px',
              maxWidth: 560,
              margin: '0 auto',
              boxShadow: '0 12px 36px rgba(0,0,0,0.04)'
            }}
          >
            <SportsEventBundle />
          </motion.div>
        )}

        {activeTab === 'my_events' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            {registeredEvents.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                {registeredEvents.map((evt, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="premium-card"
                    style={{ background: '#FFFFFF', padding: 24, borderRadius: 20 }}
                  >
                    <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                      <img src={evt.image} alt={evt.name} style={{ width: 64, height: 64, borderRadius: 14, objectFit: 'cover' }} />
                      <div>
                        <span style={{ background: '#F0FDF4', color: '#22C55E', fontSize: 12, fontWeight: 700, padding: '2px 10px', borderRadius: 100 }}>
                          ✓ CONFIRMED
                        </span>
                        <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16, color: '#111111', marginTop: 4 }}>
                          {evt.name}
                        </h4>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: '#555555', marginBottom: 16, background: '#F6F6F6', padding: 12, borderRadius: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Calendar size={14} color="#111111" /> {evt.date}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <MapPin size={14} color="#111111" /> {evt.location}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 12, borderTop: '1px solid #E8E8E8' }}>
                      <span style={{ fontSize: 13, color: '#888888' }}>{evt.sport}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>{evt.fee}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', borderRadius: 24, padding: 40, textAlign: 'center' }}>
                <Sparkles size={36} color="#888888" style={{ marginBottom: 12 }} />
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: '#111111', marginBottom: 6 }}>No Registrations Yet</h3>
                <p style={{ color: '#666666', fontSize: 14, marginBottom: 20 }}>Swipe right on event cards in the bundle stack to register instantly!</p>
                <button onClick={() => setActiveTab('bundle')} className="btn-accent" style={{ padding: '12px 28px', fontSize: 14 }}>
                  Open Event Bundle →
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

    </div>
  );
}
