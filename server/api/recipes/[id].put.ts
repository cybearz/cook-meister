import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const id = Number(getRouterParam(event, "id"))
	const recipe = await readBody(event)
	await prisma.recipe.update({
		where: {
			id,
		},
		data: recipe,
	})
	return recipe
})
