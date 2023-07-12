const { pool } = require('./connectionDB');

//// CREATE ////

function addPost({Id, title, body, username}) {
    const result = pool.query("INSERT INTO posts (Id, title, body, username) VALUES (?, ?, ?, ?)",
        [Id, title, body, username]
    );

    return result.insertid;
}

//// READ ////

function getPosts() {
    const result = pool.query("SELECT * FROM posts");

    const [rows] = result;
    return rows;
}

//// UPDATE ////
// Teoreticlly support. Logicly not for use.
function updatePostById({id, title, body, username}) {
    const result = pool.query("UPDATE posts SET title = ?, body = ?, username = ? WHERE Id = ? ",
        [title, body, username, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

function deletePostById({id}) {
    const result = pool.query("UPDATE posts SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}

module.exports = {
    addPost,
    getPosts,
    updatePostById,
    deletePostById
}