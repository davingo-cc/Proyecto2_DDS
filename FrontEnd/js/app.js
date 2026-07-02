/*
Desarrollo de Software
Sistema de gestión de una clínica medica

Integrantes:
-David Chang
-Enzo Bejarano
-Windell Urroz

-La clase se encarga de las funciones que son auxiliares
*/
function mostrarMensaje(titulo, mensaje, tipo){
    const contenedor = document.createElement('div');
    contenedor.style.position = 'fixed';
    contenedor.style.top = '20px';
    contenedor.style.right = '20px';
    contenedor.style.padding = '15px 25px';
    contenedor.style.borderRadius = '8px';
    contenedor.style.zIndex = '9999';
    contenedor.style.maxWidth = '400px';
    contenedor.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    contenedor.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
    if (tipo === 'exito'){
        contenedor.style.backgroundColor = '#4CAF50';
        contenedor.style.color = '#FFFFFF';
    }else if (tipo === 'error'){
        contenedor.style.backgroundColor = '#f44336';
        contenedor.style.color = '#FFFFFF';
    }else if (tipo === 'advertencia') {
        contenedor.style.backgroundColor = '#FF9800';
        contenedor.style.color = '#FFFFFF';
    }else{
        contenedor.style.backgroundColor = '#5C3D2E';
        contenedor.style.color = '#FFFFFF';
    }/*fin del if*/

    let html = '<strong>' + titulo + '</strong><br>';
    html = html + mensaje;
    contenedor.innerHTML = html;
    document.body.appendChild(contenedor);
    setTimeout(function() {
        if (contenedor.parentNode){
            contenedor.style.opacity = '0';
            contenedor.style.transition = 'opacity 0.5s';
            setTimeout(function() {
                if (contenedor.parentNode){
                    contenedor.parentNode.removeChild(contenedor);
                }/*fin del if*/
            }, 500);/*fin del setTimeout*/
        }/*fin del if*/
    }, 3000);/*fin del setTimeout*/
}/*fin del mostrarMensaje*/

function actualizarTabla(tablaId, datos, columnas){
    const tabla = document.getElementById(tablaId);
    if (!tabla){
        return;
    }/*fin del if*/

    const tbody = tabla.querySelector('tbody');
    if (!tbody){
        return;
    }/*fin del if*/

    tbody.innerHTML = '';

    if (!datos){
        const fila = document.createElement('tr');
        const celda = document.createElement('td');
        celda.colSpan = columnas.length;
        celda.textContent = 'No hay datos disponibles';
        celda.style.textAlign = 'center';
        celda.style.padding = '20px';
        celda.style.color = '#8B6B4D';
        fila.appendChild(celda);
        tbody.appendChild(fila);
        return;
    }/*fin del if*/

    if (datos.length === 0){
        const fila = document.createElement('tr');
        const celda = document.createElement('td');
        celda.colSpan = columnas.length;
        celda.textContent = 'No hay datos disponibles';
        celda.style.textAlign = 'center';
        celda.style.padding = '20px';
        celda.style.color = '#8B6B4D';
        fila.appendChild(celda);
        tbody.appendChild(fila);
        return;
    }/*fin del if*/

    for (let indice = 0; indice < datos.length; indice++){
        const fila = document.createElement('tr');
        const item = datos[indice];
        for (let columna = 0; columna < columnas.length; columna++){
            const celda = document.createElement('td');
            const clave = columnas[columna];
            let valor = item[clave];

            if (valor === null){
                valor = '';
            }/*fin del if*/

            if (valor === undefined){
                valor = '';
            }/*fin del if*/

            celda.textContent = valor;
            fila.appendChild(celda);
        }/*fin del for*/

        tbody.appendChild(fila);
    }/*fin del for*/
}/*fin del actualizarTabla*/

function limpiarFormulario(formularioId){
    const formulario = document.getElementById(formularioId);
    if (!formulario){
        return;
    }/*fin del if*/

    const inputs = formulario.querySelectorAll('input, select, textarea');
    for (let indice = 0; indice < inputs.length; indice++){
        const input = inputs[indice];
        if (input.type === 'number'){
            input.value = 1;
        }else if (input.tagName === 'SELECT'){
            input.selectedIndex = 0;
        }else{
            input.value = '';
        }/*fin del if*/
    }/*fin del for*/

    const campoDuracion = document.getElementById('campo-duracion');
    if (campoDuracion){
        campoDuracion.style.display = 'none';
    }/*fin del if*/
}/*fin del limpiarFormulario*/

function obtenerValor(id){
    const elemento = document.getElementById(id);
    if (!elemento){
        return '';
    }/*fin del if*/

    return elemento.value;
}/*fin de obtnerValor*/

function obtenerValorSelect(id){
    const select = document.getElementById(id);
    if (!select){
        return '';
    }/*fin del if*/
    return select.value;
}/*fin del obtenerValorSelect*/

function obtenerNumero(id){
    const elemento = document.getElementById(id);
    if (!elemento){
        return 0;
    }/*fin del obtenerNumero*/

    const valor = elemento.value;
    const numero = parseInt(valor);
    if (isNaN(numero)){
        return 0;
    }/*fin del if*/
    return numero;
}/*fin del obtenerNumero*/

function obtenerNumeroSelect(id){
    const select = document.getElementById(id);
    if (!select){
        return 0;
    }/*fin del if*/

    const valor = select.value;
    const numero = parseInt(valor);
    if (isNaN(numero)){
        return 0;
    }/*fin del if*/
    return numero;
}/*fin del obtnerNumeroSelect*/