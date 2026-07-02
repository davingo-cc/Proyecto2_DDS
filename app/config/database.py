"""
Proyecto 2
IFO0O6 - Desarrollo de software III
David Chang
Enzo Bejarano
Windell Urroz
"""
from sqlalchemy import create_engine, false
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = 'mysql+pymysql://root:@localhost:3306/clinica_db'
engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

def init_db():
    from app.entities.padecimiento import PadecimientoORM
    from app.entities.especialidad import EspecialidadORM
    from app.entities.paciente import PacienteORM
    from app.entities.medico import MedicoORM
    from app.entities.cita_medica import CitaMedicaORM

    Base.metadata.create_all(bind=engine)

def close_db():
    Base.metadata.drop_all(engine)