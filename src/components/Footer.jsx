import React from 'react'
import { Link } from 'react-router-dom'
import { Camera, Briefcase, Video, MessageSquare } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E8E8E8', padding: '100px 24px 40px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 64, marginBottom: 80 }}>
          {/* Brand */}
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, background: '#111111', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16, color: '#FFFFFF' }}>T3</div>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#111111', letterSpacing: '-0.02em' }}>T3 Sports</span>
            </div>
            <p style={{ color: '#888888', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              India's largest grassroots sports ecosystem. Talent. Triumph.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[{ icon: <Camera size={18} />, href: '#' }, { icon: <Briefcase size={18} />, href: '#' }, { icon: <Video size={18} />, href: '#' }, { icon: <MessageSquare size={18} />, href: '#' }].map((s, i) => (
                <a key={i} href={s.href} style={{
                  width: 40, height: 40, borderRadius: 100, background: '#F6F6F6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111', textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#111111'; e.currentTarget.style.color = '#FFFFFF' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#F6F6F6'; e.currentTarget.style.color = '#111111' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15, color: '#111111', marginBottom: 24 }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['About T3 Sports', 'Our Vision', 'Our Mission', 'Careers', 'Press Kit'].map(item => (
                <a key={item} href="#" style={{ color: '#888888', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#111111'}
                  onMouseLeave={e => e.currentTarget.style.color = '#888888'}>{item}</a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15, color: '#111111', marginBottom: 24 }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[{ label: 'Rankings', path: '/rankings' }, { label: 'Sports Passport', path: '/dashboard/passport' }, { label: 'Talent Discovery', path: '/dashboard/talent' }].map(item => (
                <Link key={item.label} to={item.path} style={{ color: '#888888', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#111111'}
                  onMouseLeave={e => e.currentTarget.style.color = '#888888'}>{item.label}</Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15, color: '#111111', marginBottom: 24 }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'].map(item => (
                <a key={item} href="#" style={{ color: '#888888', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#111111'}
                  onMouseLeave={e => e.currentTarget.style.color = '#888888'}>{item}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: '#E8E8E8', marginBottom: 32 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ color: '#888888', fontSize: 13 }}>© 2025 T3 Sports. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#F6F6F6', padding: '6px 16px', borderRadius: 100 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
            <span style={{ color: '#111111', fontSize: 13, fontWeight: 500 }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
