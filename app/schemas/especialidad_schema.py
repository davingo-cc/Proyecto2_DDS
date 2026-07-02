"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz

Esquemas Pydantic para validar la entrada y dar forma a la salida
de la API para el módulo de Especialidades.
"""
from pydantic import BaseModel


class EspecialidadCreate(BaseModel):
    id_especialidad: int
    nombre_especialidad: str
    area_medica: str
    tipo_atencion: str  # general o especializada


class EspecialidadResponse(BaseModel):
    id_especialidad: int
    nombre_especialidad: str
    area_medica: str
    tipo_atencion: str

    class Config:
        from_attributes = True