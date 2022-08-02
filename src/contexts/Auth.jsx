import React, { useContext, useState, useEffect, createContext } from 'react'

import { supabase } from '../utils/supabaseClient'

// create a context for authentication
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	// create state values for user data and loading
	const [userSession, setUserSession] = useState()
	const [user, setUser] = useState()
	const [loading, setLoading] = useState(false)
	const [professional, setProfessional] = useState(false)

	const fetchUser = async () => {
		try {
			let { data, error, status } = await supabase
				.from('profiles')
				.select(`*`)
				.eq('id', userSession?.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setUser(data)
				setProfessional(data.role === 'MEDIC')
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		// Check active sessions and sets the user
		const session = supabase.auth.session()

		setUserSession(session?.user ?? null)
		setLoading(false)

		// Listen for changes on auth state (logged in, signed out, etc.)
		const { data: listener } = supabase.auth.onAuthStateChange(
			async (_, session) => {
				setUserSession(session?.user ?? null)
			}
		)

		// cleanup the useEffect hook
		return () => {
			listener?.unsubscribe()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	React.useEffect(() => {
		if (userSession) {
			setLoading(true)
			fetchUser()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userSession])

	// create signUp, signIn, signOut functions
	const value = {
		signUp: (data, options) => supabase.auth.signUp(data, options),
		signIn: (data, options) => supabase.auth.signIn(data, options),
		signOut: () => supabase.auth.signOut(),
		loading,
		professional,
		user,
		userSession
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
