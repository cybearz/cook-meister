<script setup lang="ts">
interface Props {
	label: string
	icon?: string
	chevron?: boolean
	vertical?: boolean
	chip?: boolean
	clickable?: boolean
	selected?: boolean
}

const props = defineProps<Props>()
</script>

<template>
	<li
		:class="{
			'flex w-full gap-2 justify-between items-center border px-4 py-2 rounded-2xl text-xl ': true,
			'cursor-pointer hover:bg-primary-400': clickable,
			'w-auto	py-2 px-4': chip,
			'flex-col': vertical,
			'bg-primary-400': selected,
		}"
	>
		<UIcon
			v-if="icon"
			:name="icon"
			:class="{ 'flex flex-col items-center': true }"
		/>
		<div
			:class="{
				'flex-1 leading-none': true,
				'font-normal	text-sm': chip,
			}"
		>
			{{ label }}
		</div>

		<UIcon v-if="chevron" name="i-heroicons-chevron-right" class="ml-1" />
	</li>
</template>
