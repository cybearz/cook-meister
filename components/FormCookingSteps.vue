<script lang="ts" setup>
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

		<UFormGroup
			v-for="(step, idx) in modelValue"
			:label="`Шаг ${idx + 1}`"
			:key="idx"
			:required="idx < 1"
		>
			<template v-if="idx > 0" #hint>
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
			<UTextarea v-model="modelValue[idx]" placeholder="Инструкция" />
		</UFormGroup>
		<UButton variant="outline" block icon="i-mdi-plus" @click="addStep">
			Добавить
		</UButton>
	</div>
</template>
