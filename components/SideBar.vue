<script lang="ts" setup>
interface Props {
	modelValue: boolean
}
const emit = defineEmits(["update:modelValue"])
const props = defineProps<Props>()

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
		// {
		// 	label: "Настройки",
		// 	icon: "i-mdi-cog",
		// 	to: "/settings",
		// },
	],
	[
		{
			label: "Выйти",
			icon: "i-mdi-logout",
			click: logout,
		},
	],
]
</script>

<template>
	<div>
		<transition
			enter-from-class="opacity-0"
			leave-to-class="opacity-0"
			enter-active-class="transition duration-300"
			leave-active-class="transition duration-300"
		>
			<div
				v-show="modelValue"
				class="fixed inset-0 z-30 bg-gray-900/50"
				@click="emit('update:modelValue', false)"
			/>
		</transition>
		<transition
			enter-from-class="-translate-x-full"
			leave-to-class="-translate-x-full"
			enter-active-class="transition duration-300"
			leave-active-class="transition duration-300"
		>
			<aside
				v-show="modelValue"
				class="fixed top-0 left-0 z-40 w-64 h-screen pt-16 pb-2 bg-white border-r"
			>
				<UVerticalNavigation
					:links="links"
					:ui="{
						wrapper: 'h-full flex flex-col justify-between',
						divider: {
							wrapper: {
								base: 'hidden',
							},
						},
					}"
				/>
			</aside>
		</transition>
	</div>
</template>

<style scoped></style>
