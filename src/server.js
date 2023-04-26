import { writeFile, readFile } from 'fs/promises'

class pokemon {
    // Função para pegar o Nome e URLcdos pokemons(1ª geração)
    async getApi() {
        // Consumindo API do PokeAPI
        const pokemonsUrl = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        // Transformando em objeto e depois transcrever para um arquivo JSON
        pokemonsUrl.json().then((result) => {
            writeFile('pokemonsUrl.json', JSON.stringify(result.results, null, 2))
        })
    }

    /*
    // Função para pegar informações específicas de cada pokemon
    async getPokemonData() {
        const pokeList = pokemonsUrl.map(async (pokeLink) => {
            let url = pokeLink.url;

            const response = await fetch(url);
            const result = await response.json();

            console.log(response)
            console.log(result)

            const pokeData = {
                name: result.forms[0].name,
                dex: result.game_indices[9].game_index,
                version: result.game_indices[9].version.name,
                height: result.height,
                weight: result.weight,
                stats: pokeStats,
                moves: pokeMoves,
            }
            return pokeData;
        });
    }
    */
}

export default new pokemon();