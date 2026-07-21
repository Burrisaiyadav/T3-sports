import { create } from 'zustand'
import { db } from './db'

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  loading: true,
  profile: null,

  initialize: async () => {
    const sessionEmail = localStorage.getItem('t3_session_email')
    if (sessionEmail) {
      const user = db.getUser(sessionEmail)
      if (user) {
        set({ user, session: { user }, profile: user.profile, loading: false })
      } else {
        localStorage.removeItem('t3_session_email')
        set({ loading: false })
      }
    } else {
      set({ loading: false })
    }
  },

  signIn: async (email, password) => {
    const user = db.verifyLogin(email, password)
    localStorage.setItem('t3_session_email', email)
    set({ user, session: { user }, profile: user.profile })
    return { user }
  },

  signUp: async (email, password, metadata) => {
    const user = db.createUser(email, password, metadata)
    localStorage.setItem('t3_session_email', email)
    set({ user, session: { user }, profile: user.profile })
    return { user }
  },

  updateProfile: async (profileUpdates) => {
    const { user } = get()
    if (!user) throw new Error('Not logged in')
    const updatedUser = db.updateUserProfile(user.email, profileUpdates)
    set({ user: updatedUser, profile: updatedUser.profile })
    return updatedUser
  },

  signInWithGoogle: async () => {
    // Simulated Google Login
    const email = 'demo@google.com'
    let user = db.getUser(email)
    if (!user) {
      user = db.createUser(email, 'google_mock_password', { name: 'Google User' })
    }
    localStorage.setItem('t3_session_email', email)
    set({ user, session: { user }, profile: user.profile })
  },

  signOut: async () => {
    localStorage.removeItem('t3_session_email')
    set({ user: null, session: null, profile: null })
  },

  registerTournament: async (tournament) => {
    const { user } = get()
    if (!user) throw new Error('Please login to register for events')
    const updatedUser = db.registerTournament(user.email, tournament)
    if (updatedUser) {
      set({ user: updatedUser, profile: updatedUser.profile })
    }
    return updatedUser
  },
}))
