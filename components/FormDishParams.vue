<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types"
import type DishParams from "@/types/DishParams"

import { string, z } from "zod"

const emit = defineEmits(["submit"])

const mealTypeItems = ["Завтрак", "Обед", "Ужин", "Перекус"]

const dishTypeItems = [
	"Первые блюда",
	"Вторые блюда",
	"Салаты",
	"Закуски",
	"Гарниры",
	"Выпечка",
	"Десерт",
	"Напиток",
]

const cuisineTypeItems = [
	"Русская кухня",
	"Турецкая кухня",
	"Итальянская кухня",
	"Грузинская кухня",
	"Корейская кухня",
	"Польская кухня",
	"Дагестанская кухня",
	"Скандинавская кухня",
	"Голландская кухня",
	"Абхазская кухня",
	"Авторская",
	"Датская кухня",
	"Европейская кухня",
	"Норвежская кухня",
	"Финская кухня",
	"Австралийская кухня",
	"Американская кухня",
	"Казахская кухня",
	"Кабардинская кухня",
	"Азербайджанская кухня",
	"Английская кухня",
	"Белорусская кухня",
	"Лапландская кухня",
	"Индийская кухня",
	"Китайская кухня",
	"Кубинская кухня",
	"Чеченская кухня",
	"Австрийская кухня",
	"Греческая кухня",
	"Африканская кухня",
	"Мексиканская кухня",
	"Армянская кухня",
	"Еврейская кухня",
	"Осетинская кухня",
	"Вьетнамская кухня",
	"Канадская кухня",
	"Португальская кухня",
	"Татарская кухня",
	"Адыгейская кухня",
	"Испанская кухня",
	"Средиземноморская кухня",
	"Бурятская кухня",
	"Иранская кухня",
	"Арабская кухня",
	"Аргентинская кухня",
	"Башкирская кухня",
	"Бельгийская кухня",
	"Болгарская кухня",
	"Бразильская кухня",
	"Венгерская кухня",
	"Восточная кухня",
	"Гавайская кухня",
	"Египетская кухня",
	"Израильская кухня",
	"Ирландская кухня",
	"Кавказская кухня",
	"Латиноамериканская кухня",
	"Латышская кухня",
	"Ливанская кухня",
	"Марокканская кухня",
	"Молдавская кухня",
	"Немецкая кухня",
	"Перуанская кухня",
	"Румынская кухня",
	"Сербская кухня",
	"Сибирская кухня",
	"Словацкая кухня",
	"Советская кухня",
	"Тайская кухня",
	"Туркменская кухня",
	"Тюркская кухня",
	"Узбекская кухня",
	"Украинская кухня",
	"Филиппинская кухня",
	"Французская кухня",
	"Чехословацкая кухня",
	"Чешская кухня",
	"Шведская кухня",
	"Швейцарская кухня",
	"Шотландская кухня",
	"Эстонская кухня",
	"Интернациональная кухня",
	"Крымско-татарская кухня",
	"Восточноевропейская кухня",
	"Среднеазиатская кухня",
	"Карельская кухня",
	"Литовская кухня",
	"Таджикская кухня",
	"Британская кухня",
	"Удмуртская кухня",
	"Славянская кухня",
	"Прибалтийская кухня",
	"Тибетская кухня",
	"Балканская кухня",
	"Индонезийская кухня",
	"Черкесская кухня",
	"Северная кухня",
	"Тунисская кухня",
	"Сицилийская кухня",
	"Монгольская кухня",
	"Чукотская кухня",
	"Карибская кухня",
	"Североамериканская кухня",
	"Ближневосточная кухня",
	"Восточноазиатская кухня",
	"Новозеландская кухня",
	"Дальневосточная кухня",
	"Хорватская кухня",
	"Марийская кухня",
	"Якутская кухня",
	"Японская кухня",
]

const cookingTimeItems = ["До 15 минут", "15-30 минут", "60+ минут"]

const dietItems = [
	"Вегетарианство",
	"Веганство",
	"Без глютена",
	"Кето",
	"Палео",
]

const state = reactive<DishParams>({
	mealType: null,
	dishType: null,
	cuisineType: "",
	diet: null,
	cookingTime: null,
})

const schema = z.object({
	mealType: z.string().optional().nullable(),
	dishType: z.string().optional().nullable(),
	cuisineType: z.string().optional().nullable(),
	diet: z.string().optional().nullable(),
	cookingTime: z.string().optional().nullable(),
})

async function onSubmit(event: FormSubmitEvent<DishParams>) {
	emit("submit", event.data)
}

const refForm = ref(null)
</script>

<template>
	<UForm
		ref="refForm"
		:schema="schema"
		:state="state"
		class="h-full flex flex-col justify-between"
		@submit="onSubmit"
	>
		<div class="flex-1 space-y-2">
			<UFormGroup label="Тип приема пищи" name="mealType">
				<AppSelect v-model="state.mealType" :items="mealTypeItems" />
			</UFormGroup>

			<UFormGroup label="Тип блюда" name="mealType">
				<AppSelect v-model="state.dishType" :items="dishTypeItems" />
			</UFormGroup>

			<UFormGroup label="Кухня мира" name="cuisineType">
				<ClientOnly>
					<USelectMenu
						v-model="state.cuisineType"
						:options="cuisineTypeItems"
						placeholder="Выбрать"
						searchable
						searchable-placeholder="Найти..."
						clear-search-on-close
					/>
				</ClientOnly>
			</UFormGroup>

			<UFormGroup label="Диета" name="mealType">
				<AppSelect v-model="state.diet" :items="dietItems" />
			</UFormGroup>

			<UFormGroup label="Время приготовления" name="cookingTime">
				<AppSelect v-model="state.cookingTime" :items="cookingTimeItems" />
			</UFormGroup>
		</div>

		<div class="flex justify-between">
			<UButton type="submit" block icon="i-mdi-check">Применить</UButton>
		</div>
	</UForm>
</template>
