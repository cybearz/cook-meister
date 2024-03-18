<script setup lang="ts">
import type OpenAI from "openai"

interface Props {
	messages: OpenAI.Chat.ChatCompletionMessageParam[]
}

const props = defineProps<Props>()

const { messages } = toRefs(props)
const anchor = ref<null | HTMLElement>(null)

const scrollDown = () => anchor.value?.scrollIntoView()

onMounted(scrollDown)

watch(
	messages,
	async () => {
		await nextTick()
		scrollDown()
	},
	{ deep: true }
)
</script>

<template>
	<div class="h-full flex flex-col gap-2 overflow-y-auto pr-1">
		<div
			v-for="(message, idx) in messages"
			:key="idx"
			:class="[
				'border rounded-lg p-2 max-w-[85%] w-max',
				message.role === 'user' ? 'self-end bg-amber-300' : 'bg-gray-300',
			]"
		>
			<span>{{ message.content }}</span>
		</div>
		<div ref="anchor"></div>
	</div>
</template>
