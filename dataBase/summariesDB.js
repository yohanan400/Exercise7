const pool = require('./connectionDB');

//// CREATE ////

function addSummary({ category, title, username, path }) {

    const result = pool.query(` INSERT INTO summaries (category, title, username, path)
                                values (?, ?, ?, ?)`,
        [category, title, username, path]
    );

    return result.insertid;
}

//// READ ////
function getSummaryById({ id }) {
    const result = pool.query("SELECT * FROM summaries WHERE id = ?",
        [id]
    );

    const [rows] = result;
    return rows;
}

function getSummaryByCategory({ category }) {
    const result = pool.query("SELECT * FROM summaries WHERE category = ?",
        [category]
    );

    const [rows] = result;
    return rows;
}

function getSummaryByUsername({ username }) {
    const result = pool.query("SELECT * FROM summaries WHERE username = ?",
        [username]
    );

    const [rows] = result;
    return rows;
}

function getSummaries() {
    const result = pool.query("SELECT * FROM summaries");

    const [rows] = result;
    return rows;
}

function getLimmitedSummaries(limit, offset = 0) {
    const result = pool.query("SELECT * FROM summaries LIMIT = ? OFFSET = ?", [limit, offset]);

    const [rows] = result;
    return rows;
}

//// UPDATE ////
function updateSummaryById({ title, path, category, username, id }) {
    const result = pool.query(`UPDATE roles SET title = ?, path = ?, category = ?, username = ? 
                                WHERE Id = ? `,
        [title, path, category, username, id]
    );

    return result.affectedRows > 0
}


//// DELETE ////
function deleteSummary({ id }) {
    const result = pool.query("UPDATE summaries SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}

module.exports = {
    addSummary,
    getSummaryById,
    getSummaryByCategory,
    getSummaryByUsername,
    getSummaries,
    getLimmitedSummaries,
    updateSummaryById,
    deleteSummary
};