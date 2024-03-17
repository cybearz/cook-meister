import type { Recipe } from "@prisma/client"

export default () => {
	const data = ref<string | null>(null)
	const error = ref<string | null>(null)
	const pending = ref(false)

	const deleteRecipe = async (id: string) => {
		pending.value = true

		try {
			await $fetch(`/api/recipes/${id}`, {
				method: "DELETE",
			})
			data.value = "Ok"
		} finally {
			pending.value = false
		}
	}

	return {
		data,
		error,
		pending,
		deleteRecipe,
	}
}
