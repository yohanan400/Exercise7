const { pool } = require('./connectionDB');

//// CREATE ////

/** 
 * @param newUser contain:
 *          full name,
 *          username,
 *          password,
 *          email
 * 
 * @returns userId
 */
async function addUser({fullname, username, password, email}) {
    const result = await pool.query("INSERT INTO users (full_name, username, password, email) VALUES (?, ?, ?, ?)",
        [fullname, username, password, email]
    );

    return result[0].insertId;
}

//// READ ////

async function getUserByUsername({username}) {
    const result = await await pool.query("SELECT * FROM users WHERE username = ? AND isDeleted = 0",
        [username]
    );

    return result[0];
}

// for username or password recovery
async function getUserByEmail({email}) {
    const result = await pool.query("SELECT * FROM users WHERE email = ? AND isDeleted = false",
        [email]
    );

    return result[0];
}

async function getUsers() {
    const result = await pool.query("SELECT * FROM users  WHERE isDeleted = false");

    return result[0];
}

//// UPDATE ////

// export async function updateUserPassword(username, password) {
//     const result = await pool.query("UPDATE users SET password = ? WHERE username = ? ",
//         [password, username]
//     );

//     return result.affectedRows > 0
// }

// export async function updateUserEmail(username, email) {
//     const result = await pool.query("UPDATE users SET email = ? WHERE username = ? ",
//         [email, username]
//     );

//     return result.affectedRows > 0
// }

// export async function updateUserFullname(username, fullname) {
//     const result = await pool.query("UPDATE users SET full_name = ? WHERE username = ? ",
//         [fullname, username]
//     );

//     return result.affectedRows > 0
// }

// export async function updateUserProfileImage(username, imageUrl) {
//     const result = await pool.query("UPDATE users SET profile_image_url = ? WHERE username = ? ",
//         [imageUrl, username]
//     );

//     return result.affectedRows > 0
// }

// export async function updateUserAccesLevel(username, accessLevel) {
//     const result = await pool.query("UPDATE users SET access_level_id = ? WHERE username = ? ",
//         [accessLevel, username]
//     );

//     return result.affectedRows > 0
// }

// export async function updateUserRullId(username, ruleId) {
//     const result = await pool.query("UPDATE users SET rule_id = ? WHERE username = ? ",
//         [ruleId, username]
//     );

//     return result.affectedRows > 0
// }

async function updateUser(newUserDetailes) {

    const oldUserDetailes = getUserByUsername(newUserDetailes.username);

    const {fullname, password, email , username} = {...oldUserDetailes, ...newUserDetailes};
    

    const result = await pool.query("UPDATE users SET full_name = ?, password = ?, email = ? WHERE username = ? ",
        [fullname, password, email, username]
    );

    return result[0].affectedRows > 0
}

//// DELETE ////

async function deleteUserByUsername({username}) {
    const result = await pool.query("UPDATE users SET isDeleted = 1 WHERE username = ?",
        [username]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    addUser,
    getUserByUsername,
    getUserByEmail,
    getUsers,
    updateUser,
    deleteUserByUsername
}