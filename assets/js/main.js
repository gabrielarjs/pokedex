const lista = document.querySelector(".pokemons");

const loadMoreButton = document.getElementById("loadMoreButton");

const limit = 5;

let offset = 0;

function renderPokemons(offset, limit){

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(pokemon => `
        <li class="pokemon ${pokemon.mainType}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
    
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                </ol>
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div> 
        </li>`).join("");
        lista.innerHTML += newHtml;
    })
}

renderPokemons(offset, limit);

loadMoreButton.addEventListener("click", () => {
    offset += limit;
    renderPokemons(offset, limit);
});


 