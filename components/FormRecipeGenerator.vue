<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types"
import breakfast from "@/assets/breakfast.svg"
import dinner from "@/assets/dinner.svg"
import lunch from "@/assets/lunch.svg"
import snack from "@/assets/snack.svg"
import { z } from "zod"

const emit = defineEmits(["submit"])

const mealTypeItems = [
	{
		icon: "i-mdi-egg-fried",
		value: "Завтрак",
		label: "Завтрак",
	},
	{
		icon: "i-mdi-food-ramen",
		value: "Обед",
		label: "Обед",
	},
	{
		icon: "i-mdi-food-steak",
		value: "Ужин",
		label: "Ужин",
	},
	{
		icon: "i-mdi-food-croissant",
		value: "Перекус",
		label: "Перекус",
	},
]

const cookingTimeItems = [
	{
		value: "До 15 минут",
		label: "До 15 минут",
	},
	{
		value: "15-30 минут",
		label: "15-30 минут",
	},
	{
		value: "60+ минут",
		label: "60+ минут",
	},
]

const state = reactive({
	mealType: undefined,
	servingsNum: 1,
	cookingTime: undefined,
	ingredients: [],
	specialPreferences: undefined,
})

const curStep = ref(0)
const schema = [
	z.object({
		mealType: z.string({
			required_error: "Укажите прием пищи",
		}),
	}),
	z.object({
		servingsNum: z.number(),
		cookingTime: z.string({
			required_error: "Укажите время",
		}),
	}),
	z.object({
		ingredients: z.string().array().min(1, "Добавьте хотя бы 1"),
	}),
	z.object({
		specialPreferences: z.string().optional(),
	}),
]

async function onSubmit(event: FormSubmitEvent<any>) {
	if (curStep.value + 1 < schema.length) {
		curStep.value++
		return
	}
	emit("submit", event.data)
}

const refForm = ref(null)
</script>

<template>
	<UForm
		ref="refForm"
		:schema="schema[curStep]"
		:state="state"
		class="h-full flex flex-col justify-between"
		@submit="onSubmit"
	>
		<div class="text-center">Шаг {{ curStep + 1 }} из {{ schema.length }}</div>
		<div class="flex-1">
			<div v-show="curStep === 0">
				<UFormGroup label="Что готовим?" name="mealType" test="norm">
					<AppList v-model="state.mealType" :items="mealTypeItems" />
				</UFormGroup>
			</div>

			<div v-show="curStep === 1">
				<UFormGroup label="Количество порций" name="servingsNum">
					<AmountInput v-model="state.servingsNum" :min="1" />
				</UFormGroup>

				<UFormGroup
					label="Время на приготовление"
					name="cookingTime"
					class="mt-4"
				>
					<AppList
						v-model="state.cookingTime"
						:items="cookingTimeItems"
						chips
					/>
				</UFormGroup>
			</div>

			<div v-show="curStep === 2">
				<UFormGroup label="Основные ингредиенты" name="ingredients">
					<AutoComplete
						v-model="state.ingredients"
						items-src="/api/ingredients"
					/>
				</UFormGroup>
			</div>

			<div v-show="curStep === 3">
				<UFormGroup
					label="Предпочтения и пожелания"
					name="specialPreferences"
					description="Укажите любую информацию, которая поможет адаптировать рецепт под ваш запрос"
				>
					<UTextarea
						v-model="state.specialPreferences"
						placeholder="Ваши предпочтения"
					/>
				</UFormGroup>
			</div>
		</div>

		<div class="flex justify-between mb-8">
			<div>
				<UButton
					v-show="curStep !== 0"
					variant="ghost"
					icon="i-heroicons-arrow-left"
					@click="curStep--"
				>
					Назад
				</UButton>
			</div>
			<UButton
				type="submit"
				variant="ghost"
				icon="i-heroicons-arrow-right"
				:trailing="true"
			>
				Далее
			</UButton>
		</div>
	</UForm>
</template>
