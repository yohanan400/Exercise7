const pool = require('./connectionDB');

//// CREATE ////

async function addSummary({ category, title, username, path }) {

    const result = await pool.query(` INSERT INTO summaries (category, title, username, path)
                                values (?, ?, ?, ?)`,
        [category, title, username, path]
    );

    return result[0].insertid;
}

//// READ ////
async function getSummaryById({ id }) {
    const result = await pool.query("SELECT * FROM summaries WHERE id = ?",
        [id]
    );

    return result[0];
}

async function getSummaryByCategory({ category }) {
    const result = await pool.query("SELECT * FROM summaries WHERE category = ?",
        [category]
    );

    return result[0];
}

async function getSummaryByUsername({ username }) {
    const result = await pool.query("SELECT * FROM summaries WHERE username = ?",
        [username]
    );

    return result[0];
}

async function getSummaries() {
    const result = await pool.query("SELECT * FROM summaries");

    return result[0];
}

async function getLimmitedSummaries({limit, offset = 0}) {
    const result = await pool.query("SELECT * FROM summaries LIMIT = ? OFFSET = ?", [limit, offset]);

    return result[0];
}

//// UPDATE ////
async function updateSummaryById({ title, path, category, username, id }) {

    const oldDetails = await getSummaryById(id);
    const {title, path, category, username, id} = {...oldDetails, ... newDetails};
   
    const result = await pool.query(`UPDATE roles SET title = ?, path = ?, category = ?, username = ? 
                                WHERE Id = ? `,
        [title, path, category, username, id]
    );

    return result[0].affectedRows > 0
}


//// DELETE ////
async function deleteSummary({ id }) {
    const result = await pool.query("UPDATE summaries SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result[0].affectedRows > 0
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