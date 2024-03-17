<script setup lang="ts">
import useSidebar from "@/composables/useSidebar"

const props = defineProps<{
	title: string
}>()

const { isOpen } = useSidebar()
</script>
<template>
	<header
		class="h-14 px-1.5 py-2 border-b flex items-center justify-between gap-4"
	>
		<UButton
			color="primary"
			variant="link"
			icon="i-mdi-menu"
			size="xl"
			@click="isOpen = true"
		/>
		<h3 class="flex-1 text-lg font-medium text-gray-800">{{ title }}</h3>
		<div>
			<slot name="action" />
		</div>
	</header>
</template>
