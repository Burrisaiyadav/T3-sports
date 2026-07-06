import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ChevronRight, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_TOURNAMENT = {
  id: 1, 
  name: 'T3 Summer Cup 2024', 
  sport: 'Football', 
  date: 'Aug 15 - 20, 2024', 
  location: 'Mumbai Arena', 
  teams: 16, 
  status: 'Registration Open', 
  fee: '₹5,000/team', 
  image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop'
};

export default function DashTournaments() {
  const t = MOCK_TOURNAMENT;
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.stopPropagation();
    navigate(`/tournaments/${t.id}`);
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: 64 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 700, color: '#111111', letterSpacing: '-0.02em' }}>
          Tournaments
        </h1>
        <p style={{ color: '#555555', fontSize: 16, maxWidth: 600, lineHeight: 1.6 }}>
          Manage your tournament registrations and discover upcoming events near you.
        </p>
      </div>

      <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: '#111111', marginBottom: 24 }}>Featured Event</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onClick={() => navigate(`/tournaments/${t.id}`)}
          className="premium-card" style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, cursor: 'pointer' }}>
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
              <button 
                onClick={handleRegister}
                style={{ 
                  background: '#111111', 
                  color: '#FFFFFF', 
                  border: 'none', padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, 
                  display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                  transition: 'background 0.3s'
                }}>
                View Details <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
