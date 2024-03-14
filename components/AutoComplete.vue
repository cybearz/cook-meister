<script setup lang="ts">
import { watchDebounced } from "@vueuse/core"

interface Props {
	modelValue: string[]
	itemsSrc: string
}

const emit = defineEmits(["update:modelValue"])
const props = defineProps<Props>()

const { modelValue, itemsSrc } = toRefs(props)

const foundItems = ref<string[]>([])

const search = ref("")
watchDebounced(
	search,
	async (search) => {
		if (search.length < 2) return

		foundItems.value =
			(await $fetch(itemsSrc.value, {
				query: { search },
			})) ?? []
	},
	{ debounce: 500 }
)

const filteredItems = computed(() => {
	return foundItems.value.filter((item) => !modelValue.value.includes(item))
})

const addItem = (item: string) => {
	modelValue.value.push(item)
	search.value = ""
}
const removeItem = (idx: number) => modelValue.value.splice(idx, 1)
</script>

<template>
	<div>
		<UInput
			placeholder="Название ингредиента"
			v-model="search"
			:ui="{
				icon: { trailing: { pointer: '' } },
			}"
			class="mb-2"
		>
			<template #trailing>
				<UButton
					v-show="search !== ''"
					icon="i-heroicons-x-mark-20-solid"
					variant="link"
					:padded="false"
					color="gray"
					@click="search = ''"
				/>
			</template>
		</UInput>
		<div class="px-4 space-y-2">
			<template v-if="search">
				<template v-if="filteredItems.length > 0">
					<div
						v-for="item in filteredItems"
						:key="item"
						class="flex justify-between hover:bg-gray-50 cursor-pointer"
						@click="addItem(item)"
					>
						<div>{{ item }}</div>
					</div>
				</template>
				<div v-else class="text-center text-xs">
					<div>Незнакомый ингредиент...</div>
					<UButton size="xs" variant="ghost" @click="addItem(search)"
						>Добавить</UButton
					>
				</div>
			</template>
			<template v-else>
				<div
					v-for="(item, idx) in modelValue"
					:key="idx"
					class="flex justify-between space-2"
				>
					<div>{{ item }}</div>
					<UButton
						size="2xs"
						icon="i-heroicons-trash"
						variant="link"
						@click="removeItem(idx)"
					/>
				</div>
			</template>
		</div>
	</div>
</template>
