<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types"
import type { Ingredient } from "@/types/Ingredient"
import type Recipe from "@/types/Recipe"
import _ from "lodash"
import { z } from "zod"

const emit = defineEmits(["submit", "delete"])
const props = defineProps<{
	modelValue?: Recipe
	loading: boolean
}>()

const { modelValue, loading } = toRefs(props)
const state = ref<Recipe>({
	photoUrl: "",
	name: "",
	description: "",
	difficulty: "Легко",
	kilocalories: null,
	cookingTime: 1,
	ingredients: [
		{ name: "", amount: 1, measureUnit: "г" },
		{ name: "", amount: 1, measureUnit: "г" },
	],
	steps: [""],
})

watch(
	modelValue,
	(v) => {
		_.assign(state.value, v)
	},
	{ immediate: true }
)

const photo = ref<null | File>(null)
const schema = z.object({
	name: z.string().min(3, "Укажите название рецепта"),
	description: z.string().min(3, "Укажите описание"),
	cookingTime: z
		.number({
			required_error: " ",
			invalid_type_error: " ",
		})
		.min(1, ""),
	ingredients: z
		.object({
			name: z.string(),
			amount: z.number(),
			measureUnit: z.string(),
		})
		.array()
		.min(2)
		.refine((val) => !val.find((v) => v.name === ""), {
			message: "Заполните все ингредиенты (минимум 2)",
		}),
	steps: z
		.string()
		.array()
		.refine((val) => !val.includes(""), {
			message: "Заполните все шаги (минимум 1)",
		}),
})

async function onSubmit(event: FormSubmitEvent<Recipe>) {
	emit("submit", event.data, photo.value)
}
</script>

<template>
	<UForm
		:state="state"
		:schema="schema"
		class="space-y-4"
		:validateOn="['submit']"
		@submit="onSubmit"
	>
		<UFormGroup name="photo" class="flex justify-center">
			<AppInputImage v-model:file="photo" v-model:imgSrc="state.photoUrl" />
		</UFormGroup>

		<UFormGroup name="name" label="Название рецепта" required>
			<UInput v-model="state.name" placeholder="Борщ" />
		</UFormGroup>

		<UFormGroup name="description" label="Описание" required>
			<UTextarea
				v-model="state.description"
				placeholder="Вкусный домашний суп..."
			/>
		</UFormGroup>

		<UDivider label="ПАРАМЕТРЫ" />

		<div class="flex gap-2">
			<UFormGroup name="cookingTime" label="Время" required class="flex-1">
				<UInput
					v-model="state.cookingTime"
					type="number"
					:ui="{
						trailing: { padding: { sm: 'pr-12' } },
					}"
				>
					<template #trailing>мин.</template>
				</UInput>
			</UFormGroup>
			<UFormGroup name="difficulty" label="Сложность" required class="flex-1">
				<USelect
					v-model="state.difficulty"
					:options="['Легко', 'Средне', 'Сложно']"
				/>
			</UFormGroup>
			<UFormGroup name="kilocalories" label="Килокалории" class="flex-1">
				<UInput v-model="state.kilocalories" type="number" />
			</UFormGroup>
		</div>
		<UFormGroup name="ingredients">
			<FormRecipeIngredients v-model="state.ingredients as Ingredient[]" />
		</UFormGroup>

		<UFormGroup name="steps">
			<FormRecipeSteps v-model="state.steps as string[]" />
		</UFormGroup>
		<div class="flex gap-2">
			<UButton
				v-if="modelValue"
				color="red"
				variant="outline"
				block
				:loading="loading"
				class="flex-1"
				@click="emit('delete')"
			>
				Удалить
			</UButton>
			<UButton type="submit" block :loading="loading" class="flex-1">
				{{ modelValue ? "Изменить" : "Создать" }}
			</UButton>
		</div>
	</UForm>
</template>
