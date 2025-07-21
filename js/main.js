import { setPageSize, setCurrentPage, setSort } from './state.js';
import { renderTable } from './renderTable.js';
import { renderPagination } from './pagination.js';
import { loadHeroesData } from './fetch.js';
import { originalData } from './state.js';
import { sortHeroes } from './sort.js';
import { setupSearch } from './search.js';
import { setHeroesData } from './state.js';


function parseNumber(str) {
	if (!str || typeof str !== "string") return null;
	const cleaned = str.replace(/[^\d.]/g, "");
	const num = parseFloat(cleaned);
	return isNaN(num) ? null : num;
  }

  function applyFilters() {
	const race = document.getElementById("filterRace").value;
	const gender = document.getElementById("filterGender").value;
	const alignment = document.getElementById("filterAlignment").value;
  
	const minHeight = parseInt(document.getElementById("filterMinHeight").value);
	const maxHeight = parseInt(document.getElementById("filterMaxHeight").value);
	const minWeight = parseInt(document.getElementById("filterMinWeight").value);
	const maxWeight = parseInt(document.getElementById("filterMaxWeight").value);
  
	const filtered = originalData.filter(hero => {
	  // RACE
	  if (race && hero.appearance?.race !== race) return false;
  
	  // GENDER
	  if (gender && hero.appearance?.gender !== gender) return false;
  
	  // ALIGNMENT
	  if (alignment && hero.biography?.alignment !== alignment) return false;
  
	  // HEIGHT
	  const heightCm = parseNumber(hero.appearance?.height?.[1]);
	  if (heightCm === null || heightCm < minHeight || heightCm > maxHeight) return false;
  
	  // WEIGHT
	  const weightKg = parseNumber(hero.appearance?.weight?.[1]);
	  if (weightKg === null || weightKg < minWeight || weightKg > maxWeight) return false;
  
	  return true;
	});
  
	setHeroesData(filtered);
	setCurrentPage(1);
	renderTable();
	renderPagination();
  }
  
export function populateRaceDropdown() {
	const raceSelect = document.getElementById("filterRace");
	const races = new Set();

	for (const hero of originalData) {
		if (hero.appearance?.race && hero.appearance.race.trim() !== "-") {
			races.add(hero.appearance.race);
		}
	}

	Array.from(races).sort().forEach(race => {
		const opt = document.createElement("option");
		opt.value = race;
		opt.textContent = race;
		raceSelect.appendChild(opt);
	});

}


const pageSizeSelector = document.getElementById("pageSize");

pageSizeSelector.addEventListener("change", () => {
	const value = pageSizeSelector.value;
	const size = value === "all" ? Number.MAX_SAFE_INTEGER : parseInt(value);
	setPageSize(size);
	setCurrentPage(1);
	renderTable();
	renderPagination();
});

loadHeroesData().then(() => {
	populateRaceDropdown();
  });
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


const openBtn = document.getElementById("openFilters");
const closeBtn = document.getElementById("closeFilters");
const modal = document.getElementById("filterModal");

openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

const minHeightSlider = document.getElementById("filterMinHeight");
const maxHeightSlider = document.getElementById("filterMaxHeight");
const heightMinLabel = document.getElementById("heightMinValue");
const heightMaxLabel = document.getElementById("heightMaxValue");

const minWeightSlider = document.getElementById("filterMinWeight");
const maxWeightSlider = document.getElementById("filterMaxWeight");
const weightMinLabel = document.getElementById("weightMinValue");
const weightMaxLabel = document.getElementById("weightMaxValue");

minHeightSlider.addEventListener("input", () => {
  if (parseInt(minHeightSlider.value) > parseInt(maxHeightSlider.value)) {
    maxHeightSlider.value = minHeightSlider.value;
    heightMaxLabel.textContent = maxHeightSlider.value;
  }
  heightMinLabel.textContent = minHeightSlider.value;
});

maxHeightSlider.addEventListener("input", () => {
  if (parseInt(maxHeightSlider.value) < parseInt(minHeightSlider.value)) {
    minHeightSlider.value = maxHeightSlider.value;
    heightMinLabel.textContent = minHeightSlider.value;
  }
  heightMaxLabel.textContent = maxHeightSlider.value;
});

minWeightSlider.addEventListener("input", () => {
  if (parseInt(minWeightSlider.value) > parseInt(maxWeightSlider.value)) {
    maxWeightSlider.value = minWeightSlider.value;
    weightMaxLabel.textContent = maxWeightSlider.value;
  }
  weightMinLabel.textContent = minWeightSlider.value;
});

maxWeightSlider.addEventListener("input", () => {
  if (parseInt(maxWeightSlider.value) < parseInt(minWeightSlider.value)) {
    minWeightSlider.value = maxWeightSlider.value;
    weightMinLabel.textContent = minWeightSlider.value;
  }
  weightMaxLabel.textContent = maxWeightSlider.value;
});

const applyBtn = document.getElementById("applyFilters");
applyBtn.addEventListener("click", () => {
  applyFilters();
  modal.classList.add("hidden"); 
});

