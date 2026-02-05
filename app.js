import mariadb from "mariadb";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

require('dotenv').config();

const pool = mariadb.createPool({
host: process.env.HOST,
user: process.env.USER,
password: process.env.PASSWORD,
database: process.env.DATABASE,
connectionLimit: process.env.CONNECTION_LIMIT,
port: process.env.PORT
});

export async function findAllStudents() {
    let conn;
    try 
    {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM etudiant");
        return rows ?? null;
    } 
    finally 
    {
        if(conn) conn.release();
    }
}

export async function findStudentById(id) {
    let conn;
    try 
    {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM etudiant WHERE etudiant_Id =?", [id,]);
        return rows[0] ?? null;
    } 
    finally 
    {
        if(conn) conn.release();
    }
}

await findAllStudents();
await findStudentById(2);

export async function findAllCours() {
    let conn;
    try 
    {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM cours");
        return rows ?? null;
    } 
    finally 
    {
        if(conn) conn.release();
    }
}

export async function findCoursById(id) {
    let conn;
    try 
    {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM cours WHERE cours_Id =?", [id,]);
        return rows[0] ?? null;
    } 
    finally 
    {
        if(conn) conn.release();
    }
}

await findCoursById(1);

pool.end();