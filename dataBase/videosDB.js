const { pool } = require('./connectionDB');

//// CREATE ////

async function addVideo({Id, username, category, path}) {
    const result = await pool.query("INSERT INTO videos (Id, username, category, path) VALUES (?, ?, ?, ?)",
        [parseInt(Id), username, category, path]
    );

    return result[0].insertid;
}

//// READ ////

async function getVideoByUsername({username}) {
    const result = await pool.query("SELECT * FROM videos WHERE username = ? AND isDeleted = 0", [username]);

    return result[0];
}

async function getVideoByCategory({category}) {
    const result = await pool.query("SELECT * FROM videos WHERE category = ? AND isDeleted = 0", [category]);

    return result[0];
}

async function getVideoById({id}) {
    const result = await pool.query("SELECT * FROM videos WHERE Id = ? AND isDeleted = 0",
     [parseInt(id)]);

    return result[0];
}

async function getVideos() {
    const result = await pool.query("SELECT * FROM videos WHERE isDeleted = 0");

    return result[0];
}

async function getLimmitedVideos({limit, offset = 0}) {
    const result = await pool.query("SELECT * FROM videos WHERE isDeleted = 0 LIMIT ? OFFSET ?",
     [parseInt(limit), parseInt(offset)]);

    return result[0];
}

//// UPDATE ////
// Teoreticlly support. Logicly not for use.
async function updateVideoById(newDetails) {

    const oldDetails = await getVideoById(newDetails.articleId);
    const {category, username, path, id} = {...oldDetails, ...newDetails};
   
    const result = await pool.query("UPDATE posts SET category = ?, path = ?, username = ? WHERE Id = ? ",
        [category, username, path, id]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////

async function deleteVideoById({id}) {
    const result = await pool.query("UPDATE videos SET isDeleted = 1 WHERE Id = ?",
        [parseInt(id)]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    addVideo,
    getVideoByUsername,
    getVideoByCategory,
    getVideoById,
    getVideos,
    getLimmitedVideos,
    updateVideoById,
    deleteVideoById
}