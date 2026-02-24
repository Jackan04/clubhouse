import db from "../db/db.js";

async function user_get(req, res, next) {
  try {
    const users = await db.getAllUsers();
    res.render("users", { title: "Users", users: users });
  } catch (error) {
    next(error);
  }
}

async function user_edit_get(req, res, next) {
  try {
    const userId = req.params.id;
    const user = await db.getUserById(userId);
    res.render("edit-user-form", { title: "Edit User", user: user });
  } catch (error) {
    next(error);
  }
}

async function user_edit_post(req, res, next) {
  try {
    const id = req.params.id;
    const updatedUser = req.body;

    await db.updateUser(updatedUser, id);
    res.redirect("/users");
  } catch (error) {
    next(error);
  }
}

async function user_delete_post(req, res, next) {
  try {
    const id = req.params.id;
    await db.deleteUserById(id);
    res.redirect("/users");
  } catch (error) {
    next(error);
  }
}

export default { user_get, user_edit_get, user_edit_post, user_delete_post };
