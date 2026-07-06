import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, Trophy, Users, Building2, Zap, Target, BarChart3, Shield, Play } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Animated counter hook
function useCounter(target, duration = 2000, inView) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return count
}

function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const athletes = useCounter(50000, 2000, inView)
  const schools = useCounter(3500, 2000, inView)
  const academies = useCounter(280, 2000, inView)

  return (
    <div ref={ref} className="section-padding" style={{ background: '#F6F6F6', borderTop: '1px solid #E8E8E8', borderBottom: '1px solid #E8E8E8' }}>
      <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }}>
        {[
          { value: athletes, suffix: '+', label: 'Athletes Registered' },
          { value: schools, suffix: '+', label: 'Schools Connected' },
          { value: academies, suffix: '+', label: 'Partner Academies' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.6 }}
            style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(40px, 5vw, 56px)', color: '#111111', lineHeight: 1, letterSpacing: '-0.03em' }}>
              {stat.value.toLocaleString()}{stat.suffix}
            </div>
            <div style={{ color: '#888888', fontSize: 15, marginTop: 12, fontWeight: 500 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const sports = [
  { name: 'Cricket', icon: '🏏', desc: 'Stats & talent scouting for the nation\'s favorite sport.', count: '18K athletes', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=600&auto=format&fit=crop' },
  { name: 'Football', icon: '⚽', desc: 'Leagues & club connect for rising stars.', count: '12K athletes', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop' },
  { name: 'Badminton', icon: '🏸', desc: 'Rankings & court finder.', count: '8K athletes', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop' },
]

const features = [
  { icon: <Shield size={24} />, title: 'Sports Passport', desc: 'A verified digital identity for every athlete — achievements and performance history in one place.', color: '#111111' },
  { icon: <Target size={24} />, title: 'Talent Discovery', desc: 'AI-powered scouting that connects grassroots athletes with coaches and national selectors.', color: '#111111' },
  { icon: <Building2 size={24} />, title: 'Academy Connect', desc: 'Find and connect with top sports academies across India filtered by sport, location, and rating.', color: '#111111' },
]

export default function LandingPage() {
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Navbar />

      {/* HERO SECTION */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 64px', overflow: 'hidden', position: 'relative', background: 'radial-gradient(circle at top, #f6f6f6 0%, #ffffff 100%)' }}>
        
        {/* Abstract shapes */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', top: -150, right: -100, width: 600, height: 600, background: 'linear-gradient(135deg, rgba(183,255,42,0.1) 0%, rgba(183,255,42,0) 100%)', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', zIndex: 0 }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', bottom: 100, left: -200, width: 500, height: 500, background: 'linear-gradient(135deg, rgba(17,17,17,0.03) 0%, rgba(17,17,17,0) 100%)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', zIndex: 0 }} />

        <div className="container-wide" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          
          {/* Top - Typography */}
          <div style={{ maxWidth: 800, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#111111', borderRadius: 100, padding: '8px 20px', marginBottom: 32, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#B7FF2A', animation: 'pulse 2s infinite' }} />
                <span style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700, letterSpacing: '0.05em' }}>NEW: AI TALENT DISCOVERY</span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 6.5vw, 92px)', lineHeight: 1.05, letterSpacing: '-0.04em', color: '#111111', marginBottom: 24 }}>
              Your Journey Starts<br />
              Before The <span style={{ color: 'transparent', WebkitTextStroke: '2px #111111', background: 'linear-gradient(90deg, #111111, #888888)', WebkitBackgroundClip: 'text' }}>First Match.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: '#555555', fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.6, marginBottom: 48, maxWidth: 640 }}>
              Join 50,000+ athletes building their legacy. T3 Sports connects you with teams, tournaments, and scouts on a beautifully designed platform.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 64 }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ padding: '20px 48px', fontSize: 16, borderRadius: 100, boxShadow: '0 20px 40px -10px rgba(183,255,42,0.4)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  Get Started <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/tournaments" style={{ textDecoration: 'none' }}>
                <button className="btn-secondary" style={{ padding: '20px 48px', fontSize: 16, borderRadius: 100, display: 'flex', alignItems: 'center', gap: 12 }}>
                  Explore Tournaments
                </button>
              </Link>
            </motion.div>
          </div>


        </div>
      </section>

      {/* STATS */}
      <StatsSection />

      {/* SPORTS WE COVER */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 80 }}>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: '#111111', marginBottom: 24 }}>
              One Platform.<br /><span style={{ color: '#888888' }}>Every Sport.</span>
            </h2>
            <p style={{ color: '#555555', fontSize: 20, maxWidth: 600, margin: '0 auto' }}>
              Purpose-built ecosystems for India's most popular sports, tailored to the specific needs of athletes and organizers.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 32 }}>
            {sports.map((sport, i) => (
              <motion.div key={sport.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="premium-card" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
                <div style={{ height: 240, overflow: 'hidden' }}>
                  <img src={sport.image} alt={sport.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                       onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                       onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
                <div style={{ padding: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontSize: 28, color: '#111111' }}>{sport.name}</h3>
                    <span style={{ fontSize: 13, color: '#111111', background: '#F6F6F6', padding: '6px 12px', borderRadius: 100, fontWeight: 600 }}>{sport.count}</span>
                  </div>
                  <p style={{ color: '#555555', fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>{sport.desc}</p>
                  <Link to={`/rankings?sport=${sport.name.toLowerCase()}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, color: '#111111', fontWeight: 600, fontSize: 15 }}>
                    Explore {sport.name} <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featuresRef} className="section-padding" style={{ background: '#F6F6F6' }}>
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={featuresInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            style={{ marginBottom: 80, maxWidth: 800 }}>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: '#111111', marginBottom: 24 }}>
              Built for <span style={{ color: '#888888' }}>Champions.</span>
            </h2>
            <p style={{ color: '#555555', fontSize: 20 }}>
              Everything you need to manage your sports career, from grassroots to professional leagues, in one beautifully designed platform.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} animate={featuresInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="premium-card" style={{ padding: 40 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', marginBottom: 24 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 22, color: '#111111', marginBottom: 12 }}>{f.title}</h3>
                <p style={{ color: '#555555', fontSize: 15, lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container-standard">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: '#111111',
              borderRadius: 32, padding: '80px 48px', textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
            {/* Subtle background element */}
            <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: '#B7FF2A', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%' }} />
            
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#FFFFFF', marginBottom: 24, position: 'relative', zIndex: 1 }}>
              Ready to write your<br />sports story?
            </h2>
            <p style={{ color: '#A0A0A0', fontSize: 18, marginBottom: 48, maxWidth: 500, margin: '0 auto 48px', position: 'relative', zIndex: 1 }}>
              Join 50,000+ athletes already building their legacy on India's premier sports platform.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button className="btn-accent" style={{ padding: '16px 36px', fontSize: 16 }}>
                  Join T3 Sports
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
      `}</style>
    </div>
  )
}
