import { v4 as genId } from "uuid"

export default (fileName: string) => {
	const ext = fileName.split(".")[1]
	return `${genId()}.${ext}`
}
