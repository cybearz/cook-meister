<script setup lang="ts">
const sideBarOpen = ref(false)
</script>
<template>
	<div>
		<nav class="fixed top-0 z-50 w-full px-4 py-2 bg-white border-b h-14">
			<div class="h-full flex justify-center relative">
				<div class="h-full flex absolute left-0">
					<UButton
						color="primary"
						variant="link"
						icon="i-heroicons-bars-3"
						:padded="false"
						size="xl"
						@click="sideBarOpen = !sideBarOpen"
					/>
				</div>
				<img src="@/assets/logo.svg" alt="" />
			</div>
		</nav>
		<SideBar v-model="sideBarOpen" />
		<NuxtPage />
	</div>
</template>
