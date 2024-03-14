import { cookBot } from "../cookBot"

export default defineEventHandler(async (event) => {
	const { recipeConfig } = await readBody(event)
	const resp = await cookBot.generateImage(recipeConfig)
	return resp
})
