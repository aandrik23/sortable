import { heroesData, sortColumn, sortDirection } from './state.js';

function getValue(hero, column) {
	switch (column) {
		case "name":
			return hero.name;
		case "fullName":
			return hero.biography?.fullName;
		case "powerstats":
			// Not sortable — return average power
			const stats = hero.powerstats || {};
			const values = Object.values(stats).filter(val => !isNaN(val));
			return values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
		case "race":
			return hero.appearance?.race;
		case "gender":
			return hero.appearance?.gender;
		case "height":
			return parseNumber(hero.appearance?.height?.[1]);
		case "weight":
			return parseNumber(hero.appearance?.weight?.[1]);
		case "placeOfBirth":
			return hero.biography?.placeOfBirth;
		case "alignment":
			return hero.biography?.alignment;
		default:
			return null;
	}
}

function parseNumber(str) {
	if (!str) return null;
	const num = parseFloat(str.replace(/[^\d.]/g, ""));
	return isNaN(num) ? null : num;
}

export function sortHeroes() {
	heroesData.sort((a, b) => {
		const valA = getValue(a, sortColumn);
		const valB = getValue(b, sortColumn);

		// Handle missing values: always go to the bottom
		if (valA == null && valB == null) return 0;
		if (valA == null) return 1;
		if (valB == null) return -1;

		// Numeric sort if both are numbers
		if (typeof valA === "number" && typeof valB === "number") {
			return (valA - valB) * sortDirection;
		}

		// Otherwise, string compare
		return valA.toString().localeCompare(valB.toString()) * sortDirection;
	});
}

