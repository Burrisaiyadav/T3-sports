import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Plus, Search, Shield, MoreVertical, MapPin, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DashTeam() {
  const [hasTeam, setHasTeam] = useState(false)
  const [view, setView] = useState('default') // 'default', 'create', 'find'
  
  const [teamName, setTeamName] = useState('')
  const [teamSport, setTeamSport] = useState('')
  
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  
  const [roster, setRoster] = useState([
    { name: 'Arjun Kumar', username: '@arjunk', pos: 'Striker', role: 'Captain', self: true },
    { name: 'Rahul Sharma', username: '@rahul11', pos: 'Midfielder', role: 'Vice Captain' },
    { name: 'Vikram Singh', username: '@vikram_s', pos: 'Defender', role: 'Player' },
    { name: 'David D', username: '@david_d', pos: 'Goalkeeper', role: 'Player' },
  ])

  const handleStartTeam = (e) => {
    e.preventDefault()
    if (!teamName || !teamSport) {
      toast.error('Please fill in team name and sport')
      return
    }
    toast.success(`Team "${teamName}" created successfully!`)
    setRoster([{ name: 'You', username: '@you', pos: 'TBD', role: 'Captain', self: true }])
    setHasTeam(true)
    setView('default')
  }

  const handleFindTeamSearch = (e) => {
    e.preventDefault()
    if (!searchQuery) return
    toast('Searching for active teams nearby...', { icon: '🔍' })
    // Mock results
    setSearchResults([
      { id: 1, name: 'Mumbai Mavericks', sport: 'Football', players: 11, location: 'Mumbai' },
      { id: 2, name: 'Delhi Dynamoes', sport: 'Cricket', players: 15, location: 'Delhi' }
    ])
  }

  if (view === 'create') {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 0' }}>
        <button onClick={() => setView('default')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, color: '#555555', cursor: 'pointer', marginBottom: 24, fontWeight: 500 }}>
          <ArrowLeft size={20} /> Back to My Team
        </button>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 32, fontWeight: 700, color: '#111111', marginBottom: 8 }}>Create a Team</h1>
        <p style={{ color: '#888888', fontSize: 15, marginBottom: 32 }}>Fill in the details to start your own sports team.</p>
        
        <form onSubmit={handleStartTeam} className="premium-card" style={{ padding: 32 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Team Name</label>
            <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="e.g. Mumbai Mavericks" style={{ width: '100%', padding: '12px 16px', background: '#F6F6F6', border: '1px solid #E8E8E8', borderRadius: 8, fontFamily: 'Inter', fontSize: 14 }} />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Sport</label>
            <select value={teamSport} onChange={e => setTeamSport(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#F6F6F6', border: '1px solid #E8E8E8', borderRadius: 8, fontFamily: 'Inter', fontSize: 14 }}>
              <option value="">Select a sport...</option>
              <option value="Football">Football</option>
              <option value="Cricket">Cricket</option>
              <option value="Basketball">Basketball</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <button type="button" onClick={() => setView('default')} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>Create Team</button>
          </div>
        </form>
      </div>
    )
  }

  if (view === 'find') {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 0' }}>
        <button onClick={() => setView('default')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, color: '#555555', cursor: 'pointer', marginBottom: 24, fontWeight: 500 }}>
          <ArrowLeft size={20} /> Back to My Team
        </button>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 32, fontWeight: 700, color: '#111111', marginBottom: 8 }}>Find a Team</h1>
        <p style={{ color: '#888888', fontSize: 15, marginBottom: 32 }}>Search for teams recruiting players in your area.</p>
        
        <form onSubmit={handleFindTeamSearch} style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by city, sport, or team name..." style={{ flex: 1, padding: '12px 16px', background: '#FFFFFF', border: '1px solid #E8E8E8', borderRadius: 8, fontFamily: 'Inter', fontSize: 14 }} />
          <button type="submit" className="btn-primary" style={{ padding: '0 24px' }}>Search</button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {searchResults.map(t => (
            <div key={t.id} className="premium-card" style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111111', marginBottom: 4 }}>{t.name}</h3>
                <div style={{ display: 'flex', gap: 16, color: '#555555', fontSize: 13 }}>
                  <span>{t.sport}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={14} /> {t.players} Players</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} /> {t.location}</span>
                </div>
              </div>
              <button onClick={() => toast.success(`Request sent to join ${t.name}!`)} className="btn-secondary">Request to Join</button>
            </div>
          ))}
          {searchResults.length === 0 && (
            <div style={{ padding: 48, textAlign: 'center', color: '#888888', background: '#F6F6F6', borderRadius: 16 }}>
              Enter a search term to find teams.
            </div>
          )}
        </div>
        <button onClick={() => setView('default')} className="btn-secondary" style={{ marginTop: 32 }}>Back</button>
      </div>
    )
  }
  
  if (!hasTeam) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 0' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 32, fontWeight: 700, color: '#111111', marginBottom: 8 }}>My Team</h1>
        <p style={{ color: '#888888', fontSize: 15, marginBottom: 48 }}>You are currently a free agent. Join a team or start your own.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <div className="premium-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, background: '#F6F6F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <Plus size={32} color="#111111" />
            </div>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: '#111111', marginBottom: 12 }}>Create a Team</h3>
            <p style={{ color: '#555555', fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>Build your squad from scratch. As a captain, you can invite players, manage roles, and register for tournaments.</p>
            <button className="btn-primary" style={{ width: '100%', marginTop: 'auto' }} onClick={() => setView('create')}>
              Start a Team
            </button>
          </div>
          
          <div className="premium-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, background: '#F6F6F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <Search size={32} color="#111111" />
            </div>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: '#111111', marginBottom: 12 }}>Join a Team</h3>
            <p style={{ color: '#555555', fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>Looking for a squad? Search for active teams in your area that are recruiting players in your position.</p>
            <button className="btn-secondary" style={{ width: '100%', marginTop: 'auto' }} onClick={() => setView('find')}>
              Find Teams
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 0' }}>
      <button onClick={() => {setHasTeam(false); setView('default')}} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, color: '#555555', cursor: 'pointer', marginBottom: 24, fontWeight: 500 }}>
        <ArrowLeft size={20} /> Leave Team View
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 32, fontWeight: 700, color: '#111111', marginBottom: 8 }}>{teamName || 'Mumbai Mavericks'}</h1>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ background: '#F6F6F6', padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600, color: '#111111' }}>{teamSport || 'Football'}</span>
            <span style={{ color: '#888888', fontSize: 14 }}>{roster.length} Players</span>
          </div>
        </div>
        <button onClick={() => toast('Invite link copied!', { icon: '🔗' })} className="btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
          <Plus size={16} /> Invite Player
        </button>
      </div>

      <div className="premium-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E8E8E8', background: '#FAFAFA' }}>
              <th style={{ padding: '16px 24px', color: '#888888', fontSize: 12, textTransform: 'uppercase', fontWeight: 600 }}>Player</th>
              <th style={{ padding: '16px 24px', color: '#888888', fontSize: 12, textTransform: 'uppercase', fontWeight: 600 }}>Position</th>
              <th style={{ padding: '16px 24px', color: '#888888', fontSize: 12, textTransform: 'uppercase', fontWeight: 600 }}>Role</th>
              <th style={{ padding: '16px 24px' }}></th>
            </tr>
          </thead>
          <tbody>
            {roster.map((p, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #E8E8E8' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#111111', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {p.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#111111' }}>{p.name} {p.self && '(You)'}</div>
                      <div style={{ fontSize: 13, color: '#888888' }}>{p.username}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', color: '#555555', fontSize: 14 }}>{p.pos}</td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: p.role === 'Captain' ? '#B7FF2A' : '#F6F6F6', color: '#111111', padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600 }}>
                    {p.role === 'Captain' && <Shield size={12} />}
                    {p.role}
                  </div>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888888' }}>
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
