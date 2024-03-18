<script lang="ts" setup>
import useSidebar from "@/composables/useSidebar"

const { isOpen } = useSidebar()

const supabase = useSupabaseClient()

const logout = async () => {
	await supabase.auth.signOut()
	navigateTo("/login")
}

const links = [
	[
		{
			label: "Идеи",
			icon: "i-mdi-head-lightbulb",
			to: "/",
		},
		{
			label: "Рецепты",
			icon: "i-mdi-book-open",
			to: "/recipes",
		},
		{
			label: "Ассистент",
			icon: "i-mdi-chef-hat",
			to: "/assistant",
		},
		{
			label: "Настройки",
			icon: "i-mdi-cog",
			to: "/settings",
		},
	],
]
</script>

<template>
	<div
		class="fixed inset-0 z-30 bg-gray-900/50 transition-all duration-300"
		:class="{ 'invisible duration-0': !isOpen }"
		@click="isOpen = false"
	/>
	<aside
		class="fixed md:static inset-0 z-40 w-64 md:w-80 px-2 md:px-4 h-full border-r bg-white flex flex-col justify-between transition-all duration-300 md:translate-x-0"
		:class="{ '-translate-x-full': !isOpen }"
	>
		<div>
			<div class="h-14 pl-2.5 py-2 flex">
				<img src="@/assets/logo-horizontal.svg" alt="" class="h-full" />
			</div>
			<UVerticalNavigation
				:links="links"
				class="mt-2"
				:ui="{ size: 'text-md', icon: { base: 'w-6 h-6' } }"
			/>
		</div>
		<UButton
			label="Выйти"
			icon="i-mdi-logout"
			variant="ghost"
			color="amber"
			class="mb-2"
			:ui="{ size: 'text-md', icon: { base: 'w-6 h-6' } }"
			@click="logout"
		/>
	</aside>
</template>
