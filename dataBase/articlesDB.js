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
    const result = await pool.query("SELECT * FROM articles WHERE title = ? AND isDelete = false", 
        [title]
    );

    return result[0];
}

async function getArticleById({id}) {
    const result = await pool.query("SELECT * FROM articles WHERE Id = ? AND isDelete = false", 
        [id]
    );

    return result[0];
}

async function getArticlesByCategory({category}) {
    const result = await pool.query("SELECT * FROM articles WHERE category = ? AND isDelete = false", 
        [category]
    );

    return result[0];
}

async function getArticlesByUsername({username}) {
    const result = await pool.query("SELECT * FROM articles WHERE username = ? AND isDelete = false", 
        [username]
    );

    return result[0];
}

async function getArticles() {
    const result = await pool.query("SELECT * FROM articles AND isDelete = false");

    return result[0];
}

async function getLimmitedArticles({limit, offset = 0}) {
    const result = await pool.query("SELECT * FROM articles LIMIT = ? OFFSET = ?", [limit, offset]);

    return result[0];
}

//// UPDATE ////

async function updateArticleById(newDetails) {

    const oldDetails = await getArticleById(newDetails.articleId);

    const {categoty, title, body, username, id} = {...oldDetails, ... newDetails};


    const result = await await pool.query("UPDATE articles SET categoty = ?, title = ?, body = ?, username = ? WHERE Id = ? ",
        [categoty, title, body, username, id]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////

async function deleteArticleById({articleId}) {
    const result = await pool.query("UPDATE articles SET isDelete = 1 WHERE Id = ?",
        [articleId]
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