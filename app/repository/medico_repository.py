"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz
"""
from app.config.database import SessionLocal
from app.entities.medico import MedicoORM


class MedicoRepository:
    def __init__(self):
        self.db = SessionLocal()

    def crear(self, cedula_medico: int, nombre_medico: str, telefono_medico: str,
              correo_medico: str, provincia_medico: str, id_especialidad: int):
        medico = MedicoORM(
            cedula_medico=cedula_medico,
            nombre_medico=nombre_medico,
            telefono_medico=telefono_medico,
            correo_medico=correo_medico,
            provincia_medico=provincia_medico,
            id_especialidad=id_especialidad
        )
        self.db.add(medico)
        self.db.commit()
        self.db.refresh(medico)
        return medico

    def listar_todos(self):
        return self.db.query(MedicoORM).all()

    def buscar_por_cedula(self, cedula_medico: int):
        return (
            self.db.query(MedicoORM)
            .filter(MedicoORM.cedula_medico == cedula_medico)
            .first()
        )

    def listar_por_provincia(self, provincia_medico: str):
        return (
            self.db.query(MedicoORM)
            .filter(MedicoORM.provincia_medico == provincia_medico)
            .all()
        )

    def listar_por_especialidad(self, id_especialidad: int):
        return (
            self.db.query(MedicoORM)
            .filter(MedicoORM.id_medico == id_especialidad)
            .all()
        )

    def eliminar(self, cedula_medico: int):
        medico = self.buscar_por_cedula(cedula_medico)
        self.db.delete(medico)
        self.db.commit()
        return medico

    def actualizar(self, cedula_medico: int, nombre_medico: str, telefono_medico: str,
                   correo_medico: str, provincia_medico: str, id_especialidad: int):
        medico = self.buscar_por_cedula(cedula_medico)
        medico.nombre_medico = nombre_medico
        medico.telefono_medico = telefono_medico
        medico.correo_medico = correo_medico
        medico.provincia_medico = provincia_medico
        medico.id_especialidad = id_especialidad
        self.db.commit()
        self.db.refresh(medico)
        return medico

    def existe_medico_con_especialidad(self, id_especialidad: int) -> bool:
        """
        Verifica si existe al menos un medico asociado a la especialidad dada
        """
        existe = (
            self.db.query(MedicoORM)
            .filter(MedicoORM.id_especialidad == id_especialidad)
            .first()
        )
        return existe is not None
