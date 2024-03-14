<script lang="ts" setup>
import { useField } from "vee-validate"
import { computed, onMounted, ref, toRef } from "vue"

interface Props {
	modelValue?: string
	label: string
	name: string
	mask?: string
	autofocus?: boolean
}
const props = defineProps<Props>()
const name = toRef(props, "name")
const maxLength = computed(() => (props.mask ? props.mask.length : undefined))

const { errorMessage, meta, value, handleChange, handleBlur } =
	useField<string>(name)
</script>

<template>
	<UInput v-model="value" />
</template>
