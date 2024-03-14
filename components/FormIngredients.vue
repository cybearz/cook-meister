<script lang="ts" setup>
import type { Ingredient, MeasureUnit } from "@/types/Ingredient"

interface Props {
	modelValue: Ingredient[]
}

const emit = defineEmits(["update:modelValue"])
const props = defineProps<Props>()

const modelValue = toRef(props, "modelValue")
const measureUnitList: MeasureUnit[] = [
	"шт",
	"г",
	"кг",
	"л",
	"мл",
	"ч.л",
	"ст.л",
]

const addIngredient = () => {
	modelValue.value.push({ name: "", amount: 1, measureUnit: "г" })
}
const a = [
	{ name: "...", amount: 1, measureUnit: "г" },
	{ name: "...", amount: 1, measureUnit: "г" },
]
</script>

<template>
	<div class="space-y-2">
		<UDivider label="ИНГРЕДИЕНТЫ" />

		<UFormGroup
			v-for="(ingredient, idx) in modelValue"
			:label="`Ингредиент ${idx + 1}`"
			:key="idx"
			:required="idx < 2"
		>
			<template v-if="idx > 1" #hint>
				<UButton
					color="red"
					size="2xs"
					variant="ghost"
					icon="i-mdi-trash"
					@click="modelValue.splice(idx, 1)"
				>
					Удалить
				</UButton>
			</template>
			<IngredientInput v-model="ingredient.name" />
			<div v-if="ingredient.name" class="flex gap-1 mt-1">
				<UInput v-model="ingredient.amount" type="number" class="w-20" />
				<USelect
					v-model="ingredient.measureUnit"
					:options="measureUnitList"
					class="flex-1"
				/>
			</div>
			<USelect v-else placeholder="Единица измерения" disabled class="mt-1" />
		</UFormGroup>
		<UButton variant="outline" block icon="i-mdi-plus" @click="addIngredient"
			>Добавить</UButton
		>
	</div>
</template>
