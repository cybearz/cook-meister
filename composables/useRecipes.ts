import { Prisma } from "@prisma/client"

export default () => {
	const {
		data: recipes,
		error,
		pending,
		refresh,
	} = useLazyFetch("/api/recipes", {
		method: "GET",
	})

	return {
		recipes,
		error,
		pending,
		refresh,
	}
}
