import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function seed() {
	await prisma.recipe.createMany({
		data: [
			{
				name: "Sample 1",
				description: "asdasdasdadads",
				cookingTime: 15,
				difficulty: "Легко",
				kilocalories: 220,
				ingredients: [
					{ name: "Вода", amount: 1, measureUnit: "г" },
					{ name: "Соль", amount: 1, measureUnit: "г" },
				],
				steps: ["Вскипятить воду", "Приготовить суп"],
				author: "180c1148-5302-4367-92d8-d8237a4bcd70",
				photoUrl:
					"https://qsyfeplduspmspmrltyh.supabase.co/storage/v1/object/public/dish-images/no-image.svg",
			},
			{
				name: "Sample 2",
				description: "asdasdasdadads",
				cookingTime: 15,
				difficulty: "Легко",
				kilocalories: 220,
				ingredients: [
					{ name: "Вода", amount: 1, measureUnit: "г" },
					{ name: "Соль", amount: 1, measureUnit: "г" },
				],
				steps: ["Вскипятить воду", "Приготовить суп"],
				author: "180c1148-5302-4367-92d8-d8237a4bcd70",
				photoUrl:
					"https://qsyfeplduspmspmrltyh.supabase.co/storage/v1/object/public/dish-images/no-image.svg",
			},
			{
				name: "Sample 3",
				description: "asdasdasdadads",
				cookingTime: 15,
				difficulty: "Легко",
				kilocalories: 220,
				ingredients: [
					{ name: "Вода", amount: 1, measureUnit: "г" },
					{ name: "Соль", amount: 1, measureUnit: "г" },
				],
				steps: ["Вскипятить воду", "Приготовить суп"],
				author: "180c1148-5302-4367-92d8-d8237a4bcd70",
				photoUrl:
					"https://qsyfeplduspmspmrltyh.supabase.co/storage/v1/object/public/dish-images/no-image.svg",
			},
		],
	})
}

try {
	await seed()
	await prisma.$disconnect()
} catch (e) {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
}
