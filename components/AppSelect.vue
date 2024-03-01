<script setup lang="ts">
interface Props {
	multiple?: boolean
	modelValue: null | string | string[]
	items: string[]
}

interface itemConfig {
	label: string
	selected: boolean
}

const emit = defineEmits(["update:modelValue"])
const props = defineProps<Props>()

const { modelValue, items, multiple } = toRefs(props)
const itemsConfig = ref<itemConfig[]>([])

watchEffect(() => {
	// if (multiple.value) {
	// 	itemsConfig.value = items.value.map((item) => ({
	// 		label: item,
	// 		selected: (modelValue.value as string[]).includes(item),
	// 	}))
	// } else {
	// 	itemsConfig.value = items.value.map((item) => ({
	// 		label: item,
	// 		selected: (modelValue.value as string) === item,
	// 	}))
	// }

	itemsConfig.value = items.value.map((item) => {
		const selected = multiple.value
			? (modelValue.value as string[]).includes(item)
			: (modelValue.value as string) === item

		return {
			label: item,
			selected,
		}
	})
})

const onClick = (item: itemConfig) => {
	if (multiple.value) {
		if (item.selected) {
			emit(
				"update:modelValue",
				(modelValue.value as string[]).filter((v) => v !== item.label)
			)
		} else {
			emit("update:modelValue", [...(modelValue.value as string[]), item.label])
		}
	} else {
		emit("update:modelValue", item.selected ? null : item.label)
	}
}
</script>

<template>
	<div class="flex gap-2 flex-wrap">
		<UBadge
			v-for="(item, idx) in itemsConfig"
			:key="idx"
			:label="item.label"
			:variant="item.selected ? 'solid' : 'outline'"
			size="md"
			@click="onClick(item)"
			class="cursor-pointer"
		/>
	</div>
</template>
