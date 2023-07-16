const { pool } = require('./connectionDB');

//// CREATE ////

function addCluster({categoty, cluster_name, supervisor_user}) {
    const result = pool.query("INSERT INTO clusters (categoty, cluster_name, supervisor_user) VALUES (?, ?, ?)",
        [categoty, cluster_name, supervisor_user]
    );

    return result[0].insertid;
}

//// READ ////

function getClustersByCategory({category}) {
    const result = pool.query("SELECT * FROM clusters WHERE category = ?", 
        [category]
    );

    return result[0];
}

function getClusterByUsername({username}) {
    const result = pool.query("SELECT * FROM clusters WHERE username = ?", 
        [username]
    );

    return result[0];
}

async function getClusters() {
    const result = await pool.query("SELECT * FROM clusters");

    return result[0];
}

function getLimmitedClusters({limit, offset = 0}) {
    const result = pool.query("SELECT * FROM clusters LIMIT = ? OFFSET = ?", [limit, offset]);

    return result[0];
}

//// UPDATE ////

function updateClusterById({id, categoty, cluster_name, supervisor_user}) {
    const result = pool.query("UPDATE clusters SET categoty = ?, cluster_name = ?, supervisor_user = ?, username = ? WHERE Id = ? ",
        [categoty, cluster_name, supervisor_user, username, id]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////

function deleteClusterById({id}) {
    const result = pool.query("UPDATE clusters SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result[0].affectedRows > 0
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