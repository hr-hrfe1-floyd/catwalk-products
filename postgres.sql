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
  style_id integer PRIMARY KEY,
  product_id integer,
  name VARCHAR(40),
  sale_price VARCHAR(10),
  original_price VARCHAR(10),
  default_style boolean,
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS features (
  feature_id integer PRIMARY KEY,
  product_id integer,
  feature VARCHAR(50),
  feature_value VARCHAR(50),
  FOREIGN KEY(product_id) REFERENCES styles(style_id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY NOT NULL,
  photo_id integer,
  style_id integer,
  thumbnail_url VARCHAR(10000),
  url TEXT,
  FOREIGN KEY(style_id) REFERENCES styles(style_id)
);

CREATE TABLE IF NOT EXISTS related_ids (
  id integer PRIMARY KEY,
  product_id integer,
  related_id integer,
  FOREIGN KEY(product_id) REFERENCES styles(style_id)
);

\COPY photos(photo_id, style_id, thumbnail_url, url) FROM '/home/adrian/Documents/SDC Products Service Data/photos-005.csv' WITH (FORMAT CSV, HEADER);

\COPY products(product_id, name, slogan, description, category, default_price) FROM '/home/adrian/Documents/SDC Products Service Data/product.csv' DELIMITER ',' CSV HEADER;

\COPY styles(style_id, product_id, name, sale_price, original_price, default_style) FROM '/home/adrian/Documents/SDC Products Service Data/styles.csv' DELIMITER ',' CSV HEADER;

\COPY features(feature_id, product_id, feature, feature_value) FROM '/home/adrian/Documents/SDC Products Service Data/features.csv' WITH (FORMAT CSV);



-- \COPY related_ids(id, product_id, related_id) FROM '/home/adrian/Documents/SDC Products Service Data/related.csv' DELIMITER ',' CSV HEADER;


-- to run this file in psql
-- \i '/home/adrian/Documents/SDC/catwalk-products/postgres.sql'