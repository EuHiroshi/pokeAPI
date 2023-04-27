import pokemon from './user.service.js'

async function main() {
    // await pokemon.getApi(); // Executar apenas esse se nao tiver o arquivo PokemonsUrl.json
    await pokemon.getPokemonData(); // Executar apenas esse se nao tiver o arquivo SortedPokedex.json, ou se quiser mudar os moves dos pokemons
    
}

main();