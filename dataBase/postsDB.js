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

function getLimmitedPosts(limit, offset = 0) {
    const result = pool.query("SELECT * FROM posts LIMIT = ? OFFSET = ?", [limit, offset]);

    const [rows] = result;
    return rows;
}

function getPostById({id}) {
    const result = pool.query("SELECT * DROM posts WHERE id = ? AND isDelete = false",
        [id]
    );

    const [rows] = result;
    return rows;
}

function getPostsByUsername({username}) {
    const result = pool.query("SELECT * FROM posts WHERE username = ? AND isDelete = false",
        [username]
    );

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
    getLimmitedPosts,
    getPostById,
    getPostsByUsername,
    updatePostById,
    deletePostById
}