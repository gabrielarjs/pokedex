function convertPokemonTypesToLi(pokemonTypes){
    return pokemonTypes.map((type) => `<li class="type">${type.type.name}</li>`);
}

function pokemonToHtml(pokemon){
    return `
    <li class="pokemon">
        <span class="number">${pokemon.order}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${convertPokemonTypesToLi(pokemon.types).join("")}
            </ol>
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
        </div> 
    </li>`;
}

const lista = document.querySelector(".pokemons");

pokeApi.getPokemons(0, 10).then((pokemons = []) => {
    lista.innerHTML += pokemons.map(pokemonToHtml).join("");
})


 