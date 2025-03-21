import { HOST } from "./host.routes.js"
export const slotsByProfessionalRoute = (id) => `${HOST}/api/get-allSlotsByProfessional/${id}`
export const createOrderSlotRoute = (id) => `${HOST}/api/create-order/${id}`