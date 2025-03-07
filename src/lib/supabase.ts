
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kbvezdhokmsflzrrmenz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidmV6ZGhva21zZmx6cnJtZW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNzM2NzIsImV4cCI6MjA1Njg0OTY3Mn0.YYZO2_HUFT0Wl5IjYo8xddz5A9SILVfA-HDSMkGuFg8'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Authentication helper functions
export const signUp = async (
  email: string, 
  password: string, 
  userData: { 
    username: string, 
    full_name: string, 
    age: number, 
    referral_source: string 
  }
) => {
  // Register the user with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: userData.username,
        full_name: userData.full_name,
        age: userData.age,
        referral_source: userData.referral_source
      }
    }
  })
  
  if (error) throw error
  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser()
  
  if (error) throw error
  return data.user
}

// Session management
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  
  if (error) throw error
  return data.session
}

// Add social login methods
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/dashboard'
    }
  })
  
  if (error) throw error
  return data
}

export const signInWithTwitter = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'twitter',
    options: {
      redirectTo: window.location.origin + '/dashboard'
    }
  })
  
  if (error) throw error
  return data
}

export const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: window.location.origin + '/dashboard'
    }
  })
  
  if (error) throw error
  return data
}

// Supplement tracking
export const recordSupplementIntake = async (userId: string, supplementId: string, date: string, taken: boolean, timeOfDay: string) => {
  const { data, error } = await supabase
    .from('supplement_tracking')
    .upsert({
      user_id: userId,
      supplement_id: supplementId,
      date,
      taken,
      time_of_day: timeOfDay
    })
    
  if (error) throw error
  return data
}

export const getSupplementIntakeRecords = async (userId: string, startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .from('supplement_tracking')
    .select('*')
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate)
    
  if (error) throw error
  return data
}

// Calculate weekly compliance score
export const getWeeklyComplianceScore = async (userId: string, startDate: string, endDate: string) => {
  const records = await getSupplementIntakeRecords(userId, startDate, endDate)
  
  const totalRecords = records.length
  const takenRecords = records.filter(record => record.taken).length
  
  if (totalRecords === 0) return 0
  return Math.round((takenRecords / totalRecords) * 100)
}
