export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NOTION_API_TOKEN}`,
          "Notion-Version": "2022-06-28", // Updated to a valid past date
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Add an empty body for POST request
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
