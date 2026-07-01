"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz
"""
from pydantic import BaseModel


class PacienteCreate(BaseModel):
    cedula_paciente: int
    nombre_paciente: str
    telefono_paciente: str
    correo_paciente: str
    provincia_paciente: str
    id_padecimiento: int

class PacienteResponse(BaseModel):
    cedula_paciente: int
    nombre_paciente: str
    telefono_paciente: str
    correo_paciente: str
    provincia_paciente: str
    id_padecimiento: int