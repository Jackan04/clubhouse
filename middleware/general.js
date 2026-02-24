import { format } from "date-fns";
import db from "../db/db.js";

async function formatMessages(messages) {
  const users = await db.getAllUsers();
  return messages.map((message) => {
    return {
      ...message,
      timestamp: format(new Date(message.timestamp), "yyyy-MM-dd"),
      user: users.find((user) => user.id === message.user_id),
    };
  });
}

export { formatMessages };
