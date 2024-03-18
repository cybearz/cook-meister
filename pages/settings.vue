<script setup lang="ts">
import type UserCredentials from "@/types/UserCredentials"

const user = useSupabaseUser()
const client = useSupabaseClient()

const userCredentials = reactive({
	email: user.value?.email ?? "",
})

const updateUserCredentials = (userCredentials: UserCredentials) => {
	client.auth.updateUser(userCredentials)
}
</script>

<template>
	<div>
		<AppBar title="Настройки" />
		<UContainer class="py-2">
			<FormSettings
				v-model="userCredentials"
				:loading="false"
				@submit="updateUserCredentials"
			/>
		</UContainer>
	</div>
</template>
