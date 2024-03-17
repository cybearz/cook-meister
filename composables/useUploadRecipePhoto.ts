import type { StorageError } from "@supabase/storage-js"

export default () => {
	const client = useSupabaseClient()

	const path = ref<string | null>(null)
	const error = ref<StorageError | null>(null)

	const uploadPhoto = async (photo: File) => {
		const res = await client.storage
			.from("dish-images")
			.upload(photo.name, photo)

		path.value = res.data?.path ?? null
		error.value = res.error
	}

	return {
		path,
		error,
		uploadPhoto,
	}
}
