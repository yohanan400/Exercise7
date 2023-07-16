const { pool } = require('./connectionDB');

//// CREATE ////

async function addRole({role_title}) {
    const result = await pool.query("INSERT INTO roles (role_title) VALUES (?)",
        [role_title]
    );

    return result[0].insertid;
}

//// READ ////

async function getRoleById({id}) {
    const result = await pool.query("SELECT * FROM roles Where id = ?", 
    [id]
    );

    return result[0];
}

async function getRoles() {
    const result = await pool.query("SELECT * FROM roles");

    return result[0];
}

async function getLimmitedRoles({limit, offset = 0}) {
    const result = await pool.query("SELECT * FROM roles LIMIT = ? OFFSET = ?", [limit, offset]);

    return result[0];
}

//// UPDATE ////

async function updateRoleById({role_title, id}) {
    const result = await pool.query("UPDATE roles SET role_title = ? WHERE Id = ? ",
        [role_title, id]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////

async function deleteCategory({id}) {
    const result = await pool.query("UPDATE roles SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    addRole,
    getRoleById,
    getRoles,
    getLimmitedRoles,
    updateRoleById,
    deleteCategory
}