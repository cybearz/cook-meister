<script setup lang="ts">
import type { NuxtError } from "#app"

interface Props {
	error: NuxtError
}

const props = defineProps<Props>()

const handleError = () => {
	clearError({
		redirect: "/",
	})
}
</script>

<template>
	<div>
		<NuxtLayout>
			<div class="flex flex-col items-center justify-center gap-2 mt-20">
				<img src="@/assets/robot-face.svg" class="h-40" />
				<h1 class="text-4xl">404</h1>
				<div class="text-lg text-center">
					<p>Похоже, что-то пошло не так...</p>
					<code v-if="error.message">{{ error.message }}</code>
				</div>
				<UButton @click="handleError" size="lg" variant="ghost"
					>На главную</UButton
				>
			</div>
		</NuxtLayout>
	</div>
</template>
