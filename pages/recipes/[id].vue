<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string
const user = useSupabaseUser()

const { recipe, error, pending, refresh } = useRecipe(id)
watch(error, (v) => {
	if (v)
		throw createError({
			statusCode: 404,
			message: "Рецепт не найден",
			fatal: true,
		})
})

const {
	data: updateData,
	error: updateError,
	pending: updatePending,
	updateRecipe,
} = useUpdateRecipe()
const {
	data: deleteData,
	pending: deletePending,
	deleteRecipe,
} = useRecipeDelete()
const editMode = ref(false)
const canEdit = computed(() => user.value?.id === recipe.value?.author)

watch(updateData, async (v) => {
	if (v) {
		editMode.value = false
		refresh()
	}
})

watch(deleteData, (v) => {
	if (v) {
		navigateTo("/recipes")
	}
})
</script>

<template>
	<div class="flex flex-col h-full w-full">
		<AppBar title="Рецепт" hide-menu>
			<template #action>
				<UButton
					v-if="!pending && canEdit"
					label="Изменить"
					icon="i-mdi-pencil"
					variant="ghost"
					@click="editMode = true"
				/>
			</template>
		</AppBar>
		<UContainer class="py-2 w-full flex-1 overflow-y-auto">
			<AppLoading v-if="pending" />
			<div v-else>
				<div v-if="editMode">
					<FormRecipe
						v-model="recipe"
						:loading="updatePending || deletePending"
						@submit="
							(recipe, photo) => updateRecipe(route.params.id, recipe, photo)
						"
						@delete="deleteRecipe(route.params.id)"
					/>
				</div>
				<CardRecipe v-else-if="!!recipe" v-bind="recipe" />
			</div>
		</UContainer>
	</div>
</template>
