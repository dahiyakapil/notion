document.getElementById("load").addEventListener("click", async () => {
  const output = document.getElementById("output");

  try {
    // Call your Vercel serverless function instead of Notion directly
    const res = await fetch("/api/notion");
    const data = await res.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = "Error: " + err.message;
  }
});
