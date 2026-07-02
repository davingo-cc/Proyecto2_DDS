from sqlalchemy import func, and_
from app.config.database import SessionLocal
from app.entities.cita_medica import CitaMedicaORM
from app.entities.especialidad import EspecialidadORM
from app.entities.medico import MedicoORM
from app.entities.paciente import PacienteORM
from app.entities.padecimiento import PadecimientoORM


class ReporteRepository:
    def __init__(self):
        self.db = SessionLocal()

    def pacientes_mas_citas(self) -> list[dict]:
        """
        Reporte que retorna una lista que contiene los datos de los 3 pacientes
        con más citas registradas
        """
        resultado = (
            self.db.query(
                PacienteORM.cedula_paciente,
                PacienteORM.nombre_paciente,
                func.count(CitaMedicaORM.cedula_paciente).label("cantidad_citas")
            )
            .join(PacienteORM)
            .group_by(
                PacienteORM.cedula_paciente,
                PacienteORM.nombre_paciente
            )
            .order_by(func.count(CitaMedicaORM.cedula_paciente).desc())
            .limit(3)
            .all()
        )
        reporte = []
        for fila in resultado:
            datos = {
                'cedula': fila[0],
                'nombre': fila[1],
                'cantidad_citas': fila[2]
            }
            reporte.append(datos)
        return reporte
        

    def padecimiento_por_provincia(self):
        """
        Retorna una lista que contiene los datos de el padecimiento más frecuente por provincia
        """
        # Subconsulta 1: cantidad de pacientes por provincia y padecimiento
        t1 = (
            self.db.query(
                PacienteORM.provincia_paciente.label("provincia"),
                PadecimientoORM.id_padecimiento.label("id_padecimiento"),
                PadecimientoORM.nombre_padecimiento.label("nombre_padecimiento"),
                func.count(PacienteORM.cedula_paciente).label("cantidad")
            )
            .join(PadecimientoORM, PacienteORM.id_padecimiento == PadecimientoORM.id_padecimiento)
            .group_by(
                PacienteORM.provincia_paciente,
                PadecimientoORM.id_padecimiento,
                PadecimientoORM.nombre_padecimiento
            )
            .subquery()
        )

        # Subconsulta 2: mayor cantidad por provincia
        t2 = (
            self.db.query(
                t1.c.provincia,
                func.max(t1.c.cantidad).label("mayor")
            )
            .group_by(t1.c.provincia)
            .subquery()
        )

        # Consulta final
        resultado = (
            self.db.query(
                t1.c.provincia,
                t1.c.nombre_padecimiento,
                t1.c.cantidad
            )
            .join(
                t2,
                and_(
                    t1.c.provincia == t2.c.provincia,
                    t1.c.cantidad == t2.c.mayor
                )
            )
            .all()
        )
        reporte = []
        for fila in resultado:
            datos = {
                'provincia': fila.provincia,
                'padecimiento': fila.nombre_padecimiento,
                'cantidad': fila.cantidad
            }
            reporte.append(datos)
        return reporte

    def especialidad_mas_demandada(self):
        resultado = (
            self.db.query(
                EspecialidadORM.nombre_especialidad,
                func.count(CitaMedicaORM.id_cita).label("demanda")
            )
            .join(
                MedicoORM,
                EspecialidadORM.id_especialidad == MedicoORM.id_especialidad
            )
            .join(
                CitaMedicaORM,
                MedicoORM.cedula_medico == CitaMedicaORM.cedula_medico
            )
            .group_by(
                EspecialidadORM.id_especialidad,
                EspecialidadORM.nombre_especialidad
            )
            .order_by(func.count(CitaMedicaORM.id_cita).desc())
            .limit(1)
            .all()
        )
        if not resultado:
            return None
        return {
            "especialidad": resultado[0].nombre_especialidad,
            "demanda": resultado[0].demanda
        }