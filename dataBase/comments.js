const { pool } = require('./connectionDB');

//// CREATE ////

export function addComment({postId, title, body, username}) {
    const result = pool.query("INSERT INTO comments (postId, title, body, username) VALUES (?, ?, ?, ?)",
        [postId, title, body, username]
    );

    return result.insertid;
}

//// READ ////

export function getComments() {
    const result = pool.query("SELECT * FROM comments");

    const [rows] = result;
    return rows;
}

//// UPDATE ////
// Teoreticlly support. Logicly not for use.
export function updateCommentById({id, postId, title, body, username}) {
    const result = pool.query("UPDATE comments SET postId = ?, title = ?, body = ?, username = ? WHERE Id = ? ",
        [postId, title, body, username, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

export function deleteCommentById({id}) {
    const result = pool.query("UPDATE comments SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}