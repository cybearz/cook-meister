import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const ingredients = [
	"Молоко",
	"Яйца",
	"Хлеб",
	"Рис",
	"Макароны",
	"Картофель",
	"Помидоры",
	"Огурцы",
	"Морковь",
	"Лук",
	"Чеснок",
	"Свекла",
	"Капуста",
	"Перец",
	"Кукуруза",
	"Горошек",
	"Яблоки",
	"Авокадо",
	"Киви",
	"Гранат",
	"Манго",
	"Ананас",
	"Папайя",
	"Грейпфрут",
	"Финики",
	"Курица",
	"Говядина",
	"Свинина",
	"Рыба",
	"Креветки",
	"Мидии",
	"Крабы",
	"Кальмары",
	"Лосось",
	"Тунец",
]

async function seed() {
	await prisma.recipe.create({
		data: {
			name: "Sample 1",
			description: "asdasdasdadads",
			cookingTime: 15,
			difficulty: "Легко",
			kilocalories: 220,
			ingredients: {
				create: { name: "Вода", amount: 1, measureUnit: "г" },
			},
			steps: ["Вскипятить воду", "Приготовить суп"],
			author: "180c1148-5302-4367-92d8-d8237a4bcd70",
			photoUrl:
				"https://qsyfeplduspmspmrltyh.supabase.co/storage/v1/object/public/dish-images/no-image.svg",
		},
	})

	const ingredientObjList = ingredients.map((i) => ({
		name: i,
	}))

	await prisma.ingredient.createMany({
		data: ingredientObjList,
		skipDuplicates: true,
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
