import { setPageSize, setCurrentPage, setSort, sortDirection } from './state.js';
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
setupSearch(); 

const columns = [
	"Icon", "Name", "Full Name", "powerstats", "Race", "Gender",
	"Height", "Weight", "Place of Birth", "Alignment"
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
		updateSortIndicators(columnKey);
		highlightSortedColumn(index);
	});
});


function updateSortIndicators(activeColumn) {
	headers.forEach((th, i) => {
		const col = columns[i];
		th.classList.remove("sorted-asc", "sorted-desc");

		if (col === activeColumn) {
			th.classList.add(
				sortDirection === 1 ? "sorted-asc" : "sorted-desc"
			);
		}
	});
}

function highlightSortedColumn(activeIndex) {
	const allRows = document.querySelectorAll("#heroTable tbody tr");

	// Remove existing highlights
	document.querySelectorAll("td, th").forEach(el => {
		el.classList.remove("highlighted-column");
	});

	// Add highlight to current header and all cells in the column
	headers[activeIndex].classList.add("highlighted-column");

	allRows.forEach(row => {
		const cell = row.cells[activeIndex];
		if (cell) cell.classList.add("highlighted-column");
	});
}


