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
    const result = pool.query("SELECT * FROM articles WHERE title = ?", 
        [title]
    );

    const [rows] = result;
    return rows;
}

export function getArticlesByCategory({category}) {
    const result = pool.query("SELECT * FROM articles WHERE category = ?", 
        [category]
    );

    const [rows] = result;
    return rows;
}

export function getArticlesByUsername({username}) {
    const result = pool.query("SELECT * FROM articles WHERE username = ?", 
        [username]
    );

    const [rows] = result;
    return rows;
}

export function getArticles() {
    const result = pool.query("SELECT * FROM articles");

    const [rows] = result;
    return rows;
}

//// UPDATE ////

export function updateArticleById({id, categoty, title, body, username}) {
    const result = pool.query("UPDATE articles SET categoty = ?, title = ?, body = ?, username = ? WHERE Id = ? ",
        [categoty, title, body, username, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

export function deleteArticleById({id}) {
    const result = pool.query("UPDATE articles SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}