-- Your SQL goes here
CREATE TABLE notes
(
    id uuid NOT NULL,
    map_id uuid NOT NULL,
    title text NOT NULL,
    PRIMARY KEY (id)
)