import { originalData, setHeroesData } from './state.js';
import { renderTable } from './renderTable.js';
import { renderPagination } from './pagination.js';

export function setupSearch() {
	const searchInput = document.getElementById("search");

    let timeout = null;

    searchInput.addEventListener("input", () => {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		const searchTerm = searchInput.value.toLowerCase();

		const filtered = originalData.filter(hero =>
			hero.name.toLowerCase().includes(searchTerm)
		);

		setHeroesData(filtered);
		renderTable();
		renderPagination();
	}, 150); // delay search by 150ms to reduce CPU usage
});
}