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
			<div class="flex flex-col items-center gap-2">
				<template v-if="error.statusCode === 404">
					<h1 class="text-4xl">404</h1>
					<div class="text-lg text-center">
						<p>Похоже, что-то пошло не так.</p>
						<p>Страница не найдена.</p>
					</div>
				</template>
				<template v-else>
					<h1 class="text-4xl">Упс...</h1>
					<div class="text-lg text-center">
						<p>Похоже, что-то пошло не так.</p>
						<code>{{ error.message }}</code>
					</div>
				</template>
				<UButton @click="handleError" size="lg">На главную</UButton>
			</div>
		</NuxtLayout>
	</div>
</template>
