"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz

Servicio de Padecimiento.
Capa de lógica de negocio y validaciones. No conoce nada de HTTP/FastAPI
ni de detalles de la base de datos: solo coordina reglas y llama al
repositorio.
"""
from typing import List, Optional
from app.entities.padecimiento import  PadecimientoORM
from app.repository.padecimiento_repository import PadecimientoRepository


class PadecimientoService:
    def __init__(self):
        self.repo = PadecimientoRepository()

    def crear(
        self,
        id_padecimiento: int,
        nombre_padecimiento: str,
        tipo: str,
        tiene_tratamiento_prolongado: bool = False,
        cantidad: Optional[int] = None,
        unidad: Optional[str] = None,
    ) ->  PadecimientoORM:
        """
        Registra un padecimiento aplicando las reglas de negocio:

        - nombre y tipo no pueden estar vacíos
        - tipo debe ser uno de: cronico, agudo, congenito, otro
        - si tipo == 'agudo', no puede tener tratamiento prolongado
        - si tiene_tratamiento_prolongado, cantidad debe ser > 0 y unidad
          debe ser 'meses' o 'años'; se guarda como string, ej: "3 meses"
        - si no tiene tratamiento prolongado, se guarda "no necesita"
        """
        nombre_padecimiento = nombre_padecimiento.strip()

        if not (id_padecimiento and nombre_padecimiento and tipo):
            raise ValueError("No pueden haber campos vacíos")
        if self.repo.buscar_por_id(id_padecimiento) is not None:
            raise ValueError('Ya existe un padecimiento con ese ID')
        if tipo == "agudo" and tiene_tratamiento_prolongado:
            raise ValueError(
                "Un padecimiento de tipo 'agudo' no puede tener tratamiento prolongado"
            )

        if tiene_tratamiento_prolongado:
            if cantidad is None or cantidad <= 0:
                raise ValueError(
                    "La cantidad del tratamiento prolongado debe ser un número mayor a 0"
                )
            if not unidad:
                raise ValueError(f"Debe seleccionar una unidad (meses/años)")
            tratamiento_prolongado = f"{cantidad} {unidad}"
        else:
            tratamiento_prolongado = "No necesita"

        return self.repo.crear(id_padecimiento, nombre_padecimiento, tipo, tratamiento_prolongado)


    def listar_todos(self):
        return self.repo.listar_todos()


    def listar_por_tipo(self, tipo: str) -> List[PadecimientoORM]:
        if not tipo:
            raise ValueError("Debe seleccionar un tipo")
        return self.repo.listar_por_tipo(tipo)


    def buscar_por_id(self, id_padecimiento: int) ->  PadecimientoORM:
        padecimiento = self.repo.buscar_por_id(id_padecimiento)
        if padecimiento is None:
            raise ValueError(f"No existe un padecimiento con id {id_padecimiento}")
        return padecimiento

    def actualizar(
            self,
            id_padecimiento: int,
            nombre_padecimiento: str,
            tipo: str,
            tiene_tratamiento_prolongado: bool = False,
            cantidad: Optional[int] = None,
            unidad: Optional[str] = None,
    ) -> PadecimientoORM:
        """
        Actualiza un padecimiento aplicando las mismas reglas de negocio que al registrar:
        - nombre y tipo no pueden estar vacíos
        - si tipo == 'agudo', no puede tener tratamiento prolongado
        - si tiene_tratamiento_prolongado, cantidad debe ser > 0 y unidad 'meses' o 'años'
        - El padecimiento debe existir
        """
        # buscar_por_id ya lanza ValueError si no existe
        self.buscar_por_id(id_padecimiento)

        nombre_padecimiento = nombre_padecimiento.strip()
        if not (nombre_padecimiento and tipo):
            raise ValueError("No pueden haber campos vacíos")

        if tipo == "agudo" and tiene_tratamiento_prolongado:
            raise ValueError(
                "Un padecimiento de tipo 'agudo' no puede tener tratamiento prolongado"
            )

        if tiene_tratamiento_prolongado:
            if cantidad is None or cantidad <= 0:
                raise ValueError(
                    "La cantidad del tratamiento prolongado debe ser un número mayor a 0"
                )
            if not unidad:
                raise ValueError("Debe seleccionar una unidad (meses/años)")
            tratamiento_prolongado = f"{cantidad} {unidad}"
        else:
            tratamiento_prolongado = "No necesita"

        return self.repo.actualizar(id_padecimiento, nombre_padecimiento, tipo, tratamiento_prolongado)

    def eliminar(self, id_padecimiento: int) -> PadecimientoORM:
        # buscar_por_id ya lanza ValueError si no existe
        self.buscar_por_id(id_padecimiento)
        return self.repo.eliminar(id_padecimiento)
