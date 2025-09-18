export default async function handler(req, res) {
  if (!process.env.NOTION_API_TOKEN || !process.env.NOTION_DATABASE_ID) {
    return res.status(500).json({
      error: "Notion API token or database ID is not set.",
    });
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NOTION_API_TOKEN}`,
          "Notion-Version": process.env.NOTION_VERSION || "2022-06-28", // Ensure Notion-Version is always defined
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
