DROP DATABASE IF EXISTS servicedb;

CREATE DATABASE servicedb;

\c servicedb;

CREATE TABLE IF NOT EXISTS products (
  product_id integer PRIMARY KEY,
  name VARCHAR(40),
  slogan VARCHAR(250),
  description VARCHAR(500),
  category VARCHAR(25),
  default_price VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS styles (
  id SERIAL PRIMARY KEY,
  product_id integer,
  style_id integer,
  original_price VARCHAR(10),
  sale_price VARCHAR(10),
  default_style boolean,
  features jsonb,
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  product_id integer,
  thumbnail_url VARCHAR(100),
  url VARCHAR(100),
  FOREIGN KEY(product_id) REFERENCES styles(id)
);

CREATE TABLE IF NOT EXISTS related_ids (
  id SERIAL PRIMARY KEY,
  product_id integer,
  ids integer[],
  FOREIGN KEY(product_id) REFERENCES styles(id)
);

\COPY products(product_id, name, slogan, description, category, default_price) FROM '/home/adrian/Documents/SDC Products Service Data/product.csv' DELIMITER ',' CSV HEADER;

-- INSERT INTO products (id, name, slogan, description, category, default_price) VALUES (1, 'adrianoooo', 'yo', 'this is the description', 'person', '1000');

-- INSERT INTO styles (style_id, original_price, sale_price, default_style, features) VALUES (15, '2500', '250', false, '{"feature": "Sole", "value": "Rubber"}');

-- to run this file in psql
-- \i '/home/adrian/Documents/SDC/catwalk-products/postgres.sql'