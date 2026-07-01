"""
Esquemas Pydantic para validar la entrada y dar forma a la salida
de la API para el módulo de Citas Médicas.
"""

from datetime import date
from pydantic import BaseModel


class CitaMedicaCreate(BaseModel):
    """Esquema de entrada al registrar/actualizar una cita médica."""
    id_cita: int
    motivo: str
    fecha: date
    cedula_paciente: int
    cedula_medico: int


class CitaMedicaResponse(BaseModel):
    """Esquema de salida que devuelve la API."""

    id_cita: int
    motivo: str
    fecha: date
    cedula_paciente: int
    cedula_medico: int

    class Config:
        from_attributes = True
