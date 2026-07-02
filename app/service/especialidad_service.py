"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz

Servicio de Especialidad.
Capa de lógica de negocio y validaciones.
"""
from app.repository.especialidad_repository import EspecialidadRepository
from app.entities.especialidad import EspecialidadORM
from app.repository.medico_repository import MedicoRepository


class EspecialidadService:
    def __init__(self):
        self.repo = EspecialidadRepository()
        self.repo_medicos = MedicoRepository()
        
    def registrar_especialidad(self, id_especialidad: int, nombre_especialidad: str, area_medica: str, tipo_atencion: str) -> EspecialidadORM:
        """
        Registra una especialidad aplicando las reglas de negocio:
        - nombre y area_medica no pueden estar vacíos
        - tipo_atencion debe ser 'general' o 'especializada'
        """
        nombre_especialidad = nombre_especialidad.strip()
        area_medica = area_medica.strip()

        if not (
            id_especialidad and
            nombre_especialidad and
            area_medica and
            tipo_atencion
        ):
            raise ValueError("No pueden haber campos vacíos")
        if self.repo.buscar_por_id(id_especialidad) is not None:
            raise ValueError('Ya existe una especialidad con ese ID')
        return self.repo.crear(id_especialidad, nombre_especialidad, area_medica, tipo_atencion)


    def listar_todos(self) -> list[type[EspecialidadORM]]:
        return self.repo.listar_todos()

    def listar_por_tipo_atencion(self, tipo_atencion: str) -> list[type[EspecialidadORM]]:
        if not tipo_atencion:
            raise ValueError(
                "Debe seleccionar un tipo de atención"
            )
        return self.repo.listar_por_tipo_atencion(tipo_atencion)


    def buscar_por_id(self, id_especialidad: int) -> EspecialidadORM:
        especialidad = self.repo.buscar_por_id(id_especialidad)
        if especialidad is None:
            raise ValueError(f"No existe una especialidad con id {id_especialidad}")
        return especialidad

    def actualizar(self, id_especialidad: int, nombre_especialidad: str, area_medica: str, tipo_atencion: str) -> EspecialidadORM:
        """
        Actualiza una especialidad aplicando las mismas reglas de negocio que al registrar:
        - Todos los campos son obligatorios
        - El ID debe ser un número entero
        - La especialidad debe existir
        """
        # buscar_por_id ya lanza ValueError si no existe
        self.buscar_por_id(id_especialidad)

        nombre_especialidad = nombre_especialidad.strip()
        area_medica = area_medica.strip()

        if not (nombre_especialidad and area_medica and tipo_atencion):
            raise ValueError("No pueden haber campos vacíos")


        return self.repo.actualizar(id_especialidad, nombre_especialidad, area_medica, tipo_atencion)

    def eliminar(self, id_especialidad: int) -> EspecialidadORM:
        """
        Elimina una especialidad.
        - El ID debe ser un número entero
        - La especialidad debe existir
        - No puede borrar una que ya esté asociada a un médico
        """
        if self.repo_medicos.existe_medico_con_especialidad(id_especialidad):
            raise ValueError('No puede eliminar la especialidad ya que ya existe un médico asociado')
        # buscar_por_id ya lanza ValueError si no existe
        self.buscar_por_id(id_especialidad)
        return self.repo.eliminar(id_especialidad)
