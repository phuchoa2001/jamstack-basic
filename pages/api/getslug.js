import { removeVietnameseFromString } from "../../utils/stringUtils"; // Import function to remove Vietnamese accents

export default function handler(req, res) {
  const { title } = req.query; // Get the "title" parameter from the URL query

  // Check if the "title" parameter is provided
  if (title) {
    const id = Math.floor(Math.random() * 90000000000000000000 + 10000000000000000000); // Generate a random 20-digit ID
    const newTitle = removeVietnameseFromString(title);

    res.status(200).json({ url: `${newTitle}id=${id}` });
  } else {
    res.status(400).json({ error: 'Title parameter is missing' });
  }
}
