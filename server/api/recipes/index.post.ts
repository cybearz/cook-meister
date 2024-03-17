import { PrismaClient } from "@prisma/client"
import { serverSupabaseUser } from "#supabase/server"
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event)
	const recipe = await readBody(event)

	if (!recipe.photoUrl) {
		recipe.photoUrl =
			"https://qsyfeplduspmspmrltyh.supabase.co/storage/v1/object/public/dish-images/no-image.svg"
	}

	await prisma.recipe.create({
		data: {
			...recipe,
			author: user?.id,
		},
	})
	return true
})
