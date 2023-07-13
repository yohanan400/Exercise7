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
function addUser(newUser) {
    const result = pool.query("INSERT INTO users (fullname, username, password, email) VALUES (?, ?, ?, ?)",
        [fullname, username, password, email]
    );

        return result.insertid;
}

//// READ ////

function getUserByUsername(username) {
    const result = pool.query("SELECT * FROM users WHERE username = ? AND isDelete = false",
        [username]
    );

    const [rows] = result;
    return rows;
}

// for username or password recovery
function getUserByEmail(email) {
    const result = pool.query("SELECT * FROM users WHERE email = ? AND isDelete = false",
        [email]
    );

    const [rows] = result;
    return rows;
}

function getUsers() {
    const result = pool.query("SELECT * FROM users  WHERE isDelete = false");

    const [rows] = result;
    return rows;
}

//// UPDATE ////

// export function updateUserPassword(username, password) {
//     const result = pool.query("UPDATE users SET password = ? WHERE username = ? ",
//         [password, username]
//     );

//     return result.affectedRows > 0
// }

// export function updateUserEmail(username, email) {
//     const result = pool.query("UPDATE users SET email = ? WHERE username = ? ",
//         [email, username]
//     );

//     return result.affectedRows > 0
// }

// export function updateUserFullname(username, fullname) {
//     const result = pool.query("UPDATE users SET full_name = ? WHERE username = ? ",
//         [fullname, username]
//     );

//     return result.affectedRows > 0
// }

// export function updateUserProfileImage(username, imageUrl) {
//     const result = pool.query("UPDATE users SET profile_image_url = ? WHERE username = ? ",
//         [imageUrl, username]
//     );

//     return result.affectedRows > 0
// }

// export function updateUserAccesLevel(username, accessLevel) {
//     const result = pool.query("UPDATE users SET access_level_id = ? WHERE username = ? ",
//         [accessLevel, username]
//     );

//     return result.affectedRows > 0
// }

// export function updateUserRullId(username, ruleId) {
//     const result = pool.query("UPDATE users SET rule_id = ? WHERE username = ? ",
//         [ruleId, username]
//     );

//     return result.affectedRows > 0
// }

function updateUser(newUserDetailes) {

    const oldUserDetailes = getUserByUsername(newUserDetailes.username);

    const {fullname, password, email , username} = {...oldUserDetailes, ...newUserDetailes};
    

    const result = pool.query("UPDATE users SET fullname = ?, password = ?, email = ? WHERE username = ? ",
        [fullname, password, email, username]
    );

    return result.affectedRows > 0
}

//// DELETE ////

function deleteUserByUsername(username) {
    const result = pool.query("UPDATE users SET isDelete = 1 WHERE username = ?",
        [username]
    );

    return result.affectedRows > 0
}

module.exports = {
    addUser,
    getUserByUsername,
    getUserByEmail,
    getUsers,
    updateUser,
    deleteUserByUsername
}