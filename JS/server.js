import {writeFile, readFile} from 'fs/promises'

class pokemon {

    async getApi() {
        try {
            const pokeApi = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
                .then( res => {
                    return res.json()
                });
            const pokemonsJson = await writeFile('pokemons.json', JSON.stringify(pokeApi, null, 2))
            
        } catch (error) {
            console.log('erro')
        }
    }

    async getPokemon(nomePokemon) {
        try {
            const pokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
                .then( res => {
                    return res.json()
                });
                const pokemonListJson = await writeFile('pokemonList.json', JSON.stringify(pokemonList, null, 2))
        } catch (error) {
            
        }
    }
}

export default new pokemon();