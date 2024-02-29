<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types"
import { z } from "zod"

definePageMeta({
	layout: "auth",
})

const schema = z.object({
	email: z
		.string({
			required_error: "Введите Email",
		})
		.email("Некорректный Email"),
	password: z.string({
		required_error: "Введите пароль",
	}),
})

type Schema = z.output<typeof schema>

const state = reactive({
	email: undefined,
	password: undefined,
})

const supabase = useSupabaseClient()
const loading = ref(false)
const error = ref<string | null>(null)

async function onSubmit(event: FormSubmitEvent<Schema>) {
	loading.value = true
	console.log(event.data)
	const { email, password } = event.data
	const authResponse = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (!authResponse.error) {
		navigateTo("/")
	} else {
		error.value = authResponse.error.message
		console.log(authResponse.error)
	}

	loading.value = false
}

const showPassword = ref(false)
</script>

<template>
	<div
		class="flex max-w-80 flex-col items-center mx-auto h-full justify-center"
	>
		<h1 class="text-2xl font-medium">Вход</h1>
		<UForm
			:schema="schema"
			:state="state"
			class="w-full mt-6"
			@submit="onSubmit"
		>
			<UFormGroup name="email">
				<UInput
					v-model="state.email"
					size="lg"
					placeholder="Email"
					icon="i-mdi-email"
				/>
			</UFormGroup>

			<UFormGroup name="password" class="mt-4">
				<UInput
					v-model="state.password"
					size="lg"
					placeholder="Пароль"
					icon="i-mdi-lock"
					:type="showPassword ? 'text' : 'password'"
					:ui="{
						icon: { trailing: { pointer: '' } },
					}"
				>
					<template #trailing>
						<UButton
							variant="link"
							:icon="showPassword ? 'i-mdi-eye-off' : 'i-mdi-eye'"
							color="gray"
							:padded="false"
							@click="showPassword = !showPassword"
						/>
					</template>
				</UInput>
			</UFormGroup>
			<div class="flex justify-end">
				<UButton variant="link" to="/reset-password"> Забыли пароль? </UButton>
			</div>
			<p v-if="error" class="text-center text-sm text-red-500">
				{{ error }}
			</p>
			<UButton type="submit" size="lg" block :loading="loading" class="mt-2">
				Войти
			</UButton>
			<UButton size="lg" variant="link" block to="/signup"
				>Нет аккаунта?</UButton
			>
		</UForm>
	</div>
</template>
