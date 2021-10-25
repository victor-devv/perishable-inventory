-- Drops perishables table
DROP TABLE IF EXISTS Perishables;
DROP TABLE IF EXISTS Stocks;

-- Creates perishables table
CREATE TABLE IF NOT EXISTS perishables (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , user_id varchar(50) NULL
    , name varchar(50) NOT NULL
    , quantity integer NOT NULL
    , expiry bigint NOT NULL 
    , created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);