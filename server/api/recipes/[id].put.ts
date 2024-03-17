import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const id = Number(getRouterParam(event, "id"))
	const recipe = await readBody(event)
	if (!recipe.photoUrl) {
		recipe.photoUrl =
			"https://qsyfeplduspmspmrltyh.supabase.co/storage/v1/object/public/dish-images/no-image.svg"
	}

	await prisma.recipe.update({
		where: {
			id,
		},
		data: recipe,
	})
	return recipe
})
