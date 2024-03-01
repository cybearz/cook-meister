<script setup lang="ts">
import type Dish from "@/types/Dish"
interface Props {
	dish: Dish
}

const props = defineProps<Props>()
</script>

<template>
	<div class="border rounded-lg p-4 space-y-1 hover:bg-gray-100 cursor-pointer">
		<h3 class="font-medium text-lg">{{ dish.name }}</h3>
		<div class="flex gap-2">
			<UBadge variant="outline" class="flex-inline gap-1 items-center">
				<UIcon name="i-mdi-clock-outline" />
				{{ dish.cookingTime }} мин
			</UBadge>

			<UBadge variant="outline" class="flex-inline gap-1 items-center">
				<UIcon name="i-mdi-cooker" />
				{{ dish.difficulty }}
			</UBadge>

			<UBadge variant="outline" class="flex-inline gap-1 items-center">
				<UIcon name="i-mdi-fire" />
				{{ dish.kilocalories }} кКал
			</UBadge>
		</div>

		<p>
			{{ dish.description }}
		</p>
	</div>
</template>
~/types/Dish
