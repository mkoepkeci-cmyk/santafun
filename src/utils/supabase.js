import { createClient } from '@supabase/supabase-js'

// Supabase credentials from .env (optional - game works without it)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create client if valid credentials exist
const isConfigured = supabaseUrl && supabaseKey &&
  supabaseUrl.startsWith('http') && supabaseKey.length > 20

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Database functions - gracefully handle missing Supabase
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
