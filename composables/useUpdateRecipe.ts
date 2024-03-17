import type { Recipe } from "@prisma/client"

export default () => {
	const data = ref<string | null>(null)
	const error = ref<string | null>(null)
	const pending = ref(false)

	const updateRecipe = async (id: string, recipe: Recipe, photoFile: File) => {
		data.value = null
		pending.value = true

		const { path, error: uploadError, uploadPhoto } = useUploadRecipePhoto()

		let photoUrl = recipe.photoUrl
		if (photoFile) {
			await uploadPhoto(photoFile)
			if (uploadError.value) {
				error.value = uploadError.value.message
				return
			}

			const { url, downloadPhoto } = useDownloadRecipePhoto()

			await downloadPhoto(path.value as string)
			photoUrl = url.value as string
		}

		try {
			await $fetch(`/api/recipes/${id}`, {
				method: "PUT",
				body: { ...recipe, photoUrl },
			})
			data.value = "Ok"
		} catch (e) {
			error.value = "Something went wrong..."
		} finally {
			pending.value = false
		}
	}

	return {
		data,
		error,
		pending,
		updateRecipe,
	}
}
