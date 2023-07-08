const { pool } = require('./connectionDB');

//// CREATE ////

export function addRole({role_title}) {
    const result = pool.query("INSERT INTO roles (role_title) VALUES (?)",
        [role_title]
    );

    return result.insertid;
}

//// READ ////

export function getRoleById({id}) {
    const result = pool.query("SELECT * FROM roles Where id = ?", 
    [id]
    );

    const [rows] = result;
    return rows;
}

export function getRoles() {
    const result = pool.query("SELECT * FROM roles");

    const [rows] = result;
    return rows;
}

//// UPDATE ////

export function updateRoleById({role_title, id}) {
    const result = pool.query("UPDATE roles SET role_title = ? WHERE Id = ? ",
        [role_title, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

export function deleteCategory({id}) {
    const result = pool.query("UPDATE roles SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}