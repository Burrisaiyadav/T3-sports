import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Filter, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MOCK_TOURNAMENTS = [
  { id: 1, name: 'T3 Summer Cup 2024', sport: 'Football', date: 'Aug 15 - 20, 2024', location: 'Mumbai Arena', teams: 16, status: 'Registration Open', fee: '₹5,000/team', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop' }
];

export default function TournamentsPage() {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const filtered = filter === 'All' ? MOCK_TOURNAMENTS : MOCK_TOURNAMENTS.filter(t => t.sport === filter);

  return (
    <div style={{ minHeight: '100vh', background: '#F6F6F6', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, paddingTop: 120, paddingBottom: 80 }}>
        <div className="container-wide" style={{ padding: '0 24px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#111111', letterSpacing: '-0.02em' }}>
              Explore Tournaments
            </h1>
            <p style={{ color: '#555555', fontSize: 18, maxWidth: 600 }}>
              Discover local and national tournaments, register your team, and compete against the best.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 8 }}>
            {['All', 'Football', 'Basketball', 'Cricket', 'Volleyball'].map(f => (
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
            {filtered.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} onClick={() => navigate(`/tournaments/${t.id}`)}
                className="premium-card" style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                <div style={{ height: 200, background: '#E8E8E8', position: 'relative' }}>
                  <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 16, right: 16, background: '#FFFFFF', padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700, color: '#111111' }}>
                    {t.sport}
                  </div>
                </div>
                <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: t.status === 'Ongoing' ? '#EF4444' : t.status === 'Registration Open' ? '#22C55E' : '#B7FF2A' }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: t.status === 'Ongoing' ? '#EF4444' : '#111111' }}>{t.status}</span>
                  </div>
                  
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: '#111111', marginBottom: 16, letterSpacing: '-0.01em' }}>{t.name}</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555555', fontSize: 14 }}><Calendar size={16} /> {t.date}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555555', fontSize: 14 }}><MapPin size={16} /> {t.location}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555555', fontSize: 14 }}><Users size={16} /> {t.teams} Teams</div>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid #E8E8E8' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 12, color: '#888888', fontWeight: 500 }}>Entry Fee</span>
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#111111' }}>{t.fee}</span>
                    </div>
                    <button style={{ background: '#111111', color: '#FFFFFF', border: 'none', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
