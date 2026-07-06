import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Phone, User, Globe, Check } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp, signInWithGoogle } = useAuthStore()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { toast.error('Please fill in all required fields'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await signUp(form.email, form.password, { name: form.name, phone: form.phone, user_type: 'athlete' })
      toast.success('Welcome to T3 Sports! 🎉')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    // Removed
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F6F6F6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Elements */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: '#B7FF2A', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, background: '#111111', opacity: 0.05, filter: 'blur(100px)', borderRadius: '50%' }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 540, position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, background: '#111111', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16, color: '#FFFFFF' }}>T3</div>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 24, color: '#111111', letterSpacing: '-0.02em' }}>T3 Sports</span>
          </Link>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 32, color: '#111111', marginBottom: 8, letterSpacing: '-0.02em' }}>Create your account</h1>
          <p style={{ color: '#555555', fontSize: 15 }}>Build your digital sports legacy.</p>
        </div>

        <div className="premium-card" style={{ padding: 48, background: '#FFFFFF', boxShadow: '0 24px 48px -12px rgba(0,0,0,0.05)' }}>
          <form onSubmit={handleRegister}>
            <div style={{ display: 'grid', gap: 20 }}>
              <div>
                <label style={{ display: 'block', color: '#111111', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#888888' }} />
                  <input className="input-field" placeholder="Arjun Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ paddingLeft: 44, background: '#F6F6F6', border: '1px solid #E8E8E8', color: '#111111' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#111111', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#888888' }} />
                  <input className="input-field" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ paddingLeft: 44, background: '#F6F6F6', border: '1px solid #E8E8E8', color: '#111111' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#111111', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#888888' }} />
                  <input className="input-field" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ paddingLeft: 44, background: '#F6F6F6', border: '1px solid #E8E8E8', color: '#111111' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#111111', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#888888' }} />
                  <input className="input-field" type={showPw ? 'text' : 'password'} placeholder="Min 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={{ paddingLeft: 44, paddingRight: 44, background: '#F6F6F6', border: '1px solid #E8E8E8', color: '#111111' }} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#888888', cursor: 'pointer' }}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12, opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Creating account...' : <>Create Account</>}
              </button>
            </div>
          </form>

          <p style={{ color: '#888888', fontSize: 13, textAlign: 'center', marginTop: 24, lineHeight: 1.6 }}>
            By registering, you agree to our <a href="#" style={{ color: '#111111', fontWeight: 500 }}>Terms of Service</a> and <a href="#" style={{ color: '#111111', fontWeight: 500 }}>Privacy Policy</a>
          </p>
        </div>

        <p style={{ color: '#888888', fontSize: 15, textAlign: 'center', marginTop: 32 }}>
          Already have an account? <Link to="/login" style={{ color: '#111111', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
        </p>
      </motion.div>
    </div>
  )
}
