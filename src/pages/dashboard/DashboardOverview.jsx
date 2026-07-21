import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, Star, Activity, ArrowRight, Calendar, Users, FileText } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const recentActivity = [
  { type: 'match', title: 'Played District Cricket Cup - Match 3', time: '2 days ago', icon: <Activity size={16} />, color: '#111111' },
  { type: 'rank', title: 'Moved up to Rank #47 in District Rankings', time: '3 days ago', icon: <Trophy size={16} />, color: '#111111' },
  { type: 'cert', title: 'Earned "Consistent Performer" Badge', time: '1 week ago', icon: <Star size={16} />, color: '#111111' },
  { type: 'team', title: 'Joined Mumbai Mavericks', time: '2 weeks ago', icon: <Users size={16} />, color: '#111111' },
]

export default function DashboardOverview() {
  const { profile } = useAuthStore()
  const name = profile?.name || 'Athlete'

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: 64 }}>
      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{
          background: '#111111',
          borderRadius: 24, padding: '40px',
          marginBottom: 32, position: 'relative', overflow: 'hidden',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24
        }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <p style={{ color: '#888888', fontSize: 14, marginBottom: 8, fontWeight: 500 }}>Welcome back 👋</p>
          <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 36px)', color: '#FFFFFF', marginBottom: 12, letterSpacing: '-0.02em' }}>
            {name}
          </h1>
          <p style={{ color: '#D1D1D1', fontSize: 15, maxWidth: 400, lineHeight: 1.6 }}>Your sports journey is progressing well. Keep pushing and updating your passport.</p>
        </div>
        <div style={{ background: '#FFFFFF', padding: '20px 32px', borderRadius: 16, textAlign: 'center', zIndex: 10 }}>
          <p style={{ color: '#555555', fontSize: 13, marginBottom: 8, fontWeight: 600 }}>Profile Completion</p>
          <p style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 40, color: '#111111', lineHeight: 1 }}>65%</p>
          <p style={{ color: '#22C55E', fontSize: 12, fontWeight: 600, marginTop: 8 }}>+15% this week</p>
        </div>
        {/* Decorative Element */}
        <div style={{ position: 'absolute', right: -50, top: -50, width: 300, height: 300, background: '#B7FF2A', opacity: 0.15, filter: 'blur(60px)', borderRadius: '50%' }} />
      </motion.div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
        <Link to="/dashboard/passport" style={{ textDecoration: 'none' }}>
          <div className="premium-card" style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: '#F6F6F6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111' }}>
                <FileText size={24} />
              </div>
              <div>
                <p style={{ color: '#111111', fontWeight: 600, fontSize: 15 }}>My Passport</p>
                <p style={{ color: '#888888', fontSize: 13 }}>Update profile</p>
              </div>
            </div>
            <ArrowRight size={20} color="#888888" />
          </div>
        </Link>

        <Link to="/dashboard/team" style={{ textDecoration: 'none' }}>
          <div className="premium-card" style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: '#F6F6F6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111' }}>
                <Users size={24} />
              </div>
              <div>
                <p style={{ color: '#111111', fontWeight: 600, fontSize: 15 }}>My Team</p>
                <p style={{ color: '#888888', fontSize: 13 }}>Manage roster</p>
              </div>
            </div>
            <ArrowRight size={20} color="#888888" />
          </div>
        </Link>

        <Link to="/dashboard/tournaments" style={{ textDecoration: 'none' }}>
          <div className="premium-card" style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: '#F6F6F6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111' }}>
                <Calendar size={24} />
              </div>
              <div>
                <p style={{ color: '#111111', fontWeight: 600, fontSize: 15 }}>Tournaments</p>
                <p style={{ color: '#888888', fontSize: 13 }}>Explore & Swipe</p>
              </div>
            </div>
            <ArrowRight size={20} color="#888888" />
          </div>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="premium-card" style={{ padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 20, color: '#111111' }}>Recent Activity</h3>
            <span style={{ fontSize: 13, color: '#888888', cursor: 'pointer', fontWeight: 500 }}>View all</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {recentActivity.map((act, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#F6F6F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#111111' }}>
                  {act.icon}
                </div>
                <div>
                  <p style={{ color: '#111111', fontSize: 14, fontWeight: 600, marginBottom: 4, lineHeight: 1.4 }}>{act.title}</p>
                  <p style={{ color: '#888888', fontSize: 12 }}>{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="premium-card" style={{ padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 20, color: '#111111' }}>Notifications</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: 16, background: '#F6F6F6', borderRadius: 12, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ width: 8, height: 8, background: '#B7FF2A', borderRadius: '50%', marginTop: 6 }} />
              <div>
                <p style={{ color: '#111111', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Complete your profile</p>
                <p style={{ color: '#555555', fontSize: 13, lineHeight: 1.5 }}>Add your sport, position, and bio to get discovered by coaches and teams.</p>
              </div>
            </div>
            <div style={{ padding: 16, background: '#FFFFFF', border: '1px solid #E8E8E8', borderRadius: 12, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ width: 8, height: 8, background: '#E8E8E8', borderRadius: '50%', marginTop: 6 }} />
              <div>
                <p style={{ color: '#111111', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Welcome to T3 Sports</p>
                <p style={{ color: '#555555', fontSize: 13, lineHeight: 1.5 }}>You've successfully created your account. Start building your sports passport.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
