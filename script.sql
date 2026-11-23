CREATE DATABASE IF NOT EXISTS controle_treinos;
USE controle_treinos;

CREATE TABLE IF NOT EXISTS itens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exercicio VARCHAR(100) NOT NULL,
  grupo_muscular VARCHAR(60) NOT NULL,
  series INT NOT NULL,
  carga_kg DECIMAL(6,2) NOT NULL
);

INSERT INTO itens (exercicio, grupo_muscular, series, carga_kg) VALUES
  ('Supino reto com barra', 'Peito', 4, 60.00),
  ('Remada curvada', 'Costas', 4, 50.00),
  ('Agachamento livre', 'Pernas', 4, 80.00);