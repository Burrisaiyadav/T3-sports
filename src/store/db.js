// Simulated Database using LocalStorage
const DB_KEY = 't3_sports_db'

const initialDbState = {
  users: {}, // email -> user profile
  teams: {}, // id -> team data
  tournaments: {}, // id -> tournament data
  notifications: {}, // email -> array of notifications
}

function getDB() {
  try {
    const data = localStorage.getItem(DB_KEY)
    return data ? JSON.parse(data) : initialDbState
  } catch (e) {
    return initialDbState
  }
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db))
}

export const db = {
  // --- USERS ---
  createUser: (email, password, metadata) => {
    const database = getDB()
    if (database.users[email]) {
      throw new Error('User already exists')
    }
    
    const newUser = {
      id: 'user_' + Date.now(),
      email,
      password, // In a real app this would be hashed
      created_at: new Date().toISOString(),
      profile: {
        name: metadata.name || '',
        phone: metadata.phone || '',
        user_type: metadata.user_type || 'athlete',
        username: metadata.name ? metadata.name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000) : '',
        bio: '',
        sport: '',
        position: '',
        city: '',
        state: '',
        team: '',
        followers: 0,
        following: 0,
        avatarUrl: '',
        coverUrl: '',
        achievements: [],
        certificates: [],
        photos: [],
        tournamentHistory: [],
      }
    }
    
    database.users[email] = newUser
    
    // Add welcome notification
    if (!database.notifications[email]) database.notifications[email] = []
    database.notifications[email].push({
      id: 'notif_' + Date.now(),
      title: 'Welcome to T3 Sports!',
      msg: 'Complete your profile to get discovered.',
      time: 'Just now',
      read: false,
      type: 'system'
    })
    
    saveDB(database)
    return newUser
  },

  getUser: (email) => {
    return getDB().users[email] || null
  },

  updateUserProfile: (email, profileUpdates) => {
    const database = getDB()
    if (!database.users[email]) throw new Error('User not found')
    
    database.users[email].profile = {
      ...database.users[email].profile,
      ...profileUpdates
    }
    saveDB(database)
    return database.users[email]
  },

  verifyLogin: (email, password) => {
    const user = getDB().users[email]
    if (!user) throw new Error('Invalid email or password')
    if (user.password !== password) throw new Error('Invalid email or password')
    return user
  },

  // --- TEAMS ---
  createTeam: (teamData, creatorEmail) => {
    const database = getDB()
    const teamId = 'team_' + Date.now()
    database.teams[teamId] = {
      id: teamId,
      ...teamData,
      captain: creatorEmail,
      members: [{ email: creatorEmail, role: 'captain' }],
      joinRequests: [],
      created_at: new Date().toISOString()
    }
    saveDB(database)
    return database.teams[teamId]
  },
  
  // --- NOTIFICATIONS ---
  getNotifications: (email) => {
    return getDB().notifications[email] || []
  },
  
  markNotificationRead: (email, notifId) => {
    const database = getDB()
    if (database.notifications[email]) {
      const notif = database.notifications[email].find(n => n.id === notifId)
      if (notif) notif.read = true
    }
    saveDB(database)
  },

  // --- TOURNAMENT REGISTRATIONS ---
  registerTournament: (email, tournament) => {
    const database = getDB()
    if (!database.users[email]) return null
    
    if (!database.users[email].profile.tournamentHistory) {
      database.users[email].profile.tournamentHistory = []
    }
    
    const exists = database.users[email].profile.tournamentHistory.some(t => t.id === tournament.id)
    if (!exists) {
      database.users[email].profile.tournamentHistory.unshift({
        ...tournament,
        registeredAt: new Date().toISOString(),
        status: 'Registered'
      })
      
      // Add notification
      if (!database.notifications[email]) database.notifications[email] = []
      database.notifications[email].unshift({
        id: 'notif_' + Date.now(),
        title: `Registered for ${tournament.name}! 🏆`,
        msg: `Your spot in ${tournament.sport} (${tournament.location}) is confirmed.`,
        time: 'Just now',
        read: false,
        type: 'tournament'
      })

      saveDB(database)
    }
    return database.users[email]
  }
}
