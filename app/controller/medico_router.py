"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz

Rutas de la API (controlador) para el módulo de Medicos.
"""
from fastapi import APIRouter, HTTPException
from app.service.medico_service import MedicoService
from app.schemas.medico_schema import MedicoCreate, MedicoResponse


service = MedicoService()
router = APIRouter(
    prefix="/medico",
    tags=["Medicos"],
)


@router.post('/', response_model=MedicoResponse, status_code=201)
def crear(datos: MedicoCreate):
    try:
        return service.crear(
            cedula_medico=datos.cedula_medico,
            nombre_medico=datos.nombre_medico,
            telefono_medico=datos.telefono_medico,
            correo_medico=datos.correo_medico,
            provincia_medico=datos.provincia_medico,
            id_especialidad=datos.id_especialidad
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.get('/', response_model=list[MedicoResponse])
def listar_todos():
    return service.listar_todos()

@router.get('/provincia/{provincia}', response_model=list[MedicoResponse])
def listar_por_provincia(provincia: str):
    try:
        return service.listar_por_provincia(provincia)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.get('/id_especialidad/{id_especialidad}', response_model=list[MedicoResponse])
def listar_por_especialidad(id_especialidad: int):
    try:
        return service.listar_por_especialidad(id_especialidad)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.put('/{cedula_medico}', response_model=MedicoResponse)
def actualizar(cedula_medico: int, datos: MedicoCreate):
    try:
        return service.actualizar(
            cedula_medico=cedula_medico,
            nombre_medico=datos.nombre_medico,
            telefono_medico=datos.telefono_medico,
            correo_medico=datos.correo_medico,
            provincia_medico=datos.provincia_medico,
            id_especialidad=datos.id_especialidad
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.delete('/{cedula_medico}', response_model=MedicoResponse)
def eliminar(cedula_medico: int):
    try:
        return service.eliminar(cedula_medico)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    
@router.get('/{cedula_medico}', response_model=MedicoResponse)
def buscar_por_cedula(cedula_medico: int):
    try:
        return service.buscar_por_cedula(cedula_medico)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )