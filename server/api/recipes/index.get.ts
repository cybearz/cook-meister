import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const recipeSelect = Prisma.validator<Prisma.RecipeArgs>()({
	select: {
		photoUrl: true,
		id: true,
		name: true,
		author: true,
	},
})

export type RecipesOutline = Prisma.RecipeGetPayload<typeof recipeSelect>

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
