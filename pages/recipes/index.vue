<script setup lang="ts">
const isOpen = ref(false)
import type Recipe from "@/types/Recipe"

const { data: recipeList, pending, refresh } = useFetch("/api/recipes")

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

const createPending = ref(false)
const createRecipe = async (recipe: Recipe, photo: File) => {
	createPending.value = true

	try {
		let photoUrl = recipe.photoUrl
		if (photo) {
			const path = await uploadPhoto(photo)
			photoUrl = await downloadPhoto(path)
		} else {
			photoUrl = await downloadPhoto("no-image.svg")
		}

		await $fetch("/api/recipes", {
			method: "POST",
			body: { ...recipe, photoUrl },
		})

		await refresh()
		isOpen.value = false
	} finally {
		createPending.value = false
	}
}
</script>

<template>
	<AppLoading v-if="pending" />
	<div v-else>
		<div class="flex justify-between items-center">
			<h3 class="font-medium">Мои рецепты</h3>
			<UButton icon="i-mdi-plus" variant="ghost" @click="isOpen = true">
				Добавить
			</UButton>
		</div>
		<div class="mt-4 grid grid-cols-2 gap-2">
			<ULink
				v-for="recipe in recipeList"
				:key="recipe.id"
				as="div"
				:to="`/recipes/${recipe.id}`"
			>
				<div
					class="h-full border p-4 rounded-lg cursor-pointer hover:bg-gray-100"
				>
					<div
						class="h-40 bg-center bg-cover bg-no-repeat"
						:style="{ backgroundImage: `url(${recipe.photoUrl})` }"
						alt=""
					/>
					<h3 class="mt-2 font-semibold">{{ recipe.name }}</h3>
				</div>
			</ULink>
		</div>
		<UModal v-model="isOpen" fullscreen>
			<UCard
				:ui="{
					base: 'h-full flex flex-col',
					rounded: '',
					divide: 'divide-y divide-gray-100 dark:divide-gray-800',
					body: {
						base: 'grow overflow-y-auto',
					},
				}"
			>
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="font-semibold text-gray-900">Новый рецепт</h3>
						<UButton
							color="gray"
							variant="ghost"
							icon="i-heroicons-x-mark-20-solid"
							@click="isOpen = false"
						/>
					</div>
				</template>
				<FormRecipe :loading="createPending" @submit="createRecipe" />
			</UCard>
		</UModal>
	</div>
</template>
