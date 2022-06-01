/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

import { Camera, CameraResultType } from '@capacitor/camera'
import { IonIcon } from '@ionic/react'
import { person } from 'ionicons/icons'

import { supabase } from '../utils/supabaseClient'
import Avatar from './ui/Avatar'

export default function UploadAvatar({ url, onUpload }) {
	const [avatarUrl, setAvatarUrl] = useState()

	useEffect(() => {
		if (url) {
			downloadImage(url)
		}
	}, [url])
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

			const fileName = `${Math.random()}-${new Date().getTime()}.${
				photo.format
			}`
			let { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(fileName, file)
			if (uploadError) {
				throw uploadError
			}
			onUpload(null, fileName)
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

	return (
		<div className="avatar">
			<div className="avatar_wrapper" onClick={uploadAvatar}>
				{avatarUrl ? (
					<Avatar background={avatarUrl} />
				) : (
					<IonIcon icon={person} className="no-avatar" />
				)}
			</div>
		</div>
	)
}
