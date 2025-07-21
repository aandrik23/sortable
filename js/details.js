export function showHeroDetails(hero) {
  const modal = document.getElementById("heroModal");
  const content = document.getElementById("modalContent");

  const stats = Object.entries(hero.powerstats || {})
    .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
    .join("");

  content.innerHTML = `
  <span id="modalClose" class="close">&times;</span>
  <div class="hero-card">
    <h2>${hero.name}</h2>
    <img src="${hero.images?.lg}" alt="${hero.name}" class="hero-large" onload="this.style.opacity='1'" />

    <div class="hero-details-section">
      <h4>Biography</h4>
      <p><span class="label">Full Name:</span> ${hero.biography.fullName || '-'}</p>
      <p><span class="label">Race:</span> ${hero.appearance.race || '-'}</p>
      <p><span class="label">Gender:</span> ${hero.appearance.gender || '-'}</p>
      <p><span class="label">Height:</span> ${hero.appearance.height?.[1] || '-'}</p>
      <p><span class="label">Weight:</span> ${hero.appearance.weight?.[1] || '-'}</p>
      <p><span class="label">Place of Birth:</span> ${hero.biography.placeOfBirth || '-'}</p>
      <p><span class="label">Alignment:</span> ${hero.biography.alignment || '-'}</p>
      <p><span class="label">Publisher:</span> ${hero.biography.publisher || '-'}</p>
      <p><span class="label">Occupation:</span> ${hero.work.occupation || '-'}</p>
    </div>

    <div class="hero-details-section">
      <h4>Powerstats</h4>
      <ul>
        <li>🧠 Intelligence: ${hero.powerstats.intelligence}</li>
        <li>💪 Strength: ${hero.powerstats.strength}</li>
        <li>⚡ Speed: ${hero.powerstats.speed}</li>
        <li>🛡️ Durability: ${hero.powerstats.durability}</li>
        <li>🔋 Power: ${hero.powerstats.power}</li>
        <li>⚔️ Combat: ${hero.powerstats.combat}</li>
      </ul>
    </div>
  </div>
`;



  modal.classList.remove("hidden");

  document.getElementById("modalClose").onclick = () => {
    modal.classList.add("hidden");
  };
}
