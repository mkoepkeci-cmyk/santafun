import { createClient } from '@supabase/supabase-js'

// Supabase credentials from .env (optional - game works without it)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug: log env vars (remove in production)
console.log('Supabase URL:', supabaseUrl ? 'SET' : 'NOT SET')
console.log('Supabase Key:', supabaseKey ? 'SET (length: ' + supabaseKey?.length + ')' : 'NOT SET')

// Only create client if valid credentials exist
const isConfigured = supabaseUrl && supabaseKey &&
  supabaseUrl.startsWith('http') && supabaseKey.length > 20

console.log('Supabase configured:', isConfigured)

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Export configuration status for UI components
export const isSupabaseConfigured = () => isConfigured

// ============================================
// ORIGINAL TEAM COMPLETION (standalone mode)
// ============================================

export const saveTeamCompletion = async (teamName, completionTime, hintsUsed) => {
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('teams')
      .insert([
        {
          team_name: teamName,
          completion_time: completionTime,
          hints_used: hintsUsed,
          completed_at: new Date().toISOString()
        }
      ])

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving team:', error)
    return null
  }
}

export const getLeaderboard = async (limit = 10) => {
  if (!supabase) return []

  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('completion_time', { ascending: true })
      .limit(limit)

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return []
  }
}

// Clear the leaderboard (delete all teams from standalone mode)
export const clearLeaderboard = async () => {
  if (!supabase) return null

  try {
    const { error } = await supabase
      .from('teams')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all rows

    if (error) throw error
    console.log('Leaderboard cleared')
    return { success: true }
  } catch (error) {
    console.error('Error clearing leaderboard:', error)
    return null
  }
}

// ============================================
// GLOBAL GAME STATE (simplified - no session codes)
// ============================================

// Get current game state
export const getGameState = async () => {
  if (!supabase) return { is_active: false }

  try {
    const { data, error } = await supabase
      .from('game_state')
      .select('*')
      .eq('id', 1)
      .single()

    if (error) throw error
    return data || { is_active: false }
  } catch (error) {
    console.error('Error fetching game state:', error)
    return { is_active: false }
  }
}

// Start the game (facilitator)
export const startGameGlobal = async () => {
  if (!supabase) {
    console.error('Supabase not configured')
    return null
  }

  console.log('Starting game...')

  try {
    const { data, error } = await supabase
      .from('game_state')
      .update({ is_active: true, started_at: new Date().toISOString() })
      .eq('id', 1)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    console.log('Game started successfully:', data)
    return data
  } catch (error) {
    console.error('Error starting game:', error)
    return null
  }
}

// End the game and clear all teams (facilitator)
export const endGameGlobal = async () => {
  if (!supabase) return null

  try {
    // Get all teams first, then delete each one
    const { data: teams } = await supabase
      .from('live_teams')
      .select('id')

    console.log('Teams to delete:', teams)

    // Delete hint requests for each team
    if (teams && teams.length > 0) {
      for (const team of teams) {
        await supabase
          .from('hint_requests')
          .delete()
          .eq('team_id', team.id)
      }

      // Delete each team individually
      for (const team of teams) {
        const { error } = await supabase
          .from('live_teams')
          .delete()
          .eq('id', team.id)

        if (error) {
          console.error('Error deleting team:', team.id, error)
        } else {
          console.log('Deleted team:', team.id)
        }
      }
    }

    // Clear the leaderboard (teams table) for fresh game
    await clearLeaderboard()

    // Reset game state
    const { data, error } = await supabase
      .from('game_state')
      .update({ is_active: false, started_at: null })
      .eq('id', 1)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error ending game:', error)
    return null
  }
}

// Subscribe to game state changes
export const subscribeToGameState = (callback) => {
  if (!supabase) return null

  return supabase
    .channel('game-state')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'game_state',
      filter: 'id=eq.1'
    }, callback)
    .subscribe()
}

// Force clear all teams (separate utility function)
export const clearAllTeams = async () => {
  if (!supabase) {
    console.error('Supabase not configured')
    return { error: 'Not configured' }
  }

  console.log('=== FORCE CLEARING ALL TEAMS ===')

  try {
    // Get all teams first
    const { data: allTeams, error: fetchError } = await supabase
      .from('live_teams')
      .select('id, team_name')

    console.log('Found teams to delete:', allTeams)

    if (fetchError) {
      console.error('Error fetching teams:', fetchError)
      return { error: fetchError }
    }

    if (!allTeams || allTeams.length === 0) {
      console.log('No teams to delete')
      return { success: true, deleted: [] }
    }

    // Delete hint requests first (foreign key constraint)
    for (const team of allTeams) {
      console.log('Deleting hints for team:', team.id)
      const { error: hintErr } = await supabase
        .from('hint_requests')
        .delete()
        .eq('team_id', team.id)

      if (hintErr) console.error('Hint delete error:', hintErr)
    }

    // Now delete each team by ID
    const deleted = []
    for (const team of allTeams) {
      console.log('Attempting to delete team:', team.id, team.team_name)

      const { data, error } = await supabase
        .from('live_teams')
        .delete()
        .eq('id', team.id)
        .select()

      console.log('Delete result for', team.team_name, ':', { data, error })

      if (error) {
        console.error('Delete failed for team', team.id, ':', error)
      } else {
        deleted.push(team)
      }
    }

    // Verify deletion
    const { data: remaining } = await supabase
      .from('live_teams')
      .select('id, team_name')

    console.log('Remaining teams after delete:', remaining)

    return { success: true, deleted, remaining }
  } catch (err) {
    console.error('Exception in clearAllTeams:', err)
    return { error: err }
  }
}

// ============================================
// LIVE TEAMS (simplified - no session_id required)
// ============================================

// Register a team (no session needed)
export const registerTeam = async (teamName) => {
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('live_teams')
      .insert([{ team_name: teamName, current_room: 0 }])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error registering team:', error)
    return null
  }
}

// Get all teams (no session filter)
export const getAllTeams = async () => {
  if (!supabase) return []

  try {
    const { data, error } = await supabase
      .from('live_teams')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching teams:', error)
    return []
  }
}

// Subscribe to all teams
export const subscribeToAllTeams = (callback) => {
  if (!supabase) return null

  return supabase
    .channel('all-teams')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'live_teams'
    }, callback)
    .subscribe()
}

// Update team's current room
export const updateTeamRoom = async (teamId, roomNumber) => {
  if (!supabase) return null

  try {
    const updates = {
      current_room: roomNumber,
      updated_at: new Date().toISOString()
    }

    // If starting room 1, set start time
    if (roomNumber === 1) {
      updates.start_time = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('live_teams')
      .update(updates)
      .eq('id', teamId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating team room:', error)
    return null
  }
}

// Complete team's game
export const completeTeamGame = async (teamId, completionTime, hintsUsed) => {
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('live_teams')
      .update({
        current_room: 6,
        completion_time: completionTime,
        hints_used: hintsUsed,
        updated_at: new Date().toISOString()
      })
      .eq('id', teamId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error completing team:', error)
    return null
  }
}

// ============================================
// FACILITATED MODE - Hint Requests
// ============================================

// Request a hint (team)
export const requestHint = async (teamId, roomKey, hintNumber) => {
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('hint_requests')
      .insert([{ team_id: teamId, room_key: roomKey, hint_number: hintNumber }])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error requesting hint:', error)
    return null
  }
}

// Get all pending hint requests (facilitator)
export const getAllPendingHintRequests = async () => {
  if (!supabase) return []

  try {
    const { data, error } = await supabase
      .from('hint_requests')
      .select(`
        *,
        live_teams(team_name)
      `)
      .eq('status', 'pending')
      .order('requested_at', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching hint requests:', error)
    return []
  }
}

// Subscribe to all hint requests
export const subscribeToAllHintRequests = (callback) => {
  if (!supabase) return null

  return supabase
    .channel('all-hints')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'hint_requests'
    }, callback)
    .subscribe()
}

// Get approved hints for a team
export const getApprovedHints = async (teamId) => {
  if (!supabase) return []

  try {
    const { data, error } = await supabase
      .from('hint_requests')
      .select('*')
      .eq('team_id', teamId)
      .eq('status', 'approved')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching approved hints:', error)
    return []
  }
}

// Approve a hint request (facilitator)
export const approveHintRequest = async (requestId) => {
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('hint_requests')
      .update({ status: 'approved', responded_at: new Date().toISOString() })
      .eq('id', requestId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error approving hint:', error)
    return null
  }
}

// Deny a hint request (facilitator)
export const denyHintRequest = async (requestId) => {
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('hint_requests')
      .update({ status: 'denied', responded_at: new Date().toISOString() })
      .eq('id', requestId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error denying hint:', error)
    return null
  }
}

// ============================================
// REALTIME SUBSCRIPTIONS
// ============================================

// Subscribe to session changes
export const subscribeToSession = (sessionId, callback) => {
  if (!supabase) return null

  return supabase
    .channel(`session-${sessionId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'game_sessions',
      filter: `id=eq.${sessionId}`
    }, callback)
    .subscribe()
}

// Subscribe to teams in a session
export const subscribeToTeams = (sessionId, callback) => {
  if (!supabase) return null

  return supabase
    .channel(`teams-${sessionId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'live_teams',
      filter: `session_id=eq.${sessionId}`
    }, callback)
    .subscribe()
}

// Subscribe to hint requests for a session
export const subscribeToHintRequests = (sessionId, callback) => {
  if (!supabase) return null

  // We need to subscribe to all hint_requests and filter in the callback
  // because Supabase doesn't support filtering on joined tables
  return supabase
    .channel(`hints-${sessionId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'hint_requests'
    }, callback)
    .subscribe()
}

// Subscribe to hint approvals for a specific team
export const subscribeToTeamHints = (teamId, callback) => {
  if (!supabase) return null

  return supabase
    .channel(`team-hints-${teamId}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'hint_requests',
      filter: `team_id=eq.${teamId}`
    }, callback)
    .subscribe()
}
