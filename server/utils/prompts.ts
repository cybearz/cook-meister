import type DishConfig from "@/types/DishConfig"
import type RecipeConfig from "@/types/RecipeConfig"
import type OpenAI from "openai"

export const ASSISTANT_INSTRUCTION: OpenAI.Chat.ChatCompletionSystemMessageParam =
	{
		role: "system",
		content: `You are a helpful cooking bot that assists. You can help the user in finding recipes, dish ideas and other questions related to cooking. Don't answer the questions not related to the topic. Be polite and helpfull Provide an answer in russian`,
	}

export const GENERATE_DISHES_INSTRUCTION: OpenAI.Chat.ChatCompletionSystemMessageParam =
	{
		role: "system",
		content: `The user will provide you the following dish configurations: meal type, dish type, cuisine, diet, aproximate cooking time. Also the user may provide his special request. Try to provide 5 dishes or at least 3 if you cannot come up with more that will satisfy the conditions as a response. Each dish must have a name, a short description, approximate cooking time in minutes, number of kilocalories and the dish difficulty. Provide your response as a JSON object with the following schema:

{ dishList: [{ name: "...", description: "...", cookingTime: "...", kilocalories: "...", difficulty: "...", },  { name: "...", description: "...", cookingTime: "...", kilocalories: "...", difficulty: "...", }]  ...}

Your response must be in russian.
`,
	}

export function createGenerateDishesPrompt(
	dishConfig: DishConfig
): OpenAI.Chat.ChatCompletionUserMessageParam {
	const { mealType, dishType, cuisineType, diet, cookingTime } =
		dishConfig.dishParams

	return {
		role: "user",
		content: `Meal type: ${mealType}. Dish type: ${dishType}. Cuisine type: ${cuisineType}. Diet: ${diet}. Aproximate cooking time: ${cookingTime}. User request ${dishConfig.userRequest}`,
	}
}

export const GENERATE_RECIPE_INSTRUCTION: OpenAI.Chat.ChatCompletionSystemMessageParam =
	{
		role: "system",
		content: `The user will provide you the following dish configuration: name and description. Try to find a recipe for it.  The recipe must include the requiered ingredients and the cooking steps with the instructions. 
		The cookingTime  must be strictly in minutes.
The difficulty must be strictly one of these: "Легко", "Средне", "Сложно". 
The  measureUnit must be strictly one of these:  "г" - gram, "кг" - kilogram,  "шт" - piece, "мл" - milliliter, "л" - liter. 
The steps must not contain the step number.
Provide your response as a JSON object with the following schema:

{cookingTime: 1, difficulty: "...", kilocalories: 1, ingredients: [ { name: "...", amount: 1, measureUnit: "г" }, { name: "...", amount: 1, measureUnit: "г" }, ... ], steps: ["...", "...", ...] }

Your response must be in russian.`,
	}

export function createGenerateRecipePrompt(
	recipeConfig: RecipeConfig
): OpenAI.Chat.ChatCompletionUserMessageParam {
	const { name, description } = recipeConfig

	return {
		role: "user",
		content: `Name: ${name}. Description: ${description}.`,
	}
}
