const { pool } = require('./connectionDB');

//// CREATE ////

function addRole({role_title}) {
    const result = pool.query("INSERT INTO roles (role_title) VALUES (?)",
        [role_title]
    );

    return result.insertid;
}

//// READ ////

function getRoleById({id}) {
    const result = pool.query("SELECT * FROM roles Where id = ?", 
    [id]
    );

    const [rows] = result;
    return rows;
}

function getRoles() {
    const result = pool.query("SELECT * FROM roles");

    const [rows] = result;
    return rows;
}

//// UPDATE ////

function updateRoleById({role_title, id}) {
    const result = pool.query("UPDATE roles SET role_title = ? WHERE Id = ? ",
        [role_title, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

function deleteCategory({id}) {
    const result = pool.query("UPDATE roles SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}

module.exports = {
    addRole,
    getRoleById,
    getRoles,
    updateRoleById,
    deleteCategory
}