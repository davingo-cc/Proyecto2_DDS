"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz

Rutas de la API (controlador) para el módulo de Especialidades.
"""

from typing import List
from fastapi import APIRouter, HTTPException

from app.schemas.especialidad_schema import EspecialidadCreate, EspecialidadResponse
from app.service.especialidad_service import EspecialidadService

router = APIRouter(prefix="/especialidades", tags=["Especialidades"])
service = EspecialidadService()

@router.post("/", response_model=EspecialidadResponse, status_code=201)
def crear(datos: EspecialidadCreate):
    try:
        return service.registrar_especialidad(
            id_especialidad=datos.id_especialidad,
            nombre_especialidad=datos.nombre_especialidad,
            area_medica=datos.area_medica,
            tipo_atencion=datos.tipo_atencion,
        )
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.get("/", response_model=List[EspecialidadResponse])
def listar_todos():
    return service.listar_todos()


@router.get("/tipo-atencion/{tipo_atencion}", response_model=List[EspecialidadResponse])
def listar_por_tipo_atencion(tipo_atencion: str):
    try:
        return service.listar_por_tipo_atencion(tipo_atencion)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.get("/{id_especialidad}", response_model=EspecialidadResponse)
def buscar_por_id(id_especialidad: int):
    try:
        return service.buscar_por_id(id_especialidad)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))

@router.put("/{id_especialidad}", response_model=EspecialidadResponse)
def actualizar_especialidad(id_especialidad: int, datos: EspecialidadCreate):
    try:
        return service.actualizar(
            id_especialidad=id_especialidad,
            nombre_especialidad=datos.nombre_especialidad,
            area_medica=datos.area_medica,
            tipo_atencion=datos.tipo_atencion,
        )
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))


@router.delete("/{id_especialidad}")
def eliminar_especialidad(id_especialidad: int):
    try:
        service.eliminar(id_especialidad)
        return {"message": f"Especialidad {id_especialidad} eliminada correctamente"}
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))