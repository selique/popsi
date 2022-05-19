import React, { useContext, useState, useEffect } from 'react'

import { supabase } from '../utils/supabaseClient'

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [session, setSession] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setSession(supabase.auth.session())
		setLoading(false)

		const { data: listener } = supabase.auth.onAuthStateChange(
			async (_event, session) => {
				setSession(session)
				setLoading(false)
			}
		)

		return () => {
			listener?.unsubscribe()
		}
	}, [session])

	const value = {
		signUp: data => supabase.auth.signUp(data),
		signIn: data => supabase.auth.signIn(data),
		signOut: () => supabase.auth.signOut(),
		session
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
