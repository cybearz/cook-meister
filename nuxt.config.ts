// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	colorMode: {
		preference: "light",
	},
	modules: ["@nuxt/ui", "@nuxtjs/supabase"],
	ui: {
		icons: ["mdi", "heroicons"],
	},
	supabase: {
		redirectOptions: {
			login: "/login",
			callback: "/confirm",
			exclude: ["/signup", "/reset-password"],
		},
	},
})
