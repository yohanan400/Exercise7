const { pool } = require('./connectionDB');

//// CREATE ////

export function addArticle({categoty, title, body, username}) {
    const result = pool.query("INSERT INTO articles (categoty, title, body, username) VALUES (?, ?, ?, ?)",
        [categoty, title, body, username]
    );

    return result.insertid;
}

//// READ ////

export function getArticleByTitle({title}) {
    const result = pool.query("SELECT * FROM articles WHERE title = ? AND isDelete = false", 
        [title]
    );

    const [rows] = result;
    return rows;
}

export function getArticleById({id}) {
    const result = pool.query("SELECT * FROM articles WHERE Id = ? AND isDelete = false", 
        [id]
    );

    const [rows] = result;
    return rows;
}

export function getArticlesByCategory({category}) {
    const result = pool.query("SELECT * FROM articles WHERE category = ? AND isDelete = false", 
        [category]
    );

    const [rows] = result;
    return rows;
}

export function getArticlesByUsername({username}) {
    const result = pool.query("SELECT * FROM articles WHERE username = ? AND isDelete = false", 
        [username]
    );

    const [rows] = result;
    return rows;
}

export function getArticles() {
    const result = pool.query("SELECT * FROM articles AND isDelete = false");

    const [rows] = result;
    return rows;
}

//// UPDATE ////

export async function updateArticleById(newDetails) {

    const oldDetails = await getArticleById(newDetails.articleId);

    const {categoty, title, body, username, id} = {...oldDetails, ... newDetails};


    const result = await pool.query("UPDATE articles SET categoty = ?, title = ?, body = ?, username = ? WHERE Id = ? ",
        [categoty, title, body, username, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

export function deleteArticleById({articleId}) {
    const result = pool.query("UPDATE articles SET isDelete = 1 WHERE Id = ?",
        [articleId]
    );

    return result.affectedRows > 0
}