import { HOST } from "./host.routes.js";
export const allOfficesRoute = () => `${HOST}/api/get-consultorios`
export const officePopulateProfessionalRoute = (id) => `${HOST}/api/get-professionalsByConsultorios/${id}`

