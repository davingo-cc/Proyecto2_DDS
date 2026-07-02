/*
Desarrollo de Software
Sistema de gestión de una clínica medica

Integrantes:
-David Chang
-Enzo Bejarano
-Windell Urroz

-La clase se encarga del funcionamiento que tiene el modulo de especialidad
*/
async function registrarEspecialidad(event){
    event.preventDefault();
    const idEspecialidad = obtenerNumero('esp-id');
    const nombreEspecialidad = obtenerValor('esp-nombre');
    const areaMedica = obtenerValor('esp-area');
    const tipoAtencion = obtenerValorSelect('esp-tipo');
    if (idEspecialidad === 0){
        mostrarMensaje('Error', 'El ID es obligatorio y debe ser un numero', 'error');
        return;
    }/*fin del if*/

    if (!nombreEspecialidad){
        mostrarMensaje('Error', 'El nombre es obligatorio', 'error');
        return;
    }/*fin del if*/

    if (!areaMedica){
        mostrarMensaje('Error', 'El area medica es obligatoria', 'error');
        return;
    }/*fin del if*/

    if (!tipoAtencion){
        mostrarMensaje('Error', 'El tipo de atencion es obligatorio', 'error');
        return;
    }/*fin del if*/

    const datos = {
        id_especialidad: idEspecialidad,
        nombre_especialidad: nombreEspecialidad,
        area_medica: areaMedica,
        tipo_atencion: tipoAtencion
    };/*fin de datos*/

    const url = API_BASE_URL + '/especialidades/';
    try{
        await peticionAPI(url, 'POST', datos);
        mostrarMensaje('Exito', 'Especialidad registrada correctamente', 'exito');
        limpiarFormulario('form-especialidad');
        listarEspecialidades();
    }catch (error){
        let mensaje = 'Error al registrar la especialidad';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en registrarEspecialidad:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin de registrarEspecialidad*/

async function listarEspecialidades(){
    const url = API_BASE_URL + '/especialidades/';
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['id_especialidad', 'nombre_especialidad', 'area_medica', 'tipo_atencion'];
        actualizarTabla('tabla-especialidades', respuesta, columnas);
    }catch (error){
        let mensaje = 'Error al listar las especialidades';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en listarEspecialidades:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin de listarEspecialidades*/

async function buscarPorIdEsp(){
    const id = prompt('Ingrese el ID de la especialidad:');
    if (!id){
        return;
    }/*fin del if*/

    const idNumerico = parseInt(id);
    if (isNaN(idNumerico)){
        mostrarMensaje('Error', 'El ID debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/especialidades/' + idNumerico;
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const datos = [respuesta];
        const columnas = ['id_especialidad', 'nombre_especialidad', 'area_medica', 'tipo_atencion'];
        actualizarTabla('tabla-especialidades', datos, columnas);
    }catch (error){
        let mensaje = 'No se encontro la especialidad';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en buscarPorIdEsp:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del buscarPorEsp*/

async function buscarPorTipoAtencion(){
    const tipo = prompt('Ingrese el tipo de atencion (general, especializada):');
    if (!tipo){
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/especialidades/tipo-atencion/' + tipo;
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['id_especialidad', 'nombre_especialidad', 'area_medica', 'tipo_atencion'];
        actualizarTabla('tabla-especialidades', respuesta, columnas);
        if (respuesta.length === 0){
            mostrarMensaje('Informacion', 'No hay especialidades de tipo ' + tipo, 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al buscar especialidades';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en buscarPorTipoAtencion:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin de error*/
}/*fin del buscarPorTipoAtencion*/

async function actualizarEspecialidad(){
    const id = prompt('Ingrese el ID de la especialidad a actualizar:');
    if (!id){
        return;
    }/*fin del if*/

    const idNumerico = parseInt(id);
    if (isNaN(idNumerico)){
        mostrarMensaje('Error', 'El ID debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const urlBuscar = API_BASE_URL + '/especialidades/' + idNumerico;
    try{
        const respuesta = await peticionAPI(urlBuscar, 'GET');
        let nombre = prompt('Nuevo nombre (actual: ' + respuesta.nombre_especialidad + '):');
        if (nombre === null){
            return;
        }/*fin del if*/

        if (nombre === ''){
            nombre = respuesta.nombre_especialidad;
        }/*fin del if*/
    
        let area = prompt('Nueva area medica (actual: ' + respuesta.area_medica + '):');
        if (area === null){
            return;
        }/*fin del if*/

        if (area === ''){
            area = respuesta.area_medica;
        }/*fin del if*/

        let tipo = prompt('Nuevo tipo de atencion (general, especializada) (actual: ' + respuesta.tipo_atencion + '):');
        if (tipo === null){
            return;
        }/*fin del if*/

        if (tipo === ''){
            tipo = respuesta.tipo_atencion;
        }/*fin del if*/

        const datos = {
            id_especialidad: idNumerico,
            nombre_especialidad: nombre,
            area_medica: area,
            tipo_atencion: tipo
        };/*fin de datos*/

        const urlActualizar = API_BASE_URL + '/especialidades/' + idNumerico;
        await peticionAPI(urlActualizar, 'PUT', datos);
        mostrarMensaje('Exito', 'Especialidad actualizada correctamente', 'exito');
        listarEspecialidades();
    }catch (error){
        let mensaje = 'Error al actualizar la especialidad';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en actualizarEspecialidad:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del actualizarEspecialidad*/

async function eliminarEspecialidad(){
    const id = prompt('Ingrese el ID de la especialidad a eliminar:');
    if (!id){
        return;
    }/*fin del if*/

    const idNumerico = parseInt(id);
    if (isNaN(idNumerico)){
        mostrarMensaje('Error', 'El ID debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const confirmar = confirm('Esta seguro que desea eliminar la especialidad con ID ' + idNumerico + '?');
    if (!confirmar){
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/especialidades/' + idNumerico;
    try{
        await peticionAPI(url, 'DELETE');
        mostrarMensaje('Exito', 'Especialidad eliminada correctamente', 'exito');
        listarEspecialidades();
    }catch (error){
        let mensaje = 'Error al eliminar la especialidad';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en eliminarEspecialidad:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del eliminarEspecialidad*/

function inicializarEspecialidad(){
    const formEspecialidad = document.getElementById('form-especialidad');
    if (formEspecialidad){
        formEspecialidad.addEventListener('submit', registrarEspecialidad);
    }/*fin del if*/

    const btnListar = document.getElementById('btn-listar-especialidades');
    if (btnListar){
        btnListar.addEventListener('click', listarEspecialidades);
    }/*fin del if*/

    const btnBuscarId = document.getElementById('btn-buscar-id-especialidad');
    if (btnBuscarId){
        btnBuscarId.addEventListener('click', buscarPorIdEsp);
    }/*fin del if*/

    const btnBuscarTipo = document.getElementById('btn-buscar-tipo-especialidad');
    if (btnBuscarTipo){
        btnBuscarTipo.addEventListener('click', buscarPorTipoAtencion);
    }/*fin del if*/

    const btnActualizar = document.getElementById('btn-actualizar-especialidad');
    if (btnActualizar){
        btnActualizar.addEventListener('click', actualizarEspecialidad);
    }/*fin del if*/

    const btnEliminar = document.getElementById('btn-eliminar-especialidad');
    if (btnEliminar){
        btnEliminar.addEventListener('click', eliminarEspecialidad);
    }/*fin del if*/

    listarEspecialidades();
}/*fin del inicializarEspecialidad*/