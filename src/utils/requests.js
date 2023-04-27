import { writeFile, readFile } from 'fs/promises'

class pokemon {
    // Função para pegar o Nome e URLcdos pokemons(1ª geração)
    async getApi() {
        // Consumindo API do PokeAPI
        const pokemonsUrl = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        // Transformando em objeto e depois transcrever para um arquivo JSON
        pokemonsUrl.json().then((result) => {
            writeFile('pokemonsUrl.json', JSON.stringify(result.results, null, 2));
        })
    }

    // Função para pegar informações específicas de cada pokemon
    async getPokemonData() {
        const pokemonsData = await readFile('pokemonsUrl.json', "utf-8");
        const pokemonsDataObj = JSON.parse(pokemonsData);

        const pokeList = pokemonsDataObj.map(async (pokeLink) => {
            let url = pokeLink.url;

            const response = await fetch(url);
            const result = await response.json();

            const pokemonStats = result.stats.map(async (res) => {
                return {
                    status: res.stat.name,
                    value: res.base_stat
                }
            });

            const pokeData = {
                name: result.forms[0].name,
                type: result.types,
                status: pokemonStats,
                dex: result.id,
                height: result.height,
                weight: result.weight
            }
            return pokeData;
        });
        const pokedexSorted = await Promise.all(pokeList);
        pokedexSorted.sort((a, b) => {
            return a.dex - b.dex;
        })
        writeFile('pokedexSorted.json', JSON.stringify(pokedexSorted, null, 2));
    }
}

// const pokemonMoves = [];

// while(pokemonMoves.length < 4){
//     let indice = Math.floor(Math.random() * pokemon.moves.length);

//     if(!pokemonMoves.includes(pokemon.moves[indice].move.name)){
//         pokemonMoves.push(pokemon.moves[indice].move.name);
//     }
// }

export default new pokemon();