import pool from "./pool.js";
import bcrypt from "bcrypt";

class Database {
  async getUserById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];
    return user;
  }

  async getUserByUsername(username) {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );

    const user = rows[0];
    return user;
  }

  async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }

  async insertUser(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await pool.query(
      "INSERT INTO users (firstname, lastname, username, password, admin) VALUES($1, $2, $3, $4, $5)",
      [
        user.firstname,
        user.lastname,
        user.username,
        hashedPassword,
        user.admin,
      ],
    );
  }

  async updateUser(user, id) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await pool.query(
      "UPDATE users SET firstname=$1, lastname=$2, username=$3, password=$4, admin=$5 WHERE id=$6",
      [
        user.firstname,
        user.lastname,
        user.username,
        hashedPassword,
        user.admin,
        id,
      ],
    );
  }

  async deleteUserById(id) {
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
  }

  async getAllMessages() {
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY timestamp DESC",
    );
    return result.rows;
  }

  async getMessageById(id) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
      id,
    ]);

    const user = rows[0];
    return user;
  }

  async insertMessage(message) {
    const { rows } = await pool.query(
      "INSERT INTO messages (title, content, user_id) VALUES($1, $2, $3)",
      [message.title, message.content, message.user_id],
    );

    return rows[0];
  }

  async updateMessage(message, id) {
    await pool.query("UPDATE messages SET title=$1, content=$2 WHERE id=$3", [
      message.title,
      message.content,
      id,
    ]);
  }

  async deleteMessageById(id) {
    await pool.query("DELETE FROM messages WHERE id=$1", [id]);
  }
}

export default new Database();
