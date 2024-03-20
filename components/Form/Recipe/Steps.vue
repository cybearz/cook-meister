<script lang="ts" setup>
import draggable from "vuedraggable"

interface Props {
	modelValue: string[]
}

const emit = defineEmits(["update:modelValue"])
const props = defineProps<Props>()

const modelValue = toRef(props, "modelValue")

const addStep = () => {
	modelValue.value.push("")
}
</script>

<template>
	<div class="space-y-2">
		<UDivider label="ПРИГОТОВЛЕНИЕ" />

		<draggable :list="modelValue" item-key="id">
			<template #item="{ element, index }">
				<div class="flex items-center gap-2 mb-2">
					<UButton
						size="2xs"
						variant="ghost"
						:padded="false"
						class="mt-5"
						icon="i-mdi-drag"
					/>
					<div class="flex-1">
						<UFormGroup :label="`Шаг ${index + 1}`">
							<UTextarea v-model="modelValue[index]" placeholder="Инструкция" />
						</UFormGroup>
					</div>

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
					label="Добавить"
					variant="outline"
					block
					icon="i-mdi-plus"
					@click="addStep"
				/>
			</template>
		</draggable>
	</div>
</template>
