const button = document.getElementById("search-btn");

async function fetchData() {
  const input = document.getElementById("search-input").value.toLowerCase();
  const topDiv = document.querySelector(".top-container");
  const types = document.getElementById('types');
  const hp = document.getElementById("hp");
  const attack = document.getElementById("attack");
  const defense = document.getElementById("defense");
  const specialAttack = document.getElementById("special-attack");
  const specialDefense = document.getElementById("special-defense");
  const speed = document.getElementById("speed");

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(`HTTP NOT FOUND: ${response.status}`);
    }
    // Pokémon Stats
    hp.innerText = data.stats[0].base_stat;
    attack.innerText = data.stats[1].base_stat;
    defense.innerText = data.stats[2].base_stat;
    specialAttack.innerText = data.stats[3].base_stat;
    specialDefense.innerText = data.stats[4].base_stat;
    speed.innerText = data.stats[5].base_stat;
    types.innerHTML = data.types
    .map(
      (obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`
    )
    .join("");
    topDiv.innerHTML = `
        <h3 style="font-family:system-ui;">${data.name.toUpperCase()} #${
      data.id
    }</h3>
        <p class="Height">Height: ${data.height}</p>
        <p class="Weight">Weight: ${data.weight}</p>
        <div class="poke-img">
            <img src="${data.sprites.front_default}" alt="${data.name}">
        </div>
        <div id="types">${types.innerHTML}</div>
        `
        ;

  } catch (error) {
    window.alert("Pokémon not found")
    console.error(error);
  }
}

button.addEventListener("click", () => fetchData());
