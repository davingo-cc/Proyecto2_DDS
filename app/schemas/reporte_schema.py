"""
Proyecto 2
IFO006 - Desarrollo de Software III
David Chang
Enzo Bejarano
Windell Urroz
"""

from pydantic import BaseModel


class PacienteMasCitasResponse(BaseModel):
    cedula: int
    nombre: str
    cantidad_citas: int


class PadecimientoProvinciaResponse(BaseModel):
    provincia: str
    padecimiento: str
    cantidad: int


class EspecialidadMasDemandadaResponse(BaseModel):
    especialidad: str
    demanda: int