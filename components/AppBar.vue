<script setup lang="ts">
import useSidebar from "@/composables/useSidebar"

const props = defineProps<{
	title: string
}>()

const title = toRef(() => props.title)
useHead({
	title,
})
const { isOpen } = useSidebar()
</script>
<template>
	<UContainer
		class="h-14 w-full py-2 border-b flex items-center justify-between gap-4"
	>
		<UButton
			color="primary"
			variant="link"
			icon="i-mdi-menu"
			size="xl"
			class="md:hidden"
			@click="isOpen = true"
		/>
		<h3 class="flex-1 text-lg font-medium text-gray-800">{{ title }}</h3>
		<div>
			<slot name="action" />
		</div>
	</UContainer>
</template>
