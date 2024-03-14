import type Dish from "@/types/Dish"
import type { Ingredient } from "./Ingredient"

export default interface Recipe extends Dish {
	ingredients: Ingredient[]
	steps: string[]
}
