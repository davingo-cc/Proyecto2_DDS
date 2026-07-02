"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz

Repositorio de Padecimiento.
"""

from typing import List, Optional
from app.config.database import SessionLocal
from app.entities.padecimiento import PadecimientoORM

class PadecimientoRepository:
    def __init__(self):
        self.db = SessionLocal()

    def crear(self, id_padecimiento, nombre_padecimiento, tipo, tratamiento_prolongado) -> PadecimientoORM:
        nuevo_padecimiento = PadecimientoORM(
            id_padecimiento=id_padecimiento,
            nombre_padecimiento=nombre_padecimiento,
            tipo=tipo,
            tratamiento_prolongado=tratamiento_prolongado
        )
        self.db.add(nuevo_padecimiento)
        self.db.commit()
        self.db.refresh(nuevo_padecimiento)
        return nuevo_padecimiento


    def listar_todos(self) -> List[PadecimientoORM]:
        return self.db.query(PadecimientoORM).all()

    def buscar_por_id(self, id_padecimiento: int) -> Optional[PadecimientoORM]:
        return (
            self.db.query(PadecimientoORM)
            .filter(PadecimientoORM.id_padecimiento == id_padecimiento)
            .first()
        )

    def listar_por_tipo(self, tipo: str) -> List[PadecimientoORM]:
        return self.db.query(PadecimientoORM).filter(PadecimientoORM.tipo == tipo).all()

    def actualizar(self, id_padecimiento: int, nombre_padecimiento: str, tipo: str, tratamiento_prolongado: str) -> \
    PadecimientoORM:
        padecimiento = self.buscar_por_id(id_padecimiento)
        padecimiento.nombre_padecimiento = nombre_padecimiento
        padecimiento.tipo = tipo
        padecimiento.tratamiento_prolongado = tratamiento_prolongado
        self.db.commit()
        self.db.refresh(padecimiento)
        return padecimiento

    def eliminar(self, id_padecimiento: int) -> PadecimientoORM:
        padecimiento = self.buscar_por_id(id_padecimiento)
        self.db.delete(padecimiento)
        self.db.commit()
        return padecimiento