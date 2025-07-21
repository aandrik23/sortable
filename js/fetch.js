import { setHeroesData, setOriginalData } from './state.js';
import { renderTable } from './renderTable.js';
import { renderPagination } from './pagination.js';
import { sortHeroes } from './sort.js';


export function loadHeroesData() {
	fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
		.then(response => response.json())
		.then(data => {
			setOriginalData(data);  // store full list
			setHeroesData(data);    // current working list
			sortHeroes();
			renderTable();
			renderPagination();
		})
		.catch(err => {
			document.body.innerHTML = `<h2 style="color:red;">Error loading data: ${err}</h2>`;
		});
}
