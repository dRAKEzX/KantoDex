const params = new URLSearchParams(window.location.search);
const pokemonId = params.get('id');
const detailsContainer = document.getElementById('pokemon-details');

const fetchPokemonDetails = async () => {
  const url = \`https://pokeapi.co/api/v2/pokemon/\${pokemonId}\`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data);
};

const displayDetails = (pokemon) => {
  const name = pokemon.name;
  const id = pokemon.id.toString().padStart(3, '0');
  const img = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  const types = pokemon.types.map(t => t.type.name);
  const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
  const stats = pokemon.stats;

  const statBars = stats.map(stat => {
    return \`
      <div style="margin-bottom: 0.3rem;">
        <strong>\${stat.stat.name.toUpperCase()}</strong>
        <div style="background:#222; border-radius:4px; overflow:hidden;">
          <div style="width:\${stat.base_stat}%; background:#00fff7; color:#000; padding:0.2rem 0.5rem;">\${stat.base_stat}</div>
        </div>
      </div>
    \`;
  }).join('');

  detailsContainer.innerHTML = \`
    <div class="pokemon">
      <div class="number">#\${id}</div>
      <img src="\${img}" alt="\${name}" style="width:180px; height:180px"/>
      <div class="name">\${name}</div>
      <div class="types">\${types.map(t => \`<span class="type">\${t}</span>\`).join('')}</div>
      <p><strong>Altura:</strong> \${pokemon.height / 10} m</p>
      <p><strong>Peso:</strong> \${pokemon.weight / 10} kg</p>
      <p><strong>Habilidades:</strong> \${abilities}</p>
      <h3>Stats</h3>
      <div>\${statBars}</div>
    </div>
  \`;
};

fetchPokemonDetails();