import { cookBot } from "../cookBot"
import type OpenAI from "openai"

export default defineEventHandler(async (event) => {
	const { messages } = await readBody(event)
	const resp = await cookBot.chat(messages)
	return resp
})
