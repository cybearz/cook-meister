<script setup lang="ts">
import useSidebar from "@/composables/useSidebar"

const supabase = useSupabaseClient()

const logout = async () => {
	await supabase.auth.signOut()
	navigateTo("/login")
}

const { isOpen: sideBarOpen } = useSidebar()
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
		// {
		// 	label: "Настройки",
		// 	icon: "i-mdi-cog",
		// 	to: "/settings",
		// },
	],
]
</script>

<template>
	<div class="h-screen">
		<USlideover
			v-model="sideBarOpen"
			side="left"
			:ui="{
				width: 'max-w-64',
			}"
		>
			<div class="h-full flex flex-col justify-between">
				<div>
					<div class="h-14 pl-2.5 py-2 border-b flex">
						<img src="@/assets/logo-horizontal.svg" alt="" class="h-full" />
					</div>
					<UVerticalNavigation
						:links="links"
						class="mt-2"
						:ui="{ size: 'text-md', icon: { base: 'w-6 h-6' } }"
					/>
				</div>
				<div class="border-t py-2">
					<UButton
						label="Выйти"
						icon="i-mdi-logout"
						variant="ghost"
						color="amber"
						:ui="{ size: 'text-md', icon: { base: 'w-6 h-6' } }"
						@click="logout"
					/>
				</div>
			</div>
		</USlideover>
		<!-- <SideBar v-model="sideBarOpen" /> -->
		<slot />
	</div>
</template>
