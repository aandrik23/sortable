import { heroesData, sortColumn, sortDirection, setHeroesData } from './state.js';

function normalizeHeight(value) {
  if (!value) return NaN;
  const match = value.match(/([\d.]+)\s*(cm|m)/i);
  if (!match) return NaN;

  const number = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  return unit === 'm' ? number * 100 : number;
}

function normalizeWeight(value) {
  if (!value) return NaN;
  const match = value.match(/([\d.]+)\s*(kg|tons|ton)/i);
  if (!match) return NaN;

  const number = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  if (unit === 'tons' || unit === 'ton') return number * 1000;
  return number;
}

export function sortHeroes() {
	if (!sortColumn) return;

	const isNumericCol = col => col === 'Height' || col === 'Weight';

	const sorted = [...heroesData].sort((a, b) => {
		// 1. Raw values
		const rawA = getValue(a, sortColumn);
		const rawB = getValue(b, sortColumn);

		// 2. Normalize to trimmed string
		const valA = rawA ? String(rawA).trim() : '';
		const valB = rawB ? String(rawB).trim() : '';

		// 3. Numeric parse for height/weight
		let numA = NaN, numB = NaN;
		if (isNumericCol(sortColumn)) {
			numA = sortColumn === 'Height' ? normalizeHeight(valA) :
				sortColumn === 'Weight' ? normalizeWeight(valA) :
				NaN;

			numB = sortColumn === 'Height' ? normalizeHeight(valB) :
				sortColumn === 'Weight' ? normalizeWeight(valB) :
				NaN;
		}

		// 4. Missing detection — string columns ONLY push blank strings
		const isMissingA = isNumericCol(sortColumn)
			? isNaN(numA) || numA === 0
			: valA === '' || valA === '-' || valA === '—';

		const isMissingB = isNumericCol(sortColumn)
			? isNaN(numB) || numB === 0
			: valB === '' || valB === '-' || valB === '—';

		// 5. Push missing to bottom
		if (isMissingA && !isMissingB) return 1;
		if (!isMissingA && isMissingB) return -1;
		if (isMissingA && isMissingB) return 0;

		// 6. Numeric compare
		if (isNumericCol(sortColumn)) {
			return (numA - numB) * sortDirection;
		}

		// 7. String compare
		return valA.localeCompare(valB) * sortDirection;
	});

	setHeroesData(sorted);
}

function getValue(hero, column) {
	switch (column) {
		case "Name":           return hero.name;
		case "Full Name":      return hero.biography.fullName;
		case "Race":           return hero.appearance.race;
		case "Gender":         return hero.appearance.gender;
		case "Height":         return hero.appearance.height?.[1];
		case "Weight":         return hero.appearance.weight?.[1];
		case "Place of Birth": return hero.biography.placeOfBirth;
		case "Alignment":      return hero.biography.alignment;
		default:                return '';
	}
}
