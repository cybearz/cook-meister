// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	app: {
		head: {
			link: [{ rel: "icon", type: "image/svg", href: "/favicon.svg" }],
		},
	},
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
