<script setup lang="ts">
const route = useRoute()
const user = useSupabaseUser()

const { recipe, error, pending, getRecipe } = useRecipe()
watch(error, (v) => {
	if (v)
		throw createError({
			statusCode: 404,
			message: v,
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
		await getRecipe(route.params.id)
	}
})

watch(deleteData, (v) => {
	if (v) {
		navigateTo("/recipes")
	}
})

onBeforeMount(async () => {
	await getRecipe(route.params.id)
})
</script>

<template>
	<div>
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
		<UContainer class="py-2">
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
