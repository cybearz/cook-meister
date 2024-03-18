<script setup lang="ts">
const { data, error, pending, createRecipe } = useCreateRecipe()

watch(data, (v) => {
	if (v) {
		navigateTo("/recipes")
	}
})

onMounted(() => {
	console.log("New mounted")
})
</script>

<template>
	<div class="flex flex-col h-full w-full">
		<AppBar title="Новый рецепт" />
		<UContainer class="py-2 w-full flex-1 overflow-y-auto">
			<FormRecipe :loading="pending" @submit="createRecipe" />
		</UContainer>
	</div>
</template>
