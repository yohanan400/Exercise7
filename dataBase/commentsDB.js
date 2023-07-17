const { pool } = require('./connectionDB');

//// CREATE ////

async function addComment({postId, title, body, username}) {
    const result = await pool.query("INSERT INTO comments (postId, title, body, username) VALUES (?, ?, ?, ?)",
        [postId, title, body, username]
    );

    return result[0].insertid;
}

//// READ ////

async function getComments() {
    const result = await pool.query("SELECT * FROM comments");

    return result[0];
}

async function getCommentById({id}) {
    const result = await pool.query("SELECT * FROM comments WHERE Id = ?", [id]);

    return result[0];
}

async function getLimmitedComments({limit, offset = 0}) {
    const result = await pool.query("SELECT * FROM comments LIMIT = ? OFFSET = ?", [limit, offset]);

    return result[0];
}

async function getCommentsByUsername({username}) {
    const result = await pool.query("SELECT * FROM comments WHERE username = ? AND isDelete = 0", [username]);

    return result[0];
}

//// UPDATE ////
// Teoreticlly support. Logicly not for use.
async function updateCommentById({id, postId, title, body, username}) {
    
    const oldDetails = await getCommentById(id);
    const {postId, title, body, username, id} = {...oldDetails, ... newDetails};

    const result = await pool.query("UPDATE comments SET postId = ?, title = ?, body = ?, username = ? WHERE Id = ? ",
        [postId, title, body, username, id]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////

async function deleteCommentById({id}) {
    const result = await pool.query("UPDATE comments SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    addComment,
    getComments,
    getLimmitedComments,
    getCommentById,
    getCommentsByUsername,
    updateCommentById,
    deleteCommentById
}