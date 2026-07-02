/*--
Desarrollo de Software
Sistema de gestión de una clínica medica

Integrantes:
-David Chang
-Enzo Bejarano
-Windell Urroz

-La clase se encarga de la conexión con la API
-*/
const API_BASE_URL = 'http://127.0.0.1:8000';

async function peticionAPI(url, metodo, datos){
    const opciones = {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        }/*fin del headers*/
    };/*fin de opciones*/
    if (datos){
        opciones.body = JSON.stringify(datos);
    }/*fin del if*/

    try{
        const respuesta = await fetch(url, opciones);
        if (!respuesta.ok){
            const errorData = await respuesta.json();
            const error = {
                status: respuesta.status,
                mensaje: errorData.detail || respuesta.statusText
            };/*fin de error*/
            throw error;
        }/*fin del if*/

        const datosRespuesta = await respuesta.json();
        return datosRespuesta;
    }catch (error){
        if (error.status === undefined){
            const errorConexion = {
                status: 0,
                mensaje: 'Error de conexion con el servidor'
            };/*fin de errorConexion*/
            throw errorConexion;
        }/*fin del if*/
        throw error;
    }/*fin del try*/
}/*fin de peticionAPI*/