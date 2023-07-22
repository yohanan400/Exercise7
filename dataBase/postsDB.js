const { pool } = require('./connectionDB');

//// CREATE ////

async function addPost({Id, title, body, username}) {
    const result = await pool.query("INSERT INTO posts (Id, title, body, username) VALUES (?, ?, ?, ?)",
        [parseInt(Id), title, body, username]
    );

    return result[0].insertid;
}

//// READ ////

async function getPosts() {
    const result = await pool.query("SELECT * FROM posts WHERE isDeleted = 0");

    return result[0];
}

async function getLimmitedPosts({limit, offset = 0}) {
    const result = await pool.query("SELECT * FROM posts WHERE isDeleted = 0 LIMIT ? OFFSET ?",
     [parseInt(limit), parseInt(offset)]);

    return result[0];
}

async function getPostById({id}) {
    const result = await pool.query("SELECT * FROM posts WHERE id = ? AND isDeleted = 0",
        [parseInt(id)]
    );

    return result[0];
}

async function getPostsByUsername({username}) {
    const result = await pool.query("SELECT * FROM posts WHERE username = ? AND isDeleted = 0",
        [username]
    );

    return result[0];
}

async function getPostsByCategory({category}) {
    const result = await pool.query("SELECT * FROM posts WHERE category = ? AND isDeleted = 0",
        [category]
    );

    return result[0];
}


//// UPDATE ////
// Teoreticlly support. Logicly not for use.
async function updatePostById(newDetails) {

    const oldDetails = await getPostById(id);
    const {title, body, username, id} = {...oldDetails, ...newDetails};

    const result = await pool.query("UPDATE posts SET title = ?, body = ?, username = ? WHERE Id = ? ",
        [title, body, username, id]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////

async function deletePostById({id}) {
    const result = await pool.query("UPDATE posts SET isDeleted = 1 WHERE Id = ?",
        [parseInt(id)]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    addPost,
    getPosts,
    getLimmitedPosts,
    getPostById,
    getPostsByUsername,
    getPostsByCategory,
    updatePostById,
    deletePostById
}