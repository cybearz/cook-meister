<script lang="ts" setup>
import type { Ingredient, MeasureUnit } from "@/types/Ingredient"
import draggable from "vuedraggable"

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
</script>

<template>
	<div class="space-y-2">
		<UDivider label="ИНГРЕДИЕНТЫ" />
		<draggable :list="modelValue" item-key="id">
			<template #item="{ element: ingredient, index }">
				<div class="flex items-center gap-2 mb-2">
					<UButton
						size="2xs"
						variant="ghost"
						:padded="false"
						class="mt-5"
						icon="i-mdi-drag"
					/>
					<UFormGroup :label="`Ингредиент ${index + 1}`" class="flex-1">
						<FormRecipeIngredientsInput v-model="ingredient.name" />
						<div v-if="ingredient.name" class="flex gap-1 mt-1">
							<UInput v-model="ingredient.amount" type="number" class="w-20" />
							<USelect
								v-model="ingredient.measureUnit"
								:options="measureUnitList"
								class="flex-1"
							/>
						</div>
						<USelect
							v-else
							placeholder="Единица измерения"
							disabled
							class="mt-1"
						/>
					</UFormGroup>

					<UButton
						color="red"
						size="2xs"
						variant="ghost"
						:padded="false"
						icon="i-mdi-close"
						class="mt-5"
						@click="modelValue.splice(index, 1)"
					/>
				</div>
			</template>
			<template #footer>
				<UButton
					variant="outline"
					block
					icon="i-mdi-plus"
					@click="addIngredient"
				>
					Добавить
				</UButton>
			</template>
		</draggable>
	</div>
</template>
