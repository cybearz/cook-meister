<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types"
import { z } from "zod"

definePageMeta({
	layout: "auth",
})

const user = useSupabaseUser()
watch(user, () => {
	if (user.value) {
		return navigateTo("/")
	}
})

const state = reactive({
	email: "",
})

const schema = z.object({
	email: z
		.string({
			required_error: "Введите Email",
		})
		.email("Некорректный Email"),
})

type Schema = z.output<typeof schema>

const supabase = useSupabaseClient()
const loading = ref(false)
const error = ref<string | null>(null)
const isEmailSent = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
	loading.value = true

	const { email } = event.data
	const authResponse = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: "http://localhost:3000/update-password",
	})

	if (!authResponse.error) {
		isEmailSent.value = true
	} else {
		error.value = authResponse.error.message
		console.log(authResponse.error)
	}

	loading.value = false
}
</script>

<template>
	<div
		class="flex max-w-80 flex-col items-center mx-auto h-full justify-center"
	>
		<h1 class="text-2xl font-medium">Сброс пароля</h1>
		<template v-if="isEmailSent">
			<UIcon name="i-mdi-email-fast-outline" class="text-gray-500 text-8xl" />
			<p class="text-gray-500 text-center">
				На указанный Email было отправлено письмо для сброса пароля
			</p>
		</template>
		<UForm
			v-else
			:schema="schema"
			:state="state"
			class="w-full mt-6"
			@submit="onSubmit"
		>
			<UFormGroup
				name="email"
				help="Введите Email адрес, указанный при регистрации"
			>
				<UInput
					v-model="state.email"
					size="lg"
					placeholder="Email"
					icon="i-mdi-email"
				/>
			</UFormGroup>
			<div class="mt-4">
				<p v-if="error" class="text-center text-sm text-red-500 mb-2">
					{{ error }}
				</p>
				<UButton type="submit" size="lg" block :loading="loading">
					Сбросить пароль
				</UButton>
			</div>
		</UForm>
		<UButton size="lg" variant="link" block to="/login">
			На страницу входа
		</UButton>
	</div>
</template>
