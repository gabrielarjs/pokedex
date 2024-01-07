const lista = document.querySelector(".pokemons");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 10;
let offset = 0;

const maxRecords = 151;

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
    const qtdePokemons = offset + limit;

    if(qtdePokemons >= maxRecords){
        const newLimit = maxRecords - offset;
        renderPokemons(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
    else{
        renderPokemons(offset, limit);
    }
    
});


