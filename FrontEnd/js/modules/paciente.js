/*
Desarrollo de Software
Sistema de gestión de una clínica medica

Integrantes:
-David Chang
-Enzo Bejarano
-Windell Urroz

-La clase se encarga del funcionamiento que tiene el modulo de paciente
*/
async function cargarPadecimientosParaSelect(selectId){
    const select = document.getElementById(selectId);
    if (!select){
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/padecimientos/';
    try{
        const respuesta = await peticionAPI(url, 'GET');
        select.innerHTML = '<option value = "">Seleccione:</option>';
        for (let indice = 0; indice < respuesta.length; indice++){
            const option = document.createElement('option');
            option.value = respuesta[indice].id_padecimiento;
            option.textContent = respuesta[indice].nombre_padecimiento;
            select.appendChild(option);
        }/*fin del for*/
    }catch (error){
        console.error('Error al cargar padecimientos:', error);
        select.innerHTML = '<option value = "">Error al cargar padecimientos</option>';
    }/*fin del try*/
}/*fin del cargarPadecimientoParaSelect*/

async function registrarPaciente(event){
    event.preventDefault();
    const cedula = obtenerNumero('pac-cedula');
    const nombre = obtenerValor('pac-nombre');
    const telefono = obtenerValor('pac-telefono');
    const correo = obtenerValor('pac-correo');
    const provincia = obtenerValorSelect('pac-provincia');
    const idPadecimiento = obtenerNumeroSelect('pac-padecimiento');
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
    }/*fin  del if*/

    if (idPadecimiento === 0){
        mostrarMensaje('Error', 'El padecimiento es obligatorio', 'error');
        return;
    }/*fin del if*/

    const datos = {
        cedula_paciente: cedula,
        nombre_paciente: nombre,
        telefono_paciente: telefono,
        correo_paciente: correo,
        provincia_paciente: provincia,
        id_padecimiento: idPadecimiento
    };/*fin de datos*/

    const url = API_BASE_URL + '/paciente/';
    try{
        await peticionAPI(url, 'POST', datos);
        mostrarMensaje('Exito', 'Paciente registrado correctamente', 'exito');
        limpiarFormulario('form-paciente');
        listarPacientes();
    }catch (error){
        let mensaje = 'Error al registrar el paciente';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en registrarPaciente:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del registrarPaciente*/

async function listarPacientes(){
    const url = API_BASE_URL + '/paciente/';
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['cedula_paciente', 'nombre_paciente', 'telefono_paciente', 'correo_paciente', 'provincia_paciente', 'id_padecimiento'];
        actualizarTabla('tabla-pacientes', respuesta, columnas);
    }catch (error){
        let mensaje = 'Error al listar los pacientes';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en listarPacientes:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del listarPacientes*/

async function buscarPorCedula(){
    const cedula = prompt('Ingrese la cedula del paciente:');
    if (!cedula){
        return;
    }/*fin del if*/

    const cedulaNumerica = parseInt(cedula);
    if (isNaN(cedulaNumerica)){
        mostrarMensaje('Error', 'La cedula debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/paciente/' + cedulaNumerica;
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const datos = [respuesta];
        const columnas = ['cedula_paciente', 'nombre_paciente', 'telefono_paciente', 'correo_paciente', 'provincia_paciente', 'id_padecimiento'];
        actualizarTabla('tabla-pacientes', datos, columnas);
    }catch (error){
        let mensaje = 'No se encontro el paciente';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en buscarPorCedula:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del buscarPorCedula*/

async function buscarPorProvinciaPac(){
    const provincia = prompt('Ingrese la provincia:');
    if (!provincia){
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/paciente/provincia/' + provincia;
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['cedula_paciente', 'nombre_paciente', 'telefono_paciente', 'correo_paciente', 'provincia_paciente', 'id_padecimiento'];
        actualizarTabla('tabla-pacientes', respuesta, columnas);
        if (respuesta.length === 0){
            mostrarMensaje('Informacion', 'No hay pacientes en la provincia ' + provincia, 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al buscar pacientes';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en buscarPorProvinciaPac:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del buscarPorProvincia*/

async function buscarPorPadecimientoPac(){
    const id = prompt('Ingrese el ID del padecimiento:');
    if (!id){
        return;
    }/*fin del if*/

    const idNumerico = parseInt(id);
    if (isNaN(idNumerico)){
        mostrarMensaje('Error', 'El ID debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/paciente/id_padecimiento/' + idNumerico;
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['cedula_paciente', 'nombre_paciente', 'telefono_paciente', 'correo_paciente', 'provincia_paciente', 'id_padecimiento'];
        actualizarTabla('tabla-pacientes', respuesta, columnas);
        if (respuesta.length === 0){
            mostrarMensaje('Informacion', 'No hay pacientes con ese padecimiento', 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al buscar pacientes';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en buscarPorPadecimientoPac:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del buscarPadecimientoPac*/

async function actualizarPaciente(){
    const cedula = prompt('Ingrese la cedula del paciente a actualizar:');
    if (!cedula){
        return;
    }/*fin del if*/

    const cedulaNumerica = parseInt(cedula);
    if (isNaN(cedulaNumerica)){
        mostrarMensaje('Error', 'La cedula debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const urlBuscar = API_BASE_URL + '/paciente/' + cedulaNumerica;
    try{
        const respuesta = await peticionAPI(urlBuscar, 'GET');
        let nombre = prompt('Nuevo nombre (actual: ' + respuesta.nombre_paciente + '):');
        if (nombre === null){
            return;
        }/*fin del if*/

        if (nombre === ''){
            nombre = respuesta.nombre_paciente;
        }/*fin del if*/

        let telefono = prompt('Nuevo telefono (actual: ' + respuesta.telefono_paciente + '):');
        if (telefono === null){
            return;
        }/*fin del if*/

        if (telefono === ''){
            telefono = respuesta.telefono_paciente;
        }/*fin del if*/

        let correo = prompt('Nuevo correo (actual: ' + respuesta.correo_paciente + '):');
        if (correo === null){
            return;
        }/*fin del if*/
    
        if (correo === ''){
            correo = respuesta.correo_paciente;
        }/*fin del if*/

        let provincia = prompt('Nueva provincia (actual: ' + respuesta.provincia_paciente + '):');
        if (provincia === null){
            return;
        }/*fin del if*/

        if (provincia === ''){
            provincia = respuesta.provincia_paciente;
        }/*fin del if*/

        let idPadecimiento = prompt('Nuevo ID de padecimiento (actual: ' + respuesta.id_padecimiento + '):');
        if (idPadecimiento === null){
            return;
        }/*fin del if*/

        if (idPadecimiento === ''){
            idPadecimiento = respuesta.id_padecimiento;
        }/*fin del if*/

        const idPadecimientoNumerico = parseInt(idPadecimiento);
        if (isNaN(idPadecimientoNumerico)){
            idPadecimientoNumerico = respuesta.id_padecimiento;
        }/*fin del if*/

        const datos = {
            cedula_paciente: cedulaNumerica,
            nombre_paciente: nombre,
            telefono_paciente: telefono,
            correo_paciente: correo,
            provincia_paciente: provincia,
            id_padecimiento: idPadecimientoNumerico
        };/*fin de datos*/

        const urlActualizar = API_BASE_URL + '/paciente/' + cedulaNumerica;
        await peticionAPI(urlActualizar, 'PUT', datos);
        mostrarMensaje('Exito', 'Paciente actualizado correctamente', 'exito');
        listarPacientes();
    }catch (error){
        let mensaje = 'Error al actualizar el paciente';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en actualizarPaciente:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del actualizarPaciente*/

async function eliminarPaciente(){
    const cedula = prompt('Ingrese la cedula del paciente a eliminar:');
    if (!cedula){
        return;
    }/*fin del if*/

    const cedulaNumerica = parseInt(cedula);
    if (isNaN(cedulaNumerica)){
        mostrarMensaje('Error', 'La cedula debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const confirmar = confirm('Esta seguro que desea eliminar al paciente con cedula ' + cedulaNumerica + '?');
    if (!confirmar){
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/paciente/' + cedulaNumerica;
    try{
        await peticionAPI(url, 'DELETE');
        mostrarMensaje('Exito', 'Paciente eliminado correctamente', 'exito');
        listarPacientes();
    }catch (error){
        let mensaje = 'Error al eliminar el paciente';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en eliminarPaciente:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del eliminarPaciente*/

function inicializarPaciente(){
    const formPaciente = document.getElementById('form-paciente');
    if (formPaciente){
        formPaciente.addEventListener('submit', registrarPaciente);
    }/*fin del if*/

    cargarPadecimientosParaSelect('pac-padecimiento');
    const btnListar = document.getElementById('btn-listar-pacientes');
    if (btnListar){
        btnListar.addEventListener('click', listarPacientes);
    }/*fin del if*/

    const btnBuscarCedula = document.getElementById('btn-buscar-cedula-paciente');
    if (btnBuscarCedula){
        btnBuscarCedula.addEventListener('click', buscarPorCedula);
    }/*fin del if*/

    const btnBuscarProvincia = document.getElementById('btn-buscar-provincia-paciente');
    if (btnBuscarProvincia){
        btnBuscarProvincia.addEventListener('click', buscarPorProvinciaPac);
    }/*fin del if*/

    const btnBuscarPadecimiento = document.getElementById('btn-buscar-padecimiento-paciente');
    if (btnBuscarPadecimiento){
        btnBuscarPadecimiento.addEventListener('click', buscarPorPadecimientoPac);
    }/*fin del if*/

    const btnActualizar = document.getElementById('btn-actualizar-paciente');
    if (btnActualizar){
        btnActualizar.addEventListener('click', actualizarPaciente);
    }/*fin del if*/

    const btnEliminar = document.getElementById('btn-eliminar-paciente');
    if (btnEliminar){
        btnEliminar.addEventListener('click', eliminarPaciente);
    }/*fin del if*/

    listarPacientes();
}/*fin del inicializarPaciente*/