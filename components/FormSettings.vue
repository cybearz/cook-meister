<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types"
import type UserCredentials from "@/types/UserCredentials"

import _ from "lodash"
import { z } from "zod"

const emit = defineEmits(["submit"])
const props = defineProps<{
	modelValue?: UserCredentials
	loading: boolean
}>()

const { modelValue, loading } = toRefs(props)
const state = ref({
	email: "",
	password: null,
	confirmPassword: null,
})

watch(
	modelValue,
	(v) => {
		_.assign(state.value, v)
	},
	{ immediate: true }
)

const showPassword = ref(false)
const showConfirmPassword = ref(false)
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
			.nullable()
			.refine((val) => val === null || val.length >= 6, {
				message: "Минимум 6 символов",
			})
			.refine((val) => val === null || val.length <= 20, {
				message: "Максимум 20 символов",
			}),
		confirmPassword: z
			.string({
				required_error: "Введите пароль",
			})
			.nullable(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Пароли должны совпадать",
		path: ["confirmPassword"],
	})

async function onSubmit(event: FormSubmitEvent<UserCredentials>) {
	const { email, password } = event.data
	const submitData = password ? { email, password } : { email }
	emit("submit", submitData)
}
</script>

<template>
	<UForm
		:state="state"
		:schema="schema"
		class="space-y-2"
		:validateOn="['submit']"
		@submit="onSubmit"
	>
		<UFormGroup name="email" label="Email">
			<UInput v-model="state.email" size="lg" icon="i-mdi-email" />
		</UFormGroup>
		<UFormGroup name="password" label="Новый пароль">
			<UInput
				v-model="state.password"
				size="lg"
				placeholder="******"
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
		<UFormGroup name="confirmPassword" label="Повторите">
			<UInput
				v-model="state.confirmPassword"
				size="lg"
				placeholder="******"
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
		<UButton label="Сохранить" block type="submit" />
	</UForm>
</template>
