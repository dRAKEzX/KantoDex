const pokedex = document.getElementById('pokedex');
const searchInput = document.getElementById('search');
const filterType = document.getElementById('filter-type');
let allPokemon = [];

const fetchPokemon = async () => {
  for (let i = 1; i <= 151; i++) {
    const url = \`https://pokeapi.co/api/v2/pokemon/\${i}\`;
    const res = await fetch(url);
    const data = await res.json();
    allPokemon.push(data);
  }
  populateTypes();
  displayPokemon(allPokemon);
};

const displayPokemon = (pokemonList) => {
  pokedex.innerHTML = '';
  pokemonList.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('pokemon');

    const name = pokemon.name;
    const id = pokemon.id.toString().padStart(3, '0');
    const img = pokemon.sprites.front_default;
    const types = pokemon.types.map(t => t.type.name);

    card.innerHTML = \`
      <div class="number">#\${id}</div>
      <img src="\${img}" alt="\${name}"/>
      <div class="name">\${name}</div>
      <div class="types">
        \${types.map(type => \`<span class="type">\${type}</span>\`).join('')}
      </div>
    \`;

    pokedex.appendChild(card);
  });
};

const populateTypes = () => {
  const allTypes = new Set();
  allPokemon.forEach(p => p.types.forEach(t => allTypes.add(t.type.name)));
  allTypes.forEach(type => {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    filterType.appendChild(opt);
  });
};

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allPokemon.filter(p => p.name.includes(query));
  displayPokemon(filtered);
});

filterType.addEventListener('change', () => {
  const type = filterType.value;
  const filtered = type === "" ? allPokemon : allPokemon.filter(p => p.types.some(t => t.type.name === type));
  displayPokemon(filtered);
});

fetchPokemon();