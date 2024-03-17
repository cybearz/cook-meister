import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const recipeList = await prisma.recipe.findMany({
		select: {
			photoUrl: true,
			id: true,
			name: true,
			author: true,
		},
	})
	return recipeList
})
