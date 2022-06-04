import React, { useContext, useState, useEffect, createContext } from 'react'

import { supabase } from '../utils/supabaseClient'

// create a context for authentication
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	// create state values for user data and loading
	const [user, setUser] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Check active sessions and sets the user
		const session = supabase.auth.session()

		setUser(session?.user ?? null)
		setLoading(false)

		// Listen for changes on auth state (logged in, signed out, etc.)
		const { data: listener } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				setUser(session?.user ?? null)
				setLoading(false)
			}
		)

		// cleanup the useEffect hook
		return () => {
			listener?.unsubscribe()
		}
	}, [])

	// create signUp, signIn, signOut functions
	const value = {
		signUp: (data, options) => supabase.auth.signUp(data, options),
		signIn: (data, options) => supabase.auth.signIn(data, options),
		signOut: () => supabase.auth.signOut(),
		user
	}

	// use a provider to pass down the value
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

// export the useAuth hook
export const useAuth = () => {
	return useContext(AuthContext)
}
