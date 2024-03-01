import { cookBot } from "../cookBot"

export default defineEventHandler(async (event) => {
	const { recipeConfig } = await readBody(event)
	const resp = await cookBot.generateRecipe(recipeConfig)
	return resp
})
