import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TournamentsPage from './pages/TournamentsPage'
import TournamentDetails from './pages/TournamentDetails'
import RankingsPage from './pages/RankingsPage'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardOverview from './pages/dashboard/DashboardOverview'
import SportsPassport from './pages/dashboard/SportsPassport'
import DashRankings from './pages/dashboard/DashRankings'
import DashTournaments from './pages/dashboard/DashTournaments'
import DashTeam from './pages/dashboard/DashTeam'
import Achievements from './pages/dashboard/Achievements'
import DashSettings from './pages/dashboard/DashSettings'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore()
  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#FFFFFF' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#111111', fontFamily: 'Inter, sans-serif' }}>Loading T3 Sports...</p>
      </div>
    </div>
  )
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const { initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111111',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            borderRadius: '12px',
          }
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tournaments" element={<TournamentsPage />} />
        <Route path="/tournaments/:id" element={<TournamentDetails />} />
        <Route path="/rankings" element={<RankingsPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardOverview />} />
          <Route path="passport" element={<SportsPassport />} />
          <Route path="team" element={<DashTeam />} />
          <Route path="rankings" element={<DashRankings />} />
          <Route path="tournaments" element={<DashTournaments />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="settings" element={<DashSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
