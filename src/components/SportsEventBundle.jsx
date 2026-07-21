import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  Trophy, MapPin, Calendar, Users, Zap, Flame, CheckCircle2, 
  RotateCcw, X, Heart, Info, Sparkles, ChevronRight, Layers, LayoutGrid
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const MOCK_SPORTS_EVENTS = [
  {
    id: 'evt_cricket_1',
    name: 'All-India Premier Cricket Clash',
    sport: 'Cricket',
    sportIcon: '🏏',
    category: 'Cricket',
    date: 'Aug 24 - Aug 28, 2024',
    time: '09:00 AM IST',
    location: 'Wankhede Stadium, Mumbai',
    city: 'Mumbai',
    prizePool: '₹50,00,000',
    fee: '₹4,500 / Team',
    registeredCount: 14,
    maxTeams: 16,
    format: 'T20 Knockout',
    skillLevel: 'Open / Professional',
    organizer: 'Mumbai Cricket Council & T3',
    status: '⚡ Registration Open',
    badgeColor: '#B7FF2A',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop',
    description: 'The ultimate T20 cricket clash bringing top regional teams and rising stars under floodlights at the iconic Wankhede Stadium.'
  },
  {
    id: 'evt_football_1',
    name: 'T3 National Super Football League',
    sport: 'Football',
    sportIcon: '⚽',
    category: 'Football',
    date: 'Sep 02 - Sep 10, 2024',
    time: '04:00 PM IST',
    location: 'Salt Lake Stadium, Kolkata',
    city: 'Kolkata',
    prizePool: '₹30,00,000',
    fee: '₹3,500 / Team',
    registeredCount: 20,
    maxTeams: 24,
    format: '11v11 League + Playoffs',
    skillLevel: 'Semi-Pro & Amateurs',
    organizer: 'Bengal Sports Association',
    status: '🔥 High Demand',
    badgeColor: '#FF5733',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop',
    description: 'Experience electric atmosphere in Kolkata with scouts present from national academies and ISL talent networks.'
  },
  {
    id: 'evt_basketball_1',
    name: 'Urban Hoops 3v3 Street Showdown',
    sport: 'Basketball',
    sportIcon: '🏀',
    category: 'Basketball',
    date: 'Sep 15 - Sep 17, 2024',
    time: '05:00 PM IST',
    location: 'DDA Sports Complex, New Delhi',
    city: 'New Delhi',
    prizePool: '₹15,00,000',
    fee: '₹1,200 / Team',
    registeredCount: 28,
    maxTeams: 32,
    format: 'FIBA 3x3 Rules',
    skillLevel: 'All Skill Levels',
    organizer: 'Capital Hoops Club',
    status: '🌟 3v3 Fast Track',
    badgeColor: '#38BDF8',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    description: 'Fast-paced, high-flying 3v3 basketball court battle featuring live DJ, dunk contest, and high stakes prize money.'
  },
  {
    id: 'evt_tennis_1',
    name: 'Grand Clay Court Tennis Masters',
    sport: 'Tennis',
    sportIcon: '🎾',
    category: 'Tennis',
    date: 'Oct 01 - Oct 05, 2024',
    time: '08:00 AM IST',
    location: 'Cubbon Park Tennis Center, Bengaluru',
    city: 'Bengaluru',
    prizePool: '₹8,00,000',
    fee: '₹1,500 / Player',
    registeredCount: 58,
    maxTeams: 64,
    format: 'Singles & Doubles Elimination',
    skillLevel: 'Advanced / State Ranked',
    organizer: 'Karnataka Tennis Federation',
    status: '🏆 Championship',
    badgeColor: '#A855F7',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop',
    description: 'Premier red clay tournament tested for endurance, precision, and strategy with ATP-ranking points multiplier.'
  },
  {
    id: 'evt_badminton_1',
    name: 'Apex Open Badminton Series',
    sport: 'Badminton',
    sportIcon: '🏸',
    category: 'Badminton',
    date: 'Oct 12 - Oct 14, 2024',
    time: '09:30 AM IST',
    location: 'Pullela Gopichand Academy, Hyderabad',
    city: 'Hyderabad',
    prizePool: '₹6,00,000',
    fee: '₹800 / Player',
    registeredCount: 40,
    maxTeams: 48,
    format: 'Men & Women Singles/Doubles',
    skillLevel: 'Intermediate to Pro',
    organizer: 'Hyderabad Badminton Club',
    status: '⚡ Spot Registration',
    badgeColor: '#22C55E',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
    description: 'Compete in air-conditioned wooden courts with electronic scoring, video replay analysis, and national rankings.'
  },
  {
    id: 'evt_volleyball_1',
    name: 'Coastal Smash Volleyball Open',
    sport: 'Volleyball',
    sportIcon: '🏐',
    category: 'Volleyball',
    date: 'Oct 20 - Oct 22, 2024',
    time: '03:30 PM IST',
    location: 'Calangute Beach Arena, Goa',
    city: 'Goa',
    prizePool: '₹10,00,000',
    fee: '₹2,000 / Team',
    registeredCount: 10,
    maxTeams: 16,
    format: '6v6 Indoor & Beach 2v2',
    skillLevel: 'Open Tournament',
    organizer: 'Goa Sports Authority',
    status: '🌴 Sunset Championship',
    badgeColor: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop',
    description: 'High energy beach volleyball under the coastal sunset with international ref team and beach festival atmosphere.'
  },
  {
    id: 'evt_esports_1',
    name: 'CyberArena Valorant & BGMI Masters',
    sport: 'Esports',
    sportIcon: '🎮',
    category: 'Esports',
    date: 'Nov 05 - Nov 07, 2024',
    time: '12:00 PM IST',
    location: 'Phoenix Arena & Live Online LAN',
    city: 'Pune',
    prizePool: '₹20,00,000',
    fee: '₹500 / Squad',
    registeredCount: 110,
    maxTeams: 128,
    format: 'LAN Finals + Online Qualifiers',
    skillLevel: 'Open Tier 1 & Tier 2',
    organizer: 'T3 Gaming Division',
    status: '🎮 Live Streamed',
    badgeColor: '#EC4899',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    description: 'India’s biggest grassroots esports cup with LAN stage, shoutcasters, broadcast desk, and gaming gear prizes.'
  },
  {
    id: 'evt_athletics_1',
    name: 'SpeedDemon Track & Field Invitational',
    sport: 'Athletics',
    sportIcon: '🏃',
    category: 'Athletics',
    date: 'Nov 15, 2024',
    time: '07:00 AM IST',
    location: 'Kanteerava Stadium, Bengaluru',
    city: 'Bengaluru',
    prizePool: '₹5,00,000',
    fee: '₹600 / Athlete',
    registeredCount: 85,
    maxTeams: 100,
    format: '100m, 400m & 4x100m Relay',
    skillLevel: 'Track Athletes',
    organizer: 'Speed Demon Athletics',
    status: '⚡ Timing Chip Verified',
    badgeColor: '#10B981',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop',
    description: 'Laser timing precision track meet for sprinters and middle-distance runners seeking official verified timings.'
  },
  {
    id: 'evt_swimming_1',
    name: 'HydroSprint National Aquatics Cup',
    sport: 'Swimming',
    sportIcon: '🏊',
    category: 'Swimming',
    date: 'Nov 22 - Nov 24, 2024',
    time: '08:30 AM IST',
    location: 'SPM Swimming Complex, New Delhi',
    city: 'New Delhi',
    prizePool: '₹7,50,000',
    fee: '₹700 / Event',
    registeredCount: 60,
    maxTeams: 80,
    format: '50m Freestyle, Butterfly, Backstroke',
    skillLevel: 'All Age Groups',
    organizer: 'National Aquatics Federation',
    status: '🏊 Olympic Standard Pool',
    badgeColor: '#06B6D4',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800&auto=format&fit=crop',
    description: 'State-of-the-art heated Olympic size pool event with electronic touchpads and aquatic sports certification.'
  }
];

const CATEGORIES = ['All', 'Cricket', 'Football', 'Basketball', 'Tennis', 'Badminton', 'Volleyball', 'Esports', 'Athletics', 'Swimming'];

export default function SportsEventBundle() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [swipedCards, setSwipedCards] = useState([]); 
  const [savedEvents, setSavedEvents] = useState([]); 
  const [selectedDetailsEvent, setSelectedDetailsEvent] = useState(null); 
  const [confirmRegisterEvent, setConfirmRegisterEvent] = useState(null); 
  
  const { user, profile, registerTournament } = useAuthStore();
  const navigate = useNavigate();

  // Filter events based on selected sport category
  const filteredEvents = MOCK_SPORTS_EVENTS.filter(
    e => selectedCategory === 'All' || e.category === selectedCategory
  );

  // Remaining cards stack
  const remainingEvents = filteredEvents.filter(e => !swipedCards.includes(e.id));
  const topEvent = remainingEvents[0];

  const handleSwipe = async (direction, eventToSwipe) => {
    if (!eventToSwipe) return;

    if (direction === 'right') {
      if (!user) {
        toast('Please login to register for events', { icon: '🔐' });
        navigate('/login');
        return;
      }
      try {
        await registerTournament(eventToSwipe);
        setConfirmRegisterEvent(eventToSwipe);
        toast.success(`Registered for ${eventToSwipe.name}! 🏆`, {
          icon: '🎉',
          style: { background: '#111111', color: '#B7FF2A', borderRadius: '12px' }
        });
      } catch (err) {
        toast.error(err.message || 'Registration failed');
      }
    } else {
      // Event skipped - no toast notification as requested
    }

    setSwipedCards(prev => [...prev, eventToSwipe.id]);
  };

  const handleUndo = () => {
    if (swipedCards.length === 0) return;
    setSwipedCards(prev => prev.slice(0, -1));
    toast('Card restored to bundle stack', { icon: '↩️' });
  };

  const handleToggleSave = (eventId) => {
    if (savedEvents.includes(eventId)) {
      setSavedEvents(prev => prev.filter(id => id !== eventId));
      toast('Removed from saved events', { icon: '🔖' });
    } else {
      setSavedEvents(prev => [...prev, eventId]);
      toast('Saved to your sports wishlist! ⭐', { icon: '⭐' });
    }
  };

  const handleRestart = () => {
    setSwipedCards([]);
    toast('Event bundle refreshed!', { icon: '🔄' });
  };

  return (
    <div className="bundle-container" style={{ width: '100%', maxWidth: 480, margin: '0 auto', boxSizing: 'border-box' }}>
      
      {/* Category Pills Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>🔥</span>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 4vw, 22px)', color: '#111111', letterSpacing: '-0.02em' }}>
              Sports Bundle Stack
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, background: '#111111', color: '#B7FF2A', padding: '4px 12px', borderRadius: 100, fontFamily: 'Space Grotesk' }}>
              {remainingEvents.length} Left
            </span>
          </div>
        </div>

        {/* Scrollable Categories */}
        <div 
          style={{ 
            display: 'flex', 
            gap: 8, 
            overflowX: 'auto', 
            WebkitOverflowScrolling: 'touch', 
            paddingBottom: 6,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? '#111111' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : '#444444',
                border: selectedCategory === cat ? '1px solid #111111' : '1px solid #E8E8E8',
                padding: '6px 14px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.2s',
                boxShadow: selectedCategory === cat ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* RESPONSIVE CARD STACK CONTAINER */}
      <div 
        style={{ 
          position: 'relative', 
          height: 'clamp(460px, 68vh, 540px)', 
          width: '100%', 
          perspective: 1000,
          touchAction: 'none'
        }}
      >
        <AnimatePresence>
          {remainingEvents.length > 0 ? (
            remainingEvents.slice(0, 3).map((event, index) => {
              const isTop = index === 0;
              return (
                <SwipeCard
                  key={event.id}
                  event={event}
                  index={index}
                  isTop={isTop}
                  onSwipe={(dir) => handleSwipe(dir, event)}
                  onOpenDetails={() => setSelectedDetailsEvent(event)}
                  onToggleSave={() => handleToggleSave(event.id)}
                  isSaved={savedEvents.includes(event.id)}
                />
              );
            })
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                height: '100%',
                width: '100%',
                background: '#FFFFFF',
                borderRadius: 24,
                border: '1px solid #E8E8E8',
                boxShadow: '0 16px 32px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                textAlign: 'center'
              }}
            >
              <div style={{ width: 64, height: 64, background: '#F6F6F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Sparkles size={32} color="#111111" />
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#111111', marginBottom: 6 }}>
                End of Event Bundle!
              </h3>
              <p style={{ color: '#666666', fontSize: 13, maxWidth: 300, lineHeight: 1.5, marginBottom: 20 }}>
                You've swiped through all available {selectedCategory !== 'All' ? selectedCategory : ''} sports tournaments.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  onClick={handleRestart}
                  className="btn-accent"
                  style={{ padding: '10px 20px', fontSize: 13 }}
                >
                  <RotateCcw size={14} /> Refresh Stack
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ACTION CONTROLS BAR BELOW STACK */}
      {remainingEvents.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, gap: 8 }}>
          
          {/* Undo */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleUndo}
            disabled={swipedCards.length === 0}
            title="Undo last swipe"
            style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid #E8E8E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: swipedCards.length === 0 ? 'not-allowed' : 'pointer',
              opacity: swipedCards.length === 0 ? 0.35 : 1,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              flexShrink: 0
            }}
          >
            <RotateCcw size={18} color="#555555" />
          </motion.button>

          {/* Skip / Pass (Swipe Left) */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('left', topEvent)}
            title="Skip Event"
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '2px solid #EF4444',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(239, 68, 68, 0.15)',
              flexShrink: 0
            }}
          >
            <X size={26} strokeWidth={2.5} />
          </motion.button>

          {/* Info Modal Trigger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => topEvent && setSelectedDetailsEvent(topEvent)}
            title="View Details"
            style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid #E8E8E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              flexShrink: 0
            }}
          >
            <Info size={18} color="#111111" />
          </motion.button>

          {/* REGISTER NOW Button (Swipe Right) */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSwipe('right', topEvent)}
            title="Register for Event"
            className="btn-accent"
            style={{
              height: 56,
              flex: 1,
              padding: '0 20px',
              borderRadius: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              fontSize: 15,
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(183, 255, 42, 0.4)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Zap size={18} fill="#111111" /> REGISTER
          </motion.button>
        </div>
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {selectedDetailsEvent && (
          <EventDetailsModal
            event={selectedDetailsEvent}
            onClose={() => setSelectedDetailsEvent(null)}
            onRegister={() => {
              const evt = selectedDetailsEvent;
              setSelectedDetailsEvent(null);
              handleSwipe('right', evt);
            }}
          />
        )}
      </AnimatePresence>

      {/* Registration Confirmation Modal */}
      <AnimatePresence>
        {confirmRegisterEvent && (
          <RegisterSuccessModal
            event={confirmRegisterEvent}
            profile={profile}
            onClose={() => setConfirmRegisterEvent(null)}
            onGoToTournaments={() => {
              setConfirmRegisterEvent(null);
              navigate('/dashboard/tournaments');
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// Single Responsive Swipe Card Component
function SwipeCard({ event, index, isTop, onSwipe, onOpenDetails, onToggleSave, isSaved }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const passOpacity = useTransform(x, [-120, -20], [1, 0]);
  const registerOpacity = useTransform(x, [20, 120], [0, 1]);

  const handleDragEnd = (e, info) => {
    if (!isTop) return;
    if (info.offset.x > 90 || info.velocity.x > 350) {
      onSwipe('right');
    } else if (info.offset.x < -90 || info.velocity.x < -350) {
      onSwipe('left');
    }
  };

  const translateY = index * 12;
  const scale = 1 - index * 0.04;
  const zIndex = 10 - index;
  const opacity = index > 2 ? 0 : 1;

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex,
        cursor: isTop ? 'grab' : 'default',
        touchAction: 'none',
      }}
      initial={{ scale: 0.9, y: 30, opacity: 0 }}
      animate={{ scale, y: translateY, opacity }}
      exit={{
        x: x.get() < 0 ? -500 : 500,
        opacity: 0,
        rotate: x.get() < 0 ? -25 : 25,
        transition: { duration: 0.25 }
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div
        className="premium-card"
        style={{
          width: '100%',
          height: '100%',
          background: '#FFFFFF',
          borderRadius: 24,
          border: '1px solid #E8E8E8',
          boxShadow: isTop ? '0 16px 36px -8px rgba(0,0,0,0.12)' : '0 6px 16px rgba(0,0,0,0.04)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >

        {/* SWIPE OVERLAYS */}
        {isTop && (
          <>
            <motion.div
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                zIndex: 30,
                opacity: registerOpacity,
                border: '3px solid #B7FF2A',
                background: 'rgba(17, 17, 17, 0.92)',
                color: '#B7FF2A',
                padding: '6px 16px',
                borderRadius: 12,
                fontFamily: 'Space Grotesk',
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: '0.05em',
                transform: 'rotate(-10deg)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 8px 24px rgba(183, 255, 42, 0.4)'
              }}
            >
              REGISTER 🚀
            </motion.div>

            <motion.div
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                zIndex: 30,
                opacity: passOpacity,
                border: '3px solid #EF4444',
                background: 'rgba(239, 68, 68, 0.95)',
                color: '#FFFFFF',
                padding: '6px 16px',
                borderRadius: 12,
                fontFamily: 'Space Grotesk',
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: '0.05em',
                transform: 'rotate(10deg)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)'
              }}
            >
              SKIP ✕
            </motion.div>
          </>
        )}

        {/* HERO IMAGE AREA */}
        <div style={{ height: 'clamp(180px, 38%, 220px)', position: 'relative', overflow: 'hidden', background: '#111111', flexShrink: 0 }}>
          <img
            src={event.image}
            alt={event.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)'
            }}
          />

          {/* Top Pill Badges */}
          <div style={{ position: 'absolute', top: 12, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
            <div
              style={{
                background: 'rgba(17, 17, 17, 0.85)',
                backdropFilter: 'blur(10px)',
                color: '#FFFFFF',
                padding: '4px 12px',
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <span>{event.sportIcon}</span>
              <span>{event.sport}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  background: event.badgeColor || '#B7FF2A',
                  color: '#111111',
                  padding: '4px 10px',
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '-0.01em'
                }}
              >
                {event.status}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave();
                }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(17, 17, 17, 0.75)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isSaved ? '#EF4444' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <Heart size={15} fill={isSaved ? '#EF4444' : 'none'} />
              </button>
            </div>
          </div>

          {/* Event Title over Image Bottom */}
          <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16, zIndex: 10 }}>
            <h4
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(18px, 4vw, 22px)',
                color: '#FFFFFF',
                marginBottom: 2,
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                textShadow: '0 2px 6px rgba(0,0,0,0.6)'
              }}
            >
              {event.name}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 500 }}>
              <MapPin size={13} color="#B7FF2A" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        {/* CARD CONTENT BODY */}
        <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          {/* Key Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
            <div style={{ background: '#F6F6F6', padding: '10px 12px', borderRadius: 12, border: '1px solid #E8E8E8' }}>
              <span style={{ color: '#888888', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>EVENT DATE</span>
              <p style={{ color: '#111111', fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>{event.date}</p>
            </div>

            <div style={{ background: '#F6F6F6', padding: '10px 12px', borderRadius: 12, border: '1px solid #E8E8E8' }}>
              <span style={{ color: '#888888', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>PRIZE POOL</span>
              <p style={{ color: '#111111', fontSize: 13, fontWeight: 800, fontFamily: 'Space Grotesk', lineHeight: 1.2 }}>{event.prizePool}</p>
            </div>

            <div style={{ background: '#F6F6F6', padding: '10px 12px', borderRadius: 12, border: '1px solid #E8E8E8' }}>
              <span style={{ color: '#888888', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>ENTRY FEE</span>
              <p style={{ color: '#111111', fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>{event.fee}</p>
            </div>

            <div style={{ background: '#F6F6F6', padding: '10px 12px', borderRadius: 12, border: '1px solid #E8E8E8' }}>
              <span style={{ color: '#888888', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>SLOTS</span>
              <p style={{ color: '#111111', fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>{event.registeredCount}/{event.maxTeams} Teams</p>
            </div>
          </div>

          <p style={{ color: '#555555', fontSize: 12, lineHeight: 1.45, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {event.description}
          </p>

          {/* CARD ACTION BUTTONS - REGISTER BUTTON ON EVERY CARD */}
          <div style={{ display: 'flex', gap: 8, paddingTop: 10, borderTop: '1px solid #E8E8E8', marginTop: 'auto' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails();
              }}
              className="btn-secondary"
              style={{ flex: 1, padding: '10px', fontSize: 12, borderRadius: 100 }}
            >
              Details
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSwipe('right');
              }}
              className="btn-accent"
              style={{
                flex: 2,
                padding: '10px',
                fontSize: 13,
                borderRadius: 100,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5
              }}
            >
              <Zap size={15} fill="#111111" /> REGISTER NOW
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

// Event Details Modal
function EventDetailsModal({ event, onClose, onRegister }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
      }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="premium-card"
        style={{
          width: '100%',
          maxWidth: 500,
          background: '#FFFFFF',
          borderRadius: 24,
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 0
        }}
      >
        <div style={{ height: 200, position: 'relative', background: '#111111' }}>
          <img src={event.image} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.6)',
              color: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
          <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16 }}>
            <span style={{ background: '#B7FF2A', color: '#111111', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100, display: 'inline-block', marginBottom: 6 }}>
              {event.sport} • {event.format}
            </span>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 22, color: '#FFFFFF', fontWeight: 700 }}>{event.name}</h3>
          </div>
        </div>

        <div style={{ padding: 20 }}>
          <p style={{ color: '#555555', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            {event.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div style={{ background: '#F6F6F6', padding: 12, borderRadius: 14 }}>
              <span style={{ color: '#888888', fontSize: 11, fontWeight: 600 }}>PRIZE POOL</span>
              <p style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: '#111111', marginTop: 2 }}>{event.prizePool}</p>
            </div>
            <div style={{ background: '#F6F6F6', padding: 12, borderRadius: 14 }}>
              <span style={{ color: '#888888', fontSize: 11, fontWeight: 600 }}>ENTRY FEE</span>
              <p style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: '#111111', marginTop: 2 }}>{event.fee}</p>
            </div>
            <div style={{ background: '#F6F6F6', padding: 12, borderRadius: 14 }}>
              <span style={{ color: '#888888', fontSize: 11, fontWeight: 600 }}>LOCATION</span>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#111111', marginTop: 2 }}>{event.location}</p>
            </div>
            <div style={{ background: '#F6F6F6', padding: 12, borderRadius: 14 }}>
              <span style={{ color: '#888888', fontSize: 11, fontWeight: 600 }}>DATE</span>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#111111', marginTop: 2 }}>{event.date}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onClose} className="btn-secondary" style={{ flex: 1, padding: '12px' }}>Close</button>
            <button onClick={onRegister} className="btn-accent" style={{ flex: 2, padding: '12px', fontWeight: 700 }}>
              <Zap size={16} fill="#111111" /> Register Now
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Registration Success Pop-up Modal
function RegisterSuccessModal({ event, profile, onClose, onGoToTournaments }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
      }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 30 }}
        onClick={e => e.stopPropagation()}
        className="premium-card"
        style={{
          width: '100%',
          maxWidth: 440,
          background: '#FFFFFF',
          borderRadius: 24,
          padding: 28,
          textAlign: 'center',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)'
        }}
      >
        <div style={{ width: 72, height: 72, background: '#B7FF2A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(183, 255, 42, 0.4)' }}>
          <CheckCircle2 size={42} color="#111111" strokeWidth={2.5} />
        </div>

        <span style={{ fontSize: 12, fontWeight: 700, color: '#22C55E', background: '#F0FDF4', padding: '4px 12px', borderRadius: 100, display: 'inline-block', marginBottom: 10 }}>
          Registration Confirmed! 🎉
        </span>

        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#111111', marginBottom: 6 }}>
          {event.name}
        </h3>
        <p style={{ color: '#666666', fontSize: 13, marginBottom: 20, lineHeight: 1.5 }}>
          Your entry for <strong style={{ color: '#111111' }}>{event.sport}</strong> ({event.location}) has been submitted under athlete name <strong style={{ color: '#111111' }}>{profile?.name || 'Athlete'}</strong>.
        </p>

        <div style={{ background: '#F6F6F6', padding: 14, borderRadius: 14, marginBottom: 20, textAlign: 'left', border: '1px solid #E8E8E8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
            <span style={{ color: '#888888' }}>Date:</span>
            <span style={{ fontWeight: 600, color: '#111111' }}>{event.date}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
            <span style={{ color: '#888888' }}>Entry Fee:</span>
            <span style={{ fontWeight: 600, color: '#111111' }}>{event.fee}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: '#888888' }}>Status:</span>
            <span style={{ fontWeight: 700, color: '#22C55E' }}>Confirmed ✓</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} className="btn-secondary" style={{ flex: 1, padding: '11px', fontSize: 13 }}>
            Keep Swiping
          </button>
          <button onClick={onGoToTournaments} className="btn-primary" style={{ flex: 1, padding: '11px', fontSize: 13 }}>
            My Tournaments
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
