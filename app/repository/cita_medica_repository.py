"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz

Repositorio de Cita Medica.
"""

from typing import List, Optional
from datetime import date
from app.config.database import SessionLocal
from app.entities.cita_medica import CitaMedicaORM


class CitaMedicaRepository:
    def __init__(self):
        self.db = SessionLocal()

    def crear(self, id_cita: int, motivo: str, fecha: date, cedula_paciente: int, cedula_medico: int) -> CitaMedicaORM:
        nueva_cita = CitaMedicaORM(
            id_cita=id_cita,
            motivo=motivo,
            fecha=fecha,
            cedula_paciente=cedula_paciente,
            cedula_medico=cedula_medico
        )
        self.db.add(nueva_cita)
        self.db.commit()
        self.db.refresh(nueva_cita)
        return nueva_cita

    def listar_todos(self) -> List[CitaMedicaORM]:
        return self.db.query(CitaMedicaORM).all()

    def buscar_por_id(self, id_cita: int) -> Optional[CitaMedicaORM]:
        return (
            self.db.query(CitaMedicaORM)
            .filter(CitaMedicaORM.id_cita == id_cita)
            .first()
        )

    def listar_por_medico(self, cedula_medico: int) -> List[CitaMedicaORM]:
        return (
            self.db.query(CitaMedicaORM)
            .filter(CitaMedicaORM.cedula_medico == cedula_medico)
            .all()
        )

    def actualizar(self, id_cita: int, motivo: str, fecha: date, cedula_paciente: int, cedula_medico: int) -> CitaMedicaORM:
        cita = self.buscar_por_id(id_cita)
        cita.motivo = motivo
        cita.fecha = fecha
        cita.cedula_paciente = cedula_paciente
        cita.cedula_medico = cedula_medico
        self.db.commit()
        self.db.refresh(cita)
        return cita

    def eliminar(self, id_cita: int) -> CitaMedicaORM:
        cita = self.buscar_por_id(id_cita)
        self.db.delete(cita)
        self.db.commit()
        return cita
