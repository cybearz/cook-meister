<script lang="ts" setup>
import type DishConfig from "@/types/DishConfig"
import type DishParams from "@/types/DishParams"
import type RecipeConfig from "@/types/RecipeConfig"
import type Dish from "@/types/Dish"
import type Recipe from "@/types/Recipe"

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
</script>

<template>
	<div class="flex flex-col h-full">
		<UFormGroup label="Генератор рецептов" hint="Как пользоваться?">
			<UInput
				v-model="userRequest"
				placeholder="Что хотите приготовить?"
				autofocus
				size="lg"
				:ui="{
					icon: { trailing: { pointer: '' }, leading: { pointer: '' } },
				}"
				class="w-full"
				@keyup.enter="generateDishes()"
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
						:disabled="!userRequest"
						:loading="dishList.loading"
						@click="generateDishes"
					/>
				</template>
			</UInput>
		</UFormGroup>
		<AppLoading v-if="dishList.loading" />
		<div v-else-if="dishList.items" class="space-y-2 mt-4">
			<DishCard
				v-for="(dish, idx) in dishList.items"
				:dish="dish"
				:key="idx"
				@click="generateRecipeForDish(dish)"
			/>
		</div>

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
~/types/DishConfig ~/types/Dish ~/types/Recipe
