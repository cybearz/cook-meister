// import { PrismaClient } from "@prisma/client"
// const prisma = new PrismaClient()

// async function seed() {
// 	await prisma.recipe.createMany({
// 		data: [
// 			{
// 				name: "Борщ",
// 				description: "Вкусный суп",
// 				cookingTime: 15,
// 				difficulty: "Легко",
// 				kilocalories: 220,
// 				ingredients: [
// 					{ name: "Вода", amount: 1, measureUnit: "г" },
// 					{ name: "Соль", amount: 1, measureUnit: "г" },
// 				],
// 				steps: ["Вскипятить воду", "Приготовить суп"],
// 			},
// 		],
// 	})
// }

// try {
// 	await seed()
// 	await prisma.$disconnect()
// } catch (e) {
// 	console.error(e)
// 	await prisma.$disconnect()
// 	process.exit(1)
// }
