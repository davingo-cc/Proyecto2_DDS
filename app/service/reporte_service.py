from app.repository.reporte_repository import ReporteRepository
provincias_cr = ('ALAJUELA', 'CARTAGO', 'HEREDIA', 'PUNTARENAS', 'LIMON', 'SAN JOSE', 'GUANACASTE')


class ReporteService:
    def __init__(self):
        self.repo = ReporteRepository()

    def pacientes_mas_citas(self):
        reporte = self.repo.pacientes_mas_citas()
        if len(reporte) == 0:
            return [{
                'cedula': 0,
                'nombre': 'No hay datos',
                'cantidad_citas': 0
            }]
        return reporte

    def padecimiento_por_provincia(self):
        reporte =self.repo.padecimiento_por_provincia()
        # Evitar que devuelva más de 7 diccionarios
        if len(reporte) > 7:
            provincias = set()
            nuevo_reporte = []

            for fila in reporte:
                if fila["provincia"] not in provincias:
                    provincias.add(fila["provincia"])
                    nuevo_reporte.append(fila)

            reporte = nuevo_reporte
        # Evitar que devuelva menos de 7 diccionarios
        provincias_reporte = {fila["provincia"].upper() for fila in reporte}

        for provincia in provincias_cr:
            if provincia.upper() not in provincias_reporte:
                reporte.append({
                    "provincia": provincia,
                    "padecimiento": "N/A",
                    "cantidad": 0
                })
        return reporte

    def especialidad_mas_demandada(self):
        reporte =self.repo.especialidad_mas_demandada()
        if reporte is None:
            return {
                "especialidad": 'N/A',
                "demanda": 0
            }
        return reporte