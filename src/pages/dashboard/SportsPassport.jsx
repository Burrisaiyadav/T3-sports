import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Trophy, Camera, FileText, Settings, Image as ImageIcon, Video, Calendar, Edit2, X, Plus, Zap } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'

export default function SportsPassport() {
  const { user, profile, updateProfile } = useAuthStore()
  const [activeTab, setActiveTab] = useState('posts')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(profile || {})
  const [posts, setPosts] = useState([])
  const tabLabels = {}
  
  React.useEffect(() => {
    if (isEditing) {
      setEditForm(profile || {})
    }
  }, [isEditing, profile])

  const handleUploadPhoto = async (e, type) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      try {
        await updateProfile({ [type]: url })
        toast.success(`${type === 'coverUrl' ? 'Cover' : 'Profile'} photo updated`)
      } catch (err) {
        toast.error('Failed to update photo')
      }
    }
  }

  const handleUploadPost = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPosts([{ id: Date.now(), url, date: 'Just now' }, ...posts])
      toast.success('Post uploaded successfully!')
    }
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    try {
      await updateProfile(editForm)
      toast.success('Profile updated successfully')
      setIsEditing(false)
    } catch (err) {
      console.error('Profile update error:', err)
      toast.error(err.message || 'Failed to update profile')
    }
  }

  const defaultCover = 'https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?q=80&w=1200&auto=format&fit=crop'
  
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', paddingBottom: 64 }}>
      {/* Cover Photo */}
      <div style={{ height: 240, borderRadius: 24, overflow: 'hidden', position: 'relative', background: '#F6F6F6' }}>
        <img src={profile?.coverUrl || defaultCover} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <label style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 100, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          <Camera size={16} /> Edit Cover
          <input type="file" style={{ display: 'none' }} accept="image/*" onChange={(e) => handleUploadPhoto(e, 'coverUrl')} />
        </label>
      </div>

      {/* Profile Info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -60, marginBottom: 32 }}>
        <div style={{ position: 'relative' }}>
          <label style={{ width: 120, height: 120, borderRadius: '50%', border: '4px solid #FFFFFF', background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: 40, fontWeight: 700, overflow: 'hidden', position: 'relative', zIndex: 10, cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
            {profile?.avatarUrl ? <img src={profile.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : profile?.name?.[0] || 'U'}
            <input type="file" style={{ display: 'none' }} accept="image/*" onChange={(e) => handleUploadPhoto(e, 'avatarUrl')} />
          </label>
          {/* Permanent Camera Icon */}
          <div style={{ position: 'absolute', bottom: 4, right: 4, zIndex: 20, pointerEvents: 'none', background: '#111111', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #FFFFFF' }}>
            <Camera size={14} color="#FFFFFF" />
          </div>
        </div>
        
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: 700, color: '#111111', marginTop: 16 }}>{profile?.name || 'Athlete Name'}</h1>
        <p style={{ color: '#888888', fontSize: 15, marginBottom: 12 }}>@{profile?.username || 'username'}</p>
        
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {profile?.sport && <span style={{ background: '#F6F6F6', padding: '6px 12px', borderRadius: 100, fontSize: 13, fontWeight: 600, color: '#111111' }}>{profile.sport}</span>}
          {profile?.position && <span style={{ background: '#F6F6F6', padding: '6px 12px', borderRadius: 100, fontSize: 13, fontWeight: 600, color: '#111111' }}>{profile.position}</span>}
          {profile?.city && <span style={{ background: '#F6F6F6', padding: '6px 12px', borderRadius: 100, fontSize: 13, fontWeight: 600, color: '#111111', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} /> {profile.city}</span>}
        </div>

        <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: '#111111' }}>{profile?.followers || 0}</div>
            <div style={{ fontSize: 13, color: '#888888' }}>Followers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: '#111111' }}>{profile?.following || 0}</div>
            <div style={{ fontSize: 13, color: '#888888' }}>Following</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: '#111111' }}>{profile?.achievements?.length || 0}</div>
            <div style={{ fontSize: 13, color: '#888888' }}>Achievements</div>
          </div>
        </div>

        <p style={{ color: '#555555', fontSize: 15, maxWidth: 500, textAlign: 'center', lineHeight: 1.6, marginBottom: 24 }}>
          {profile?.bio || 'Add a bio to tell coaches and teams more about your sports journey, goals, and experience.'}
        </p>

        <button onClick={() => setIsEditing(true)} className="btn-secondary" style={{ padding: '10px 32px' }}>
          <Edit2 size={16} /> Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #E8E8E8', marginBottom: 32, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {[
          { id: 'posts', label: 'Posts', icon: <ImageIcon size={16} /> },
          { id: 'certificates', label: 'Certificates', icon: <FileText size={16} /> },
          { id: 'gallery', label: 'Gallery', icon: <Camera size={16} /> },
          { id: 'history', label: 'Tournaments', icon: <Calendar size={16} /> },
          { id: 'achievements', label: 'Achievements', icon: <Trophy size={16} /> },
        ].map(tab => {
          tabLabels[tab.id] = tab.label;
          return (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            background: 'none', border: 'none', padding: '16px 24px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600,
            color: activeTab === tab.id ? '#111111' : '#888888',
            borderBottom: `2px solid ${activeTab === tab.id ? '#111111' : 'transparent'}`,
            whiteSpace: 'nowrap', transition: 'all 0.2s'
          }}>
            {tab.icon} {tab.label}
          </button>
        )})}
      </div>

      {/* Tab Content */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={activeTab}>
        {activeTab === 'posts' && (
          <div>
            {posts.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 24 }}>
                <label className="premium-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', cursor: 'pointer', background: '#FAFAFA', minHeight: 250 }}>
                  <Plus size={32} color="#888888" style={{ marginBottom: 12 }} />
                  <p style={{ color: '#111111', fontWeight: 600, fontSize: 14 }}>Create Post</p>
                  <input type="file" style={{ display: 'none' }} accept="image/*,video/*" onChange={handleUploadPost} />
                </label>
                {posts.map(post => (
                  <div key={post.id} className="premium-card" style={{ padding: 0, overflow: 'hidden', height: 250 }}>
                    <img src={post.url} alt="Post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 64, background: '#FAFAFA', borderRadius: 16, border: '1px dashed #E8E8E8' }}>
                <ImageIcon size={48} color="#D1D1D1" style={{ marginBottom: 16 }} />
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 600, color: '#111111', marginBottom: 8 }}>No Posts Yet</h3>
                <p style={{ color: '#888888', fontSize: 14, marginBottom: 24 }}>Share your training videos, match highlights, and updates.</p>
                <label className="btn-primary" style={{ padding: '10px 24px', fontSize: 14, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Plus size={16} /> Create Post
                  <input type="file" style={{ display: 'none' }} accept="image/*,video/*" onChange={handleUploadPost} />
                </label>
              </div>
            )}
          </div>
        )}
        
        {(activeTab === 'certificates' || activeTab === 'gallery' || activeTab === 'history' || activeTab === 'achievements') && (
           <div style={{ textAlign: 'center', padding: 80, background: '#FAFAFA', borderRadius: 16, border: '1px dashed #E8E8E8' }}>
             <div style={{ width: 64, height: 64, background: '#111111', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B7FF2A', margin: '0 auto 24px' }}>
               <Zap size={32} />
             </div>
             <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: '#111111', marginBottom: 12 }}>Coming Soon</h3>
             <p style={{ color: '#555555', fontSize: 15, maxWidth: 400, margin: '0 auto' }}>We are actively building the {tabLabels[activeTab]} feature. Check back soon for updates!</p>
           </div>
        )}
      </motion.div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#FFFFFF', borderRadius: 24, width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto', padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: '#111111' }}>Edit Profile</h2>
              <button onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111111' }}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#111111', marginBottom: 8 }}>Full Name</label>
                <input className="input-field" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} style={{ width: '100%', padding: '12px 16px', background: '#F6F6F6', border: '1px solid #E8E8E8', borderRadius: 12, outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#111111', marginBottom: 8 }}>Bio</label>
                <textarea className="input-field" rows={3} value={editForm.bio || ''} onChange={e => setEditForm({...editForm, bio: e.target.value})} style={{ width: '100%', padding: '12px 16px', background: '#F6F6F6', border: '1px solid #E8E8E8', borderRadius: 12, outline: 'none', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#111111', marginBottom: 8 }}>Sport</label>
                  <input className="input-field" placeholder="e.g. Football" value={editForm.sport || ''} onChange={e => setEditForm({...editForm, sport: e.target.value})} style={{ width: '100%', padding: '12px 16px', background: '#F6F6F6', border: '1px solid #E8E8E8', borderRadius: 12, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#111111', marginBottom: 8 }}>Position</label>
                  <input className="input-field" placeholder="e.g. Striker" value={editForm.position || ''} onChange={e => setEditForm({...editForm, position: e.target.value})} style={{ width: '100%', padding: '12px 16px', background: '#F6F6F6', border: '1px solid #E8E8E8', borderRadius: 12, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#111111', marginBottom: 8 }}>City</label>
                  <input className="input-field" value={editForm.city || ''} onChange={e => setEditForm({...editForm, city: e.target.value})} style={{ width: '100%', padding: '12px 16px', background: '#F6F6F6', border: '1px solid #E8E8E8', borderRadius: 12, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#111111', marginBottom: 8 }}>State</label>
                  <input className="input-field" value={editForm.state || ''} onChange={e => setEditForm({...editForm, state: e.target.value})} style={{ width: '100%', padding: '12px 16px', background: '#F6F6F6', border: '1px solid #E8E8E8', borderRadius: 12, outline: 'none' }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary" style={{ flex: 1, padding: 16 }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: 16 }}>Save Changes</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
