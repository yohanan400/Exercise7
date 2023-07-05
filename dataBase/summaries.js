const pool = require('./connectionDB');

//// CREATE ////

export function addSummary({category, title, _username}){
    const result = pool.query(` INSERT INTO summaries (category, title, _username)
                                values (?, ?, ?, ?)`,
                                [category, title, _username]
    );

    return result.insertid;
}

//// READ ////
export function getSummaryById({id}) {
    const result = pool.query("SELECT * FROM summaries WHERE id = ?", 
    [id]
    );

    const [rows] = result;
    return rows;
}

export function getSummaryByCategory({category}) {
    const result = pool.query("SELECT * FROM summaries WHERE category = ?", 
    [category]
    );

    const [rows] = result;
    return rows;
}

export function getSummaryByUsername({_username}) {
    const result = pool.query("SELECT * FROM summaries WHERE _username = ?", 
    [_username]
    );

    const [rows] = result;
    return rows;
}

export function getSummaries() {
    const result = pool.query("SELECT * FROM summaries");

    const [rows] = result;
    return rows;
}

//// UPDATE ////
export function updateSummaryById({title, path, category, _username, id}) {
    const result = pool.query(`UPDATE roles SET title = ?, path = ?, category = ?, _username = ? 
                                WHERE Id = ? `,
        [title, path, category, _username, id]
    );

    return result.affectedRows > 0
}


//// DELETE ////
export function deleteCategory({id}) {
    const result = pool.query("UPDATE summaries SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}
