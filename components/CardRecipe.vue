<script setup lang="ts">
import type Recipe from "@/types/Recipe"

const emit = defineEmits(["click:edit"])
const props = defineProps<Recipe>()
</script>

<template>
	<div>
		<div
			v-if="photoUrl"
			class="h-60 bg-center bg-cover bg-no-repeat"
			:style="{ backgroundImage: `url(${photoUrl})` }"
		/>
		<h3 class="text-lg font-semibold mt-2">{{ name }}</h3>

		<div class="flex gap-2 mt-2">
			<UBadge variant="solid" size="sm">
				<UIcon name="i-mdi-clock-outline" class="mr-1" />
				{{ cookingTime }} мин
			</UBadge>
			<UBadge variant="solid" size="sm">
				<UIcon name="i-mdi-cooker" class="mr-1" />
				{{ difficulty }}
			</UBadge>
			<UBadge v-if="kilocalories" variant="solid" size="sm">
				<UIcon name="i-mdi-fire" class="mr-1" />
				{{ kilocalories }} кКал
			</UBadge>
		</div>
		<p class="mt-2">{{ description }}</p>
		<div class="space-y-2 mt-4">
			<h3 class="font-semibold">Ингредиенты:</h3>
			<div
				v-for="(ingredient, idx) in ingredients"
				:key="idx"
				class="flex justify-between gap-2"
			>
				<div>{{ idx + 1 }}. {{ ingredient.name }}</div>
				<div class="flex-1 border-b border-dashed mb-1 border-black" />
				<div>{{ ingredient.amount }} {{ ingredient.measureUnit }}</div>
			</div>
		</div>

		<div class="space-y-2 mt-4">
			<h3 class="font-semibold">Приготовление:</h3>
			<p v-for="(step, idx) in steps" :key="idx">
				<span class="font-semibold">Шаг {{ idx + 1 }}.</span>
				{{ step }}
			</p>
		</div>
	</div>
</template>
