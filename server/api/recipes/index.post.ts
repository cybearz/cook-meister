import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const user = event.context.user
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

	const resp = await prisma.recipe.create({
		data: {
			name,
			description,
			cookingTime,
			difficulty,
			kilocalories,
			ingredients: {
				createMany: {
					data: ingredients,
				},
			},
			steps,
			photoUrl,
			author: user?.id,
		},
	})
	return resp
})
