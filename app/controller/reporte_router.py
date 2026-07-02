"""
Proyecto 2
IFO006 - Desarrollo de Software III
David Chang
Enzo Bejarano
Windell Urroz

Rutas de la API (controlador) para el módulo de Reportes.
Solo coordina: recibe la petición, llama al servicio y devuelve la respuesta.
"""

from fastapi import APIRouter
from app.service.reporte_service import ReporteService
from app.schemas.reporte_schema import (
    PacienteMasCitasResponse,
    PadecimientoProvinciaResponse,
    EspecialidadMasDemandadaResponse
)

service = ReporteService()

router = APIRouter(
    prefix="/reportes",
    tags=["Reportes"]
)


@router.get("/pacientes-mas-citas",response_model=list[PacienteMasCitasResponse])
def pacientes_mas_citas():
    return service.pacientes_mas_citas()


@router.get("/padecimiento-por-provincia",response_model=list[PadecimientoProvinciaResponse])
def padecimiento_por_provincia():
    return service.padecimiento_por_provincia()


@router.get("/especialidad-mas-demandada",response_model=EspecialidadMasDemandadaResponse)
def especialidad_mas_demandada():
    return service.especialidad_mas_demandada()