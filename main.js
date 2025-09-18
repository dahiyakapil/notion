document.getElementById("load").addEventListener("click", async () => {
  const articlesContainer = document.getElementById("articles-container");
  articlesContainer.innerHTML = ''; // Clear previous content

  try {
    const res = await fetch("/api/notion");
    const data = await res.json();

    if (data.results && Array.isArray(data.results)) {
      data.results.forEach(article => {
        const card = document.createElement('div');
        card.style.border = '1px solid #e0e0e0';
        card.style.borderRadius = '8px';
        card.style.padding = '20px';
        card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        card.style.backgroundColor = '#fff';

        const title = document.createElement('h3');
        title.textContent = article.properties.Name.title[0].plain_text;
        card.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.properties.Description.rich_text[0].plain_text;
        card.appendChild(description);

        if (article.properties.Image && article.properties.Image.files && article.properties.Image.files.length > 0) {
          const image = document.createElement('img');
          image.src = article.properties.Image.files[0].file.url;
          image.style.width = '100%'; // Basic styling for the image
          image.style.height = 'auto';
          image.style.borderRadius = '4px';
          image.style.marginBottom = '10px';
          card.prepend(image); // Add image before title
        }

        articlesContainer.appendChild(card);
      });
    } else {
      articlesContainer.textContent = "Error: Invalid data structure received from Notion API.";
    }

  } catch (err) {
    articlesContainer.textContent = "Error: " + err.message;
  }
});
