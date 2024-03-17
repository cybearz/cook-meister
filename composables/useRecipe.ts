import type { Recipe } from "@prisma/client"

export default () => {
	const recipe = ref<Recipe | null>(null)
	const error = ref<string | null>(null)
	const pending = ref(false)

	const getRecipe = async (id: string) => {
		pending.value = true

		try {
			recipe.value = await $fetch(`/api/recipes/${id}`, {
				method: "GET",
			})
		} catch (e) {
			error.value = "Something went wrong..."
		} finally {
			pending.value = false
		}
	}

	return {
		recipe,
		error,
		pending,
		getRecipe,
	}
}
