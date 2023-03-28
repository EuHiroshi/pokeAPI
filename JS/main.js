import pokemon from './server.js'

async function main() {
    pokemon.getApi()
    pokemon.getPokemon('charmander');
    
}

main();