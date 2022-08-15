import { useEffect, useState, Fragment } from 'react'

import { Camera, CameraResultType } from '@capacitor/camera'
import { useIonLoading, useIonToast, IonImg } from '@ionic/react'

import { useAuth } from '../contexts/Auth'
import { supabase } from '../utils/supabaseClient'

export default function UploadAvatar({ _avatarUrl, disabledUpload, ...props }) {
	const [avatarUrl, setAvatarUrl] = useState('')
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()
	const { user } = useAuth()
	const getAvatarProfile = async () => {
		await showLoading()
		try {
			let { data, error, status } = await supabase
				.from('profiles')
				.select('avatar_url')
				.eq('id', user?.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setAvatarUrl(data.avatar_url)
			}
		} catch (error) {
			showToast({
				header: 'Erro',
				message: error.message,
				position: 'top',
				color: 'danger',
				cssClass: 'text-white',
				duration: 5000,
				animated: true
			})
		} finally {
			await hideLoading()
		}
	}

	useEffect(() => {
		if (_avatarUrl) {
			setAvatarUrl(_avatarUrl)
		} else if (user) {
			getAvatarProfile()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, _avatarUrl])

	useEffect(() => {
		if (avatarUrl) {
			downloadImage(avatarUrl)
		}
	}, [avatarUrl])
	const uploadAvatar = async () => {
		try {
			const photo = await Camera.getPhoto({
				resultType: CameraResultType.DataUrl
			})

			const file = await fetch(photo.dataUrl)
				.then(res => res.blob())
				.then(
					blob =>
						new File([blob], 'my-file', { type: `image/${photo.format}` })
				)

			const fileName = `${
				user.id
			}-${Math.random()}-${new Date().getTime()}.${photo.format}`

			let { data, error, status } = await supabase
				.from('profiles')
				.select('avatar_url')
				.eq('id', user?.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				let { data: deleteData, error: deleteError } =
					await supabase.storage.from('avatars').remove([data.avatar_url])

				if (deleteError) {
					throw deleteError
				}
				if (deleteData) {
					let { error: uploadError } = await supabase.storage
						.from('avatars')
						.upload(fileName, file, {
							// cacheControl: '3600',
							upsert: true
						})
					if (uploadError) {
						throw uploadError
					} else {
						await supabase
							.from('profiles')
							.update({
								avatar_url: fileName
							})
							.eq('id', user.id)
							.single()
						getAvatarProfile()
					}
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	const downloadImage = async path => {
		try {
			const { data, error } = await supabase.storage
				.from('avatars')
				.download(path)

			if (error) {
				throw error
			}
			const url = URL.createObjectURL(data)
			setAvatarUrl(url)
		} catch (error) {
			console.log('Error downloading image: ', error.message)
		}
	}

	return avatarUrl ? (
		<IonImg
			src={avatarUrl}
			onClick={() => !disabledUpload && uploadAvatar()}
			{...props}
		/>
	) : (
		<IonImg
			src={'/img/Profile.png'}
			onClick={() => !disabledUpload && uploadAvatar()}
			{...props}
		/>
	)
}
