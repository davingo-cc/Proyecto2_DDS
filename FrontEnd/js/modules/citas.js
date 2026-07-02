/*
Desarrollo de Software
Sistema de gestión de una clínica medica

Integrantes:
-David Chang
-Enzo Bejarano
-Windell Urroz

-La clase se encarga del funcionamiento que tiene el modulo de citas
*/
function inicializarSelectoresFecha(){
    const diaSelect = document.getElementById('cita-dia');
    if (diaSelect){
        diaSelect.innerHTML = '<option value = "">Dia</option>';
        for (let dia = 1; dia <= 31; dia++){
            const option = document.createElement('option');
            option.value = dia;
            option.textContent = dia;
            diaSelect.appendChild(option);
        }/*fin del for*/
    }/*fin del if*/

    const mesSelect = document.getElementById('cita-mes');
    if (mesSelect){
        mesSelect.innerHTML = '<option value = "">Mes</option>';
        const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        for (let mes = 0; mes < nombresMeses.length; mes++){
            const option = document.createElement('option');
            option.value = mes + 1;
            option.textContent = nombresMeses[mes];
            mesSelect.appendChild(option);
        }/*fin del for*/
    }/*fin del if*/

    const anoSelect = document.getElementById('cita-ano');
    if (anoSelect){
        anoSelect.innerHTML = '<option value = "">Año</option>';
        for (let ano = 2026; ano <= 2040; ano++){
            const option = document.createElement('option');
            option.value = ano;
            option.textContent = ano;
            anoSelect.appendChild(option);
        }/*fin del for*/
    }/*fin del if*/
}/*fin de iniciarSelectorFecha*/

async function cargarPacientesParaSelect(){
    const select = document.getElementById('cita-paciente');
    if (!select){
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/paciente/';
    try{
        const respuesta = await peticionAPI(url, 'GET');
        select.innerHTML = '<option value = "">Seleccione:</option>';
        for (let indice = 0; indice < respuesta.length; indice++){
            const option = document.createElement('option');
            option.value = respuesta[indice].cedula_paciente;
            option.textContent = respuesta[indice].nombre_paciente;
            select.appendChild(option);
        }/*fin del for*/
    }catch (error){
        console.error('Error al cargar pacientes:', error);
        select.innerHTML = '<option value = "">Error al cargar pacientes</option>';
    }/*fin del try*/
}/*fin del cargarPacientesParaSelect*/

async function cargarMedicosParaSelect(){
    const select = document.getElementById('cita-medico');
    if (!select){
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/medico/';
    try{
        const respuesta = await peticionAPI(url, 'GET');
        select.innerHTML = '<option value = "">Seleccione:</option>';
        for (let indice = 0; indice < respuesta.length; indice++){
            const option = document.createElement('option');
            option.value = respuesta[indice].cedula_medico;
            option.textContent = respuesta[indice].nombre_medico;
            select.appendChild(option);
        }/*fin del for*/
    }catch (error){
        console.error('Error al cargar medicos:', error);
        select.innerHTML = '<option value = "">Error al cargar medicos</option>';
    }/*fin del try*/
}/*fin del cargarMedicosParaSelect*/

async function registrarCita(event){
    event.preventDefault();
    const idCita = obtenerNumero('cita-id');
    const motivo = obtenerValor('cita-motivo');
    const dia = obtenerNumeroSelect('cita-dia');
    const mes = obtenerNumeroSelect('cita-mes');
    const ano = obtenerNumeroSelect('cita-ano');
    const cedulaPaciente = obtenerNumeroSelect('cita-paciente');
    const cedulaMedico = obtenerNumeroSelect('cita-medico');
    if (idCita === 0){
        mostrarMensaje('Error', 'El ID es obligatorio y debe ser un numero', 'error');
        return;
    }/*fin del if*/

    if (!motivo){
        mostrarMensaje('Error', 'El motivo es obligatorio', 'error');
        return;
    }/*fin del if*/

    if (dia === 0){
        mostrarMensaje('Error', 'El dia es obligatorio', 'error');
        return;
    }/*fin del if*/

    if (mes === 0){
        mostrarMensaje('Error', 'El mes es obligatorio', 'error');
        return;
    }/*fin del if*/

    if (ano === 0){
        mostrarMensaje('Error', 'El año es obligatorio', 'error');
        return;
    }/*fin del if*/

    if (cedulaPaciente === 0){
        mostrarMensaje('Error', 'El paciente es obligatorio', 'error');
        return;
    }/*fin del if*/

    if (cedulaMedico === 0){
        mostrarMensaje('Error', 'El medico es obligatorio', 'error');
        return;
    }/*fin del if*/

    let mesFormateado = mes;
    if (mes < 10){
        mesFormateado = '0' + mes;
    }/*fin del if*/

    let diaFormateado = dia;
    if (dia < 10){
        diaFormateado = '0' + dia;
    }/*fin del if*/

    const fecha = ano + '-' + mesFormateado + '-' + diaFormateado;
    const datos = {
        id_cita: idCita,
        motivo: motivo,
        fecha: fecha,
        cedula_paciente: cedulaPaciente,
        cedula_medico: cedulaMedico
    };/*fin de datos*/

    const url = API_BASE_URL + '/citas-medicas/';
    try{
        await peticionAPI(url, 'POST', datos);
        mostrarMensaje('Exito', 'Cita registrada correctamente', 'exito');
        limpiarFormulario('form-cita');
        listarCitas();
    }catch (error){
        let mensaje = 'Error al registrar la cita';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en registrarCita:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del registrarCita*/

async function listarCitas(){
    const url = API_BASE_URL + '/citas-medicas/';
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['id_cita', 'motivo', 'fecha', 'cedula_paciente', 'cedula_medico'];
        actualizarTabla('tabla-citas', respuesta, columnas);
    }catch (error){
        let mensaje = 'Error al listar las citas';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en listarCitas:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del listaritas*/

async function buscarPorIdCita(){
    const id = prompt('Ingrese el ID de la cita:');
    if (!id){
        return;
    }/*fin del if*/

    const idNumerico = parseInt(id);
    if (isNaN(idNumerico)){
        mostrarMensaje('Error', 'El ID debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/citas-medicas/' + idNumerico;
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const datos = [respuesta];
        const columnas = ['id_cita', 'motivo', 'fecha', 'cedula_paciente', 'cedula_medico'];
        actualizarTabla('tabla-citas', datos, columnas);
    }catch (error){
        let mensaje = 'No se encontro la cita';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en buscarPorIdCita:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del buscarPorIdCita*/

async function buscarPorPaciente(){
    const cedula = prompt('Ingrese la cedula del paciente:');
    if (!cedula){
        return;
    }/*fin del if*/

    const cedulaNumerica = parseInt(cedula);
    if (isNaN(cedulaNumerica)){
        mostrarMensaje('Error', 'La cedula debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/citas-medicas/paciente/' + cedulaNumerica;
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['id_cita', 'motivo', 'fecha', 'cedula_paciente', 'cedula_medico'];
        actualizarTabla('tabla-citas', respuesta, columnas);
        if (respuesta.length === 0){
            mostrarMensaje('Informacion', 'No hay citas para este paciente', 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al buscar citas';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en buscarPorPaciente:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del buscaPorPaciente*/

async function buscarPorMedico(){
    const cedula = prompt('Ingrese la cedula del medico:');
    if (!cedula){
        return;
    }/*fin del if*/

    const cedulaNumerica = parseInt(cedula);
    if (isNaN(cedulaNumerica)){
        mostrarMensaje('Error', 'La cedula debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/citas-medicas/medico/' + cedulaNumerica;
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['id_cita', 'motivo', 'fecha', 'cedula_paciente', 'cedula_medico'];
        actualizarTabla('tabla-citas', respuesta, columnas);
        if (respuesta.length === 0){
            mostrarMensaje('Informacion', 'No hay citas para este medico', 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al buscar citas';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en buscarPorMedico:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del buscarPorMedico*/

async function actualizarCita(){
    const id = prompt('Ingrese el ID de la cita a actualizar:');
    if (!id){
        return;
    }/*fin del if*/

    const idNumerico = parseInt(id);
    if (isNaN(idNumerico)){
        mostrarMensaje('Error', 'El ID debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const urlBuscar = API_BASE_URL + '/citas-medicas/' + idNumerico;
    try{
        const respuesta = await peticionAPI(urlBuscar, 'GET');
        let motivo = prompt('Nuevo motivo (actual: ' + respuesta.motivo + '):');
        if (motivo === null){
            return;
        }/*fin del if*/

        if (motivo === ''){
            motivo = respuesta.motivo;
        }/*fin del if*/

        let fecha = prompt('Nueva fecha (YYYY-MM-DD) (actual: ' + respuesta.fecha + '):');
        if (fecha === null){
            return;
        }/*fin del if*/

        if (fecha === ''){
            fecha = respuesta.fecha;
        }/*fin del if*/

        let cedulaPaciente = prompt('Nueva cedula del paciente (actual: ' + respuesta.cedula_paciente + '):');
        if (cedulaPaciente === null){
            return;
        }/*fin del if*/

        if (cedulaPaciente === ''){
            cedulaPaciente = respuesta.cedula_paciente;
        }/*fin del if*/

        const cedulaPacienteNumerica = parseInt(cedulaPaciente);
        if (isNaN(cedulaPacienteNumerica)){
            cedulaPacienteNumerica = respuesta.cedula_paciente;
        }/*fin del if*/

        let cedulaMedico = prompt('Nueva cedula del medico (actual: ' + respuesta.cedula_medico + '):');
        if (cedulaMedico === null){
            return;
        }/*fin del if*/

        if (cedulaMedico === ''){
            cedulaMedico = respuesta.cedula_medico;
        }/*fin del if*/

        const cedulaMedicoNumerica = parseInt(cedulaMedico);
        if (isNaN(cedulaMedicoNumerica)){
            cedulaMedicoNumerica = respuesta.cedula_medico;
        }/*fin del if*/

        const datos = {
            id_cita: idNumerico,
            motivo: motivo,
            fecha: fecha,
            cedula_paciente: cedulaPacienteNumerica,
            cedula_medico: cedulaMedicoNumerica
        };/*fin de datos*/

        const urlActualizar = API_BASE_URL + '/citas-medicas/' + idNumerico;
        await peticionAPI(urlActualizar, 'PUT', datos);
        mostrarMensaje('Exito', 'Cita actualizada correctamente', 'exito');
        listarCitas();
    }catch (error){
        let mensaje = 'Error al actualizar la cita';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en actualizarCita:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del actualizarCitas*/

async function eliminarCita(){
    const id = prompt('Ingrese el ID de la cita a eliminar:');
    if (!id){
        return;
    }/*fin del if*/

    const idNumerico = parseInt(id);
    if (isNaN(idNumerico)){
        mostrarMensaje('Error', 'El ID debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const confirmar = confirm('Esta seguro que desea eliminar la cita con ID ' + idNumerico + '?');
    if (!confirmar){
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/citas-medicas/' + idNumerico;
    try{
        await peticionAPI(url, 'DELETE');
        mostrarMensaje('Exito', 'Cita eliminada correctamente', 'exito');
        listarCitas();
    }catch (error){
        let mensaje = 'Error al eliminar la cita';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en eliminarCita:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del eliminarCita*/

function inicializarCitas(){
    inicializarSelectoresFecha();
    cargarPacientesParaSelect();
    cargarMedicosParaSelect();

    const formCita = document.getElementById('form-cita');
    if (formCita){
        formCita.addEventListener('submit', registrarCita);
    }/*fin del if*/

    const btnListar = document.getElementById('btn-listar-citas');
    if (btnListar){
        btnListar.addEventListener('click', listarCitas);
    }/*fin del if*/

    const btnBuscarId = document.getElementById('btn-buscar-id-cita');
    if (btnBuscarId){
        btnBuscarId.addEventListener('click', buscarPorIdCita);
    }/*fin del if*/

    const btnBuscarPaciente = document.getElementById('btn-buscar-paciente-cita');
    if (btnBuscarPaciente){
        btnBuscarPaciente.addEventListener('click', buscarPorPaciente);
    }/*fin del if*/

    const btnBuscarMedico = document.getElementById('btn-buscar-medico-cita');
    if (btnBuscarMedico){
        btnBuscarMedico.addEventListener('click', buscarPorMedico);
    }/*fin del if*/

    const btnActualizar = document.getElementById('btn-actualizar-cita');
    if (btnActualizar){
        btnActualizar.addEventListener('click', actualizarCita);
    }/*fin del if*/

    const btnEliminar = document.getElementById('btn-eliminar-cita');
    if (btnEliminar){
        btnEliminar.addEventListener('click', eliminarCita);
    }/*fin del if*/

    listarCitas();
}/*fin del inicializarCitas*/