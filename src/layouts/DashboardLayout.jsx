import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { LayoutDashboard, FileText, Trophy, Award, Star, Settings, ChevronLeft, ChevronRight, Users } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useUIStore } from '../store/uiStore'
import { useAuthStore } from '../store/authStore'

const sidebarItems = [
  { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={18} /> },
  { path: '/dashboard/passport', label: 'Athlete Profile', icon: <FileText size={18} /> },
  { path: '/dashboard/team', label: 'My Team', icon: <Users size={18} /> },
  { path: '/dashboard/tournaments', label: 'Tournaments', icon: <Award size={18} /> },
  { path: '/dashboard/achievements', label: 'Achievements', icon: <Star size={18} /> },
  { path: '/dashboard/settings', label: 'Settings', icon: <Settings size={18} /> },
]

export default function DashboardLayout() {
  const location = useLocation()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const { user, profile } = useAuthStore()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Automatically collapse profile & sidebar on mobile responsive screens
  const effectiveCollapsed = isMobile || sidebarCollapsed
  const sidebarWidth = effectiveCollapsed ? (isMobile ? 64 : 80) : 260

  return (
    <div style={{ minHeight: '100vh', background: '#F6F6F6', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <motion.aside 
          animate={{ width: sidebarWidth }} 
          transition={{ duration: 0.2 }}
          style={{
            width: sidebarWidth, flexShrink: 0,
            background: '#FFFFFF',
            borderRight: '1px solid #E8E8E8',
            display: 'flex', flexDirection: 'column',
            position: 'sticky', top: 72, height: 'calc(100vh - 72px)',
            overflow: 'hidden',
            zIndex: 40
          }}>
          
          {/* User info - Collapses into avatar on mobile */}
          <div style={{ padding: effectiveCollapsed ? '16px 8px' : '24px', borderBottom: '1px solid #E8E8E8', display: 'flex', justifyContent: effectiveCollapsed ? 'center' : 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div 
                title={profile?.name || 'Athlete'}
                style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  background: '#111111', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#FFFFFF', 
                  fontWeight: 700, 
                  fontSize: 16, 
                  flexShrink: 0, 
                  overflow: 'hidden' 
                }}
              >
                {profile?.avatarUrl ? <img src={profile.avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (profile?.name?.[0] || 'U')}
              </div>
              
              {!effectiveCollapsed && (
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ color: '#111111', fontWeight: 600, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {profile?.name || 'Athlete'}
                  </p>
                  <p style={{ color: '#888888', fontSize: 12, fontWeight: 500 }}>
                    {profile?.username ? `@${profile.username}` : (profile?.user_type || 'athlete').toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
            {sidebarItems.map(item => {
              const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard')
              return (
                <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: effectiveCollapsed ? '16px 0' : '12px 24px',
                    justifyContent: effectiveCollapsed ? 'center' : 'flex-start',
                    color: isActive ? '#111111' : '#555555',
                    background: isActive ? '#F6F6F6' : 'transparent',
                    borderRight: isActive ? '3px solid #111111' : '3px solid transparent',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  title={item.label}
                  >
                    <span style={{ flexShrink: 0, color: isActive ? '#111111' : '#888888' }}>{item.icon}</span>
                    {!effectiveCollapsed && (
                      <span style={{ fontSize: 15, fontWeight: isActive ? 600 : 500, flex: 1 }}>{item.label}</span>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Collapse toggle (Desktop only) */}
          {!isMobile && (
            <div style={{ padding: '16px', borderTop: '1px solid #E8E8E8' }}>
              <button onClick={toggleSidebar} style={{
                width: '100%', padding: '12px', borderRadius: 12,
                background: '#F6F6F6', border: '1px solid #E8E8E8',
                color: '#111111', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}>
                {effectiveCollapsed ? <ChevronRight size={18} /> : <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ChevronLeft size={18} /><span style={{ fontSize: 14, fontWeight: 600 }}>Collapse</span></div>}
              </button>
            </div>
          )}
        </motion.aside>

        {/* Main content */}
        <main 
          className="dashboard-main-area"
          style={{ 
            flex: 1, 
            padding: isMobile ? '20px 14px' : '32px 48px', 
            overflow: 'auto', 
            minWidth: 0 
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
