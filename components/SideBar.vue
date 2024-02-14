<script lang="ts" setup>
interface Props {
	modelValue: boolean
}
const emit = defineEmits(["update:modelValue"])
const props = defineProps<Props>()

const links = [
	{
		label: "Главная",
		icon: "i-heroicons-home",
		to: "/",
	},
	{
		label: "Избранное",
		icon: "i-heroicons-star",
		to: "/favorite",
	},
	{
		label: "Настройки",
		icon: "i-heroicons-cog-6-tooth",
		to: "/settings",
	},
]
</script>

<template>
	<div v-show="modelValue">
		<div
			class="fixed inset-0 z-30 bg-gray-900/50"
			@click="emit('update:modelValue', false)"
		/>
		<aside
			class="fixed top-0 left-0 z-40 w-64 h-screen pt-16 bg-white border-r"
		>
			<UVerticalNavigation :links="links" />
		</aside>
	</div>
</template>

<style scoped></style>
