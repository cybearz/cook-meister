<script setup lang="ts">
interface Props {
	modelValue: string
}

const emit = defineEmits(["update:modelValue"])
defineProps<Props>()

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
		creatable
		searchablePlaceholder="Поиск..."
		option-attribute="name"
		placeholder="Укажите ингредиент"
		@update:modelValue="(v: Event) => emit('update:modelValue', v.name)"
	>
		<template #option-empty> Ингредиент не найден </template>
	</USelectMenu>
</template>
