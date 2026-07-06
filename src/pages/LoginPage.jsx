import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Globe, ArrowRight } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn, signInWithGoogle } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) { toast.error('Please fill in all fields'); return }
    setLoading(true)
    try {
      await signIn(email, password)
      toast.success('Welcome back to T3 Sports!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    // Removed
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex' }}>
      {/* Left Panel - Branding */}
      <div className="hidden-mobile" style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 48, background: '#F6F6F6' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, zIndex: 10 }}>
          <div style={{ width: 32, height: 32, background: '#111111', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16, color: '#FFFFFF' }}>T3</div>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#111111', letterSpacing: '-0.02em' }}>T3 Sports</span>
        </Link>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 480 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 4vw, 48px)', color: '#111111', marginBottom: 24, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Welcome back to the ecosystem.
          </h2>
          <p style={{ color: '#555555', fontSize: 18, lineHeight: 1.6, marginBottom: 48 }}>
            Sign in to track your performances and discover opportunities.
          </p>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[['50K+', 'Active Athletes'], ['3,500+', 'Academies']].map(([val, label]) => (
              <div key={label} style={{ background: '#FFFFFF', padding: 24, borderRadius: 16, border: '1px solid #E8E8E8' }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 32, color: '#111111', marginBottom: 8, letterSpacing: '-0.02em' }}>{val}</div>
                <div style={{ color: '#888888', fontSize: 14, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative element */}
        <div style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, background: '#B7FF2A', opacity: 0.2, filter: 'blur(80px)', borderRadius: '50%' }} />
      </div>

      {/* Right Panel - Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, background: '#FFFFFF' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="premium-card" style={{ width: '100%', maxWidth: 460, padding: 40, background: '#FFFFFF', boxShadow: '0 24px 48px -12px rgba(0,0,0,0.08)' }}>
          {/* Mobile Logo */}
          <div className="mobile-only" style={{ marginBottom: 40 }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, background: '#111111', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16, color: '#FFFFFF' }}>T3</div>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#111111', letterSpacing: '-0.02em' }}>T3 Sports</span>
            </Link>
          </div>

          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 32, color: '#111111', marginBottom: 8, letterSpacing: '-0.02em' }}>Log in</h1>
          <p style={{ color: '#888888', fontSize: 15, marginBottom: 32 }}>Enter your details to access your account.</p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: '#111111', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#888888' }} />
                <input className="input-field" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ paddingLeft: 44, background: '#F6F6F6', border: '1px solid #E8E8E8', color: '#111111' }} />
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', color: '#111111', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#888888' }} />
                <input className="input-field" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingLeft: 44, paddingRight: 44, background: '#F6F6F6', border: '1px solid #E8E8E8', color: '#111111' }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#888888', cursor: 'pointer' }}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 32 }}>
              <a href="#" style={{ color: '#555555', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px', fontSize: 16, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Signing in...' : <>Sign In</>}
            </button>
          </form>

          <p style={{ color: '#888888', fontSize: 14, textAlign: 'center', marginTop: 32 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#111111', textDecoration: 'none', fontWeight: 600 }}>Create one now</Link>
          </p>

          <div style={{ marginTop: 48, padding: 20, background: '#F6F6F6', borderRadius: 12, border: '1px solid #E8E8E8' }}>
            <p style={{ color: '#555555', fontSize: 13, textAlign: 'center', marginBottom: 12, fontWeight: 500 }}>Demo Login (No Auth Required)</p>
            <button onClick={() => { setEmail('demo@t3sports.in'); setPassword('demo1234') }} style={{ width: '100%', background: '#FFFFFF', border: '1px solid #E8E8E8', borderRadius: 8, padding: '10px', color: '#111111', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>
              Fill Demo Credentials
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) { 
          .hidden-mobile { display: none !important; } 
        }
        @media (min-width: 901px) { 
          .mobile-only { display: none !important; } 
        }
      `}</style>
    </div>
  )
}
