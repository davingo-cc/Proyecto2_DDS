"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz

Rutas de la API (controlador) para el módulo de Pacientes.
"""
from fastapi import APIRouter, HTTPException
from app.service.paciente_service import PacienteService
from app.schemas.paciente_schema import PacienteCreate, PacienteResponse


service = PacienteService()
router = APIRouter(
    prefix="/paciente",
    tags=["Pacientes"],
)


@router.post('/', response_model=PacienteResponse, status_code=201)
def crear(datos: PacienteCreate):
    try:
        return service.crear(
            cedula_paciente=datos.cedula_paciente,
            nombre_paciente=datos.nombre_paciente,
            telefono_paciente=datos.telefono_paciente,
            correo_paciente=datos.correo_paciente,
            provincia_paciente=datos.provincia_paciente,
            id_padecimiento=datos.id_padecimiento
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.get('/', response_model=list[PacienteResponse])
def listar_todos():
    return service.listar_todos()

@router.get('/provincia/{provincia}', response_model=list[PacienteResponse])
def listar_por_provincia(provincia: str):
    try:
        return service.listar_por_provincia(provincia)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.get('/id_padecimiento/{id_padecimiento}', response_model=list[PacienteResponse])
def listar_por_padecimiento(id_padecimiento: int):
    try:
        return service.listar_por_padecimiento(id_padecimiento)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.put('/{cedula_paciente}', response_model=PacienteResponse)
def actualizar(cedula_paciente: int, datos: PacienteCreate):
    try:
        return service.actualizar(
            cedula_paciente=cedula_paciente,
            nombre_paciente=datos.nombre_paciente,
            telefono_paciente=datos.telefono_paciente,
            correo_paciente=datos.correo_paciente,
            provincia_paciente=datos.provincia_paciente,
            id_padecimiento=datos.id_padecimiento
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.delete('/{cedula_paciente}', response_model=PacienteResponse)
def eliminar(cedula_paciente: int):
    try:
        return service.eliminar(cedula_paciente)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.get('/{cedula_paciente}', response_model=PacienteResponse)
def buscar_por_cedula(cedula_paciente: int):
    try:
        return service.buscar_por_cedula(cedula_paciente)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )