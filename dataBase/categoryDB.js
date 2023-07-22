const { pool } = require('./connectionDB');

//// CREATE ////

async function addCategory({category_name}) {
    const result = await pool.query("INSERT INTO category (category_name) VALUES (?)",
        [category_name]
    );

    return result[0].insertid;
}

//// READ ////

async function getCategoryById({id}) {
    const result = await pool.query("SELECT * FROM category WHERE id = ? AND isDeleted = 0", 
    [parseInt(id)]
    );

    return result[0];
}

async function getCategories() {
    const result = await pool.query("SELECT * FROM category WHERE isDeleted = 0");

    return result[0];
}

async function getLimmitedCategories({limit, offset = 0}) {
    const result = await pool.query("SELECT * FROM categories WHERE isDeleted = 0 LIMIT ? OFFSET ?",
     [parseInt(limit), parseInt(offset)]);

    return result[0];
}

//// UPDATE ////

async function updateCategoryById({category_name, id}) {
    const result = await pool.query("UPDATE category SET category_name = ? WHERE Id = ? ",
        [category_name, parseInt(id)]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////

async function deleteCategory({id}) {
    const result = await pool.query("UPDATE category SET isDeleted = 1 WHERE Id = ?",
        [parseInt(id)]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    addCategory,
    getCategoryById,
    getCategories,
    getLimmitedCategories,
    updateCategoryById,
    deleteCategory
}