import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const id = Number(getRouterParam(event, "id"))
	const recipe = await prisma.recipe.findUnique({
		where: {
			id,
		},
	})
	return recipe
})
