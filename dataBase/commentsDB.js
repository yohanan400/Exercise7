const { pool } = require('./connectionDB');

//// CREATE ////
async function addComment({postId, title, body, username}) {
    const result = await pool.query("INSERT INTO comments (postId, title, body, username) VALUES (?, ?, ?, ?)",
        [parseInt(postId), title, body, username]
    );

    return result[0].insertId;
}

//// READ ////
async function getComments() {
    const result = await pool.query("SELECT * FROM comments WHERE isDeleted = 0");

    return result[0];
}

async function getCommentById({id}) {
    const result = await pool.query("SELECT * FROM comments WHERE Id = ? AND isDeleted = 0",
     [parseInt(id)]);

    return result[0];
}

async function getCommentByPostId({postId}) {
    const result = await pool.query("SELECT * FROM comments WHERE postId = ? AND isDeleted = 0",
     [parseInt(postId)]);

    return result[0];
}

async function getLimmitedCommentsByPostId(postId, limit, offset = 0) {
    const result = await pool.query("SELECT * FROM comments WHERE postId = ? AND isDeleted = 0 LIMIT ? OFFSET ?",
     [parseInt(postId), parseInt(limit), parseInt(offset)]);
    
    return result[0];
}

async function getLimmitedComments({limit, offset = 0}) {
    const result = await pool.query("SELECT * FROM comments WHERE isDeleted = 0 LIMIT ? OFFSET ?",
     [parseInt(limit), parseInt(offset)]);

    return result[0];
}

async function getCommentsByUsername({username}) {
    const result = await pool.query("SELECT * FROM comments WHERE username = ? AND isDeleted = 0", [username]);

    return result[0];
}

//// UPDATE ////
// Teoreticlly support. Logicly not for use.
async function updateCommentById(newDetails) {
    
    const oldDetails = await getCommentById(id);
    const {postId, title, body, username, id} = {...oldDetails, ...newDetails};

    const result = await pool.query("UPDATE comments SET postId = ?, title = ?, body = ?, username = ? WHERE Id = ? ",
        [postId, title, body, username, id]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////
async function deleteCommentById({id}) {
    const result = await pool.query("UPDATE comments SET isDeleted = 1 WHERE Id = ?",
        [parseInt(id)]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    addComment,
    getComments,
    getLimmitedComments,
    getCommentById,
    getCommentByPostId,
    getLimmitedCommentsByPostId,
    getCommentsByUsername,
    updateCommentById,
    deleteCommentById
}