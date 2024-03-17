import type { Recipe } from "@prisma/client"
export default () => {
	const recipes = ref<Recipe[] | null>(null)
	const error = ref<string | null>(null)
	const pending = ref(false)

	const getRecipes = async () => {
		pending.value = true

		try {
			recipes.value = await $fetch("/api/recipes", {
				method: "GET",
			})
		} catch (e) {
			error.value = "Something went wrong..."
		} finally {
			pending.value = false
		}
	}

	return {
		recipes,
		error,
		pending,
		getRecipes,
	}
}
