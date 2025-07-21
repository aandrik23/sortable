import { heroesData, currentPage, pageSize } from './state.js';
import { showHeroDetails } from './details.js';


const tableBody = document.querySelector("#heroTable tbody");

export function renderTable() {
	tableBody.innerHTML = "";

	const start = (currentPage - 1) * pageSize;
	const end = Math.min(start + pageSize, heroesData.length);
	const currentHeroes = heroesData.slice(start, end);

	for (const hero of currentHeroes) {
		const row = document.createElement("tr");

		const powerStats = Object.entries(hero.powerstats || {})
			.map(([key, val]) => `${key}: ${val}`)
			.join("<br>");

		row.innerHTML = `
      <td><img src="${hero.images?.xs}" alt="${hero.name}"/></td>
      <td>${hero.name}</td>
      <td>${hero.biography?.fullName || "—"}</td>
      <td>${powerStats}</td>
      <td>${hero.appearance?.race || "—"}</td>
      <td>${hero.appearance?.gender || "—"}</td>
      <td>${(hero.appearance?.height || []).join(", ")}</td>
      <td>${(hero.appearance?.weight || []).join(", ")}</td>
      <td>${hero.biography?.placeOfBirth || "—"}</td>
      <td>${hero.biography?.alignment || "—"}</td>
    `;

	const img = new Image();
	img.src = hero.images.lg; // preloads the big image in cache


		tableBody.appendChild(row);
	}

	
	document.querySelectorAll("#heroTable tbody tr").forEach((row, index) => {
		row.addEventListener("click", () => {
			const hero = currentHeroes[index]; // use current page's heroes
			showHeroDetails(hero);
		});
	});
}


