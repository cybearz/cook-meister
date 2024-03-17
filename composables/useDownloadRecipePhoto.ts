import type { StorageError } from "@supabase/storage-js"

export default () => {
	const client = useSupabaseClient()

	const url = ref<string | null>(null)

	const downloadPhoto = async (path: string) => {
		const res = await client.storage.from("dish-images").getPublicUrl(path)
		url.value = res.data.publicUrl
	}
	return {
		url,
		downloadPhoto,
	}
}
