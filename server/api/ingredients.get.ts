import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const { search } = getQuery(event)

	const recipeList = await prisma.ingredient.findMany({
		where: {
			name: {
				contains: String(search),
			},
		},
		select: {
			name: true,
		},
	})

	return recipeList
})
