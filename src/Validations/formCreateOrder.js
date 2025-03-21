export const formValidation = (formData) => {
    if(!formData) return {status:false, message:'error, no se registran datos del formulario'}
    if(!formData.nombre || !formData.dni || !formData.edad) return {status:false, message:'Error, faltan datos del formulario'}

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/; // Solo letras y espacios
    const regexDNI = /^\d+$/; // Solo números
    const regexDNILength = /^\d{8}$/; // Solo números
    const regexEdad = /^(0|[1-9]\d?)$/; // Números entre 0 y 99


    if (!regexNombre.test(formData.nombre)) {
        const message = 'El nombre solo puede contener letras y espacios.'
        return {status:false, message}
    }

    // Validación del DNI
    if (!regexDNI.test(formData.dni)) {
        const message = 'El DNI solo puede contener números.'
        return {status:false, message}
    }

      // Validación del DNI
      if (!regexDNILength.test(formData.dni)) {
        const message = 'Ingrese un DNI válido. ej. "11222333"'
        return {status:false, message}
    }

    // Validación de la edad
    if (!regexEdad.test(formData.edad)) {
        const message = 'La edad debe ser un número menor a 100.'
        return {status:false, message}
    }

    return {status:true, message:'campos validados con exito'}
}