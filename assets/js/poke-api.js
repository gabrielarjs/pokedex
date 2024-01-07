
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokemonDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetail.order
    pokemon.name = pokemonDetail.name

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [mainType] = types

    pokemon.mainType = mainType
    pokemon.types = types

    pokemon.image = pokemonDetail.sprites.other.dream_world.front_default

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))  
        .then((pokemonsDetails) => pokemonsDetails);
}