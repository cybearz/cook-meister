import ingredients from "@/server/ingredients.json"

export default defineEventHandler((event) => {
	const { search } = getQuery(event)
	if (search === "") return ingredients.slice(0, 15)

	const foundIngredients = ingredients.filter((item) =>
		item.toLowerCase().includes(search?.toLowerCase())
	)

	return foundIngredients
})
