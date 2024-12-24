CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    role VARCHAR(10) NOT NULL CHECK (role IN ('admin','user'))
);

-- ALTER TABLE profile
-- ADD column password VARCHAR NOT NULL;