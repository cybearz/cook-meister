<script setup lang="ts"></script>

<template>
	<div class="h-screen flex">
		<SideBar />
		<main class="w-full h-full">
			<slot />
		</main>
	</div>
</template>
