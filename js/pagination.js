import { heroesData, currentPage, pageSize, setCurrentPage } from './state.js';
import { renderTable } from './renderTable.js';

const pagination = document.getElementById("pagination");

export function renderPagination() {
	pagination.innerHTML = "";

	const totalPages = Math.ceil(heroesData.length / pageSize);
	if (pageSize === heroesData.length) return;

	for (let i = 1; i <= totalPages; i++) {
		const btn = document.createElement("button");
		btn.textContent = i;
		if (i === currentPage) btn.classList.add("active");

		btn.addEventListener("click", () => {
			setCurrentPage(i);
			renderTable();
			renderPagination();
		});

		pagination.appendChild(btn);
	}
}
