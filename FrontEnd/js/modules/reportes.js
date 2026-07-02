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
    const resultado = document.getElementById('reporte');
    if (!resultado){
        console.error('No se encontro el reporte');
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

async function reporteCitasPorMedico(){
    const url = API_BASE_URL + '/reportes/citas-por-medico';
    const resultado = document.getElementById('resultado-reporte');
    if (resultado){
        resultado.innerHTML = '<p style = "color:#8B6B4D;">Cargando reporte</p>';
    }/*fin del if*/

    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['cedula_medico', 'nombre_medico', 'cantidad_citas'];
        mostrarResultado('Citas por medico', respuesta, columnas);
        if (respuesta.length === 0){
            mostrarMensaje('Informacion', 'No hay citas registradas', 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al obtener el reporte';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en reporteCitasPorMedico:', error);
        mostrarMensaje('Error', mensaje, 'error');
        mostrarResultado('Citas por medico (Error)', [], ['cedula_medico', 'nombre_medico', 'cantidad_citas']);
    }/*fin del try*/
}/*fin del reporteCitasPorMedico*/

async function reportePacientesPorPadecimiento(){
    const url = API_BASE_URL + '/reportes/pacientes-por-padecimiento';
    const resultado = document.getElementById('resultado-reporte');
    if (resultado){
        resultado.innerHTML = '<p style = "color:#8B6B4D;">Cargando reporte</p>';
    }/*fin del if*/

    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['id_padecimiento', 'nombre_padecimiento', 'tipo', 'cantidad_pacientes'];
        mostrarResultado('Pacientes por padecimiento', respuesta, columnas);
        if (respuesta.length === 0){
            mostrarMensaje('Informacion', 'No hay pacientes registrados', 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al obtener el reporte';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en reportePacientesPorPadecimiento:', error);
        mostrarMensaje('Error', mensaje, 'error');
        mostrarResultado('Pacientes por padecimiento (Error)', [], ['id_padecimiento', 'nombre_padecimiento', 'tipo', 'cantidad_pacientes']);
    }/*fin del try*/
}/*fin del reportePacientePorPadecimiento*/

async function reportePacientesPorProvincia(){
    const url = API_BASE_URL + '/reportes/pacientes-por-provincia';
    const resultado = document.getElementById('resultado-reporte');
    if (resultado){
        resultado.innerHTML = '<p style = "color:#8B6B4D;">Cargando reporte</p>';
    }/*fin del if*/

    try{
        const respuesta = await peticionAPI(url, 'GET');
        const columnas = ['provincia', 'cantidad_pacientes'];
        mostrarResultado('Pacientes por provincia', respuesta, columnas);
        if (respuesta.length === 0){
            mostrarMensaje('Informacion', 'No hay pacientes registrados', 'advertencia');
        }/*fin del if*/
    }catch (error){
        let mensaje = 'Error al obtener el reporte';
        if (error.mensaje){
            mensaje = error.mensaje;
        }/*fin del if*/
        console.error('Error en reportePacientesPorProvincia:', error);
        mostrarMensaje('Error', mensaje, 'error');
        mostrarResultado('Pacientes por provincia (Error)', [], ['provincia', 'cantidad_pacientes']);
    }/*fin del try*/
}/*fin del reportePacientePorPadecimiento*/

function inicializarReportes(){
    const btnCitasMedico = document.getElementById('btn-reporte-citas-medico');
    if (btnCitasMedico){
        btnCitasMedico.addEventListener('click', reporteCitasPorMedico);
    }/*fin del if*/

    const btnPacientesPadecimiento = document.getElementById('btn-reporte-pacientes-padecimiento');
    if (btnPacientesPadecimiento){
        btnPacientesPadecimiento.addEventListener('click', reportePacientesPorPadecimiento);
    }/*fin del if*/

    const btnPacientesProvincia = document.getElementById('btn-reporte-pacientes-provincia');
    if (btnPacientesProvincia){
        btnPacientesProvincia.addEventListener('click', reportePacientesPorProvincia);
    }/*fin del if*/
}/*fin de inicializarReportes*/