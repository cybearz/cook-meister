<script setup lang="ts">
interface Props {
	modelValue: string
}

const emit = defineEmits(["update:modelValue"])

const props = defineProps<Props>()

const loading = ref(false)

async function search(q: string) {
	loading.value = true

	const ingredients = await $fetch<any[]>("/api/ingredients", {
		params: { search: q },
	})

	loading.value = false

	return ingredients
}
</script>

<template>
	<USelectMenu
		:modelValue="modelValue"
		:loading="loading"
		:searchable="search"
		placeholder="Укажите ингредиент"
		@update:modelValue="(v: Event) => emit('update:modelValue', v)"
	/>
</template>
