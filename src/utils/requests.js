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
        // Lendo o JSON e transformando em objeto para manipulá-lo
        const pokemonsData = await readFile('pokemonsUrl.json', "utf-8");
        const pokemonsDataObj = JSON.parse(pokemonsData);

        // Map para percorrer todo o objeto e tirar informações necessárias
        const pokeList = pokemonsDataObj.map(async (pokeLink) => {
            let url = pokeLink.url;
            
            // Url específico de cada pokemon e transformando os dados em objeto
            const response = await fetch(url);
            const result = await response.json();

            // Pegando os stats do pokemon
            const pokemonStats = result.stats.map((res) => {
                return {
                    status: res.stat.name,
                    value: res.base_stat
                }
            });

            const pokemonMoves = [];

            // Pegando 4 moves aleatórios do pokemon
            while (pokemonMoves.length < 4) {
                let indice = Math.floor(Math.random() * result.moves.length);

                if (!pokemonMoves.includes(result.moves[indice])) {
                    pokemonMoves.push(result.moves[indice].move.name);
                }
            }

            // Retornando os dados de cada pokemon
            const pokeData = {
                name: result.forms[0].name,
                type: result.types,
                status: pokemonStats,
                dex: result.id,
                height: result.height,
                weight: result.weight,
                moves: pokemonMoves
            }
            return pokeData;
        });

        const pokedexSorted = await Promise.all(pokeList);
        // Colocando os pokemons em ordem crescente
        pokedexSorted.sort((a, b) => {
            return a.dex - b.dex;
        })
        writeFile('pokedexSorted.json', JSON.stringify(pokedexSorted, null, 2));
    }
}

export default new pokemon();