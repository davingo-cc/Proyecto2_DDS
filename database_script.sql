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

-- ==========================
-- PADECIMIENTO
-- ==========================
INSERT INTO padecimiento (id_padecimiento, nombre_padecimiento, tipo, tratamiento_prolongado) VALUES
(1, 'Diabetes tipo 2', 'Cronico', '5 anios'),
(2, 'Gripe estacional', 'Agudo', 'No necesita'),
(3, 'Labio leporino', 'Congenito', '2 anios'),
(4, 'Hipertension arterial', 'Cronico', '10 anios'),
(5, 'Apendicitis', 'Agudo', 'No necesita'),
(6, 'Cardiopatia congenita', 'Congenito', '8 anios'),
(7, 'Migrana', 'Otro', '6 meses'),
(8, 'Asma', 'Cronico', '3 anios'),
(9, 'Fractura de tibia', 'Agudo', '4 meses'),
(10, 'Escoliosis', 'Otro', '1 anios');

-- ==========================
-- ESPECIALIDAD
-- ==========================
INSERT INTO especialidad (id_especialidad, nombre_especialidad, area_medica, tipo_atencion) VALUES
(1, 'Medicina general', 'Medicina interna', 'General'),
(2, 'Cardiologia', 'Cardiovascular', 'Especializada'),
(3, 'Pediatria', 'Pediatrica', 'General'),
(4, 'Dermatologia', 'Dermatologica', 'Especializada'),
(5, 'Neurologia', 'Neurologica', 'Especializada'),
(6, 'Ortopedia', 'Traumatologica', 'Especializada'),
(7, 'Ginecologia', 'Ginecologica', 'Especializada'),
(8, 'Psiquiatria', 'Salud mental', 'Especializada'),
(9, 'Medicina familiar', 'Medicina interna', 'General'),
(10, 'Oftalmologia', 'Oftalmologica', 'Especializada');

-- ==========================
-- PACIENTE
-- ==========================
INSERT INTO paciente (cedula_paciente, nombre_paciente, telefono_paciente, correo_paciente, provincia_paciente, id_padecimiento) VALUES
(101000001, 'Maria Rodriguez Solis', '87451236', 'maria.rodriguez@gmail.com', 'San Jose', 1),
(101000002, 'Carlos Jimenez Vargas', '88452147', 'carlos.jimenez@hotmail.com', 'Alajuela', 2),
(101000003, 'Ana Castro Mora', '89563214', 'ana.castro@yahoo.com', 'Cartago', 3),
(101000004, 'Luis Fernandez Ugalde', '87123654', 'luis.fernandez@gmail.com', 'Heredia', 4),
(101000005, 'Sofia Chacon Alvarado', '88974512', 'sofia.chacon@gmail.com', 'Guanacaste', 5),
(101000006, 'Jose Ramirez Quiros', '89651478', 'jose.ramirez@outlook.com', 'Puntarenas', 6),
(101000007, 'Laura Solano Brenes', '87458963', 'laura.solano@gmail.com', 'Limon', 7),
(101000008, 'Diego Araya Chinchilla', '88123457', 'diego.araya@hotmail.com', 'San Jose', 8),
(101000009, 'Valeria Mora Sequeira', '89456123', 'valeria.mora@gmail.com', 'Alajuela', 9),
(101000010, 'Kevin Vindas Salazar', '87963214', 'kevin.vindas@yahoo.com', 'Cartago', 10);

-- ==========================
-- MEDICO
-- ==========================
INSERT INTO medico (cedula_medico, nombre_medico, telefono_medico, correo_medico, provincia_medico, id_especialidad) VALUES
(102000001, 'Roberto Salas Mena', '86541237', 'roberto.salas@clinicaaurora.com', 'San Jose', 1),
(102000002, 'Patricia Villalobos Rojas', '86452139', 'patricia.villalobos@clinicaaurora.com', 'Heredia', 2),
(102000003, 'Fernando Gomez Barrantes', '86123458', 'fernando.gomez@clinicaaurora.com', 'Alajuela', 3),
(102000004, 'Gabriela Nunez Cordero', '86987456', 'gabriela.nunez@clinicaaurora.com', 'Cartago', 4),
(102000005, 'Andres Zuniga Porras', '86456789', 'andres.zuniga@clinicaaurora.com', 'Guanacaste', 5),
(102000006, 'Karla Montero Duran', '86321654', 'karla.montero@clinicaaurora.com', 'Puntarenas', 6),
(102000007, 'Mauricio Herrera Vega', '86789123', 'mauricio.herrera@clinicaaurora.com', 'Limon', 7),
(102000008, 'Silvia Campos Aguilar', '86654321', 'silvia.campos@clinicaaurora.com', 'San Jose', 8),
(102000009, 'Esteban Rojas Chaves', '86147258', 'esteban.rojas@clinicaaurora.com', 'Alajuela', 9),
(102000010, 'Natalia Blanco Fallas', '86258147', 'natalia.blanco@clinicaaurora.com', 'Heredia', 10);

-- ==========================
-- CITAS MEDICAS (todas con fecha posterior a hoy, 2026-07-01)
-- Diseñadas para dar resultados variados en los 3 reportes
-- ==========================
INSERT INTO cita_medica (id_cita, motivo, fecha, cedula_paciente, cedula_medico) VALUES

-- Maria (101000001) -> 5 citas, top 1 en "pacientes con mas citas"
(1,  'Control general de diabetes', '2026-07-05', 101000001, 102000001),
(2,  'Seguimiento cardiologico preventivo', '2026-07-10', 101000001, 102000002),
(3,  'Consulta por dolor de cabeza', '2026-07-15', 101000001, 102000005),
(4,  'Evaluacion psicologica por estres', '2026-07-20', 101000001, 102000008),
(5,  'Control anual de diabetes', '2026-08-01', 101000001, 102000001),

-- Luis (101000004) -> 4 citas, top 2
(6,  'Revision de hipertension', '2026-07-06', 101000004, 102000002),
(7,  'Control de presion arterial', '2026-07-18', 101000004, 102000002),
(8,  'Dolor en articulaciones', '2026-07-25', 101000004, 102000006),
(9,  'Consulta de medicina familiar', '2026-08-05', 101000004, 102000009),

-- Diego (101000008) -> 3 citas, top 3
(10, 'Control de asma', '2026-07-08', 101000008, 102000001),
(11, 'Seguimiento de asma', '2026-07-28', 101000008, 102000001),
(12, 'Revision oftalmologica', '2026-08-10', 101000008, 102000010),

-- Resto de pacientes -> 1 cita cada uno, distribuidas entre especialidades
(13, 'Revision de sintomas gripales', '2026-07-07', 101000002, 102000003),
(14, 'Valoracion de labio leporino', '2026-07-09', 101000003, 102000003),
(15, 'Dolor abdominal agudo', '2026-07-11', 101000005, 102000001),
(16, 'Revision cardiaca de rutina', '2026-07-12', 101000006, 102000002),
(17, 'Consulta por migrana recurrente', '2026-07-13', 101000007, 102000005),
(18, 'Control de asma', '2026-07-14', 101000009, 102000001),
(19, 'Revision post fractura', '2026-07-16', 101000010, 102000006),
(20, 'Control cardiologico', '2026-07-17', 101000011, 102000002),
(21, 'Consulta por diabetes', '2026-07-19', 101000012, 102000001),
(22, 'Dolor abdominal', '2026-07-21', 101000013, 102000001),
(23, 'Revision de sintomas gripales', '2026-07-22', 101000014, 102000003),
(24, 'Revision cardiaca congenita', '2026-07-23', 101000015, 102000006),
(25, 'Consulta por migrana', '2026-07-24', 101000016, 102000005),
(26, 'Seguimiento de migrana', '2026-07-26', 101000017, 102000005),
(27, 'Valoracion pediatrica', '2026-07-27', 101000018, 102000003),
(28, 'Control de diabetes', '2026-07-29', 101000019, 102000001),
(29, 'Consulta por gripe', '2026-07-30', 101000020, 102000003),
(30, 'Revision de labio leporino', '2026-08-02', 101000021, 102000003);
