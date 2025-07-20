const loadData = (heroes) => {
	const container = document.getElementById("heroes-container");
	container.innerHTML = ""; // Clear loading message

	heroes.forEach((hero) => {
		const card = document.createElement("div");
		card.className = "hero-card";

		card.innerHTML = `
      <img src="${hero.images.sm}" alt="${hero.name}">
      <h2>${hero.name}</h2>
      <p><strong>Full Name:</strong> ${hero.biography.fullName || "Unknown"}</p>
      <p><strong>Publisher:</strong> ${hero.biography.publisher || "N/A"}</p>
      <p><strong>Alignment:</strong> ${hero.biography.alignment}</p>
    `;

		container.appendChild(card);
	});
};

fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
	.then((response) => response.json())
	.then(loadData)
	.catch((error) => {
		console.error("Failed to load hero data:", error);
		document.getElementById("heroes-container").innerText =
			"Failed to load heroes.";
	});
