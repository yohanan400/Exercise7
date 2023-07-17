const { pool } = require('./connectionDB');

//// CREATE ////

async function addCluster({categoty, cluster_name, supervisor_user}) {
    const result = await pool.query("INSERT INTO clusters (categoty, cluster_name, supervisor_user) VALUES (?, ?, ?)",
        [categoty, cluster_name, supervisor_user]
    );

    return result[0].insertid;
}

//// READ ////

async function getClustersByCategory({category}) {
    const result = await pool.query("SELECT * FROM clusters WHERE category = ?", 
        [category]
    );

    return result[0];
}

async function getClusterById({id}) {
    const result = await pool.query("SELECT * FROM clusters WHERE Id = ?", 
        [id]
    );

    return result[0];
}

async function getClusters() {
    const result = await pool.query("SELECT * FROM clusters");

    return result[0];
}

async function getLimmitedClusters({limit, offset = 0}) {
    const result = await pool.query("SELECT * FROM clusters LIMIT = ? OFFSET = ?", [limit, offset]);

    return result[0];
}

//// UPDATE ////

async function updateClusterById({id, categoty, cluster_name, supervisor_user}) {
    const oldDetails = await getClusterById(id);

    const {categoty, cluster_name, supervisor_user, username, id} = {...oldDetails, ... newDetails};

    const result = await pool.query("UPDATE clusters SET categoty = ?, cluster_name = ?, supervisor_user = ?, username = ? WHERE Id = ? ",
        [categoty, cluster_name, supervisor_user, username, id]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////

async function deleteClusterById({id}) {
    const result = await pool.query("UPDATE clusters SET isDelete = 1 WHERE Id = ?",
        [id]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    addCluster,
    getClustersByCategory,
    getClusterById,
    getClusters,
    getLimmitedClusters,
    updateClusterById,
    deleteClusterById    
}