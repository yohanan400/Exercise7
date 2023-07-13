const { pool } = require('./connectionDB');

//// CREATE ////

function addComment({postId, title, body, username}) {
    const result = pool.query("INSERT INTO comments (postId, title, body, username) VALUES (?, ?, ?, ?)",
        [postId, title, body, username]
    );

    return result.insertid;
}

//// READ ////

function getComments() {
    const result = pool.query("SELECT * FROM comments");

    const [rows] = result;
    return rows;
}

function getLimmitedComments(limit, offset = 0) {
    const result = pool.query("SELECT * FROM comments LIMIT = ? OFFSET = ?", [limit, offset]);

    const [rows] = result;
    return rows;
}

//// UPDATE ////
// Teoreticlly support. Logicly not for use.
function updateCommentById({id, postId, title, body, username}) {
    const result = pool.query("UPDATE comments SET postId = ?, title = ?, body = ?, username = ? WHERE Id = ? ",
        [postId, title, body, username, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

function deleteCommentById({id}) {
    const result = pool.query("UPDATE comments SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}

module.exports = {
    addComment,
    getComments,
    getLimmitedComments,
    updateCommentById,
    deleteCommentById
}