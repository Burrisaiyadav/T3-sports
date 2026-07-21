import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, ChevronRight, Layers, LayoutGrid, Zap, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SportsEventBundle, { MOCK_SPORTS_EVENTS } from '../components/SportsEventBundle';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function TournamentsPage() {
  const [viewMode, setViewMode] = useState('bundle'); // 'bundle' | 'grid'
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const bundleRef = useRef(null);
  
  const { user, profile, registerTournament } = useAuthStore();
  const registeredEvents = profile?.tournamentHistory || [];

  // Automatically focus/scroll directly to the event bundle stack when opening tournaments page
  useEffect(() => {
    if (bundleRef.current) {
      const timer = setTimeout(() => {
        bundleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleGridRegister = async (t) => {
    if (!user) {
      toast('Please login to register for events', { icon: '🔐' });
      navigate('/login');
      return;
    }
    try {
      await registerTournament(t);
      toast.success(`Registered for ${t.name}! 🏆`, {
        icon: '🎉',
        style: { background: '#111111', color: '#B7FF2A', borderRadius: '12px' }
      });
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    }
  };

  const filtered = filter === 'All' ? MOCK_SPORTS_EVENTS : MOCK_SPORTS_EVENTS.filter(t => t.sport === filter);

  return (
    <div style={{ minHeight: '100vh', background: '#F6F6F6', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, paddingTop: 90, paddingBottom: 80 }}>
        <div className="container-wide" style={{ padding: '0 20px' }}>
          
          {/* Header section with View Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 28 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ background: '#B7FF2A', color: '#111111', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100 }}>
                  EXPLORE EVENTS
                </span>
              </div>
              <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: 700, color: '#111111', letterSpacing: '-0.02em', marginBottom: 6 }}>
                Explore Sports & Tournaments
              </h1>
              <p style={{ color: '#555555', fontSize: 15, maxWidth: 580, lineHeight: 1.5 }}>
                Swipe through tournament bundles like a dating app to quickly register for events across India!
              </p>
            </div>

            {/* View Mode Toggle: Swipe Bundle vs Grid */}
            <div style={{ background: '#FFFFFF', padding: 5, borderRadius: 100, border: '1px solid #E8E8E8', display: 'inline-flex', gap: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
              <button
                onClick={() => setViewMode('bundle')}
                style={{
                  background: viewMode === 'bundle' ? '#111111' : 'transparent',
                  color: viewMode === 'bundle' ? '#FFFFFF' : '#555555',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.2s'
                }}
              >
                <Layers size={16} color={viewMode === 'bundle' ? '#B7FF2A' : '#555555'} /> Swipe Bundle
              </button>

              <button
                onClick={() => setViewMode('grid')}
                style={{
                  background: viewMode === 'grid' ? '#111111' : 'transparent',
                  color: viewMode === 'grid' ? '#FFFFFF' : '#555555',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.2s'
                }}
              >
                <LayoutGrid size={16} /> Grid View
              </button>
            </div>
          </div>

          {/* VIEW CONTENT TARGET REF FOR AUTO SCROLL DIRECTLY TO BUNDLE */}
          <div ref={bundleRef} style={{ scrollMarginTop: 90 }}>
            {viewMode === 'bundle' ? (
              /* DATING APP STYLE BUNDLE STACK SECTION */
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
                  boxShadow: '0 12px 36px rgba(0,0,0,0.05)'
                }}
              >
                <SportsEventBundle />
              </motion.div>
            ) : (
              /* STANDARD GRID VIEW WITH DIRECT REGISTER BUTTONS */
              <div>
                {/* Category Filter Pills for Grid */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 8 }}>
                  {['All', 'Cricket', 'Football', 'Basketball', 'Tennis', 'Badminton', 'Volleyball', 'Esports', 'Athletics'].map(f => (
                    <button 
                      key={f} 
                      onClick={() => setFilter(f)}
                      style={{
                        background: filter === f ? '#111111' : '#FFFFFF',
                        color: filter === f ? '#FFFFFF' : '#111111',
                        border: filter === f ? '1px solid #111111' : '1px solid #E8E8E8',
                        padding: '8px 20px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                        whiteSpace: 'nowrap', transition: 'all 0.2s'
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
                  {filtered.map((t, i) => {
                    const isRegistered = registeredEvents.some(r => r.id === t.id);
                    return (
                      <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="premium-card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: 200, background: '#E8E8E8', position: 'relative' }}>
                          <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', top: 16, right: 16, background: '#FFFFFF', padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700, color: '#111111' }}>
                            {t.sportIcon} {t.sport}
                          </div>
                        </div>
                        <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: t.badgeColor || '#22C55E' }}>{t.status}</span>
                          </div>
                          
                          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: '#111111', marginBottom: 16, letterSpacing: '-0.01em' }}>{t.name}</h3>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555555', fontSize: 14 }}><Calendar size={16} /> {t.date}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555555', fontSize: 14 }}><MapPin size={16} /> {t.location}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555555', fontSize: 14 }}><Users size={16} /> {t.registeredCount} / {t.maxTeams} Teams</div>
                          </div>

                          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid #E8E8E8' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontSize: 12, color: '#888888', fontWeight: 500 }}>Entry Fee</span>
                              <span style={{ fontSize: 16, fontWeight: 700, color: '#111111' }}>{t.fee}</span>
                            </div>

                            {/* CONVERTED TO DIRECT REGISTER BUTTON */}
                            <button 
                              onClick={() => handleGridRegister(t)}
                              disabled={isRegistered}
                              className={isRegistered ? "btn-secondary" : "btn-accent"}
                              style={{ 
                                padding: '10px 20px', 
                                fontSize: 13, 
                                borderRadius: 100, 
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                cursor: isRegistered ? 'default' : 'pointer'
                              }}
                            >
                              {isRegistered ? (
                                <>
                                  <CheckCircle2 size={15} color="#22C55E" /> Registered
                                </>
                              ) : (
                                <>
                                  <Zap size={15} fill="#111111" /> Register
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
