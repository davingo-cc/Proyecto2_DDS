"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz

Servicio de Cita Medica.
Capa de lógica de negocio y validaciones. No conoce nada de HTTP/FastAPI
ni de detalles de la base de datos: solo coordina reglas y llama al
repositorio.
"""
from datetime import date, datetime
from typing import List
from app.entities.cita_medica import CitaMedicaORM
from app.repository.cita_medica_repository import CitaMedicaRepository
from app.repository.paciente_repository import PacienteRepository
from app.repository.medico_repository import MedicoRepository


class CitaMedicaService:
    def __init__(self):
        self.repo = CitaMedicaRepository()
        self.paciente_repo = PacienteRepository()
        self.medico_repo = MedicoRepository()

    def crear(
        self,
        id_cita: int,
        motivo: str,
        fecha: date,
        cedula_paciente: int,
        cedula_medico: int,
    ) -> CitaMedicaORM:
        """
        Registra una cita médica aplicando las reglas de negocio:

        - motivo no puede estar vacío
        - la fecha no puede ser anterior a hoy
        - el paciente y el médico deben existir
        - no puede existir ya una cita con el mismo id
        """
        motivo = motivo.strip()
        if not (
            id_cita and
            motivo and
            fecha and
            cedula_paciente and
            cedula_medico
        ):
            raise ValueError('No pueden haber campos vacíos')
        if self.repo.buscar_por_id(id_cita) is not None:
            raise ValueError("Ya existe una cita con ese ID")
        if fecha < date.today():
            raise ValueError("La fecha de la cita no puede ser anterior a hoy")
        if self.paciente_repo.buscar_por_cedula(cedula_paciente) is None:
            raise ValueError(f"No existe un paciente con cédula {cedula_paciente}")
        if self.medico_repo.buscar_por_cedula(cedula_medico) is None:
            raise ValueError(f"No existe un médico con cédula {cedula_medico}")

        return self.repo.crear(id_cita, motivo, fecha, cedula_paciente, cedula_medico)

    def listar_todos(self) -> List[CitaMedicaORM]:
        return self.repo.listar_todos()

    def listar_por_medico(self, cedula_medico: int) -> List[CitaMedicaORM]:
        if self.medico_repo.buscar_por_cedula(cedula_medico) is None:
            raise ValueError(f"No existe un médico con cédula {cedula_medico}")
        return self.repo.listar_por_medico(cedula_medico)

    def buscar_por_id(self, id_cita: int) -> CitaMedicaORM:
        cita = self.repo.buscar_por_id(id_cita)
        if cita is None:
            raise ValueError(f"No existe una cita con id {id_cita}")
        return cita

    def actualizar(
        self,
        id_cita: int,
        motivo: str,
        fecha: date,
        cedula_paciente: int,
        cedula_medico: int,
    ) -> CitaMedicaORM:
        """
        Actualiza una cita médica aplicando las mismas reglas de negocio que al registrar:
        - la cita debe existir
        - motivo no puede estar vacío
        - la fecha no puede ser anterior a hoy
        - el paciente y el médico deben existir
        """
        motivo = motivo.strip()
        if not (
                id_cita and
                motivo and
                fecha and
                cedula_paciente and
                cedula_medico
        ):
            raise ValueError('No pueden haber campos vacíos')

        if fecha < date.today():
            raise ValueError("La fecha de la cita no puede ser anterior a hoy")
        if self.paciente_repo.buscar_por_cedula(cedula_paciente) is None:
            raise ValueError(f"No existe un paciente con cédula {cedula_paciente}")
        if self.medico_repo.buscar_por_cedula(cedula_medico) is None:
            raise ValueError(f"No existe un médico con cédula {cedula_medico}")

        return self.repo.actualizar(id_cita, motivo, fecha, cedula_paciente, cedula_medico)

    def eliminar(self, id_cita: int) -> CitaMedicaORM:
        self.buscar_por_id(id_cita)
        return self.repo.eliminar(id_cita)

