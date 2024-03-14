<script setup lang="ts">
const sideBarOpen = ref(false)
</script>

<template>
	<div class="h-screen">
		<nav class="fixed top-0 z-50 w-full px-4 py-2 bg-white border-b h-14">
			<div class="h-full flex justify-center relative">
				<UButton
					color="primary"
					variant="link"
					icon="i-heroicons-bars-3"
					:padded="false"
					size="xl"
					class="h-full flex absolute left-0"
					@click="sideBarOpen = !sideBarOpen"
				/>
				<img src="@/assets/logo-horizontal.svg" alt="" class="h-full" />
				<div class="absolute right-0 top-0 flex h-full items-center">
					<UBadge
						size="xs"
						class="rounded-full px-2 py-1 leading-none"
						variant="outline"
						color="amber"
					>
						alpha
					</UBadge>
				</div>
			</div>
		</nav>
		<SideBar v-model="sideBarOpen" />
		<main class="pt-14 h-full">
			<UContainer class="py-4 h-full">
				<slot />
			</UContainer>
		</main>
	</div>
</template>
