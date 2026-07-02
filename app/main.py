"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz

Punto de entrada de la API. Levanta FastAPI, configura CORS,
inicializa la base de datos y registra todos los routers de los módulos.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.database import init_db
from app.controller.especialidad_router import router as especialidad_router
from app.controller.padecimiento_router import router as padecimiento_router
from app.controller.medico_router import router as medico_router
from app.controller.paciente_router import router as paciente_router

app = FastAPI(title="Centro Médico Aurora API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(especialidad_router)
app.include_router(padecimiento_router)
app.include_router(medico_router)
app.include_router(paciente_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)