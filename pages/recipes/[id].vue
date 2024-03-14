<script setup lang="ts">
import type Recipe from "@/types/Recipe"

const route = useRoute()
const { id } = route.params
const { data: recipe, pending, refresh } = useFetch(`/api/recipes/${id}`)
recipe as Recipe

const updateMode = ref(false)

const client = useSupabaseClient()

const uploadPhoto = async (photo: File) => {
	const { data, error } = await client.storage
		.from("dish-images")
		.upload(photo.name, photo)

	if (error) {
		throw error
	}

	return data.path
}

const downloadPhoto = async (path: string) => {
	const { data } = await client.storage.from("dish-images").getPublicUrl(path)

	return data.publicUrl
}

const updatePending = ref(false)

const updateRecipe = async (recipe: Recipe, photo: File) => {
	updatePending.value = true

	try {
		let photoUrl = recipe.photoUrl
		if (photo) {
			const path = await uploadPhoto(photo)
			photoUrl = await downloadPhoto(path)
		} else if (!photoUrl) {
			photoUrl = await downloadPhoto("no-image.svg")
		}

		await $fetch(`/api/recipes/${id}`, {
			method: "PUT",
			body: { ...recipe, photoUrl },
		})

		await refresh()
		updateMode.value = false
	} finally {
		updatePending.value = false
	}
}

const deletePending = ref(false)

const deleteRecipe = async (recipe: Recipe, photo: File) => {
	deletePending.value = true

	try {
		await $fetch(`/api/recipes/${id}`, {
			method: "DELETE",
		})
		goToRecipes()
	} finally {
		deletePending.value = false
	}
}

const goToRecipes = () => navigateTo("/recipes")
</script>

<template>
	<AppLoading v-if="pending" />
	<div v-else>
		<div v-if="updateMode">
			<div class="mb-4">
				<UButton
					label="Назад"
					variant="ghost"
					size="xs"
					icon="i-mdi-arrow-left"
					color="gray"
					@click="updateMode = false"
				/>
			</div>
			<FormRecipe
				v-model="recipe"
				:loading="updatePending || deletePending"
				@submit="updateRecipe"
				@delete="deleteRecipe"
			/>
		</div>
		<div v-else>
			<div class="flex justify-between mb-4">
				<UButton
					label="Все рецепты"
					variant="ghost"
					size="xs"
					icon="i-mdi-arrow-left"
					color="gray"
					@click="goToRecipes"
				/>
				<UButton
					label="Изменить"
					variant="ghost"
					size="xs"
					icon="i-mdi-pencil"
					color="gray"
					@click="updateMode = true"
				/>
			</div>
			<CardRecipe v-bind="recipe" />
		</div>
	</div>
</template>
