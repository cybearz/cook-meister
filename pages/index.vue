<script lang="ts" setup>
import type { FormError } from "#ui/types"
const step = ref(1)
const state = reactive({
	ingredients: "",
	time: "",
	dishName: "",
})

const loading = ref(false)

const dishIdeas = ref(null)

async function getDishIdeas() {
	loading.value = true
	dishIdeas.value = await $fetch("http://localhost:3001/get_dish_ideas", {
		method: "POST",
		body: {
			ingredients: state.ingredients,
			time: state.time,
		},
	})
	loading.value = false
	step.value += 1
}

const receipt = ref(null)

async function getReceipt(dish_name) {
	loading.value = true
	state.dishName = dish_name
	receipt.value = await $fetch("http://localhost:3001/get_dish_receipt", {
		method: "POST",
		body: {
			dish_name: state.dishName,
			ingredients: state.ingredients,
			time: state.time,
		},
	})
	loading.value = false
	step.value += 1
}
</script>

<template>
	<UProgress v-if="loading" animation="carousel" />
	<UContainer>
		<div class="mt-8">
			<div v-if="step === 1" class="space-y-4">
				<h1>Что хотите приготовить?</h1>
				<UFormGroup label="Ингредиенты" name="ingredients">
					<UInput v-model="state.ingredients" />
				</UFormGroup>
				<UFormGroup label="Время" name="time">
					<UInput v-model="state.time" />
				</UFormGroup>

				<UButton block @click="getDishIdeas">Далее</UButton>
			</div>
			<div v-if="step === 2">
				<h1>Возможные блюда:</h1>
				<UCard
					v-for="dish in dishIdeas"
					:key="dish.name"
					class="mt-4 mb-2 cursor-pointer"
					@click="getReceipt(dish.name)"
				>
					<template #header>
						<strong>{{ dish.name }}</strong>
					</template>
					{{ dish.description }}
				</UCard>
			</div>
			<div v-if="step === 3">
				<h1>{{ state.dishName }}</h1>
				<h3>Рецепт:</h3>
				<UCard
					v-for="step in receipt"
					:key="step.step_num"
					class="mb-2 mt-4"
					@click="getReceipt(dish.name)"
				>
					<template #header>
						<strong>Шаг {{ step.step_num }}</strong>
					</template>
					{{ step.description }}
				</UCard>
				<UButton class="mt-4" block @click="step = 1">Заново</UButton>
			</div>
		</div>
	</UContainer>
</template>
