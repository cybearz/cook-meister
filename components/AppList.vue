<script setup lang="ts">
interface ListItem {
	label: string
	value?: string
	icon?: string
	chevron?: boolean
}

interface Props {
	modelValue?: string
	items: ListItem[]
	chevron?: boolean
	chips?: boolean
	horizontal?: boolean
}

const emit = defineEmits(["update:modelValue"])
const props = defineProps<Props>()
const { modelValue } = toRefs(props)

const clickable = computed(() => Boolean(modelValue))
</script>

<template>
	<ol
		:class="{
			'flex items-center justify-between space-y-2': true,
			'flex-col': !horizontal,
		}"
	>
		<AppListItem
			v-for="(item, idx) in items"
			:key="idx"
			v-bind="item"
			:clickable="clickable"
			:chevron="chevron"
			:chip="chips"
			:selected="modelValue === item.value"
			@click="clickable && emit('update:modelValue', item.value)"
		/>
	</ol>
	<!-- <ol class="">
		<AppListItem label="Лабел" chevron :img="img" clickable />
		<AppListItem label="Лабел" chevron :img="img" clickable />
	</ol>
	<ol>
		<AppListItem label="Лабел" chip icon="i-heroicons-academic-cap" clickable />
		<AppListItem label="Лабел" chip />
	</ol> -->
</template>
