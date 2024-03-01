import type Dish from "@/types/Dish"
import type DishConfig from "@/types/DishConfig"
import type RecipeConfig from "@/types/RecipeConfig"
import OpenAI from "openai"
import {
	ASSISTANT_INSTRUCTION,
	GENERATE_DISHES_INSTRUCTION,
	GENERATE_RECIPE_INSTRUCTION,
	createGenerateDishesPrompt,
	createGenerateRecipePrompt,
} from "./utils/prompts"

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
			messages: [ASSISTANT_INSTRUCTION, ...messages],
		})
		return completion.choices[0].message
	}
}

export const cookBot = new CookBot()
