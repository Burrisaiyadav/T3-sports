import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Bell } from 'lucide-react'

export default function ComingSoonBanner({ title, subtitle, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: 'linear-gradient(135deg, rgba(0, 194, 255, 0.08) 0%, rgba(57, 255, 20, 0.05) 100%)',
        border: '1px solid rgba(0, 194, 255, 0.25)',
        borderRadius: 16, padding: '40px 32px', textAlign: 'center', marginBottom: 32,
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #00C2FF, #39FF14, #00C2FF)' }} />

      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon || <Rocket size={48} />}</div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0, 194, 255, 0.1)', border: '1px solid rgba(0, 194, 255, 0.3)', borderRadius: 20, padding: '6px 16px', marginBottom: 16 }}>
        <span style={{ color: '#00C2FF', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>⚡ COMING SOON</span>
      </div>
      <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 28, color: 'white', marginBottom: 10 }}>{title}</h3>
      <p style={{ color: '#8892A4', fontSize: 14, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 24px' }}>
        {subtitle || 'T3 Sports is building India\'s largest grassroots sports ecosystem. This feature is under active development.'}
      </p>
      <button style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px',
        background: 'rgba(0, 194, 255, 0.1)', border: '1px solid rgba(0, 194, 255, 0.3)',
        borderRadius: 8, color: '#00C2FF', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter', fontWeight: 600,
      }}>
        <Bell size={14} /> Notify Me When Live
      </button>
    </motion.div>
  )
}
