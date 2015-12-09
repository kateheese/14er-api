DROP TABLE IF EXISTS peaks;

CREATE TABLE peaks (
  id serial primary key,
  peak_name text,
  range text,
  rank numeric,
  elevation numeric,
  latitude numeric,
  longitude numeric
);