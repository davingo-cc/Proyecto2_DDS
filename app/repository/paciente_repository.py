"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz
"""
from app.config.database import SessionLocal
from app.entities.paciente import PacienteORM


class PacienteRepository:
    def __init__(self):
        self.db = SessionLocal()

    def crear(self, cedula_paciente: int, nombre_paciente: str, telefono_paciente: str,
              correo_paciente: str, provincia_paciente: str, id_padecimiento: int):
        paciente = PacienteORM(
            cedula_paciente=cedula_paciente,
            nombre_paciente=nombre_paciente,
            telefono_paciente=telefono_paciente,
            correo_paciente=correo_paciente,
            provincia_paciente=provincia_paciente,
            id_padecimiento=id_padecimiento
        )
        self.db.add(paciente)
        self.db.commit()
        return paciente

    def listar_todos(self):
        return self.db.query(PacienteORM).all()

    def buscar_por_cedula(self, cedula_paciente: int):
        return (
            self.db.query(PacienteORM)
            .filter(PacienteORM.cedula_paciente == cedula_paciente)
            .first()
        )

    def listar_por_provincia(self, provincia_paciente: str):
        return (
            self.db.query(PacienteORM)
            .filter(PacienteORM.provincia_paciente == provincia_paciente)
            .all()
        )

    def listar_por_padecimiento(self, id_padecimiento: int):
        return (
            self.db.query(PacienteORM)
            .filter(PacienteORM.id_paciente == id_padecimiento)
            .all()
        )

    def eliminar(self, cedula_paciente: int):
        paciente = self.buscar_por_cedula(cedula_paciente)
        self.db.delete(paciente)
        self.db.commit()
        return paciente

    def actualizar(self, cedula_paciente: int, nombre_paciente: str, telefono_paciente: str,
                   correo_paciente: str, provincia_paciente: str, id_padecimiento: int):
        paciente = self.buscar_por_cedula(cedula_paciente)
        paciente.nombre_paciente = nombre_paciente
        paciente.telefono_paciente = telefono_paciente
        paciente.correo_paciente = correo_paciente
        paciente.provincia_paciente = provincia_paciente
        paciente.id_padecimiento = id_padecimiento
        self.db.commit()
        self.db.refresh(paciente)
        return paciente

    def existe_paciente_con_padecimiento(self, id_padecimiento: int) -> bool:
        """
        Verifica si existe al menos un paciente asociado a el padecimiento dado
        """
        existe = (
            self.db.query(PacienteORM)
            .filter(PacienteORM.id_padecimiento == id_padecimiento)
            .first()
        )
        return existe is not None