/*
Desarrollo de Software
Sistema de gestión de una clínica medica

Integrantes:
-David Chang
-Enzo Bejarano
-Windell Urroz

-La clase se encarga del funcionamiento que tiene el modulo de medicos
*/
async function cargarEspecialidadesParaSelect(selectId){
    const select = document.getElementById(selectId);
    if (!select){
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/especialidades/';
    try{
        const respuesta = await peticionAPI(url, 'GET');
        select.innerHTML = '<option value = "">Seleccione:</option>';
        for (let indice = 0; indice < respuesta.length; indice++){
            const option = document.createElement('option');
            option.value = respuesta[indice].id_especialidad;
            option.textContent = respuesta[indice].nombre_especialidad;
            select.appendChild(option);
        }/*fin del for*/
    }catch (error){
        console.error('Error al cargar especialidades:', error);
        select.innerHTML = '<option value = "">Error al cargar especialidades</option>';
    }/*fin del try*/
}/*fin del cargarEspecialidadesParaSelect*/

async function registrarMedico(event){
    event.preventDefault();
    const cedula = obtenerNumero('med-cedula');
    const nombre = obtenerValor('med-nombre');
    const telefono = obtenerValor('med-telefono');
    const correo = obtenerValor('med-correo');
    const provincia = obtenerValorSelect('med-provincia');
    const idEspecialidad = obtenerNumeroSelect('med-especialidad');
    if (cedula === 0){
        mostrarMensaje('Error', 'La cedula es obligatoria y debe ser un numero', 'error');
        return;
    }/*fin del if*/

    if (!nombre){
        mostrarMensaje('Error', 'El nombre es obligatorio', 'error');
        return;
    }/*fin del if*/

    if (!telefono){
        mostrarMensaje('Error', 'El telefono es obligatorio', 'error');
        return;
    }/*fin del if*/

    if (!correo){
        mostrarMensaje('Error', 'El correo es obligatorio', 'error');
        return;
    }/*fin del if*/

    if (!provincia){
        mostrarMensaje('Error', 'La provincia es obligatoria', 'error');
        return;
    }/*fin del if*/

    if (idEspecialidad === 0){
        mostrarMensaje('Error', 'La especialidad es obligatoria', 'error');
        return;
    }/*fin del if*/

    const datos = {
        cedula_medico: cedula,
        nombre_medico: nombre,
        telefono_medico: telefono,
        correo_medico: correo,
        provincia_medico: provincia,
        id_especialidad: idEspecialidad
    };/*fin de datos*/

    const url = API_BASE_URL + '/medico/';
    try{
        await peticionAPI(url, 'POST', datos);
        mostrarMensaje('Exito', 'Medico registrado correctamente', 'exito');
        limpiarFormulario('form-medico');
        listarMedicos();
    }catch (error){
        let mensaje = 'Error al registrar el medico';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en registrarMedico:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del registrarMedico*/

async function listarMedicos(){
    const url = API_BASE_URL + '/medico/';
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['cedula_medico', 'nombre_medico', 'telefono_medico', 'correo_medico', 'provincia_medico', 'id_especialidad'];
        actualizarTabla('tabla-medicos', respuesta, columnas);
    }catch (error){
        let mensaje = 'Error al listar los medicos';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en listarMedicos:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del listarMedicos*/

async function buscarPorCedulaMed(){
    const cedula = prompt('Ingrese la cedula del medico:');
    if (!cedula){
        return;
    }/*fin del if*/

    const cedulaNumerica = parseInt(cedula);
    if (isNaN(cedulaNumerica)){
        mostrarMensaje('Error', 'La cedula debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/medico/' + cedulaNumerica;

    try{
        const respuesta = await peticionAPI(url, 'GET');
        const datos = [respuesta];
        const columnas = ['cedula_medico', 'nombre_medico', 'telefono_medico', 'correo_medico', 'provincia_medico', 'id_especialidad'];
        actualizarTabla('tabla-medicos', datos, columnas);
    }catch (error){
        let mensaje = 'No se encontro el medico';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en buscarPorCedulaMed:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del buscarPorCedulaMed*/

async function buscarPorProvinciaMed(){
    const provincia = prompt('Ingrese la provincia:');
    if (!provincia){
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/medico/provincia/' + provincia;
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['cedula_medico', 'nombre_medico', 'telefono_medico', 'correo_medico', 'provincia_medico', 'id_especialidad'];
        actualizarTabla('tabla-medicos', respuesta, columnas);
        if (respuesta.length === 0){
            mostrarMensaje('Informacion', 'No hay medicos en la provincia ' + provincia, 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al buscar medicos';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en buscarPorProvinciaMed:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del buscarPorProvinciaMed*/

async function buscarPorEspecialidad(){
    const id = prompt('Ingrese el ID de la especialidad:');
    if (!id){
        return;
    }/*fin del if*/

    const idNumerico = parseInt(id);
    if (isNaN(idNumerico)){
        mostrarMensaje('Error', 'El ID debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/medico/id_especialidad/' + idNumerico;
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['cedula_medico', 'nombre_medico', 'telefono_medico', 'correo_medico', 'provincia_medico', 'id_especialidad'];
        actualizarTabla('tabla-medicos', respuesta, columnas);
        if (respuesta.length === 0){
            mostrarMensaje('Informacion', 'No hay medicos con esa especialidad', 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al buscar medicos';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en buscarPorEspecialidad:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del buscaPorEspecialidad*/

async function actualizarMedico(){
    const cedula = prompt('Ingrese la cedula del medico a actualizar:');
    if (!cedula){
        return;
    }/*fin del if*/

    const cedulaNumerica = parseInt(cedula);
    if (isNaN(cedulaNumerica)){
        mostrarMensaje('Error', 'La cedula debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const urlBuscar = API_BASE_URL + '/medico/' + cedulaNumerica;
    try{
        const respuesta = await peticionAPI(urlBuscar, 'GET');
        let nombre = prompt('Nuevo nombre (actual: ' + respuesta.nombre_medico + '):');
        if (nombre === null){
            return;
        }/*fin del if*/

        if (nombre === ''){
            nombre = respuesta.nombre_medico;
        }/*fin del if*/

        let telefono = prompt('Nuevo telefono (actual: ' + respuesta.telefono_medico + '):');
        if (telefono === null){
            return;
        }/*fin del if*/

        if (telefono === ''){
            telefono = respuesta.telefono_medico;
        }/*fin del if*/

        let correo = prompt('Nuevo correo (actual: ' + respuesta.correo_medico + '):');
        if (correo === null){
            return;
        }/*fin del if*/

        if (correo === ''){
            correo = respuesta.correo_medico;
        }/*fin del if*/

        let provincia = prompt('Nueva provincia (actual: ' + respuesta.provincia_medico + '):');
        if (provincia === null){
            return;
        }/*fin del if*/

        if (provincia === ''){
            provincia = respuesta.provincia_medico;
        }/*fin del if*/

        let idEspecialidad = prompt('Nuevo ID de especialidad (actual: ' + respuesta.id_especialidad + '):');
        if (idEspecialidad === null){
            return;
        }/*fin del if*/

        if (idEspecialidad === ''){
            idEspecialidad = respuesta.id_especialidad;
        }/*fin del if*/

        const idEspecialidadNumerico = parseInt(idEspecialidad);
        if (isNaN(idEspecialidadNumerico)){
            idEspecialidadNumerico = respuesta.id_especialidad;
        }/*fin del if*/

        const datos = {
            cedula_medico: cedulaNumerica,
            nombre_medico: nombre,
            telefono_medico: telefono,
            correo_medico: correo,
            provincia_medico: provincia,
            id_especialidad: idEspecialidadNumerico
        };/*fin de datos*/

        const urlActualizar = API_BASE_URL + '/medico/' + cedulaNumerica;
        await peticionAPI(urlActualizar, 'PUT', datos);
        mostrarMensaje('Exito', 'Medico actualizado correctamente', 'exito');
        listarMedicos();
    }catch (error){
        let mensaje = 'Error al actualizar el medico';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en actualizarMedico:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del actualizarMedico*/

async function eliminarMedico(){
    const cedula = prompt('Ingrese la cedula del medico a eliminar:');
    if (!cedula){
        return;
    }/*fin del if*/

    const cedulaNumerica = parseInt(cedula);
    if (isNaN(cedulaNumerica)){
        mostrarMensaje('Error', 'La cedula debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const confirmar = confirm('Esta seguro que desea eliminar al medico con cedula ' + cedulaNumerica + '?');
    if (!confirmar){
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/medico/' + cedulaNumerica;
    try{
        await peticionAPI(url, 'DELETE');
        mostrarMensaje('Exito', 'Medico eliminado correctamente', 'exito');
        listarMedicos();
    }catch (error){
        let mensaje = 'Error al eliminar el medico';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en eliminarMedico:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del eliminarMedico*/

function inicializarMedico(){
    const formMedico = document.getElementById('form-medico');
    if (formMedico){
        formMedico.addEventListener('submit', registrarMedico);
    }/*fin del if*/

    cargarEspecialidadesParaSelect('med-especialidad');
    const btnListar = document.getElementById('btn-listar-medicos');
    if (btnListar){
        btnListar.addEventListener('click', listarMedicos);
    }/*fin del if*/

    const btnBuscarCedula = document.getElementById('btn-buscar-cedula-medico');
    if (btnBuscarCedula){
        btnBuscarCedula.addEventListener('click', buscarPorCedulaMed);
    }/*fin del if*/

    const btnBuscarProvincia = document.getElementById('btn-buscar-provincia-medico');
    if (btnBuscarProvincia){
        btnBuscarProvincia.addEventListener('click', buscarPorProvinciaMed);
    }/*fin del if*/

    const btnBuscarEspecialidad = document.getElementById('btn-buscar-especialidad-medico');
    if (btnBuscarEspecialidad){
        btnBuscarEspecialidad.addEventListener('click', buscarPorEspecialidad);
    }/*fin del if*/

    const btnActualizar = document.getElementById('btn-actualizar-medico');
    if (btnActualizar){
        btnActualizar.addEventListener('click', actualizarMedico);
    }/*fin del if*/

    const btnEliminar = document.getElementById('btn-eliminar-medico');
    if (btnEliminar){
        btnEliminar.addEventListener('click', eliminarMedico);
    }/*fin del if*/

    listarMedicos();
}/*fin del inicializarMedico*/