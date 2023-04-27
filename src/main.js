import pokemon from './utils/requests.js'

async function main() {
    await pokemon.getApi();
    await pokemon.getPokemonData();
    
}

main();