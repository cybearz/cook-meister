import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const id = Number(getRouterParam(event, "id"))
	try {
		const recipe = await prisma.recipe.findUniqueOrThrow({
			where: {
				id,
			},
			include: {
				ingredients: {
					select: {
						name: true,
						amount: true,
						measureUnit: true,
					},
				},
			},
		})
		return recipe
	} catch (e) {
		throw createError({
			statusCode: 404,
			statusMessage: "Рецепт не найден",
		})
	}
})
