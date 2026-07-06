import { create } from 'zustand'

export const useUIStore = create((set) => ({
  sidebarCollapsed: false,
  notificationsOpen: false,
  searchOpen: false,
  searchQuery: '',

  toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleNotifications: () => set(s => ({ notificationsOpen: !s.notificationsOpen })),
  setSearchOpen: (v) => set({ searchOpen: v }),
  setSearchQuery: (q) => set({ searchQuery: q }),
}))

export const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Live Match Alert', msg: 'MI vs CSK is now LIVE!', time: '2 min ago', type: 'live', read: false },
  { id: 2, title: 'Tournament Registration', msg: 'District Cricket Cup 2025 registration open', time: '1 hr ago', type: 'tournament', read: false },
  { id: 3, title: 'Profile View', msg: 'A coach from Mumbai Academy viewed your profile', time: '3 hr ago', type: 'talent', read: true },
  { id: 4, title: 'Ranking Update', msg: 'You moved up 3 positions in State Rankings!', time: '1 day ago', type: 'ranking', read: true },
]

export const MOCK_SEARCH_RESULTS = {
  athletes: [
    { id: 1, name: 'Arjun Sharma', sport: 'Cricket', role: 'Batsman', school: 'Delhi Public School', state: 'Delhi' },
    { id: 2, name: 'Priya Nair', sport: 'Badminton', role: 'Singles Player', school: 'St. Mary\'s', state: 'Kerala' },
    { id: 3, name: 'Rohit Kumar', sport: 'Football', role: 'Midfielder', school: 'KV No.1', state: 'Punjab' },
  ],
  tournaments: [
    { id: 1, name: 'District Cricket Cup 2025', sport: 'Cricket', date: 'Jul 15, 2025', location: 'Delhi' },
    { id: 2, name: 'State Football League', sport: 'Football', date: 'Aug 1, 2025', location: 'Mumbai' },
  ],
  academies: [
    { id: 1, name: 'Mumbai Cricket Academy', sport: 'Cricket', location: 'Mumbai', rating: 4.8 },
    { id: 2, name: 'Delhi Badminton Institute', sport: 'Badminton', location: 'Delhi', rating: 4.6 },
  ],
}
