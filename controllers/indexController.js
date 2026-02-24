import db from "../db/db.js";
import { formatMessages } from "../middleware/general.js";

async function index_get(req, res, next) {
  try {
    const messages = await db.getAllMessages();

    const formatted = await formatMessages(messages);
    res.render("index", { title: "Messages", messages: formatted });
  } catch (error) {
    next(error);
  }
}

export default { index_get };
