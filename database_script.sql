CREATE DATABASE clinica_db;
USE clinica_db;

CREATE TABLE padecimiento(
    id_padecimiento INT PRIMARY KEY,
    nombre_padecimiento VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    tratamiento_prolongado VARCHAR(100)
);

CREATE TABLE especialidad(
    id_especialidad INT PRIMARY KEY,
    nombre_especialidad VARCHAR(100) NOT NULL,
    area_medica VARCHAR(50) NOT NULL,
    tipo_atencion VARCHAR(13) NOT NULL
);

CREATE TABLE paciente(
    cedula_paciente INT PRIMARY KEY,
    nombre_paciente VARCHAR(100) NOT NULL,
    telefono_paciente VARCHAR(15) NOT NULL,
    correo_paciente VARCHAR(150),
    provincia_paciente VARCHAR(10) NOT NULL,
    id_padecimiento INT NOT NULL,
        FOREIGN KEY (id_padecimiento) REFERENCES padecimiento(id_padecimiento)
);

CREATE TABLE medico(
    cedula_medico INT PRIMARY KEY,
    nombre_medico VARCHAR(100) NOT NULL,
    telefono_medico VARCHAR(15) NOT NULL,
    correo_medico VARCHAR(150),
    provincia_medico VARCHAR(10) NOT NULL,
    id_especialidad INT NOT NULL,
        FOREIGN KEY (id_especialidad) REFERENCES especialidad(id_especialidad)
);

CREATE TABLE cita_medica(
    id_cita INT PRIMARY KEY,
    motivo VARCHAR(400) NOT NULL,
    fecha DATE NOT NULL,
    cedula_paciente INT NOT NULL,
        FOREIGN KEY (cedula_paciente) REFERENCES paciente(cedula_paciente),
	cedula_medico INT NOT NULL,
        FOREIGN KEY (cedula_medico) REFERENCES medico(cedula_medico)
);

