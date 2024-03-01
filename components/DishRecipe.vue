<script setup lang="ts">
import type Recipe from "@/types/Recipe"

interface Props {
	recipe: Recipe
}
const emit = defineEmits(["click:back"])
const props = defineProps<Props>()
</script>

<template>
	<div>
		<h3 class="text-2xl font-semibold text-center">{{ recipe.name }}</h3>
		<div class="flex gap-4 mt-4">
			<div
				class="flex-1 flex flex-col justify-center items-center border rounded-lg p-4"
			>
				<UIcon name="i-mdi-clock-outline" class="text-xl" />
				<div class="mt-2">{{ recipe.cookingTime }} мин</div>
			</div>

			<div
				class="flex-1 flex flex-col justify-center items-center border rounded-lg p-4"
			>
				<UIcon name="i-mdi-cooker" class="text-xl" />
				<div class="mt-2">{{ recipe.difficulty }}</div>
			</div>

			<div
				class="flex-1 flex flex-col justify-center items-center border rounded-lg p-4"
			>
				<UIcon name="i-mdi-fire" class="text-xl" />
				<div class="mt-2">{{ recipe.kilocalories }} кКал</div>
			</div>
		</div>

		<div class="font-semibold mt-4">Описание:</div>
		<p>{{ recipe.description }}</p>

		<div class="font-semibold mt-4">Ингредиенты:</div>
		<ol class="list-disc list-inside">
			<li v-for="(ingredient, idx) in recipe.ingredients" :key="idx">
				{{ ingredient }}
			</li>
		</ol>

		<div class="font-semibold mt-4">Процесс:</div>
		<div class="space-y-2">
			<p v-for="(step, idx) in recipe.steps">
				<span class="font-semibold">Шаг {{ step.num }}.</span>
				{{ step.instruction }}
			</p>
		</div>
	</div>
</template>
~/types/Recipe
