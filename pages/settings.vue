<script setup lang="ts"></script>

<template>
	<div>
		<h1 class="text-2xl font-medium">Настройки</h1>
		<h3 class="">Аккаунт</h3>
		<UFormGroup name="email">
			<UInput size="lg" placeholder="Email" icon="i-mdi-email" />
		</UFormGroup>

		<UFormGroup name="password" class="mt-4">
			<UInput
				size="lg"
				placeholder="Пароль"
				icon="i-mdi-lock"
				:ui="{
					icon: { trailing: { pointer: '' } },
				}"
			>
				<template #trailing>
					<UButton variant="link" color="gray" :padded="false" />
				</template>
			</UInput>
		</UFormGroup>
	</div>
</template>
