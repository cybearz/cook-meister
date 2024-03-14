export type MeasureUnit = "г" | "шт" | "кг" | "мл" | "л" | "ч.л" | "ст.л"

export interface Ingredient {
	name: string
	amount: number
	measureUnit: MeasureUnit
}
