import { setHeroesData, setOriginalData } from './state.js';
import { renderTable } from './renderTable.js';
import { renderPagination } from './pagination.js';
import { sortHeroes } from './sort.js';



export function loadHeroesData() {
	return fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
		.then(response => response.json())
		.then(data => {
			setOriginalData(data);
			setHeroesData(data);
			sortHeroes();
			renderTable();
			renderPagination();
			return data;
		})
		.catch(err => {
			document.body.innerHTML = `<h2 style="color:red;">Error loading data: ${err}</h2>`;
		});
}