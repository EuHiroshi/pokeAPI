import {writeFile, readFile} from 'fs/promises'

class pokemon {

    async getApi() {
        try {
            const pokeApi = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
            const createJson = await writeFile('pokemons.json', JSON.stringify(pokeApi, null, 2))
            console.log('cheguei')
            
        } catch (error) {
            console.log('erro')
        }
    }
}

export default new pokemon();