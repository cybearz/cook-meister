import type Dish from "@/types/Dish"
import type DishConfig from "@/types/DishConfig"
import type RecipeConfig from "@/types/RecipeConfig"
import OpenAI from "openai"
import {
	GENERATE_DISHES_INSTRUCTION,
	GENERATE_RECIPE_INSTRUCTION,
	createGenerateDishesPrompt,
	createGenerateRecipePrompt,
} from "./utils/prompts"

const SYSTEM_MESSAGE: OpenAI.Chat.ChatCompletionSystemMessageParam = {
	role: "system",
	content: `You are a helpful cooking bot that assists in finding the best recipes for dishes that can be prepared at home, based on user queries. The suggested recipes should be delicious and preferably well-known.
	If you understand what dish the user want, then answer with a recipe.
	If the user can't decide what he wants then offer him your help:
	- Provide your suggestions.
	- If the user doesn't like anything, then suggest to describe the desired dish or use the configurator.
	Answer only questions related to recipes.
	Provide an answer in russian`,
}

class CookBot {
	openai: OpenAI

	constructor() {
		this.openai = new OpenAI()
	}

	async generateDishes(dishConfig: DishConfig) {
		try {
			const completion = await this.openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				temperature: 0.5,
				max_tokens: 1024,
				response_format: {
					type: "json_object",
				},
				messages: [
					GENERATE_DISHES_INSTRUCTION,
					createGenerateDishesPrompt(dishConfig),
				],
			})

			const parsedResp = JSON.parse(
				completion.choices[0].message.content as string
			)
			return parsedResp.dishList as Dish[]
		} catch (e) {
			console.error(e)
			return null
		}
	}

	async generateRecipe(recipeConfig: RecipeConfig) {
		console.log("Generated prompt: ", createGenerateRecipePrompt(recipeConfig))
		const completion = await this.openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			temperature: 0.5,
			max_tokens: 1024,
			response_format: {
				type: "json_object",
			},
			messages: [
				GENERATE_RECIPE_INSTRUCTION,
				createGenerateRecipePrompt(recipeConfig),
			],
		})

		const { message } = completion.choices[0]
		try {
			const resp = JSON.parse(message.content as string)
			console.log("resp: ", resp)
			return resp
		} catch (e) {
			console.log(e)
			return null
		}
	}

	async chat(messages: OpenAI.Chat.ChatCompletionMessageParam[]) {
		const completion = await this.openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [SYSTEM_MESSAGE, ...messages],
		})
		return completion.choices[0].message
	}
}

export const cookBot = new CookBot()
