import { setPageSize, setCurrentPage } from './state.js';
import { renderTable } from './renderTable.js';
import { renderPagination } from './pagination.js';
import { loadHeroesData } from './fetch.js';

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
