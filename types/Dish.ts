type Difficulty = "Легко" | "Средне" | "Сложно"

export default interface Dish {
	photoUrl: string
	name: string
	description: null | string
	difficulty: null | Difficulty
	kilocalories: null | number
	cookingTime: null | number
}
