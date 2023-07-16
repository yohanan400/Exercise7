const { pool } = require('./connectionDB');

//// CREATE ////

async function addAccessLevel({accessType}) {
    const result = await pool.query("INSERT INTO access_level (access_type) VALUES (?)",
        [accessType]
    );

    return result[0].insertid;
}

//// READ ////

async function getAllAccessLevels() {
    const result = await pool.query("SELECT * FROM access_level");

    return result[0];
}

//// UPDATE ////

async function updateAccessLevelById({access_type, id}) {
    const result = await pool.query("UPDATE access_level SET access_type = ? WHERE Id = ? ",
        [access_type, id]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////

async function deleteAccessLevel({id}) {
    const result = await pool.query("UPDATE access_level SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    addAccessLevel,
    getAllAccessLevels,
    updateAccessLevelById,
    deleteAccessLevel
}