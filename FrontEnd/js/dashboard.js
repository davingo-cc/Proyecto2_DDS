// ========================================
// DASHBOARD.JS - Controlador del dashboard
// ========================================
/*
Desarrollo de Software
Sistema de gestión de una clínica medica

Integrantes:
-David Chang
-Enzo Bejarano
-Windell Urroz

-La clase se encarga del control de todo el dashboard
*/
const RUTAS_MODULOS = {
    'padecimiento': 'html/module_padecimiento.html',
    'especialidad': 'html/module_especialidad.html',
    'paciente': 'html/module_paciente.html',
    'medico': 'html/module_medico.html',
    'citas': 'html/module_citas.html',
    'reportes': 'html/module_reportes.html'
};/*fin de RUTAS_MODULOS*/

function cargarModulo(modulo){
    const contenedor = document.getElementById('vista-modulo');
    const url = RUTAS_MODULOS[modulo];
    if (!url){
        contenedor.innerHTML = `
            <div class = "modulo-wrapper">
                <div class = "modulo-header">
                    <h2>Error</h2>
                </div>
                <p style = "color:#8B6B4D;">El modulo solicitado no existe</p>
            </div>
        `;
        return;
    }/*fin del if*/

    contenedor.innerHTML = `
        <div class = "modulo-wrapper">
            <div class = "modulo-header">
                <h2>Cargando ${modulo}</h2>
            </div>
            <p style = "color:#8B6B4D;">Conectando con el servidor</p>
        </div>
    `;

    fetch(url)
        .then(function(respuesta){
            if (!respuesta.ok){
                throw new Error('No se pudo cargar el modulo (HTTP ' + respuesta.status + ')');
            }/*fin del if*/
            return respuesta.text();
        })/*fin de respuesta*/

        .then(function(html){
            contenedor.innerHTML = html;
            if (modulo === 'padecimiento'){
                if (typeof inicializarPadecimiento === 'function'){
                    inicializarPadecimiento();
                }/*fin del if*/
            }else if (modulo === 'especialidad'){
                if (typeof inicializarEspecialidad === 'function'){
                    inicializarEspecialidad();
                }/*fin del if*/
            }else if (modulo === 'paciente'){
                if (typeof inicializarPaciente === 'function'){
                    inicializarPaciente();
                }/*fin del if*/
            }else if (modulo === 'medico'){
                if (typeof inicializarMedico === 'function'){
                    inicializarMedico();
                }/*fin del if*/
            }else if (modulo === 'citas'){
                if (typeof inicializarCitas === 'function'){
                    inicializarCitas();
                }/*fin del if*/
            }else if (modulo === 'reportes'){
                if (typeof inicializarReportes === 'function'){
                    inicializarReportes();
                }/*fin del if*/
            }/*fin del if*/
        })/*fin del html*/

        .catch(function(error){
            console.error('Error al cargar modulo:', error);
            contenedor.innerHTML = `
                <div class = "modulo-wrapper">
                    <div class = "modulo-header">
                        <h2>Error de conexion</h2>
                    </div>
                    <p style = "color:#8B6B4D;">No se pudo cargar el modulo</p>
                    <p style  = "color:#8B6B4D; font-size:13px;">${error.message}</p>
                    <p style = "color:#8B6B4D; font-size:13px; margin-top:10px;">
                        <strong>Ruta intentada:</strong> ${url}
                    </p>
                    <p style = "color:#8B6B4D; font-size:13px;">
                        <strong>Verifica que el archivo existe en la carpeta html/</strong>
                    </p>
                </div>
            `;
        });/*fin de error*/

    const botones = document.querySelectorAll('.sidebar-btn');
    for (let indice = 0; indice < botones.length; indice++){
        botones[indice].classList.remove('active');
    }/*fin del for*/

    const botones2 = document.querySelectorAll('.sidebar-btn');
    for (let indice = 0; indice < botones2.length; indice++){
        const dataModulo = botones2[indice].getAttribute('data-modulo');
        if (dataModulo === modulo){
            botones2[indice].classList.add('active');
        }/*fin del if*/
    }/*fin del for*/
}/*fin del cargarModulo*/

document.addEventListener('DOMContentLoaded', function() {
    const botonesMenu = document.querySelectorAll('.sidebar-btn');
    for (let indice = 0; indice < botonesMenu.length; indice++){
        botonesMenu[indice].addEventListener('click', function() {
            const modulo = this.getAttribute('data-modulo');
            cargarModulo(modulo);
        });/*fin del addEventListener*/
    }/*fin del for*/

    const btnVolver = document.getElementById('btn-volver-inicio');
    if (btnVolver){
        btnVolver.addEventListener('click', function() {
            window.location.href = 'index.html';
        });/*fin del addEventListener*/
    }/*fin del if*/

    cargarModulo('padecimiento');
});/*fin del addEventListener*/