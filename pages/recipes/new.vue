<script setup lang="ts">
const { data, error, pending, createRecipe } = useCreateRecipe()

watch(data, (v) => {
	if (v) {
		navigateTo("/recipes")
	}
})
</script>

<template>
	<div>
		<AppBar title="Новый рецепт" />
		<UContainer class="py-2">
			<FormRecipe :loading="pending" @submit="createRecipe" />
		</UContainer>
	</div>
</template>
