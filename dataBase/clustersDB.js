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
    const result = await pool.query("SELECT * FROM clusters WHERE category = ? AND isDeleted = 0", 
        [category]
    );

    return result[0];
}

async function getClusterById({id}) {
    const result = await pool.query("SELECT * FROM clusters WHERE Id = ?  AND isDeleted = 0", 
        [id]
    );

    return result[0];
}

async function getClusters() {
    const result = await pool.query("SELECT * FROM clusters WHERE isDeleted = 0");

    return result[0];
}

async function getLimmitedClusters({limit, offset = 0}) {
    const result = await pool.query("SELECT * FROM clusters WHERE isDeleted = 0 LIMIT = ? OFFSET = ?", [limit, offset]);

    return result[0];
}

//// UPDATE ////

async function updateClusterById(newDetails) {
    const oldDetails = await getClusterById(newDetails.id);

    const {categoty, cluster_name, supervisor_user, username, id} = {...oldDetails, ...newDetails};

    const result = await pool.query("UPDATE clusters SET categoty = ?, cluster_name = ?, supervisor_user = ?, username = ? WHERE Id = ? ",
        [categoty, cluster_name, supervisor_user, username, id]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////

async function deleteClusterById({id}) {
    const result = await pool.query("UPDATE clusters SET isDeleted = 1 WHERE Id = ?",
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