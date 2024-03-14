<script setup lang="ts">
const emit = defineEmits(["update:file", "update:imgSrc"])
const props = defineProps<{
	file: File | null
	imgSrc: string
}>()

const { imgSrc, file } = toRefs(props)
const input = ref<null | HTMLInputElement>(null)
const url = computed(
	() => imgSrc.value || (file.value && URL.createObjectURL(file.value)) || null
)
const addImg = () => {
	input.value?.click()
}

const onChange = (event: Event) => {
	const { files } = event.target as HTMLInputElement
	if (!files?.[0]) {
		removeImg()
		return
	}
	emit("update:file", files[0])
}
const removeImg = () => {
	emit("update:file", null)
	emit("update:imgSrc", "")
}
</script>

<template>
	<div class="h-40 w-40">
		<UChip
			v-if="url"
			size="3xl"
			:ui="{
				wrapper: 'h-full w-full',
				background: '',
				base: 'ring-0',
			}"
		>
			<div
				class="h-full w-full bg-center bg-cover bg-no-repeat"
				:style="{ backgroundImage: `url(${url})` }"
			/>
			<template #content>
				<UButton
					color="red"
					icon="i-mdi-close"
					variant="outline"
					size="2xs"
					square
					:ui="{ rounded: 'rounded-full' }"
					@click="removeImg"
				/>
			</template>
		</UChip>
		<UButton
			v-else
			block
			variant="outline"
			class="flex-col h-full"
			@click="addImg"
		>
			<input
				ref="input"
				type="file"
				accept=".svg, .jpg,.jpeg,.png"
				class="hidden"
				@change="onChange"
			/>
			<UIcon name="i-mdi-image-plus-outline" class="text-5xl" />
			<div class="mt-2">Добавить фото</div>
		</UButton>
	</div>
</template>
