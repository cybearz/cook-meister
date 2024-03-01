import { cookBot } from "../cookBot"

export default defineEventHandler(async (event) => {
	const { dishConfig } = await readBody(event)
	const resp = await cookBot.generateDishes(dishConfig)
	return resp
})
