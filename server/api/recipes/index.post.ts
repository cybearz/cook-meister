import { PrismaClient } from "@prisma/client"
import { serverSupabaseClient } from "#supabase/server"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const recipe = await readBody(event)
	await prisma.recipe.create({
		data: recipe,
	})
	return true
})
