import { createClient } from '@supabase/supabase-js'

// Replace with your Supabase credentials from .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database functions
export const saveTeamCompletion = async (teamName, completionTime, hintsUsed) => {
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
