"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz
"""
from app.repository.cita_medica_repository import CitaMedicaRepository
from app.repository.medico_repository import MedicoRepository
from app.repository.especialidad_repository import EspecialidadRepository


class MedicoService:
    def __init__(self):
        self.repo_medicos = MedicoRepository()
        self.repo_especialidads = EspecialidadRepository()
        self.repo_citas = CitaMedicaRepository()

    def crear(self, cedula_medico: int, nombre_medico: str, telefono_medico: str,
              correo_medico: str, provincia_medico: str, id_especialidad: int):
        nombre_medico = nombre_medico.strip()
        telefono_medico = telefono_medico.strip()
        correo_medico = correo_medico.strip()
        provincia_medico = provincia_medico.strip()

        if not (
            cedula_medico and
            nombre_medico and
            telefono_medico and
            correo_medico and
            provincia_medico and
            id_especialidad
        ):
            raise ValueError('No pueden haber campos vacíos')

        if self.repo_medicos.buscar_por_cedula(cedula_medico) is not None:
            raise ValueError('Ya existe un medico con esa cédula')

        if '@' not in correo_medico or '.' not in correo_medico:
            raise ValueError('Correo inválido')

        self.especialidad_existe(id_especialidad)

        return self.repo_medicos.crear(
            cedula_medico, nombre_medico, telefono_medico, correo_medico, provincia_medico,id_especialidad
        )

    def listar_todos(self):
        return self.repo_medicos.listar_todos()

    def listar_por_provincia(self, provincia):
        if not provincia:
            raise ValueError('Debe seleccionar una provincia')
        return self.repo_medicos.listar_por_provincia(provincia)

    def listar_por_especialidad(self, id_especialidad):
        self.especialidad_existe(id_especialidad)
        return self.repo_medicos.listar_por_especialidad(id_especialidad)

    def buscar_por_cedula(self, cedula_medico: int):
        medico = self.repo_medicos.buscar_por_cedula(cedula_medico)
        if not medico:
            raise ValueError('No existe un medico con esa cédula')
        return medico

    def eliminar(self, cedula_medico: int):
        # Buscar por cédula hace verificaciones y lanza excepciones
        if self.repo_citas.existe_medico_con_cita(cedula_medico):
            raise ValueError('No se puede eliminar al medico ya que ya está asociado a una cita')
        self.buscar_por_cedula(cedula_medico)
        return self.repo_medicos.eliminar(cedula_medico)

    def actualizar(self, cedula_medico: int, nombre_medico: str, telefono_medico: str,
              correo_medico: str, provincia_medico: str, id_especialidad: int):
        nombre_medico = nombre_medico.strip()
        telefono_medico = telefono_medico.strip()
        correo_medico = correo_medico.strip()
        provincia_medico = provincia_medico.strip()

        if not (
            cedula_medico and
            id_especialidad and
            nombre_medico and
            telefono_medico and
            correo_medico and
            provincia_medico
        ):
            raise ValueError('No pueden haber campos vacíos')

        if self.repo_medicos.buscar_por_cedula(cedula_medico) is None:
            raise ValueError('No existe un medico con esa cédula')

        if '@' not in correo_medico or '.' not in correo_medico:
            raise ValueError('Correo inválido')

        self.especialidad_existe(id_especialidad)

        return self.repo_medicos.actualizar(
            cedula_medico, nombre_medico, telefono_medico, correo_medico, provincia_medico, id_especialidad
        )

    def especialidad_existe(self, id_especialidad: int):
        """
        Verifica que el id que recibe exista
        :param id_especialidad: id_especialidad a verificar
        """
        if self.repo_especialidads.buscar_por_id(id_especialidad) is None:
            raise ValueError('No existe ninguna especialidad con ese ID')