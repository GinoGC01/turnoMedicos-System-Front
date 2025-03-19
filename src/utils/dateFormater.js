export const dateFormater = (date) => {

const horario = date + "T00:00:00" // UTC (tiempo universal coordinado)
    
// Convertir la cadena a un objeto Date
const fecha = new Date(horario);

// Opciones de formato
const opciones = {
  weekday: 'long',   // Día de la semana (ej: "martes")
  day: 'numeric',    // Día del mes (ej: "03")
  month: 'long',     // Mes (ej: "marzo")
  year: 'numeric'    // Año (ej: "2025")
};

// Formatear la fecha
const formatoFecha = new Intl.DateTimeFormat('es-AR', opciones).format(fecha);

return formatoFecha
}