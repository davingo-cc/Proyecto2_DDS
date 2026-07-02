"""
Esquemas Pydantic para validar la entrada y dar forma a la salida
de la API para el módulo de Padecimientos.
"""

from typing import Optional
from pydantic import BaseModel


class PadecimientoCreate(BaseModel):
    """
    Esquema de entrada al registrar un padecimiento.
      - tiene_tratamiento_prolongado=False  -> se guarda "no necesita"
      - tiene_tratamiento_prolongado=True   -> requiere cantidad y unidad
    """
    id_padecimiento: int
    nombre_padecimiento: str
    tipo: str
    tiene_tratamiento_prolongado: bool = False
    cantidad: Optional[int] = None
    unidad: Optional[str] = None  # "meses" o "años"


class PadecimientoResponse(BaseModel):
    """Esquema de salida que devuelve la API."""

    id_padecimiento: int
    nombre_padecimiento: str
    tipo: str
    tratamiento_prolongado: str

    class Config:
        from_attributes = True