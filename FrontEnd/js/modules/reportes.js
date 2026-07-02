/*
Desarrollo de Software
Sistema de gestión de una clínica medica

Integrantes:
-David Chang
-Enzo Bejarano
-Windell Urroz

-La clase se encarga del funcionamiento que tiene el modulo de reportes
*/
function mostrarResultado(titulo, datos, columnas){
    const resultado = document.getElementById('resultado-reporte');
    if (!resultado){
        console.error('No se encontro el contenedor de resultado-reporte');
        return;
    }/*fin del if*/

    let html = '<h3 style = "color:#4A3226; margin-bottom:10px;">' + titulo + '</h3>';
    if (!datos){
        html += '<p style = "color:#8B6B4D;">No hay datos disponibles</p>';
        resultado.innerHTML = html;
        return;
    }/*fin del if*/

    if (datos.length === 0){
        html += '<p style = "color:#8B6B4D;">No hay datos disponibles</p>';
        resultado.innerHTML = html;
        return;
    }/*fin del if*/

    try{
        html += '<div class = "tabla-wrapper">';
        html += '<table class = "tabla-datos">';
        html += '<thead><tr>';
        for (let columna = 0; columna < columnas.length; columna++){
            const nombreColumna = columnas[columna];
            let tituloColumna = nombreColumna.replace(/_/g, ' ');
            tituloColumna = tituloColumna.toUpperCase();
            html += '<th>' + tituloColumna + '</th>';
        }/*fin del for*/

        html += '</tr></thead>';
        html += '<tbody>';
        for (let fila = 0; fila < datos.length; fila++){
            html += '<tr>';
            const item = datos[fila];
            for (let columna = 0; columna < columnas.length; columna++){
                const clave = columnas[columna];
                let valor = item[clave];
                if (valor === null){
                    valor = '';
                }/*fin del if*/
                if (valor === undefined){
                    valor = '';
                }/*fin del if*/
                html += '<td>' + valor + '</td>';
            }/*fin del for*/
            html += '</tr>';
        }/*fin del for*/
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        resultado.innerHTML = html;
    }catch (error){
        console.error('Error al mostrar resultado:', error);
        resultado.innerHTML = '<p style = "color:#f44336;">Error al mostrar los datos</p>';
    }/*fin del try*/
}/*fin del mostrarResultado*/

async function reportePacientesMasCitas(){
    const url = API_BASE_URL + '/reportes/pacientes-mas-citas';
    const resultado = document.getElementById('resultado-reporte');
    if (resultado){
        resultado.innerHTML = '<p style = "color:#8B6B4D;">Cargando reporte</p>';
    }/*fin del if*/

    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['cedula', 'nombre', 'cantidad_citas'];
        mostrarResultado('Pacientes con mas citas', respuesta, columnas);
        if (respuesta.length === 0){
            mostrarMensaje('Informacion', 'No hay citas registradas', 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al obtener el reporte';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en reportePacientesMasCitas:', error);
        mostrarMensaje('Error', mensaje, 'error');
        mostrarResultado('Pacientes con mas citas (Error)', [], columnas);
    }/*fin del try*/
}/*fin del reportePacientesMasCitas*/

async function reportePadecimientoPorProvincia(){
    const url = API_BASE_URL + '/reportes/padecimiento-por-provincia';
    const resultado = document.getElementById('resultado-reporte');
    if (resultado){
        resultado.innerHTML = '<p style = "color:#8B6B4D;">Cargando reporte</p>';
    }/*fin del if*/

    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['provincia', 'padecimiento', 'cantidad'];
        mostrarResultado('Padecimiento mas frecuente por provincia', respuesta, columnas);
        if (respuesta.length === 0){
            mostrarMensaje('Informacion', 'No hay pacientes registrados', 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al obtener el reporte';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en reportePadecimientoPorProvincia:', error);
        mostrarMensaje('Error', mensaje, 'error');
        mostrarResultado('Padecimiento mas frecuente por provincia (Error)', [], ['provincia', 'padecimiento', 'cantidad']);
    }/*fin del try*/
}/*fin del reportePadecimientoPorProvincia*/

async function reporteEspecialidadMasDemandada(){
    const url = API_BASE_URL + '/reportes/especialidad-mas-demandada';
    const resultado = document.getElementById('resultado-reporte');
    if (resultado){
        resultado.innerHTML = '<p style = "color:#8B6B4D;">Cargando reporte</p>';
    }/*fin del if*/

    try{
        const respuesta = await peticionAPI(url, 'GET');
        /*Este endpoint devuelve un solo objeto, no una lista, por lo que se envuelve en un arreglo*/
        const datos = [respuesta];
        const columnas = ['especialidad', 'demanda'];
        mostrarResultado('Especialidad mas demandada', datos, columnas);
        if (respuesta.demanda === 0){
            mostrarMensaje('Informacion', 'No hay citas registradas', 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al obtener el reporte';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en reporteEspecialidadMasDemandada:', error);
        mostrarMensaje('Error', mensaje, 'error');
        mostrarResultado('Especialidad mas demandada (Error)', [], ['especialidad', 'demanda']);
    }/*fin del try*/
}/*fin del reporteEspecialidadMasDemandada*/

function inicializarReportes(){
    const btnPacientesCitas = document.getElementById('btn-reporte-pacientes-citas');
    if (btnPacientesCitas){
        btnPacientesCitas.addEventListener('click', reportePacientesMasCitas);
    }/*fin del if*/

    const btnPadecimientoProvincia = document.getElementById('btn-reporte-padecimiento-provincia');
    if (btnPadecimientoProvincia){
        btnPadecimientoProvincia.addEventListener('click', reportePadecimientoPorProvincia);
    }/*fin del if*/

    const btnEspecialidadDemandada = document.getElementById('btn-reporte-especialidad-demandada');
    if (btnEspecialidadDemandada){
        btnEspecialidadDemandada.addEventListener('click', reporteEspecialidadMasDemandada);
    }/*fin del if*/
}/*fin de inicializarReportes*/