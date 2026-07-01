"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz

Repositorio de Especialidad.
"""
from typing import Optional
from app.config.database import SessionLocal
from app.entities.especialidad import EspecialidadORM


class EspecialidadRepository:
    def __init__(self):
        self.db = SessionLocal()

    def crear(self, id_especialidad, nombre_especialidad, area_medica, tipo_atencion) -> EspecialidadORM:
        nueva_especialidad = EspecialidadORM(
            id_especialidad=id_especialidad,
            nombre_especialidad=nombre_especialidad,
            area_medica=area_medica,
            tipo_atencion=tipo_atencion,
        )
        self.db.add(nueva_especialidad)
        self.db.commit()
        self.db.refresh(nueva_especialidad)
        return nueva_especialidad

    def listar_todos(self) -> list[type[EspecialidadORM]]:
        return self.db.query(EspecialidadORM).all()

    def buscar_por_id(self, id_especialidad: int) -> Optional[EspecialidadORM]:
        return (
            self.db.query(EspecialidadORM)
            .filter(EspecialidadORM.id_especialidad == id_especialidad)
            .first()
        )

    def listar_por_tipo_atencion(self, tipo_atencion: str) -> list[type[EspecialidadORM]]:
        return (
            self.db.query(EspecialidadORM)
            .filter(EspecialidadORM.tipo_atencion == tipo_atencion)
            .all()
        )

    def actualizar(self, id_especialidad: int, nombre_especialidad: str,
                   area_medica: str, tipo_atencion: str) -> EspecialidadORM:
        especialidad = self.buscar_por_id(id_especialidad)
        especialidad.nombre_especialidad = nombre_especialidad
        especialidad.area_medica = area_medica
        especialidad.tipo_atencion = tipo_atencion
        self.db.commit()
        self.db.refresh(especialidad)
        return especialidad

    def eliminar(self, id_especialidad: int) -> Optional[EspecialidadORM]:
        especialidad = self.buscar_por_id(id_especialidad)
        self.db.delete(especialidad)
        self.db.commit()
        return especialidad