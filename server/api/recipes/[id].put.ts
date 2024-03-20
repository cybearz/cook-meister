import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const id = Number(getRouterParam(event, "id"))
	let {
		name,
		description,
		cookingTime,
		difficulty,
		kilocalories,
		ingredients,
		steps,
		photoUrl,
	} = await readBody(event)

	if (!photoUrl) {
		photoUrl =
			"https://qsyfeplduspmspmrltyh.supabase.co/storage/v1/object/public/dish-images/no-image.svg"
	}

	const recipeUpdate = prisma.recipe.update({
		where: {
			id,
		},
		data: {
			name,
			description,
			cookingTime,
			difficulty,
			kilocalories,
			steps,
			photoUrl,
		},
	})

	const ingredientsDelete = prisma.recipeIngredient.deleteMany({
		where: {
			recipeId: id,
		},
	})

	const ingredientsWithRecipeId = ingredients.map((i) => ({
		...i,
		recipeId: id,
	}))

	const ingredientsCreate = prisma.recipeIngredient.createMany({
		data: ingredientsWithRecipeId,
	})

	const result = await prisma.$transaction([
		recipeUpdate,
		ingredientsDelete,
		ingredientsCreate,
	])

	return result
})
