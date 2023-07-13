const { pool } = require('./connectionDB');

//// CREATE ////

function addVideo({Id, username, category, path}) {
    const result = pool.query("INSERT INTO videos (Id, username, category, path) VALUES (?, ?, ?, ?)",
        [Id, username, category, path]
    );

    return result.insertid;
}

//// READ ////

function getVideoByUsername({username}) {
    const result = pool.query("SELECT * FROM videos WHERE username = ?", [username]);

    const [rows] = result;
    return rows;
}

function getVideoByCategory({category}) {
    const result = pool.query("SELECT * FROM videos WHERE category = ?", [category]);

    const [rows] = result;
    return rows;
}

function getVideos() {
    const result = pool.query("SELECT * FROM videos");

    const [rows] = result;
    return rows;
}

function getLimmitedVideos(limit, offset = 0) {
    const result = pool.query("SELECT * FROM videos LIMIT = ? OFFSET = ?", [limit, offset]);

    const [rows] = result;
    return rows;
}

//// UPDATE ////
// Teoreticlly support. Logicly not for use.
function updateVideoById({id, username, category, path}) {
    const result = pool.query("UPDATE posts SET category = ?, path = ?, username = ? WHERE Id = ? ",
        [category, username, path, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

function deleteVideoById({id}) {
    const result = pool.query("UPDATE videos SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
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