import Message from "../models/message.js";
import db from "../db/db.js";
import { validationResult } from "express-validator";

function new_message_get(req, res) {
  res.render("new-message-form", { title: "New Message" });
}

async function new_message_post(req, res, next) {
  const { title, content } = req.body;
  const user_id = req.user.id;
  const newMessage = new Message(title, content, user_id);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("new-message-form", {
      errors: errors.array(),
      title: "New Message",
    });
  }

  try {
    await db.insertMessage(newMessage);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

async function edit_message_get(req, res, next) {
  const id = req.params.id;
  const message = await db.getMessageById(id);
  res.render("edit-message-form", { title: "Edit Message", message: message });
}

async function edit_message_post(req, res, next) {
  const id = req.params.id;
  const newMessage = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("edit-message-form", {
      errors: errors.array(),
      title: "New Message",
    });
  }

  try {
    await db.updateMessage(newMessage, id);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

async function delete_message_post(req, res, next) {
  const id = req.params.id;
  console.log(id);

  try {
    await db.deleteMessageById(id);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

export default {
  new_message_get,
  new_message_post,
  edit_message_get,
  edit_message_post,
  delete_message_post,
};
