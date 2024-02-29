<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types"
import { z } from "zod"

definePageMeta({
	layout: "auth",
})

const state = reactive({
	email: "",
	password: "",
	confirmPassword: "",
})

const schema = z
	.object({
		email: z
			.string({
				required_error: "Введите Email",
			})
			.email("Некорректный Email"),
		password: z
			.string({
				required_error: "Введите пароль",
			})
			.min(6, { message: "Минимум 6 символов" })
			.max(20, { message: "Максимум 20 символов" }),
		confirmPassword: z.string({
			required_error: "Введите пароль",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Пароли должны совпадать",
		path: ["confirmPassword"],
	})

type Schema = z.output<typeof schema>

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const supabase = useSupabaseClient()
const loading = ref(false)
const error = ref<string | null>(null)
const isEmailSent = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
	loading.value = true
	console.log(event.data)
	const { email, password } = event.data
	const authResponse = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: "http://localhost:3000/",
		},
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
		<template v-if="isEmailSent">
			<h1 class="text-2xl font-medium">Подтвердите почту</h1>
			<UIcon name="i-mdi-email-fast-outline" class="text-gray-500 text-8xl" />
			<p class="text-gray-500 text-center">
				На указанный Email адрес {{ state.email }} было отправлено письмо с
				подтверждением
			</p>

			<UButton
				size="lg"
				variant="ghost"
				class="mt-4"
				@click="isEmailSent = false"
			>
				Назад
			</UButton>
		</template>

		<template v-else>
			<h1 class="text-2xl font-medium">Регистрация</h1>
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
				<UFormGroup name="confirmPassword" class="mt-4">
					<UInput
						v-model="state.confirmPassword"
						size="lg"
						placeholder="Повторите пароль"
						icon="i-mdi-lock"
						:type="showConfirmPassword ? 'text' : 'password'"
						:ui="{
							icon: { trailing: { pointer: '' } },
						}"
					>
						<template #trailing>
							<UButton
								variant="link"
								:icon="showConfirmPassword ? 'i-mdi-eye-off' : 'i-mdi-eye'"
								color="gray"
								:padded="false"
								@click="showConfirmPassword = !showConfirmPassword"
							/>
						</template>
					</UInput>
				</UFormGroup>
				<div class="mt-4">
					<p v-if="error" class="text-center text-sm text-red-500 mb-2">
						{{ error }}
					</p>
					<UButton type="submit" size="lg" block :loading="loading">
						Зарегистрироваться
					</UButton>
				</div>
				<UButton size="lg" variant="link" block to="/login">
					Уже есть аккаунт?
				</UButton>
			</UForm>
		</template>
	</div>
</template>
