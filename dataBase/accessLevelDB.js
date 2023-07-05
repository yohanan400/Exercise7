const { pool } = require('./connectionDB');

//// CREATE ////

export function addAccessLevel(accessType) {
    const result = pool.query("INSERT INTO access_level (access_type) VALUES (?)",
        [accessType]
    );

    return result.insertid;
}

//// READ ////

export function getAllAccessLevels() {
    const result = pool.query("SELECT * FROM access_level");

    const [rows] = result;
    return rows;
}

//// UPDATE ////

export function updateAccessLevelById(access_type, id) {
    const result = pool.query("UPDATE access_level SET access_type = ? WHERE Id = ? ",
        [access_type, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

export function deleteAccessLevel(id) {
    const result = pool.query("UPDATE access_level SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}