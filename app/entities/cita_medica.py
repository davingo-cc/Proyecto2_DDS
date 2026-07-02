"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz
"""
from sqlalchemy import Column, Integer, String, Date, ForeignKey
from app.config.database import Base

class CitaMedicaORM(Base):
    __tablename__ = "cita_medica"
    id_cita = Column(Integer, primary_key=True)
    motivo = Column(String(400), nullable=False)
    fecha = Column(Date, nullable=False)
    cedula_paciente = Column(Integer, ForeignKey('paciente.cedula_paciente'), nullable=False)
    cedula_medico = Column(Integer, ForeignKey('medico.cedula_medico'), nullable=False)
