const { pool } = require('./connectionDB');

//// CREATE ////

function addAccessLevel(accessType) {
    const result = pool.query("INSERT INTO access_level (access_type) VALUES (?)",
        [accessType]
    );

    return result.insertid;
}

//// READ ////

function getAllAccessLevels() {
    const result = pool.query("SELECT * FROM access_level");

    const [rows] = result;
    return rows;
}

//// UPDATE ////

function updateAccessLevelById(access_type, id) {
    const result = pool.query("UPDATE access_level SET access_type = ? WHERE Id = ? ",
        [access_type, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

function deleteAccessLevel(id) {
    const result = pool.query("UPDATE access_level SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}

module.exports = {
    addAccessLevel,
    getAllAccessLevels,
    updateAccessLevelById,
    deleteAccessLevel
}