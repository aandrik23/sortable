import { setPageSize, setCurrentPage, setSort } from './state.js';
import { renderTable } from './renderTable.js';
import { renderPagination } from './pagination.js';
import { loadHeroesData } from './fetch.js';
import { sortHeroes } from './sort.js';
import { setupSearch } from './search.js';

const pageSizeSelector = document.getElementById("pageSize");

pageSizeSelector.addEventListener("change", () => {
	const value = pageSizeSelector.value;
	const size = value === "all" ? Number.MAX_SAFE_INTEGER : parseInt(value);
	setPageSize(size);
	setCurrentPage(1);
	renderTable();
	renderPagination();
});

loadHeroesData();
setupSearch(); // ← You forgot this one!

const columns = [
	"Icon", "name", "fullName", "powerstats", "race", "gender",
	"height", "weight", "placeOfBirth", "alignment"
];

const headers = document.querySelectorAll("th");
headers.forEach((th, index) => {
	const columnKey = columns[index];
	if (columnKey === "Icon") return; // Skip image sort

	th.addEventListener("click", () => {
		setSort(columnKey);
		sortHeroes();
		renderTable();
		renderPagination();
	});
});
