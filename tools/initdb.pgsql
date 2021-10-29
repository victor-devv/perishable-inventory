-- Drops perishables table
DROP TABLE IF EXISTS Perishables;
DROP TABLE IF EXISTS Stocks;

-- Creates perishables table
CREATE TABLE IF NOT EXISTS Perishables (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , name varchar(50) NOT NULL
    , expiry bigint NOT NULL 
    , created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);