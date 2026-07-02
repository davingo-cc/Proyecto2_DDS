// ========================================
// INDEX.JS - Controlador de la pagina principal
// ========================================
/*
Desarrollo de Software
Sistema de gestión de una clínica medica

Integrantes:
-David Chang
-Enzo Bejarano
-Windell Urroz

-La clase se encarga de controlar las funciones del login
*/
document.addEventListener('DOMContentLoaded', function(){
    const tarjetasModulos = document.querySelectorAll('.tarjeta-modulo');
    for (let indice = 0; indice < tarjetasModulos.length; indice++){
        tarjetasModulos[indice].addEventListener('click', function() {
            window.location.href = 'dashboard.html';
        });/*fin del addEventListener*/
    }/*fin del for*/

    const botonDashboard = document.getElementById('btn-dashboard');
    if (botonDashboard){
        botonDashboard.addEventListener('click', function() {
            window.location.href = 'dashboard.html';
        });/*fin del addEventListener*/
    }/*fin del if*/
});/*fin del addEventListener*/