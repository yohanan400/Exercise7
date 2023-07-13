const { pool } = require('./connectionDB');

//// CREATE ////

function addCategory({category_name}) {
    const result = pool.query("INSERT INTO category (category_name) VALUES (?)",
        [category_name]
    );

    return result.insertid;
}

//// READ ////

function getCategoryById({id}) {
    const result = pool.query("SELECT * FROM category Where id = ?", 
    [id]
    );

    const [rows] = result;
    return rows;
}

function getCategories() {
    const result = pool.query("SELECT * FROM category");

    const [rows] = result;
    return rows;
}

function getLimmitedCategories(limit, offset = 0) {
    const result = pool.query("SELECT * FROM categories LIMIT = ? OFFSET = ?", [limit, offset]);

    const [rows] = result;
    return rows;
}

//// UPDATE ////

function updateCategoryById({category_name, id}) {
    const result = pool.query("UPDATE category SET category_name = ? WHERE Id = ? ",
        [category_name, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

function deleteCategory({id}) {
    const result = pool.query("UPDATE category SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}

module.exports = {
    addCategory,
    getCategoryById,
    getCategories,
    getLimmitedCategories,
    updateCategoryById,
    deleteCategory
}