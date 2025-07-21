import { heroesData, sortColumn, sortDirection, setHeroesData } from './state.js';

export function sortHeroes() {
	if (!sortColumn) return;

	const sorted = [...heroesData].sort((a, b) => {
		let valA = getValue(a, sortColumn);
		let valB = getValue(b, sortColumn);

		const isMissingA = valA === null || valA === undefined || valA === "" || valA === "-";
		const isMissingB = valB === null || valB === undefined || valB === "" || valB === "-";

		// Always move missing values to the bottom
		if (isMissingA && !isMissingB) return 1;
		if (!isMissingA && isMissingB) return -1;
		if (isMissingA && isMissingB) return 0;

		// Try numeric sort if values are like "180 cm" or "78 kg"
		const numA = extractNumber(valA);
		const numB = extractNumber(valB);

		if (!isNaN(numA) && !isNaN(numB)) {
			return (numA - numB) * sortDirection;
		}

		// Fallback to string comparison
		return valA.toString().localeCompare(valB.toString()) * sortDirection;
	});

	setHeroesData(sorted);
}


function getValue(hero, column) {
	switch (column) {
		case "Name": return hero.name;
		case "Full Name": return hero.biography.fullName;
		case "Race": return hero.appearance.race;
		case "Gender": return hero.appearance.gender;
		case "Height": return hero.appearance.height?.[1];
		case "Weight": return hero.appearance.weight?.[1];
		case "Place of Birth": return hero.biography.placeOfBirth;
		case "Alignment": return hero.biography.alignment;
		default: return "";
	}
}

function extractNumber(value) {
	const match = typeof value === "string" && value.match(/[\d.]+/);
	return match ? parseFloat(match[0]) : NaN;
}






