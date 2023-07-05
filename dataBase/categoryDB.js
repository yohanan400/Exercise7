const { pool } = require('./connectionDB');

//// CREATE ////

export function addCategory({category_name}) {
    const result = pool.query("INSERT INTO category (category_name) VALUES (?)",
        [category_name]
    );

    return result.insertid;
}

//// READ ////

export function getCategoryById({id}) {
    const result = pool.query("SELECT * FROM category Where id = ?", 
    [id]
    );

    const [rows] = result;
    return rows;
}

export function getCategories() {
    const result = pool.query("SELECT * FROM category");

    const [rows] = result;
    return rows;
}

//// UPDATE ////

export function updateCategoryById({category_name, id}) {
    const result = pool.query("UPDATE category SET category_name = ? WHERE Id = ? ",
        [category_name, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

export function deleteCategory({id}) {
    const result = pool.query("UPDATE category SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}