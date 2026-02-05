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

export async function addStudent(numCarte, nom, prenom, mail, annees, telephone, adresse1, adresse2, postal, ville, niveau, tuteurId) {
    const conn = await pool.getConnection();
    try 
    {
        await conn.beginTransaction();
        await conn.query("INSERT INTO etudiant (etudiant_num_carte_identite, etudiant_nom, etudiant_prenom, etudiant_email, etudiant_annees_experience, etudiant_telephone, etudiant_adresse_ligne_1, etudiant_adresse_ligne_2, etudiant_code_postal, etudiant_ville, etudiant_niveau_etudes, tuteur_Id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[numCarte, nom, prenom, mail, annees, telephone, adresse1, adresse2, postal, ville, niveau, tuteurId],);
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

export async function updateStudent(mail, annees, telephone, adresse1, adresse2, postal, ville, niveau, id) {
    const conn = await pool.getConnection();
    try 
    {
        await conn.beginTransaction();
        await conn.query("UPDATE etudiant SET etudiant_email = ?, etudiant_annees_experience = ?, etudiant_telephone = ?, etudiant_adresse_ligne_1 = ?, etudiant_adresse_ligne_2 = ?, etudiant_code_postal = ?, etudiant_ville = ?, etudiant_niveau_etudes = ? WHERE etudiant_Id = ?",[mail, annees, telephone, adresse1, adresse2, postal, ville, niveau, id],);
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

//await findAllStudents();
//await findStudentById(2);
//await addStudent("CI-29007", "Humfryes", "Matt", "matt.humfryes@civelampus.com", 4, "0600000088", "9 rue Omega", null, 18282, "City", "Bac+3", 3);
await updateStudent("matt.humfryes@civelampus.fr", 5, "0600000088", "9 rue Omega", null, 18282, "Town", "Bac+5", 10)

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

//await findCoursById(1);
//await findAllCours();
//await addCours(13, "GIT", 60, 14, 6, "11111111111111", 3);
//await updateCours(14, "Java", 65, 16, 11);

pool.end();