
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase, getCurrentUser, getSession, signOut as supabaseSignOut } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type AuthContextType = {
  session: Session | null
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get the current session
        const currentSession = await getSession()
        setSession(currentSession)
        
        if (currentSession) {
          const currentUser = await getCurrentUser()
          setUser(currentUser)
          setIsAuthenticated(true)
          toast.success('Successfully signed in!')
        }
      } catch (error) {
        console.error('Error loading auth context:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user || null)
        setIsAuthenticated(!!session?.user)
        setLoading(false)
        
        if (event === 'SIGNED_IN') {
          toast.success('Successfully signed in!')
          navigate('/results')
        } else if (event === 'SIGNED_OUT') {
          toast.info('Successfully signed out')
          navigate('/')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])

  const handleSignOut = async () => {
    try {
      await supabaseSignOut()
      setUser(null)
      setSession(null)
      setIsAuthenticated(false)
      navigate('/')
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Failed to sign out')
    }
  }

  const value = {
    session,
    user,
    loading,
    signOut: handleSignOut,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
