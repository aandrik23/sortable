export let heroesData = [];
export let originalData = [];
export let currentPage = 1;
export let pageSize = 20;
export let sortColumn = "name";
export let sortDirection = 1; // 1 for ASC, -1 for DESC

export function setHeroesData(data) {
	heroesData = data;
}

export function setOriginalData(data) {
	originalData = data;
}

export function setCurrentPage(page) {
	currentPage = page;
}

export function setPageSize(size) {
	pageSize = size;
}

export function setSort(column) {
	if (sortColumn === column) {
		sortDirection *= -1;
	} else {
		sortColumn = column;
		sortDirection = 1;
	}
}
