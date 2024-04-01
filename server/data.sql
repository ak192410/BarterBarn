CREATE DATABASE barterbarn;

CREATE TABLE users(
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

CREATE TABLE id(
    id SERIAL PRIMARY KEY
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    originator_email VARCHAR(255) NOT NULL REFERENCES users(email), -- assuming you have a users table
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image BYTEA,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES items(id),
    email VARCHAR(255) NOT NULL,
    offer TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);