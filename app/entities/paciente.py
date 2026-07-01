"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz
"""
from sqlalchemy import Column, Integer, String, ForeignKey
from app.config.database import Base

class PacienteORM(Base):
    __tablename__ = "paciente"
    cedula_paciente = Column(Integer, primary_key=True)
    nombre_paciente = Column(String(100), nullable=False)
    telefono_paciente = Column(String(15), nullable=False)
    correo_paciente = Column(String(150))
    provincia_paciente = Column(String(10), nullable=False)
    id_padecimiento = Column(Integer, ForeignKey("padecimiento.id_padecimiento"), nullable=False)
