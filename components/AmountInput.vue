<script setup lang="ts">
interface Props {
	modelValue: number
	min?: number
	max?: number
}

const emit = defineEmits(["update:modelValue"])
const props = defineProps<Props>()
const { modelValue, min, max } = toRefs(props)

const canIncrease = computed(() => !max.value || modelValue.value < max.value)
const canDecrease = computed(() => !min.value || modelValue.value > min.value)

const increase = () => emit("update:modelValue", modelValue.value + 1)
const decrease = () => emit("update:modelValue", modelValue.value - 1)
</script>

<template>
	<div class="flex justify-center">
		<UButton
			:disabled="!canDecrease"
			icon="i-heroicons-minus"
			variant="ghost"
			size="xl"
			:padded="false"
			@click="decrease"
		/>
		<div class="text-5xl px-6">{{ modelValue }}</div>
		<UButton
			:disabled="!canIncrease"
			icon="i-heroicons-plus"
			variant="ghost"
			size="xl"
			:padded="false"
			@click="increase"
		/>
	</div>
</template>
