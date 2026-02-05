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

export async function addCours(semaine, thematique, taux, heure, disciplineId, intervenantId, salleId) {
    const conn = await pool.getConnection();
    try 
    {
        await conn.beginTransaction();
        await conn.query("INSERT INTO cours (cours_numero_semaine, cours_thematique, cours_taux_horaire, cours_total_heures_semaine, discipline_Id, intervenant_siret, salle_Id) VALUES (?, ?, ?, ?, ?, ?, ?)",[semaine, thematique, taux, heure, disciplineId, intervenantId, salleId],);
        await conn.commit();
    } 
    catch (err) 
    {
        await conn.rollback();
        throw err;
    } 
    finally 
    {
        conn.release();
    }
}

export async function updateCours(semaine, thematique, taux, heure, id) {
    const conn = await pool.getConnection();
    try 
    {
        await conn.beginTransaction();
        await conn.query("UPDATE cours SET cours_numero_semaine = ?, cours_thematique = ?, cours_taux_horaire = ?, cours_total_heures_semaine = ? WHERE cours_Id = ?",[semaine, thematique, taux, heure, id],);
        await conn.commit();
    } 
    catch (err) 
    {
        await conn.rollback();
        throw err;
    } 
    finally 
    {
        conn.release();
    }
}

await findCoursById(1);
await findAllCours();
await addCours(13, "GIT", 60, 14, 6, "11111111111111", 3);
await updateCours(14, "Java", 65, 16, 11);

pool.end();