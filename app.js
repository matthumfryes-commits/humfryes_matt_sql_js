import mariadb from "mariadb";

const pool = mariadb.createPool({
host: "localhost",
user: "root",
password: "Bowser2013",
database: "civelampus",
connectionLimit: 10,
});