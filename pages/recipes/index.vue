<script setup lang="ts">
import _ from "lodash"

const user = useSupabaseUser()
const { recipes, error, pending } = useRecipes()

watch(error, () => {
	console.error(error.value)
})

const filter = reactive({
	items: [
		{ label: "Все", value: "all" },
		{ label: "Мои", value: "mine" },
	],
	onChange: (idx: number) => (filterBy.value = filter.items[idx].value),
})
const filterBy = ref(filter.items[0].value)

const filteredList = computed(() =>
	filterBy.value === "mine"
		? _.filter(recipes.value, ["author", user.value?.id])
		: recipes.value
)
</script>

<template>
	<div>
		<AppBar title="Рецепты">
			<template #action>
				<UButton
					label="Добавить"
					icon="i-mdi-plus"
					variant="ghost"
					to="/recipes/new"
				/>
			</template>
		</AppBar>

		<UContainer class="py-2">
			<AppLoading v-if="pending" />
			<div v-else>
				<UTabs :items="filter.items" @change="filter.onChange" />
				<div class="grid grid-cols-2 gap-2">
					<ULink
						v-for="recipe in filteredList"
						:key="recipe.id"
						as="div"
						:to="`/recipes/${recipe.id}`"
					>
						<div
							class="h-full border p-4 rounded-lg cursor-pointer hover:bg-gray-100"
						>
							<div
								class="h-32 bg-center bg-cover bg-no-repeat"
								:style="{ backgroundImage: `url(${recipe.photoUrl})` }"
								alt=""
							/>
							<h3 class="mt-2 font-semibold">{{ recipe.name }}</h3>
						</div>
					</ULink>
				</div>
			</div>
		</UContainer>
	</div>
</template>
