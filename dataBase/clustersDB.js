const { pool } = require('./connectionDB');

//// CREATE ////

export function addCluster({categoty, cluster_name, supervisor_user}) {
    const result = pool.query("INSERT INTO clusters (categoty, cluster_name, supervisor_user) VALUES (?, ?, ?)",
        [categoty, cluster_name, supervisor_user]
    );

    return result.insertid;
}

//// READ ////

export function getClustersByCategory({category}) {
    const result = pool.query("SELECT * FROM clusters WHERE category = ?", 
        [category]
    );

    const [rows] = result;
    return rows;
}

export function getClusterByUsername({username}) {
    const result = pool.query("SELECT * FROM clusters WHERE username = ?", 
        [username]
    );

    const [rows] = result;
    return rows;
}

export function getClusters() {
    const result = pool.query("SELECT * FROM clusters");

    const [rows] = result;
    return rows;
}

//// UPDATE ////

export function updateClusterById({id, categoty, cluster_name, supervisor_user}) {
    const result = pool.query("UPDATE clusters SET categoty = ?, cluster_name = ?, supervisor_user = ?, username = ? WHERE Id = ? ",
        [categoty, cluster_name, supervisor_user, username, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

export function deleteClusterById({id}) {
    const result = pool.query("UPDATE clusters SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}