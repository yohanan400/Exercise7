const { pool } = require('./connectionDB');

//// CREATE ////

async function addVideo({Id, username, category, path}) {
    const result = await pool.query("INSERT INTO videos (Id, username, category, path) VALUES (?, ?, ?, ?)",
        [Id, username, category, path]
    );

    return result[0].insertid;
}

//// READ ////

async function getVideoByUsername({username}) {
    const result = await pool.query("SELECT * FROM videos WHERE username = ?", [username]);

    return result[0];
}

async function getVideoByCategory({category}) {
    const result = await pool.query("SELECT * FROM videos WHERE category = ?", [category]);

    return result[0];
}

async function getVideos() {
    const result = await pool.query("SELECT * FROM videos");

    return result[0];
}

async function getLimmitedVideos({limit, offset = 0}) {
    const result = await pool.query("SELECT * FROM videos LIMIT = ? OFFSET = ?", [limit, offset]);

    return result[0];
}

//// UPDATE ////
// Teoreticlly support. Logicly not for use.
async function updateVideoById({id, username, category, path}) {
    const result = await pool.query("UPDATE posts SET category = ?, path = ?, username = ? WHERE Id = ? ",
        [category, username, path, id]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////

async function deleteVideoById({id}) {
    const result = await pool.query("UPDATE videos SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    addVideo,
    getVideoByUsername,
    getVideoByCategory,
    getVideos,
    getLimmitedVideos,
    updateVideoById,
    deleteVideoById
}