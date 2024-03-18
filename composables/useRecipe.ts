import type { Recipe } from "@prisma/client"

export default (id: string) => {
	const {
		data: recipe,
		error,
		pending,
		refresh,
	} = useLazyFetch<Recipe>(`/api/recipes/${id}`, {
		method: "GET",
	})

	return {
		recipe,
		error,
		pending,
		refresh,
	}
}
