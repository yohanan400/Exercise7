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
export function addUser(newUser) {
    const result = pool.query("INSERT INTO users (fullname, username, password, email) VALUES (?, ?, ?, ?)",
        [fullname, username, password, email]
    );

    return result.insertid;
}

//// READ ////

export function getUserByUsername(username) {
    const result = pool.query("SELECT * DROM users WHERE username = ?",
        [username]
    );

    const [rows] = result;
    return rows;
}

// for username or password recovery
export function getUserByEmail(email) {
    const result = pool.query("SELECT * DROM users WHERE email = ?",
        [email]
    );

    const [rows] = result;
    return rows;
}

export function getAllUsers() {
    const result = pool.query("SELECT * FROM users");

    const [rows] = result;
    return rows;
}

//// UPDATE ////

export function updateUserPassword(username, password) {
    const result = pool.query("UPDATE users SET password = ? WHERE username = ? ",
        [password, username]
    );

    return result.affectedRows > 0
}

export function updateUserEmail(username, email) {
    const result = pool.query("UPDATE users SET email = ? WHERE username = ? ",
        [email, username]
    );

    return result.affectedRows > 0
}

export function updateUserFullname(username, fullname) {
    const result = pool.query("UPDATE users SET full_name = ? WHERE username = ? ",
        [fullname, username]
    );

    return result.affectedRows > 0
}

export function updateUserProfileImage(username, imageUrl) {
    const result = pool.query("UPDATE users SET profile_image_url = ? WHERE username = ? ",
        [imageUrl, username]
    );

    return result.affectedRows > 0
}

export function updateUserAccesLevel(username, accessLevel) {
    const result = pool.query("UPDATE users SET access_level_id = ? WHERE username = ? ",
        [accessLevel, username]
    );

    return result.affectedRows > 0
}

export function updateUserRullId(username, ruleId) {
    const result = pool.query("UPDATE users SET rule_id = ? WHERE username = ? ",
        [ruleId, username]
    );

    return result.affectedRows > 0
}

export function updateUser({ fullname, username, password, email }) {
    const result = pool.query("UPDATE users SET fullname = ?, password = ?, email = ? WHERE username = ? ",
        [fullname, password, email, username]
    );

    return result.affectedRows > 0
}

//// DELETE ////

export function deleteUserBYUsername(username) {
    const result = pool.query("UPDATE users SET isDelete = 1 WHERE username = ?",
        [username]
    );

    return result.affectedRows > 0
}