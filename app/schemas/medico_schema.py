"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz
"""
from pydantic import BaseModel


class  MedicoCreate(BaseModel):
    cedula_medico: int
    nombre_medico: str
    telefono_medico: str
    correo_medico: str
    provincia_medico: str
    id_especialidad: int

class  MedicoResponse(BaseModel):
    cedula_medico: int
    nombre_medico: str
    telefono_medico: str
    correo_medico: str
    provincia_medico: str
    id_especialidad: int