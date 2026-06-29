"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz
"""
from sqlalchemy import Column, Integer, String, ForeignKey
from app.config.database import Base

class MedicoORM(Base):
    __tablename__ = "medico"
    cedula_medico = Column(Integer, primary_key=True)
    nombre_medico = Column(String(100), nullable=False)
    telefono_medico = Column(String(15), nullable=False)
    correo_medico = Column(String(150))
    provincia = Column(String(10), nullable=False)
    id_especialidad = Column(Integer, ForeignKey("especialidad.id_especialidad"), nullable=False)
