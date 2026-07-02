"""
Rutas de la API (controlador) para el módulo de Citas Médicas.
Solo coordina: recibe la petición, llama al servicio y devuelve la respuesta.
"""

from typing import List
from fastapi import APIRouter, HTTPException
from app.schemas.cita_medica_schema import CitaMedicaCreate, CitaMedicaResponse
from app.service.cita_medica_service import CitaMedicaService


service = CitaMedicaService()
router = APIRouter(prefix="/citas-medicas", tags=["Citas Médicas"])


@router.post("/", response_model=CitaMedicaResponse, status_code=201)
def crear(datos: CitaMedicaCreate):
    try:
        return service.crear(
            id_cita=datos.id_cita,
            motivo=datos.motivo,
            fecha=datos.fecha,
            cedula_paciente=datos.cedula_paciente,
            cedula_medico=datos.cedula_medico,
        )
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.get("/", response_model=List[CitaMedicaResponse])
def listar_todos():
    return service.listar_todos()


@router.get("/medico/{cedula_medico}", response_model=List[CitaMedicaResponse])
def listar_por_medico(cedula_medico: int):
    try:
        return service.listar_por_medico(cedula_medico)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.get("/{id_cita}", response_model=CitaMedicaResponse)
def buscar_por_id(id_cita: int):
    try:
        return service.buscar_por_id(id_cita)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))


@router.put("/{id_cita}", response_model=CitaMedicaResponse)
def actualizar(id_cita: int, datos: CitaMedicaCreate):
    try:
        return service.actualizar(
            id_cita=id_cita,
            motivo=datos.motivo,
            fecha=datos.fecha,
            cedula_paciente=datos.cedula_paciente,
            cedula_medico=datos.cedula_medico,
        )
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))


@router.delete("/{id_cita}", response_model=CitaMedicaResponse)
def eliminar(id_cita: int):
    try:
        return service.eliminar(id_cita)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))
