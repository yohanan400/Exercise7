const { pool } = require('./connectionDB');

//// CREATE ////

function addCluster({categoty, cluster_name, supervisor_user}) {
    const result = pool.query("INSERT INTO clusters (categoty, cluster_name, supervisor_user) VALUES (?, ?, ?)",
        [categoty, cluster_name, supervisor_user]
    );

    return result.insertid;
}

//// READ ////

function getClustersByCategory({category}) {
    const result = pool.query("SELECT * FROM clusters WHERE category = ?", 
        [category]
    );

    const [rows] = result;
    return rows;
}

function getClusterByUsername({username}) {
    const result = pool.query("SELECT * FROM clusters WHERE username = ?", 
        [username]
    );

    const [rows] = result;
    return rows;
}

function getClusters() {
    const result = pool.query("SELECT * FROM clusters");

    const [rows] = result;
    return rows;
}

function getLimmitedClusters(limit, offset = 0) {
    const result = pool.query("SELECT * FROM clusters LIMIT = ? OFFSET = ?", [limit, offset]);

    const [rows] = result;
    return rows;
}

//// UPDATE ////

function updateClusterById({id, categoty, cluster_name, supervisor_user}) {
    const result = pool.query("UPDATE clusters SET categoty = ?, cluster_name = ?, supervisor_user = ?, username = ? WHERE Id = ? ",
        [categoty, cluster_name, supervisor_user, username, id]
    );

    return result.affectedRows > 0
}

//// DELETE ////

function deleteClusterById({id}) {
    const result = pool.query("UPDATE clusters SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result.affectedRows > 0
}

module.exports = {
    addCluster,
    getClustersByCategory,
    getClusterByUsername,
    getClusters,
    getLimmitedClusters,
    updateClusterById,
    deleteClusterById    
}