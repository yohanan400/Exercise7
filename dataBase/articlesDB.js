const { pool } = require('./connectionDB');

//// CREATE ////

async function addArticle({categoty, title, body, username}) {
    const result = await pool.query("INSERT INTO articles (categoty, title, body, username) VALUES (?, ?, ?, ?)",
        [categoty, title, body, username]
    );

    return result[0].insertid;
}

//// READ ////

async function getArticleByTitle({title}) {
    const result = await pool.query("SELECT * FROM articles WHERE title = ? AND isDeleted = 0", 
        [title]
    );

    return result[0];
}

async function getArticleById({id}) {
    const result = await pool.query("SELECT * FROM articles WHERE Id = ? AND isDeleted = 0", 
        [id]
    );

    return result[0];
}

async function getArticlesByCategory({category}) {
    const result = await pool.query("SELECT * FROM articles WHERE category = ? AND isDeleted = 0", 
        [category]
    );

    return result[0];
}

async function getArticlesByUsername({username}) {
    const result = await pool.query("SELECT * FROM articles WHERE username = ? AND isDeleted = 0", 
        [username]
    );

    return result[0];
}

async function getArticles() {
    const result = await pool.query("SELECT * FROM articles WHERE isDeleted = 0");

    return result[0];
}

async function getLimmitedArticles({limit, offset = 0}) {
    const result = await pool.query("SELECT * FROM articles WHERE isDeleted = 0 LIMIT = ? OFFSET = ?", [limit, offset]);

    return result[0];
}

//// UPDATE ////

async function updateArticleById(newDetails) {

    const oldDetails = await getArticleById(newDetails.id);
    const {categoty, title, body, username, id} = {...oldDetails, ... newDetails};

    const result = await pool.query("UPDATE articles SET categoty = ?, title = ?, body = ?, username = ? WHERE Id = ? ",
        [categoty, title, body, username, id]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////

async function deleteArticleById({id}) {
    const result = await pool.query("UPDATE articles SET isDeleted = 1 WHERE Id = ?",
        [id]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    addArticle,
    getArticleByTitle,
    getArticleById,
    getArticlesByCategory,
    getArticlesByUsername,
    getArticles,
    getLimmitedArticles,
    updateArticleById,
    deleteArticleById
}