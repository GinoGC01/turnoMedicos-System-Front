export const formValidation = (formData) => {
    if(!formData) return {status:false, message:'error, no se registran datos del formulario'}
    if(!formData.nombre || !formData.dni || !formData.edad) return {status:false, message:'Error, faltan datos del formulario'}

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    const regexDNI = /^\d+$/;
    const regexDNILength = /^\d{8}$/;
    const regexEdad = /^(0|[1-9]\d?)$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const regexTelefono = /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/


    if (!regexNombre.test(formData.nombre)) {
        const message = 'El nombre solo puede contener letras y espacios.'
        return {status:false, message}
    }

    if (!regexEmail.test(formData.email)) {
        const message = 'Formato de Email incorrecto'
        return {status:false, message}
    }

    if (!regexTelefono.test(formData.telefono)) {
        const message = 'Formato de Telefono incorrecto'
        return {status:false, message}
    }

    if (!regexDNI.test(formData.dni)) {
        const message = 'El DNI solo puede contener números.'
        return {status:false, message}
    }

      if (!regexDNILength.test(formData.dni)) {
        const message = 'Ingrese un DNI válido. ej. "11222333"'
        return {status:false, message}
    }

    if (!regexEdad.test(formData.edad)) {
        const message = 'La edad debe ser un número menor a 100.'
        return {status:false, message}
    }

    return {status:true, message:'campos validados con exito'}
}