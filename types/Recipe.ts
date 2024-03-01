import type Dish from "@/types/Dish"

interface Step {
	num: number
	instruction: string
}

type Difficulty = "Легко" | "Средне" | "Сложно"

export default interface Recipe extends Dish {
	ingredients: string[]
	steps: Step[]
}
