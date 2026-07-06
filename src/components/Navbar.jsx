import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, X, ChevronRight, Menu, LogOut, User } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useUIStore, MOCK_NOTIFICATIONS, MOCK_SEARCH_RESULTS } from '../store/uiStore'
import toast from 'react-hot-toast'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Tournaments', path: '/tournaments' },
  { label: 'Rankings', path: '/rankings' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile, signOut } = useAuthStore()
  const { searchQuery, setSearchQuery } = useUIStore()
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const searchRef = useRef(null)

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [mobileOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769 && mobileOpen) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileOpen])

  const filteredResults = searchQuery.length > 1 ? {
    athletes: MOCK_SEARCH_RESULTS.athletes.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())),
    academies: MOCK_SEARCH_RESULTS.academies.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())),
  } : null

  const handleSignOut = async () => {
    await signOut()
    toast.success('Signed out successfully')
    navigate('/')
  }

  return (
    <>
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid #E8E8E8',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 72, gap: 32 }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32,
              background: '#111111',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16, color: '#FFFFFF'
            }}>T3</div>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#111111', letterSpacing: '-0.02em' }}>
              T3 Sports
            </span>
          </div>
        </Link>

        {/* Nav Links - Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }} className="hidden-mobile">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path
            return (
              <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '8px 16px', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 6,
                  color: isActive ? '#111111' : '#888888',
                  background: isActive ? '#F6F6F6' : 'transparent',
                  fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.2s ease', cursor: 'pointer',
                }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#111111'; e.currentTarget.style.background = '#F6F6F6' } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = '#888888'; e.currentTarget.style.background = 'transparent' } }}
                >
                  {link.label}
                  {link.badge && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 100,
                      background: '#B7FF2A', color: '#111111', letterSpacing: '-0.02em'
                    }}>{link.badge}</span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          {/* Search Toggle */}
          <button onClick={() => setSearchOpen(!searchOpen)} style={{
            background: searchOpen ? '#F6F6F6' : 'transparent', border: 'none',
            borderRadius: 100, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#111111', transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#F6F6F6'}
            onMouseLeave={e => e.currentTarget.style.background = searchOpen ? '#F6F6F6' : 'transparent'}
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setNotifOpen(!notifOpen)} style={{
              background: notifOpen ? '#F6F6F6' : 'transparent', border: 'none',
              borderRadius: 100, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#111111', transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#F6F6F6'}
              onMouseLeave={e => e.currentTarget.style.background = notifOpen ? '#F6F6F6' : 'transparent'}
            >
              <Bell size={20} />
              {unreadCount > 0 && <div style={{
                position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: '#22C55E'
              }} />}
            </button>
            <AnimatePresence>
              {notifOpen && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="notif-dropdown"
                    style={{
                      position: 'absolute', top: '120%', right: 0,
                      background: '#FFFFFF', border: '1px solid #E8E8E8',
                      borderRadius: 16, width: 340, maxWidth: '100vw', zIndex: 200, boxShadow: '0 12px 32px -8px rgba(0,0,0,0.08)',
                      overflow: 'hidden',
                    }}
                  >
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #E8E8E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: '#111111' }}>Notifications</span>
                  </div>
                  <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {MOCK_NOTIFICATIONS.map(n => (
                      <div key={n.id} style={{
                        padding: '16px 20px', borderBottom: '1px solid #F6F6F6',
                        background: n.read ? '#FFFFFF' : '#FAFAFA', cursor: 'pointer'
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F6F6F6'}
                        onMouseLeave={e => e.currentTarget.style.background = n.read ? '#FFFFFF' : '#FAFAFA'}
                      >
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', marginTop: 6, flexShrink: 0 }} />}
                          <div style={{ flex: 1, paddingLeft: n.read ? 20 : 0 }}>
                            <p style={{ fontSize: 14, fontWeight: 600, color: '#111111', marginBottom: 4 }}>{n.title}</p>
                            <p style={{ fontSize: 13, color: '#888888', lineHeight: 1.5 }}>{n.msg}</p>
                            <p style={{ fontSize: 11, color: '#B0B0B0', marginTop: 8 }}>{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </div>

          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} style={{
                display: 'flex', alignItems: 'center', gap: 8, background: '#F6F6F6',
                border: '1px solid #E8E8E8', borderRadius: 100, padding: '4px 12px 4px 4px',
                cursor: 'pointer', color: '#111111', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#D1D1D1'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#E8E8E8'}
              >
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 600, fontSize: 12 }}>
                  {profile?.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                {profile?.name || user.email?.split('@')[0]}
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    style={{ position: 'absolute', top: '120%', right: 0, background: '#FFFFFF', border: '1px solid #E8E8E8', borderRadius: 16, width: 200, zIndex: 200, boxShadow: '0 12px 32px -8px rgba(0,0,0,0.08)', overflow: 'hidden', padding: 8 }}>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                      <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, color: '#111111', fontSize: 14, fontWeight: 500, cursor: 'pointer', borderRadius: 8, transition: 'all 0.1s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F6F6F6'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <User size={16} /> Dashboard
                      </div>
                    </Link>
                    <div style={{ height: 1, background: '#E8E8E8', margin: '8px 0' }} />
                    <div onClick={handleSignOut} style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, color: '#EF4444', fontSize: 14, fontWeight: 500, cursor: 'pointer', borderRadius: 8, transition: 'all 0.1s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <LogOut size={16} /> Sign Out
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Link to="/login" style={{ textDecoration: 'none' }} className="hidden-mobile">
                <button style={{ background: 'transparent', border: 'none', color: '#111111', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Login</button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ padding: '10px 24px', fontSize: 14 }}>Register</button>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-only" style={{
            background: 'none', border: 'none', color: '#111111', cursor: 'pointer'
          }}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
    
    {/* Search Overlay */}
    <AnimatePresence>
      {searchOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
          style={{ position: 'fixed', top: 72, left: 0, right: 0, zIndex: 99, borderTop: '1px solid #E8E8E8', background: '#FFFFFF', padding: '16px 24px', boxShadow: '0 12px 32px -8px rgba(0,0,0,0.08)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#888888' }} />
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search athletes, academies..."
                style={{
                  width: '100%', background: '#F6F6F6', border: '1px solid #E8E8E8',
                  borderRadius: 100, padding: '16px 16px 16px 48px', color: '#111111',
                  fontFamily: 'Inter, sans-serif', fontSize: 15, outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#111111'}
                onBlur={e => e.currentTarget.style.borderColor = '#E8E8E8'}
              />
            </div>
            
            {/* Search Results */}
            {filteredResults && (
              <div style={{ maxWidth: 800, margin: '24px auto 0' }}>
                {filteredResults.athletes.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <p style={{ color: '#888888', fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 12 }}>ATHLETES</p>
                    <div style={{ display: 'grid', gap: 8 }}>
                      {filteredResults.athletes.map(a => (
                        <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: '#FAFAFA', borderRadius: 12, cursor: 'pointer' }}>
                          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#111111', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{a.name[0]}</div>
                          <div>
                            <p style={{ color: '#111111', fontSize: 14, fontWeight: 600 }}>{a.name}</p>
                            <p style={{ color: '#888888', fontSize: 12 }}>{a.sport} • {a.state}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, background: '#FFFFFF', zIndex: 300, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, borderBottom: '1px solid #E8E8E8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, background: '#111111', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16, color: '#FFFFFF' }}>T3</div>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#111111', letterSpacing: '-0.02em' }}>T3 Sports</span>
              </div>
              <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: '#111111', cursor: 'pointer' }}>
                <X size={28} />
              </button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {navLinks.map((link, i) => (
                  <motion.div key={link.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    <Link to={link.path} onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', fontFamily: 'Space Grotesk', fontSize: 32, fontWeight: 700, color: location.pathname === link.path ? '#111111' : '#888888', display: 'block' }}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div style={{ height: 1, background: '#E8E8E8' }} />
              
              {user ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, color: '#111111', fontSize: 18, fontWeight: 600 }}>
                    <User size={24} /> Dashboard
                  </Link>
                  <button onClick={() => { setMobileOpen(false); handleSignOut(); }} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 12, color: '#EF4444', fontSize: 18, fontWeight: 600, cursor: 'pointer', padding: 0 }}>
                    <LogOut size={24} /> Sign Out
                  </button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Link to="/login" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none' }}>
                    <button className="btn-secondary" style={{ width: '100%', fontSize: 16, padding: '16px' }}>Sign In</button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none' }}>
                    <button className="btn-primary" style={{ width: '100%', fontSize: 16, padding: '16px' }}>Create Account</button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { 
          .hidden-mobile { display: none !important; } 
          .notif-dropdown { right: -50px !important; width: 90vw !important; }
        }
        @media (min-width: 769px) { .mobile-only { display: none !important; } }
      `}</style>
    </>
  )
}
