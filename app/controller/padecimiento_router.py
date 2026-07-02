"""
Rutas de la API (controlador) para el módulo de Padecimientos.
Solo coordina: recibe la petición, llama al servicio y devuelve la respuesta.
"""

from typing import List
from fastapi import APIRouter, HTTPException
from app.schemas.padecimiento_schema import PadecimientoCreate, PadecimientoResponse
from app.service.padecimiento_service import PadecimientoService


service = PadecimientoService()
router = APIRouter(prefix="/padecimientos", tags=["Padecimientos"])


@router.post("/", response_model=PadecimientoResponse, status_code=201)
def crear(datos: PadecimientoCreate):
    try:
        return service.crear(
            id_padecimiento=datos.id_padecimiento,
            nombre_padecimiento=datos.nombre_padecimiento,
            tipo=datos.tipo,
            tiene_tratamiento_prolongado=datos.tiene_tratamiento_prolongado,
            cantidad=datos.cantidad,
            unidad=datos.unidad,
        )
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.get("/", response_model=List[PadecimientoResponse])
def listar_todos():
    return service.listar_todos()


@router.get("/tipo/{tipo}", response_model=List[PadecimientoResponse])
def listar_por_tipo(tipo: str):
    try:
        return service.listar_por_tipo(tipo)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.get("/{id_padecimiento}", response_model=PadecimientoResponse)
def buscar_por_id(id_padecimiento: int):
    try:
        return service.buscar_por_id(id_padecimiento)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))

@router.put("/{id_padecimiento}", response_model=PadecimientoResponse)
def actualizar_padecimiento(id_padecimiento: int, datos: PadecimientoCreate):
    try:
        return service.actualizar(
            id_padecimiento=id_padecimiento,
            nombre_padecimiento=datos.nombre_padecimiento,
            tipo=datos.tipo,
            tiene_tratamiento_prolongado=datos.tiene_tratamiento_prolongado,
            cantidad=datos.cantidad,
            unidad=datos.unidad,
        )
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))


@router.delete("/{id_padecimiento}", response_model=PadecimientoResponse)
def eliminar_padecimiento(id_padecimiento: int):
    try:
        return service.eliminar(id_padecimiento)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))
