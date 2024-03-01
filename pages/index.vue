<script lang="ts" setup>
import type Dish from "@/types/Dish"
import type DishConfig from "@/types/DishConfig"
import type DishParams from "@/types/DishParams"
import type Recipe from "@/types/Recipe"
import type RecipeConfig from "@/types/RecipeConfig"

const userRequest = ref<string>("")
const dishList = reactive({
	items: [] as Dish[],
	loading: false,
})

const isOpen = ref(false)
const dishParams = ref<DishParams>({
	mealType: null,
	dishType: null,
	cuisineType: "",
	diet: null,
	cookingTime: null,
})

//Todo lodash
const appliedParamsNum = computed(() => {
	let count = 0

	for (let key in dishParams.value) {
		if (
			dishParams.value.hasOwnProperty(key) &&
			dishParams.value[key] !== null &&
			dishParams.value[key] !== ""
		) {
			count++
		}
	}

	return count
})

const canSearch = computed(
	() => appliedParamsNum.value > 0 || userRequest.value.length > 3
)

const applyDishParams = (data: any) => {
	isOpen.value = false
	dishParams.value = data
}

const generateDishes = async () => {
	dishList.loading = true
	try {
		dishList.items = await $fetch("/api/generate-dishes", {
			method: "POST",
			body: {
				dishConfig: {
					dishParams: dishParams.value,
					userRequest: userRequest.value,
				} as DishConfig,
			},
		})
	} finally {
		dishList.loading = false
	}
}

const recipeModal = reactive({
	isOpen: false,
	loading: false,
	item: null as null | Recipe,
})

const generateRecipeForDish = async (dish: Dish) => {
	recipeModal.isOpen = true
	recipeModal.loading = true

	const { name, description, cookingTime, difficulty, kilocalories } = dish
	try {
		const resp = await $fetch("/api/generate-recipe", {
			method: "POST",
			body: {
				recipeConfig: { name, description, cookingTime } as RecipeConfig,
			},
		})

		recipeModal.item = {
			name,
			description,
			difficulty,
			kilocalories,
			cookingTime,
			...resp,
		}
	} finally {
		recipeModal.loading = false
	}
}

const promptIdeas = [
	"Рецепты с яйцами",
	"Вегетарианские обеды",
	"Гриль",
	"Праздничные блюда",
	"Легкие салаты",
	"Десерты без сахара",
	"Фаст-фуд",
	"Что взять с собой на природу",
	"Ланчи в офис",
	"Зимние супы и горячие напитки",
	"Морепродукты",
	"Здоровое питание",
	"Бюджетные блюда",
	"Детское меню",
]
</script>

<template>
	<div class="flex flex-col h-full">
		<UFormGroup label="Генератор рецептов">
			<UInput
				v-model="userRequest"
				placeholder="Что хотите приготовить?"
				autofocus
				size="lg"
				:ui="{
					icon: { trailing: { pointer: '' }, leading: { pointer: '' } },
				}"
				class="w-full"
				@keyup.enter="canSearch && generateDishes()"
			>
				<template #leading>
					<UChip
						:text="appliedParamsNum"
						size="xl"
						:show="appliedParamsNum > 0"
					>
						<UButton
							variant="link"
							icon="i-heroicons-adjustments-horizontal"
							:padded="false"
							@click="isOpen = true"
						/>
					</UChip>
				</template>

				<template #trailing>
					<UButton
						variant="link"
						icon="i-mdi-search"
						:padded="false"
						:disabled="!canSearch"
						:loading="dishList.loading"
						@click="generateDishes"
					/>
				</template>
			</UInput>
		</UFormGroup>
		<AppLoading v-if="dishList.loading" />
		<template v-else>
			<div
				v-if="dishList.items.length > 0"
				class="flex-1 space-y-2 mt-4 overflow-y-auto"
			>
				<DishCard
					v-for="(dish, idx) in dishList.items"
					:dish="dish"
					:key="idx"
					@click="generateRecipeForDish(dish)"
				/>
			</div>

			<template v-else>
				<h3 class="text-sm text-gray-500 font-medium mt-4 mb-2">
					Примеры запросов:
				</h3>
				<div class="flex flex-wrap gap-1">
					<UButton
						v-for="(prompt, idx) in promptIdeas"
						variant="outline"
						size="xs"
						:key="idx"
						:label="prompt"
						@click="userRequest = prompt"
					/>
				</div>
			</template>
		</template>

		<UModal v-model="recipeModal.isOpen" fullscreen>
			<UCard
				:ui="{
					base: 'h-full flex flex-col',
					rounded: '',
					divide: 'divide-y divide-gray-100 dark:divide-gray-800',
					body: {
						base: 'grow overflow-y-auto',
					},
				}"
			>
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="font-semibold text-gray-900">Рецепт</h3>
						<UButton
							color="gray"
							variant="ghost"
							icon="i-mdi-close"
							class="-my-1"
							@click="recipeModal.isOpen = false"
						/>
					</div>
				</template>

				<AppLoading v-if="recipeModal.loading" />
				<DishRecipe v-else-if="recipeModal.item" :recipe="recipeModal.item" />
			</UCard>
		</UModal>

		<UModal v-model="isOpen" fullscreen>
			<UCard
				:ui="{
					base: 'h-full flex flex-col',
					rounded: '',
					divide: 'divide-y divide-gray-100 dark:divide-gray-800',
					body: {
						base: 'grow',
					},
				}"
			>
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="font-semibold text-gray-900">Конфигуратор</h3>
						<UButton
							color="gray"
							variant="ghost"
							icon="i-heroicons-x-mark-20-solid"
							class="-my-1"
							@click="isOpen = false"
						/>
					</div>
				</template>

				<FormDishParams @submit="applyDishParams" />
			</UCard>
		</UModal>
	</div>
</template>
