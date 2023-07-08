const { pool } = require('./connectionDB');

//// CREATE ////

export function addVideo({Id, username, category, path}) {
    const result = pool.query("INSERT INTO videos (Id, username, category, path) VALUES (?, ?, ?, ?)",
        [Id, username, category, path]
    );

    return result.insertid;
}

//// READ ////

export function getVideoByUsername({username}) {
    const result = pool.query("SELECT * FROM videos WHERE username = ?", [username]);

    const [rows] = result;
    return rows;
}

export function getVideoByCategory({category}) {
    const result = pool.query("SELECT * FROM videos WHERE category = ?", [category]);

    const [rows] = result;
    return rows;
}

export function getVideos() {
    const result = pool.query("SELECT * FROM videos");

    const [rows] = result;
    return rows;
}

//// UPDATE ////
// Teoreticlly support. Logicly not for use.
export function updateVideoById({Id, username, category, path}) {
    const result = pool.query("UPDATE posts SET category = ?, path = ?, username = ? WHERE Id = ? ",
        [category, username, path, Id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

export function deleteVideoById({id}) {
    const result = pool.query("UPDATE videos SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}