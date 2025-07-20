export let heroesData = [];
export let currentPage = 1;
export let pageSize = 20;

export function setHeroesData(data) {
	heroesData = data;
}

export function setCurrentPage(page) {
	currentPage = page;
}

export function setPageSize(size) {
	pageSize = size;
}
