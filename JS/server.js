import {writeFile, readFile} from 'fs/promises'

class pokemon {

    async getApi() {
        try {
            const pokeApi = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
                .then( res => {
                    return res.json()
                });
            const createJson = await writeFile('pokemons.json', JSON.stringify(pokeApi, null, 2))
            
        } catch (error) {
            console.log('erro')
        }
    }
}

export default new pokemon();