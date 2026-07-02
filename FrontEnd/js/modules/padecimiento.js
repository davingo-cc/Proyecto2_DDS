/*
Desarrollo de Software
Sistema de gestión de una clínica medica

Integrantes:
-David Chang
-Enzo Bejarano
-Windell Urroz

-La clase se encarga del funcionamiento que tiene el modulo de padecimiento
*/
function toggleDuracion(select){
    const campoDuracion = document.getElementById('campo-duracion');
    if (!campoDuracion){
        return;
    }/*fin del if*/

    if (select.value === 'si_necesita'){
        campoDuracion.style.display = 'block';
    }else{
        campoDuracion.style.display = 'none';
    }/*fin del if*/
}/*fin del toggleDuracion*/

function cambiarCantidad(delta){
    const input = document.getElementById('pad-cantidad');
    if (!input){
        return;
    }/*fin del if*/

    let valor = parseInt(input.value) + delta;
    let min = parseInt(input.min);
    let max = parseInt(input.max);
    if (isNaN(min)){
        min = 1;
    }/*fin del if*/

    if (isNaN(max)){
        max = 99;
    }/*fin del if*/

    if (valor < min){
        valor = min;
    }/*fin del if*/

    if (valor > max){
        valor = max;
    }/*fin del if*/

    input.value = valor;
}/*fin del cambiarCantidad*/

async function registrarPadecimiento(event){
    event.preventDefault();
    const idPadecimiento = obtenerNumero('pad-id');
    const nombrePadecimiento = obtenerValor('pad-nombre');
    const tipo = obtenerValorSelect('pad-tipo');
    const tratamientoSelect = obtenerValorSelect('pad-tratamiento');
    let tieneTratamientoProlongado = false;
    if (tratamientoSelect === 'si_necesita'){
        tieneTratamientoProlongado = true;
    }/*fin del if*/

    let cantidad = 0;
    let unidad = null;
    if (tieneTratamientoProlongado){
        cantidad = obtenerNumero('pad-cantidad');
        unidad = obtenerValorSelect('pad-unidad');
    }/*fin del if*/

    if (idPadecimiento === 0){
        mostrarMensaje('Error', 'El ID es obligatorio y debe ser un numero', 'error');
        return;
    }/*fin del if*/

    if (!nombrePadecimiento){
        mostrarMensaje('Error', 'El nombre es obligatorio', 'error');
        return;
    }/*fin del if*/

    if (!tipo){
        mostrarMensaje('Error', 'El tipo es obligatorio', 'error');
        return;
    }/*fin del if*/

    const datos = {
        id_padecimiento: idPadecimiento,
        nombre_padecimiento: nombrePadecimiento,
        tipo: tipo,
        tiene_tratamiento_prolongado: tieneTratamientoProlongado
    };/*fin de datos*/

    if (tieneTratamientoProlongado){
        datos.cantidad = cantidad;
        datos.unidad = unidad;
    }/*fin del if*/

    const url = API_BASE_URL + '/padecimientos/';
    try{
        await peticionAPI(url, 'POST', datos);
        mostrarMensaje('Exito', 'Padecimiento registrado correctamente', 'exito');
        limpiarFormulario('form-padecimiento');
        listarPadecimientos();
    }catch (error){
        let mensaje = 'Error al registrar el padecimiento';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en registrarPadecimiento:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del registrarPadecimiento*/

async function listarPadecimientos(){
    const url = API_BASE_URL + '/padecimientos/';
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['id_padecimiento', 'nombre_padecimiento', 'tipo', 'tratamiento_prolongado'];
        actualizarTabla('tabla-padecimientos', respuesta, columnas);
    }catch (error){
        let mensaje = 'Error al listar los padecimientos';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en listarPadecimientos:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del listarPadecimiento*/

async function buscarPorIdPad(){
    const id = prompt('Ingrese el ID del padecimiento:');
    if (!id){
        return;
    }/*fin del if*/

    const idNumerico = parseInt(id);
    if (isNaN(idNumerico)){
        mostrarMensaje('Error', 'El ID debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/padecimientos/' + idNumerico;
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const datos = [respuesta];
        const columnas = ['id_padecimiento', 'nombre_padecimiento', 'tipo', 'tratamiento_prolongado'];
        actualizarTabla('tabla-padecimientos', datos, columnas);
    }catch (error){
        let mensaje = 'No se encontro el padecimiento';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en buscarPorIdPad:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*BuscarPorID*/

async function buscarPorTipo(){
    const tipo = prompt('Ingrese el tipo (cronico, agudo, congenito, otro):');
    if (!tipo){
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/padecimientos/tipo/' + tipo;
    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['id_padecimiento', 'nombre_padecimiento', 'tipo', 'tratamiento_prolongado'];
        actualizarTabla('tabla-padecimientos', respuesta, columnas);
        if (respuesta.length === 0){
            mostrarMensaje('Informacion', 'No hay padecimientos de tipo ' + tipo, 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al buscar padecimientos';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en buscarPorTipo:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*BuscarPorTipo*/

async function actualizarPadecimiento(){
    const id = prompt('Ingrese el ID del padecimiento a actualizar:');
    if (!id){
        return;
    }/*fin del if*/

    const idNumerico = parseInt(id);
    if (isNaN(idNumerico)){
        mostrarMensaje('Error', 'El ID debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const urlBuscar = API_BASE_URL + '/padecimientos/' + idNumerico;
    try{
        const respuesta = await peticionAPI(urlBuscar, 'GET');
        let nombre = prompt('Nuevo nombre (actual: ' + respuesta.nombre_padecimiento + '):');
        if (nombre === null){
            return;
        }/*fin del if*/

        if (nombre === ''){
            nombre = respuesta.nombre_padecimiento;
        }/*fin del if*/

        let tipo = prompt('Nuevo tipo (cronico, agudo, congenito, otro) (actual: ' + respuesta.tipo + '):');
        if (tipo === null){
            return;
        }/*fin del if*/

        if (tipo === ''){
            tipo = respuesta.tipo;
        }/*fin del if*/

        const tieneTratamiento = confirm('¿Tiene tratamiento prolongado?');
        let cantidad = 0;
        let unidad = null;
        if (tieneTratamiento){
            cantidad = prompt('Cantidad (1-99):');
            if (cantidad === null){
                return;
            }/*fin del if*/

            if (cantidad === ''){
                cantidad = 1;
            }/*fin del if*/

            cantidad = parseInt(cantidad);
            if (isNaN(cantidad)){
                cantidad = 1;
            }/*fin del if*/

            unidad = prompt('Unidad (meses, anos):');
            if (unidad === null){
                return;
            }/*fin del if*/

            if (unidad === ''){
                unidad = 'meses';
            }/*fin del if*/
        }/*fin del if*/

        const datos = {
            id_padecimiento: idNumerico,
            nombre_padecimiento: nombre,
            tipo: tipo,
            tiene_tratamiento_prolongado: tieneTratamiento
        };/*fin de datos*/

        if (tieneTratamiento){
            datos.cantidad = cantidad;
            datos.unidad = unidad;
        }/*fin del if*/

        const urlActualizar = API_BASE_URL + '/padecimientos/' + idNumerico;
        await peticionAPI(urlActualizar, 'PUT', datos);
        mostrarMensaje('Exito', 'Padecimiento actualizado correctamente', 'exito');
        listarPadecimientos();
    }catch (error){
        let mensaje = 'Error al actualizar el padecimiento';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en actualizarPadecimiento:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del actualizarPadecimiento*/

async function eliminarPadecimiento(){
    const id = prompt('Ingrese el ID del padecimiento a eliminar:');
    if (!id){
        return;
    }/*fin del if*/

    const idNumerico = parseInt(id);
    if (isNaN(idNumerico)){
        mostrarMensaje('Error', 'El ID debe ser un numero entero', 'error');
        return;
    }/*fin del if*/

    const confirmar = confirm('Esta seguro que desea eliminar el padecimiento con ID ' + idNumerico + '?');
    if (!confirmar){
        return;
    }/*fin del if*/

    const url = API_BASE_URL + '/padecimientos/' + idNumerico;
    try{
        await peticionAPI(url, 'DELETE');
        mostrarMensaje('Exito', 'Padecimiento eliminado correctamente', 'exito');
        listarPadecimientos();
    }catch (error){
        let mensaje = 'Error al eliminar el padecimiento';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en eliminarPadecimiento:', error);
        mostrarMensaje('Error', mensaje, 'error');
    }/*fin del try*/
}/*fin del eliminarPadecimiento*/

function inicializarPadecimiento(){
    const formPadecimiento = document.getElementById('form-padecimiento');
    if (formPadecimiento){
        formPadecimiento.addEventListener('submit', registrarPadecimiento);
    }/*fin del if*/

    const selectTratamiento = document.getElementById('pad-tratamiento');
    if (selectTratamiento){
        selectTratamiento.addEventListener('change', function(){
            toggleDuracion(this);
        });/*fin del addEventListener*/
        toggleDuracion(selectTratamiento);
    }/*fin del if*/

    const btnDisminuir = document.getElementById('btn-disminuir');
    if (btnDisminuir){
        btnDisminuir.addEventListener('click', function() {
            cambiarCantidad(-1);
        });/*fin del addEventListener*/
    }/*fin del if*/

    const btnAumentar = document.getElementById('btn-aumentar');
    if (btnAumentar){
        btnAumentar.addEventListener('click', function(){
            cambiarCantidad(1);
        });/*fin del addEventListener*/
    }/*fin del if*/

    const btnListar = document.getElementById('btn-listar-padecimientos');
    if (btnListar){
        btnListar.addEventListener('click', listarPadecimientos);
    }/*fin del if*/

    const btnBuscarId = document.getElementById('btn-buscar-id-padecimiento');
    if (btnBuscarId){
        btnBuscarId.addEventListener('click', buscarPorIdPad);
    }/*fin del if*/

    const btnBuscarTipo = document.getElementById('btn-buscar-tipo-padecimiento');
    if (btnBuscarTipo){
        btnBuscarTipo.addEventListener('click', buscarPorTipo);
    }/*fin del if*/

    const btnActualizar = document.getElementById('btn-actualizar-padecimiento');
    if (btnActualizar){
        btnActualizar.addEventListener('click', actualizarPadecimiento);
    }/*fin del if*/

    const btnEliminar = document.getElementById('btn-eliminar-padecimiento');
    if (btnEliminar){
        btnEliminar.addEventListener('click', eliminarPadecimiento);
    }/*fin del if*/

    listarPadecimientos();
}/*fin del inicializarPadecimiento*/