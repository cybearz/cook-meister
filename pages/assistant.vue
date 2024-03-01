<script lang="ts" setup>
import type OpenAI from "openai"

const userRequest = ref<string>("")
const loading = ref(false)
const messages = ref<OpenAI.ChatCompletionMessageParam[]>([
	{
		role: "assistant",
		content: "Здравствуйте! Я ваш помщник на кухне. Что вас интересует?",
	},
])

const sendMsg = async () => {
	loading.value = true

	messages.value.push({
		role: "user",
		content: userRequest.value,
	})

	userRequest.value = ""

	try {
		const response = await $fetch("/api/chat", {
			method: "POST",
			body: { messages: messages.value },
		})

		messages.value.push(response)
	} catch (e) {
		console.log("ERROR!")
		messages.value.pop()
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<div class="flex flex-col h-full">
		<ChatMessages :messages="messages" />
		<UInput
			v-model="userRequest"
			autofocus
			placeholder="Введите сообщение..."
			size="lg"
			:ui="{
				icon: { trailing: { pointer: '' }, leading: { pointer: '' } },
			}"
			class="w-full mt-4"
			@keyup.enter="userRequest && sendMsg()"
		>
			<template #trailing>
				<UButton
					variant="link"
					icon="i-mdi-send"
					:padded="false"
					:disabled="!userRequest"
					@click="sendMsg"
				/>
			</template>
		</UInput>
	</div>
</template>
