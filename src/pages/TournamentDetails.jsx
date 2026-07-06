import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Calendar, Users, ChevronRight, CheckCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const MOCK_TOURNAMENT = {
  id: 1, 
  name: 'T3 Summer Cup 2024', 
  sport: 'Football', 
  date: 'Aug 15 - 20, 2024', 
  location: 'Mumbai Arena, Andheri West', 
  teams: '16 Teams', 
  status: 'Registration Open', 
  fee: '₹5,000/team', 
  prize: '₹50,000',
  description: 'Join the most anticipated football tournament of the summer. The T3 Summer Cup brings together the best amateur teams across Mumbai for a 5-day football festival. Format is 7-a-side with knockout stages.',
  image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop'
};

export default function TournamentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const t = MOCK_TOURNAMENT;

  const handleRegister = () => {
    if (registered) return;
    toast.success(`Successfully registered for ${t.name}!`);
    setRegistered(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, maxWidth: 1000, margin: '0 auto', width: '100%', padding: '40px 24px 80px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, color: '#555555', cursor: 'pointer', marginBottom: 24, fontWeight: 500, padding: 0 }}>
          <ArrowLeft size={20} /> Back
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card" style={{ overflow: 'hidden', background: '#FFFFFF' }}>
          <div style={{ height: 400, position: 'relative' }}>
            <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 24, right: 24, background: '#FFFFFF', padding: '6px 16px', borderRadius: 100, fontSize: 14, fontWeight: 700, color: '#111111', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              {t.sport}
            </div>
          </div>
          
          <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#22C55E' }}>{t.status}</span>
            </div>
            
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 40, fontWeight: 700, color: '#111111', marginBottom: 24, letterSpacing: '-0.02em' }}>{t.name}</h1>
            
            <p style={{ color: '#555555', fontSize: 16, lineHeight: 1.6, marginBottom: 40 }}>{t.description}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 48, background: '#F6F6F6', padding: 24, borderRadius: 16 }}>
              <div>
                <span style={{ fontSize: 13, color: '#888888', fontWeight: 600, display: 'block', marginBottom: 8 }}>DATE</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#111111', fontWeight: 500 }}><Calendar size={18} /> {t.date}</div>
              </div>
              <div>
                <span style={{ fontSize: 13, color: '#888888', fontWeight: 600, display: 'block', marginBottom: 8 }}>LOCATION</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#111111', fontWeight: 500 }}><MapPin size={18} /> {t.location}</div>
              </div>
              <div>
                <span style={{ fontSize: 13, color: '#888888', fontWeight: 600, display: 'block', marginBottom: 8 }}>CAPACITY</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#111111', fontWeight: 500 }}><Users size={18} /> {t.teams}</div>
              </div>
              <div>
                <span style={{ fontSize: 13, color: '#888888', fontWeight: 600, display: 'block', marginBottom: 8 }}>PRIZE POOL</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#111111', fontWeight: 700, fontSize: 18 }}>{t.prize}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 32, borderTop: '1px solid #E8E8E8' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 14, color: '#888888', fontWeight: 500, marginBottom: 4 }}>Registration Fee</span>
                <span style={{ fontSize: 24, fontWeight: 700, color: '#111111' }}>{t.fee}</span>
              </div>
              <button 
                onClick={handleRegister}
                style={{ 
                  background: registered ? '#22C55E' : '#B7FF2A', 
                  color: registered ? '#FFFFFF' : '#111111', 
                  border: 'none', padding: '16px 32px', borderRadius: 100, fontSize: 16, fontWeight: 700, 
                  display: 'flex', alignItems: 'center', gap: 12, cursor: registered ? 'default' : 'pointer',
                  transition: 'all 0.3s'
                }}>
                {registered ? (
                  <>Registered <CheckCircle size={20} /></>
                ) : (
                  <>Register Now <ChevronRight size={20} /></>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
