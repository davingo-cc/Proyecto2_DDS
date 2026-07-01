"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz
"""
from sqlalchemy import Column, Integer, String
from app.config.database import Base


class PadecimientoORM(Base):
    __tablename__ = "padecimiento"

    id_padecimiento = Column(Integer, primary_key=True)
    nombre_padecimiento = Column(String(100), nullable=False)
    tipo = Column(String(50), nullable=False)
    tratamiento_prolongado = Column(String(100), nullable=False)
