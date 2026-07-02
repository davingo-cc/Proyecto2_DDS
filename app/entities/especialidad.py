"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz
"""
from sqlalchemy import Column, Integer, String
from app.config.database import Base

class EspecialidadORM(Base):
    __tablename__ = "especialidad"

    id_especialidad = Column(Integer, primary_key=True)
    nombre_especialidad = Column(String(100), nullable=False)
    area_medica = Column(String(50), nullable=False)
    tipo_atencion = Column(String(13), nullable=False)
