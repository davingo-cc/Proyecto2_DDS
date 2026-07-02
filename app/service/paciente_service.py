"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz
"""
from app.repository.cita_medica_repository import CitaMedicaRepository
from app.repository.paciente_repository import PacienteRepository
from app.repository.padecimiento_repository import PadecimientoRepository


class PacienteService:
    def __init__(self):
        self.repo_pacientes= PacienteRepository()
        self.repo_padecimientos= PadecimientoRepository()
        self.repo_citas = CitaMedicaRepository()

    def crear(self, cedula_paciente: int, nombre_paciente: str, telefono_paciente: str,
              correo_paciente: str, provincia_paciente: str, id_padecimiento: int):
        nombre_paciente = nombre_paciente.strip()
        telefono_paciente = telefono_paciente.strip()
        correo_paciente = correo_paciente.strip()
        provincia_paciente = provincia_paciente.strip()

        if not (
            cedula_paciente and
            id_padecimiento and
            nombre_paciente and
            telefono_paciente and
            correo_paciente and
            provincia_paciente
        ):
            raise ValueError('No pueden haber campos vacíos')

        if self.repo_pacientes.buscar_por_cedula(cedula_paciente) is not None:
            raise ValueError('Ya existe un paciente con esa cédula')

        if '@' not in correo_paciente or '.' not in correo_paciente:
            raise ValueError('Correo inválido')

        self.padecimiento_existe(id_padecimiento)

        return self.repo_pacientes.crear(
            cedula_paciente, nombre_paciente, telefono_paciente, correo_paciente, provincia_paciente,id_padecimiento
        )

    def listar_todos(self):
        return self.repo_pacientes.listar_todos()

    def listar_por_provincia(self, provincia):
        if not provincia:
            raise ValueError('Debe seleccionar una provincia')
        return self.repo_pacientes.listar_por_provincia(provincia)

    def listar_por_padecimiento(self, id_padecimiento):
        self.padecimiento_existe(id_padecimiento)
        return self.repo_pacientes.listar_por_padecimiento(id_padecimiento)

    def buscar_por_cedula(self, cedula_paciente: int):
        paciente = self.repo_pacientes.buscar_por_cedula(cedula_paciente)
        if not paciente:
            raise ValueError('No existe un paciente con esa cédula')
        return paciente

    def eliminar(self, cedula_paciente: int):
        # Buscar por cédula hace verificaciones y lanza excepciones
        if self.repo_citas.existe_paciente_con_cita(cedula_paciente):
            raise ValueError('No se puede eliminar al paciente ya que ya está asociado a una cita')
        self.buscar_por_cedula(cedula_paciente)
        return self.repo_pacientes.eliminar(cedula_paciente)
    
    def actualizar(self, cedula_paciente, nombre_paciente, telefono_paciente,
                   correo_paciente, provincia_paciente, id_padecimiento):
        nombre_paciente = nombre_paciente.strip()
        telefono_paciente = telefono_paciente.strip()
        correo_paciente = correo_paciente.strip()
        provincia_paciente = provincia_paciente.strip()

        if not (
            cedula_paciente and
            id_padecimiento and
            nombre_paciente and
            telefono_paciente and
            correo_paciente and
            provincia_paciente
        ):
            raise ValueError('No pueden haber campos vacíos')

        if self.repo_pacientes.buscar_por_cedula(cedula_paciente) is None:
            raise ValueError('No existe un paciente con esa cédula')

        if '@' not in correo_paciente or '.' not in correo_paciente:
            raise ValueError('Correo inválido')

        self.padecimiento_existe(id_padecimiento)

        return self.repo_pacientes.actualizar(
            cedula_paciente, nombre_paciente, telefono_paciente, correo_paciente, provincia_paciente, id_padecimiento
        )

    def padecimiento_existe(self, id_padecimiento: int):
        """
        Verifica que el id que recibe exista
        :param id_padecimiento: id_padecimiento a verificar
        """
        if self.repo_padecimientos.buscar_por_id(id_padecimiento) is None:
            raise ValueError('No existe ningún padecimiento con ese ID')